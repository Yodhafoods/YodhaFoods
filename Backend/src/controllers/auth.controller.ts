import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

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
  const baseOptions: any = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
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
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
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
        <h2>Welcome to Yodha Foods, ${user.name}!</h2>
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
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.verified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
      });
    }
    if (!user.password) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.password) {
      return res.status(400).json({ message: "Please login with Google" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user._id.toString(), user.role);
    const refreshToken = createRefreshToken(user._id.toString());

    await saveRefreshToken(user._id.toString(), refreshToken);

    setAuthCookies(res, accessToken, refreshToken);

    const { password: _, ...safeUser } = user.toObject();

    // expiry = now + 15m
    const accessTokenExpiry = Date.now() + 15 * 60 * 1000;

    return res.json({
      message: "Login successful",
      user: safeUser,
      accessTokenExpiry,
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

    const userId = verifyRefreshToken(token);

    const user = await User.findById(userId);
    if (!user)
      return res.status(401).json({ message: "User no longer exists" });

    const valid = await isRefreshTokenValid(userId, token);
    if (!valid)
      return res
        .status(401)
        .json({ message: "Refresh token invalid or revoked" });

    await revokeRefreshToken(token);

    const newAccessToken = createAccessToken(userId, user.role);
    const newRefreshToken = createRefreshToken(userId);
    await saveRefreshToken(userId, newRefreshToken);

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
    const clearOptions: any = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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

    return res.json({ user });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
