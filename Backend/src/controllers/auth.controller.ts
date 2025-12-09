// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import {
  createAccessToken,
  createRefreshToken,
  saveRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  createOneTimeToken,
  verifyOneTimeToken
} from "../utils/token";
import { sendEmail } from "../utils/email";

const REFRESH_COOKIE_NAME = "refreshToken";
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/api/auth", // only send cookie to auth endpoints (adjust if needed)
  maxAge: 7 * 24 * 3600 * 1000 // 7 days
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: passwordHash });

    // create email verification token
    const plainToken = await createOneTimeToken(user._id, "email_verify");
    const verifyUrl = `${process.env.FRONTEND_ORIGIN || "http://localhost:3000"}/verify-email?token=${plainToken}&id=${user._id}`;

    // send email (async)
    // await sendEmail(user.email, "Verify your email", `<p>Please verify your email by clicking <a href="${verifyUrl}">this link</a></p>`);

    const userObj = user.toObject() as any;
    delete userObj.password;

    return res.status(201).json({ message: "Registered. Please verify your email.", user: userObj });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const { id, token } = req.body;
    if (!id || !token) return res.status(400).json({ message: "Missing parameters" });

    await verifyOneTimeToken(id, token, "email_verify");

    await User.findByIdAndUpdate(id, { isVerified: true });

    return res.json({ message: "Email verified" });
  } catch (err) {
    console.error("Email verify error:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    // if (!user.isVerified) {
    //   return res.status(403).json({ message: "Please verify your email before logging in" });
    // }

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    await saveRefreshToken(user._id, refreshToken);

    // Set cookie (httpOnly)
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, REFRESH_COOKIE_OPTIONS);

    return res.json({ message: "Login successful", accessToken });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    // read refresh token from httpOnly cookie
    const token = req.cookies[REFRESH_COOKIE_NAME];
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const userId = await verifyRefreshToken(token);
    const newAccessToken = createAccessToken(userId);
    const newRefreshToken = createRefreshToken(userId);

    // rotate tokens
    await revokeRefreshToken(token);
    await saveRefreshToken(userId, newRefreshToken);

    // set new cookie
    res.cookie(REFRESH_COOKIE_NAME, newRefreshToken, REFRESH_COOKIE_OPTIONS);

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies[REFRESH_COOKIE_NAME];
    if (token) {
      await revokeRefreshToken(token);
    }
    // clear cookie
    res.clearCookie(REFRESH_COOKIE_NAME, { path: "/api/auth" });
    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Initiate password reset: send one-time token to email
 * POST /api/auth/forgot-password
 * body: { email }
 */
export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Missing email" });

    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: "If that email exists, a reset link has been sent" });

    const plain = await createOneTimeToken(user._id, "password_reset");
    const resetUrl = `${process.env.FRONTEND_ORIGIN || "http://localhost:3000"}/reset-password?token=${plain}&id=${user._id}`;

    await sendEmail(user.email, "Password reset", `<p>Reset link: <a href="${resetUrl}">Reset password</a></p>`);

    return res.json({ message: "If that email exists, a reset link has been sent" });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Complete password reset
 * POST /api/auth/reset-password
 * body: { id, token, newPassword }
 */
export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { id, token, newPassword } = req.body;
    if (!id || !token || !newPassword) return res.status(400).json({ message: "Missing fields" });

    await verifyOneTimeToken(id, token, "password_reset");
    const hash = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(id, { password: hash });

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
