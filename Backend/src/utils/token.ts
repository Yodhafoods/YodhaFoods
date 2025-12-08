// src/utils/token.ts
import jwt from "jsonwebtoken";
import { randomBytes, createHash } from "crypto";
import RefreshTokenModel from "../models/RefreshToken";
import mongoose from "mongoose";

const ACCESS_TOKEN_TTL = "15m"; // adjust as needed
const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 3600; // 7 days

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("Missing JWT secrets in env");
}

/** Create access token (short lived) */
export function createAccessToken(userId: string | mongoose.Types.ObjectId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
}

/** Create refresh token as a signed JWT (long lived) */
export function createRefreshToken(userId: string | mongoose.Types.ObjectId) {
  return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: `${REFRESH_TOKEN_TTL_SECONDS}s` });
}

/** Hash a token (useful to store refresh tokens securely) */
export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

/** Persist the hashed refresh token in DB (with expiresAt) */
export async function saveRefreshToken(userId: string | mongoose.Types.ObjectId, refreshToken: string) {
  const tokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000);

  // Optionally: delete old tokens for this user to enforce single session
  await RefreshTokenModel.deleteMany({ userId });

  const doc = await RefreshTokenModel.create({
    userId,
    tokenHash,
    expiresAt
  });

  return doc;
}

/** Verify refresh token: check signature + ensure hash exists in DB */
export async function verifyRefreshToken(token: string) {
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET) as { id: string; iat?: number; exp?: number };
    const tokenHash = hashToken(token);

    const stored = await RefreshTokenModel.findOne({ userId: payload.id, tokenHash });
    if (!stored) throw new Error("Refresh token not found or revoked");

    return payload.id;
  } catch (err) {
    throw err;
  }
}

/** Revoke refresh token (by hash) */
export async function revokeRefreshToken(token: string) {
  const tokenHash = hashToken(token);
  await RefreshTokenModel.deleteOne({ tokenHash });
}
