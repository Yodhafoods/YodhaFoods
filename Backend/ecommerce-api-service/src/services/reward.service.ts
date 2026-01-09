import mongoose from "mongoose";
import CoinWallet from "../models/CoinWallet.js";
import SpinHistory from "../models/SpinHistory.js";
import { FraudService } from "./fraud.service.js";
import { REWARDS_CONFIG } from "../config/rewards.config.js";

export class RewardService {
    static async spinWheel(userId: string, ipAddress: string, userAgent: string) {
        // 1. Anti-Fraud Checks
        await FraudService.validateSpinEligibility(userId, ipAddress);

        // 2. Determine Reward (Weighted Random)
        const rewardCoins = this.calculateReward();

        // 3. Atomic Transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Create History
            await SpinHistory.create(
                [
                    {
                        userId,
                        rewardCoins,
                        spinType: "daily",
                        ipAddress,
                        userAgent,
                        riskScore: 0, // Placeholder for advanced scoring
                    },
                ],
                { session }
            );

            // Update Wallet
            await CoinWallet.findOneAndUpdate(
                { userId },
                {
                    $inc: {
                        balance: rewardCoins,
                        lifetimeEarned: rewardCoins,
                    },
                },
                { upsert: true, new: true, session }
            );

            await session.commitTransaction();
            return { coinsWon: rewardCoins };
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    static async getWallet(userId: string) {
        let wallet = await CoinWallet.findOne({ userId });

        // Count spins today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const spinsToday = await SpinHistory.countDocuments({
            userId,
            createdAt: { $gte: startOfDay },
        });

        if (!wallet) {
            // Return empty wallet if not exists yet
            return {
                balance: 0,
                lifetimeEarned: 0,
                lifetimeRedeemed: 0,
                spinsToday,
                maxSpins: REWARDS_CONFIG.DAILY_SPIN_LIMIT
            };
        }

        return {
            ...wallet.toObject(),
            spinsToday,
            maxSpins: REWARDS_CONFIG.DAILY_SPIN_LIMIT
        };
    }

    public static async getTransactionHistory(userId: string) {
        // 1. Get Spins (Earnings)
        const spins = await SpinHistory.find({ userId }).sort({ createdAt: -1 }).limit(50);

        // 2. Get Orders (Redemptions) - where coinsRedeemed > 0
        // We need to import Order model, but circular dependency consideration?
        // Let's rely on dynamic import or assume it's fine if imported above.
        // Actually best to pass Order model or keep logic simple.
        // Let's assume we can query Order.

        const transactions = spins.map(spin => ({
            type: 'EARNED',
            amount: spin.rewardCoins,
            date: spin.createdAt,
            description: spin.spinType === 'daily' ? 'Daily Spin' : 'Bonus Spin'
        }));

        // We will fetch orders in Controller to avoid circular dependency if Order imports RewardService?
        // No, Order imports CoinWallet. RewardService is safe to import Order typically.

        return transactions;
    }

    public static calculateReward(): number {
        const totalWeight = REWARDS_CONFIG.REWARD_TIERS.reduce((acc, tier) => acc + tier.weight, 0);
        const random = Math.random() * totalWeight;

        let cumulativeWeight = 0;
        for (const tier of REWARDS_CONFIG.REWARD_TIERS) {
            cumulativeWeight += tier.weight;
            if (random < cumulativeWeight) {
                return tier.coins;
            }
        }
        return REWARDS_CONFIG.REWARD_TIERS[0].coins; // Fallback
    }
}
