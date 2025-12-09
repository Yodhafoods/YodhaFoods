// src/utils/token.ts
import jwt from "jsonwebtoken";
import { createHash } from "crypto";
import RefreshTokenModel from "../models/RefreshToken";
import TokenModel from "../models/Token";
import mongoose from "mongoose";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 3600; // 7 days
const VERIFY_TOKEN_TTL_SECONDS = 24 * 3600; // 1 day for email verify
const PASSWORD_RESET_TTL_SECONDS = 60 * 60; // 1 hour

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("Missing JWT secrets in env");
}

export function createAccessToken(userId: string | mongoose.Types.ObjectId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
}

export function createRefreshToken(userId: string | mongoose.Types.ObjectId) {
  return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: `${REFRESH_TOKEN_TTL_SECONDS}s` });
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

/** Save refresh token (hashed) and optionally remove previous tokens to enforce single session */
export async function saveRefreshToken(userId: string | mongoose.Types.ObjectId, refreshToken: string) {
  const tokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000);
  // remove old tokens if you want single active session:
  await RefreshTokenModel.deleteMany({ userId });
  const doc = await RefreshTokenModel.create({ userId, tokenHash, expiresAt });
  return doc;
}

export async function verifyRefreshToken(token: string) {
  const payload = jwt.verify(token, JWT_REFRESH_SECRET) as { id: string };
  const tokenHash = hashToken(token);
  const stored = await RefreshTokenModel.findOne({ userId: payload.id, tokenHash });
  if (!stored) throw new Error("Refresh token not found or revoked");
  return payload.id;
}

export async function revokeRefreshToken(token: string) {
  const tokenHash = hashToken(token);
  await RefreshTokenModel.deleteOne({ tokenHash });
}

/** Create and store one-time token for email verification / password reset.
 *  Returns plain token (not hashed) to be sent via email.
 */
export async function createOneTimeToken(userId: string | mongoose.Types.ObjectId, type: "email_verify" | "password_reset") {
  const plain = createHash("sha256").update(`${userId}:${Date.now()}:${Math.random()}`).digest("hex") + Math.random().toString(36).slice(2, 8);
  const tokenHash = hashToken(plain);

  const ttl = type === "email_verify" ? VERIFY_TOKEN_TTL_SECONDS : PASSWORD_RESET_TTL_SECONDS;
  const expiresAt = new Date(Date.now() + ttl * 1000);

  // For uniqueness, delete existing same-type token for user
  await TokenModel.deleteMany({ userId, type });

  await TokenModel.create({ userId, tokenHash, type, expiresAt });
  return plain;
}

export async function verifyOneTimeToken(userId: string, token: string, type: "email_verify" | "password_reset") {
  const tokenHash = hashToken(token);
  const stored = await TokenModel.findOne({ userId, tokenHash, type });
  if (!stored) throw new Error("Invalid or expired token");
  // optionally delete after use
  await TokenModel.deleteOne({ _id: stored._id });
  return true;
}
