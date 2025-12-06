import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

// Generate tokens
const createAccessToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "15m" });
};

const createRefreshToken = (id: string) => {
  return jwt.sign({ id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

// ----------------------
// REGISTER USER
// ----------------------
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash
    });

    return res.status(201).json({ message: "User registered", userId: user._id });
  } catch (err) {
    return res.status(500).json({ message: "Registration error", error: err });
  }
};

// ----------------------
// LOGIN USER
// ----------------------
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Create tokens
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    return res.json({
      message: "Login successful",
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Login error", error: err });
  }
};

// ----------------------
// REFRESH TOKEN
// ----------------------
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "No token provided" });

    jwt.verify(token, JWT_REFRESH_SECRET, (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: "Invalid refresh token" });

      const accessToken = createAccessToken(decoded.id);

      return res.json({
        accessToken
      });
    });
  } catch (err) {
    return res.status(500).json({ message: "Refresh error", error: err });
  }
};
