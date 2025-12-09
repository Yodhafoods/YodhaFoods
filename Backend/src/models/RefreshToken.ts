import mongoose, { Schema, Document } from "mongoose";

export interface IRefreshToken extends Document {
  user: mongoose.Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  revoked: boolean;
  replacedByToken?: string;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    tokenHash: { type: String, required: true },

    expiresAt: { type: Date, required: true },

    revoked: { type: Boolean, default: false },

    replacedByToken: { type: String },
  },
  { timestamps: true }
);

const RefreshToken = mongoose.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);


export default RefreshToken;
