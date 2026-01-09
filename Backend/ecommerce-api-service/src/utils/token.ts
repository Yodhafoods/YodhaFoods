import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import RefreshToken from "../models/RefreshToken.js";
import type { UserRole } from "../models/User.js";
import mongoose from "mongoose";


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

export const createRefreshToken = (userId: string, tokenId: string) => {
  // Embed the tokenId (jti) in the JWT so we can look it up instantly
  return jwt.sign({ sub: userId, jti: tokenId }, getSecret("JWT_REFRESH_SECRET"), {
    expiresIn: REFRESH_EXPIRES_IN,
  });
};

export const verifyRefreshToken = (token: string) => {
  const decoded = jwt.verify(
    token,
    getSecret("JWT_REFRESH_SECRET")
  ) as jwt.JwtPayload;

  return {
    userId: decoded.sub as string,
    tokenId: decoded.jti as string
  };
};

export const hashToken = async (token: string): Promise<string> => {
  return bcrypt.hash(token, 12);
};

export const saveRefreshToken = async (
  userId: string,
  tokenId: string,
  refreshToken: string
) => {
  const tokenHash = await hashToken(refreshToken);
  const decoded = jwt.decode(refreshToken) as jwt.JwtPayload;
  const expiresAt = decoded.exp
    ? new Date(decoded.exp * 1000)
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Use the pre-generated tokenId as the document _id
  return RefreshToken.create({
    _id: new mongoose.Types.ObjectId(tokenId),
    user: new mongoose.Types.ObjectId(userId),
    tokenHash,
    expiresAt,
  });
};

export const revokeRefreshToken = async (refreshToken: string) => {
  try {
    const decoded = jwt.decode(refreshToken) as jwt.JwtPayload;
    if (decoded && decoded.jti) {
      await RefreshToken.findByIdAndUpdate(decoded.jti, { revoked: true });
    }
  } catch (err) {
    // If token is invalid/tampered, we can't reliably revoke a specific ID, 
    // but the verification steps will fail anyway.
    console.error("Revoke error:", err);
  }
};

export const isRefreshTokenValid = async (
  userId: string,
  refreshToken: string
): Promise<boolean> => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      getSecret("JWT_REFRESH_SECRET")
    ) as jwt.JwtPayload;

    const tokenId = decoded.jti;
    if (!tokenId) return false;

    // Direct lookup by ID (O(1)) instead of scanning all tokens
    const tokenDoc = await RefreshToken.findById(tokenId);

    if (!tokenDoc) return false;
    if (tokenDoc.revoked) return false;

    // Validate ownership
    if (tokenDoc.user.toString() !== userId) return false;

    // Validate hash
    const isMatch = await bcrypt.compare(refreshToken, tokenDoc.tokenHash);
    return isMatch;

  } catch (err) {
    return false;
  }
};
