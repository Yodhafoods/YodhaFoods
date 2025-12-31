import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import mongoose from "mongoose";

import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  saveRefreshToken,
  revokeRefreshToken,
  isRefreshTokenValid,
} from "../utils/token.js";

import {
  createEmailVerifyToken,
  verifyEmailToken,
} from "../utils/emailToken.js";

import { sendEmail } from "../utils/sendEmail.js";

import type { RegisterInput, LoginInput } from "../schemas/auth.schema.js";

// Utility: Set cookies
const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken?: string
) => {
  const domain = process.env.COOKIE_DOMAIN; // e.g. ".yodhafoods.com"

  // Base options for cross-site usage (Backend on Render, Frontend on Custom Domain)
  const isProduction = process.env.NODE_ENV === "production";

  const baseOptions: any = {
    httpOnly: true,
    secure: isProduction, // Must be true for SameSite=None
    sameSite: isProduction ? "none" : "lax", // Must be 'none' for cross-site
    maxAge: 15 * 60 * 1000,
    partitioned: isProduction, // CHIPS support for future-proofing
  };

  // Only set domain if explicitly provided (e.g. for custom subdomains)
  // If backend is on yodhafoods.onrender.com, this should be undefined.
  if (domain) {
    baseOptions.domain = domain;
  }

  res.cookie("at", accessToken, baseOptions);

  if (refreshToken) {
    const refreshOptions = {
      ...baseOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("rt", refreshToken, refreshOptions);
  }
};

// =====================================================================
// REGISTER USER + SEND VERIFICATION EMAIL
// =====================================================================
export const registerUser = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response
) => {
  try {
    const { first_name, last_name, email, contact_number, password } = req.body;

    const existing = await User.findOne({
      $or: [{ email }, { Contact_number: contact_number }],
    });

    if (existing) {
      if (existing.email === email) {
        return res.status(409).json({ message: "Email already exists" });
      }
      return res.status(409).json({ message: "Mobile number already registered" });
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await User.create({
      first_name,
      last_name,
      email,
      Contact_number: contact_number,
      password: hash,
      verified: false,
    });

    // Create email verification token
    const token = createEmailVerifyToken(user._id.toString(), user.email);

    const verifyUrl = `${process.env.FRONTEND_ORIGIN}/auth/verify-email?token=${encodeURIComponent(token)}`;

    // Send email
    await sendEmail(
      user.email,
      "Verify your Yodha Foods account",
      `
        <h2>Welcome to Yodha Foods, ${user.first_name}!</h2>
        <p>Please verify your email by clicking the button below:</p>

        <a href="${verifyUrl}"
           style="background:#FF4500;color:white;padding:10px 16px;
           border-radius:6px;text-decoration:none;display:inline-block;">
           Verify Email
        </a>

        <p>This link expires in 10 minutes.</p>
      `
    );

    return res.status(201).json({
      message: "Registered successfully! Please verify your email.",
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }

};

// =====================================================================
// LOGIN USER — BLOCK IF EMAIL NOT VERIFIED
// =====================================================================
export const loginUser = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    // Detect whether identifier is email or mobile
    const isEmail = identifier.includes("@");

    let query = {};
    if (isEmail) {
      query = { email: identifier.toLowerCase() };
    } else {
      // If mobile, strip non-numeric characters to match database format
      const mobileNumber = identifier.replace(/\D/g, "");
      if (!mobileNumber) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      query = { Contact_number: mobileNumber };
    }

    const user = await User.findOne(query);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Block if email not verified
    if (!user.verified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
      });
    }

    // Block password login for Google-only accounts
    if (!user.password) {
      return res.status(400).json({
        message: "This account uses Google Sign-In. Please continue with Google.",
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create tokens
    const tokenId = new mongoose.Types.ObjectId().toString();
    const accessToken = createAccessToken(user._id.toString(), user.role);
    const refreshToken = createRefreshToken(user._id.toString(), tokenId);

    await saveRefreshToken(user._id.toString(), tokenId, refreshToken);

    // Set cookies
    setAuthCookies(res, accessToken, refreshToken);

    // Remove password before sending user
    const { password: _, ...safeUser } = user.toObject();

    // Access token expiry (15 minutes) - Must match token utils
    const accessTokenExpiry = Date.now() + 15 * 60 * 1000;

    return res.json({
      message: "Login successful",
      user: safeUser,
      accessTokenExpiry,
      refreshTokenExpiry: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// =====================================================================
// VERIFY EMAIL CONTROLLER
// =====================================================================
export const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    const decoded = verifyEmailToken(token);

    const user = await User.findById(decoded.sub);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.verified) {
      return res.json({ message: "Email already verified" });
    }

    user.verified = true;
    await user.save();

    return res.json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error("Verify error:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

// =====================================================================
// REFRESH TOKEN
// =====================================================================
export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.rt;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const { userId, tokenId } = verifyRefreshToken(token);

    const user = await User.findById(userId);
    if (!user)
      return res.status(401).json({ message: "User no longer exists" });

    // isRefreshTokenValid now does O(1) lookup using the tokenId embedded in the JWT
    const valid = await isRefreshTokenValid(userId, token);
    if (!valid)
      return res
        .status(401)
        .json({ message: "Refresh token invalid or revoked" });

    await revokeRefreshToken(token);

    const newTokenId = new mongoose.Types.ObjectId().toString();
    const newAccessToken = createAccessToken(userId, user.role);
    const newRefreshToken = createRefreshToken(userId, newTokenId);

    await saveRefreshToken(userId, newTokenId, newRefreshToken);

    setAuthCookies(res, newAccessToken, newRefreshToken);

    // expiry = now + 15m (must match token.ts ACCESS_EXPIRES_IN)
    const accessTokenExpiry = Date.now() + 15 * 60 * 1000;

    return res.json({ message: "Token refreshed", accessTokenExpiry });
  } catch (err) {
    console.error("Refresh error:", err);
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};

// =====================================================================
// LOGOUT
// =====================================================================
export const logoutController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.rt;
    if (token) await revokeRefreshToken(token);

    const domain = process.env.COOKIE_DOMAIN;
    const isProduction = process.env.NODE_ENV === "production";

    const clearOptions: any = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      partitioned: isProduction,
    };
    if (domain) clearOptions.domain = domain;

    res.clearCookie("at", clearOptions);
    res.clearCookie("rt", clearOptions);

    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// =====================================================================
// GET AUTHENTICATED USER
// =====================================================================
export const meController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return user + current access token expiry (so frontend can schedule silent refresh)
    // req.user.exp is the unix timestamp (seconds) from the JWT
    const accessTokenExpiry = req.user.exp ? req.user.exp * 1000 : undefined;

    return res.json({ user, accessTokenExpiry });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
