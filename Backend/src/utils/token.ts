import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import RefreshToken from "../models/RefreshToken.js";
import type { UserRole } from "../models/User.js";
import mongoose from "mongoose";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

interface JWTPayload {
  sub: string;
  role: UserRole;
}

const getSecret = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
};

export const createAccessToken = (userId: string, role: UserRole) => {
  const payload: JWTPayload = { sub: userId, role };
  return jwt.sign(payload, getSecret("JWT_ACCESS_SECRET"), {
    expiresIn: ACCESS_EXPIRES_IN,
  });
};

export const createRefreshToken = (userId: string) => {
  return jwt.sign({ sub: userId }, getSecret("JWT_REFRESH_SECRET"), {
    expiresIn: REFRESH_EXPIRES_IN,
  });
};

export const verifyRefreshToken = (token: string): string => {
  const decoded = jwt.verify(
    token,
    getSecret("JWT_REFRESH_SECRET")
  ) as jwt.JwtPayload;
  return decoded.sub as string;
};

export const hashToken = async (token: string): Promise<string> => {
  return bcrypt.hash(token, 12);
};

export const saveRefreshToken = async (
  userId: string,
  refreshToken: string
) => {
  const tokenHash = await hashToken(refreshToken);
  const decoded = jwt.decode(refreshToken) as jwt.JwtPayload;
  const expiresAt = decoded.exp
    ? new Date(decoded.exp * 1000)
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return RefreshToken.create({
    user: new mongoose.Types.ObjectId(userId),
    tokenHash,
    expiresAt,
  });
};

export const revokeRefreshToken = async (refreshToken: string) => {
  const tokens = await RefreshToken.find();
  for (const doc of tokens) {
    const match = await bcrypt.compare(refreshToken, doc.tokenHash);
    if (match) {
      doc.revoked = true;
      await doc.save();
      break;
    }
  }
};

export const isRefreshTokenValid = async (
  userId: string,
  refreshToken: string
): Promise<boolean> => {
  const tokens = await RefreshToken.find({
    user: userId,
    revoked: false,
  });

  for (const tokenDoc of tokens) {
    const isMatch = await bcrypt.compare(refreshToken, tokenDoc.tokenHash);
    if (isMatch && tokenDoc.expiresAt > new Date()) {
      return true;
    }
  }
  return false;
};
