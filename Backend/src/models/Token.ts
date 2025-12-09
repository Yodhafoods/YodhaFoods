// src/models/Token.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IToken extends Document {
  userId: mongoose.Types.ObjectId;
  tokenHash: string; // hashed token
  type: "email_verify" | "password_reset";
  expiresAt: Date;
  createdAt: Date;
}

const tokenSchema = new Schema<IToken>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    tokenHash: { type: String, required: true },
    type: { type: String, enum: ["email_verify", "password_reset"], required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

// Auto-delete expired tokens via TTL
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IToken>("Token", tokenSchema);
