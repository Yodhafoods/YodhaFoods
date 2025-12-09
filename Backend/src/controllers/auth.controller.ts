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
import type { RegisterInput, LoginInput } from "../schemas/auth.schema.js";

// utility to set cookies
const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken?: string
) => {
  res.cookie("at", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  if (refreshToken) {
    res.cookie("rt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
};

/**
 * POST /api/auth/register
 */
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
    await User.create({ name, email, password: hash });

    return res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/auth/login
 */
export const loginUser = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user._id.toString(), user.role);
    const refreshToken = createRefreshToken(user._id.toString());

    await saveRefreshToken(user._id.toString(), refreshToken);

    setAuthCookies(res, accessToken, refreshToken);

    const { password: _, ...safeUser } = user.toObject();

    return res.json({
      message: "Login successful",
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/auth/refresh
 */
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

    // rotate tokens
    await revokeRefreshToken(token);

    const newAccessToken = createAccessToken(userId, user.role);
    const newRefreshToken = createRefreshToken(userId);
    await saveRefreshToken(userId, newRefreshToken);

    setAuthCookies(res, newAccessToken, newRefreshToken);

    return res.json({ message: "Token refreshed" });
  } catch (err) {
    console.error("Refresh error:", err);
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};

/**
 * POST /api/auth/logout
 */
export const logoutController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.rt;
    if (token) {
      await revokeRefreshToken(token);
    }

    res.clearCookie("at");
    res.clearCookie("rt");
    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/auth/me
 */
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
