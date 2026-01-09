import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICoinWallet extends Document {
    userId: Types.ObjectId;
    balance: number;
    lockedBalance: number;
    lifetimeEarned: number;
    lifetimeRedeemed: number;
    lastUpdated: Date;
}

const coinWalletSchema = new Schema<ICoinWallet>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        balance: { type: Number, default: 0, min: 0 },
        lockedBalance: { type: Number, default: 0, min: 0 }, // For coins applied to orders but not yet finalized
        lifetimeEarned: { type: Number, default: 0 },
        lifetimeRedeemed: { type: Number, default: 0 },
    },
    { timestamps: { updatedAt: "lastUpdated" } } // logic to use lastUpdated as updatedAt
);

// Ensure index on userId for fast lookups
coinWalletSchema.index({ userId: 1 });

const CoinWallet = mongoose.model<ICoinWallet>("CoinWallet", coinWalletSchema);
export default CoinWallet;
