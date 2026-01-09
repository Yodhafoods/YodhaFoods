import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISpinHistory extends Document {
    userId: Types.ObjectId;
    rewardCoins: number;
    spinType: "daily" | "promo";
    ipAddress: string;
    userAgent?: string;
    riskScore: number;
    createdAt: Date;
}

const spinHistorySchema = new Schema<ISpinHistory>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        rewardCoins: { type: Number, required: true },
        spinType: { type: String, enum: ["daily", "promo"], default: "daily" },
        ipAddress: { type: String, required: true },
        userAgent: { type: String },
        riskScore: { type: Number, default: 0 },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

// Indexes for anti-fraud queries
spinHistorySchema.index({ userId: 1, createdAt: -1 }); // Fast check for last spin
spinHistorySchema.index({ ipAddress: 1, createdAt: -1 }); // Check IP rate limits

const SpinHistory = mongoose.model<ISpinHistory>("SpinHistory", spinHistorySchema);
export default SpinHistory;
