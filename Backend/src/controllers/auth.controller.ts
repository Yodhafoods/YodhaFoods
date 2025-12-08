// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import {
  createAccessToken,
  createRefreshToken,
  hashToken,
  saveRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken
} from "../utils/token";

/**
 * Register user
 * POST /api/auth/register
 * body: { name, email, password }
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: passwordHash });

    // Do not return password
    const userObj = user.toObject();
    const { password: _, ...userWithoutPassword } = userObj;

    return res.status(201).json({ message: "Registered", user: userWithoutPassword });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Login user
 * POST /api/auth/login
 * body: { email, password }
 * Returns: { accessToken, refreshToken }
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });
    
    //validate user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    //validate password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    // Create tokens
    const accessToken = createAccessToken(user._id.toString());
    const refreshToken = createRefreshToken(user._id.toString());

    await saveRefreshToken(user._id, refreshToken);

    // Ideally set refresh token as httpOnly cookie:
    // res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: ... })

    return res.json({
      message: "Login successful",
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Refresh access token
 * POST /api/auth/refresh
 * body: { token }  OR you may read from cookie
 */
export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "No token provided" });

    const userId = await verifyRefreshToken(token); // will throw if invalid
    const newAccessToken = createAccessToken(userId);
    const newRefreshToken = createRefreshToken(userId);

    // Rotate: delete old, save new
    await revokeRefreshToken(token);
    await saveRefreshToken(userId, newRefreshToken);

    // Return new tokens
    return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err: any) {
    console.error("Refresh error:", err);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

/**
 * Logout: revoke a refresh token
 * POST /api/auth/logout
 * body: { token } OR cookie
 */
export const logoutController = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "No token provided" });

    await revokeRefreshToken(token);
    // If used cookie, set cookie to empty + expiry
    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
