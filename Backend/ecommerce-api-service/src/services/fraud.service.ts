import User from "../models/User.js";
import SpinHistory from "../models/SpinHistory.js";
import { Types } from "mongoose";
import { REWARDS_CONFIG } from "../config/rewards.config.js";

const MILLIS_IN_DAY = 24 * 60 * 60 * 1000;

export class FraudService {
    /**
     * Check if user is eligible to spin
     * @throws Error if not eligible
     */
    static async validateSpinEligibility(userId: string, ipAddress: string): Promise<void> {
        console.log(`[FraudService] Validating user ${userId} from IP ${ipAddress}`);
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        console.log(`[FraudService] User found. Verified: ${user.verified}, Created: ${(user as any).createdAt}`);

        // 1. Account Age Check (>= 24 hours) - Disabled for Dev/Testing ease
        // const accountAge = Date.now() - (user as any).createdAt.getTime();
        // if (accountAge < MILLIS_IN_DAY) {
        //     throw new Error("Account must be at least 24 hours old to spin.");
        // }

        // 2. Verification Check (Email or Phone)
        if (!user.verified) {
            throw new Error("Account must be verified to spin.");
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // 3. Sping limit check
        const distinctSpinsToday = await SpinHistory.countDocuments({
            userId,
            createdAt: { $gte: startOfDay },
        });
        console.log(`[FraudService] Distinct spins today: ${distinctSpinsToday}`);

        if (distinctSpinsToday >= REWARDS_CONFIG.DAILY_SPIN_LIMIT) {
            throw new Error(`You have used your daily spins! Limit: ${REWARDS_CONFIG.DAILY_SPIN_LIMIT}`);
        }

        // 4. IP Rate Limit (Max 10 spins per IP per day - loose limit for shared wifi)
        const spinsFromIp = await SpinHistory.countDocuments({
            ipAddress,
            createdAt: { $gte: startOfDay },
        });

        if (spinsFromIp >= 10) {
            throw new Error("Daily spin limit reached for this device/network.");
        }
    }
}
