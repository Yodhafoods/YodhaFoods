import { Request, Response, NextFunction } from "express";
import { RewardService } from "../services/reward.service.js";
import Cart from "../models/Cart.js";
import CoinWallet from "../models/CoinWallet.js";
import mongoose from "mongoose";

export class RewardController {

    /**
     * POST /api/rewards/spin
     * Spin the wheel to earn coins
     */
    static async spin(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const ipAddress = req.ip || req.socket.remoteAddress || "0.0.0.0";
            const userAgent = req.headers["user-agent"] || "unknown";

            const result = await RewardService.spinWheel(userId, ipAddress as string, userAgent);

            return res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message || "Spin failed",
            });
        }
    }

    /**
     * GET /api/rewards/wallet
     * Get current coin balance
     */
    static async getWallet(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const wallet = await RewardService.getWallet(userId);

            return res.status(200).json({
                success: true,
                data: {
                    balance: wallet.balance,
                    lifetimeEarned: wallet.lifetimeEarned,
                    spinsToday: (wallet as any).spinsToday,
                    maxSpins: (wallet as any).maxSpins,
                    // lockedBalance logic can be added here if needed for UI
                    availableBalance: wallet.balance // simple for now
                },
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/rewards/history
     * Get coin transaction history
     */
    static async getHistory(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;

            // 1. Get Earnings (Spins)
            const spins = await RewardService.getTransactionHistory(userId);

            // 2. Get Redemptions (Orders)
            // Ideally this should be in Service, but importing Order there might be cleaner or cause issues.
            // Let's query here for simplicity or move to service if reused.
            // We need to import Order properly.

            // Dynamic import to avoid potential circular deps if any (though unlikely here)
            const { default: Order } = await import("../models/Order.js");

            const orders = await Order.find({
                userId,
                coinsRedeemed: { $gt: 0 }
            }).select('coinsRedeemed createdAt orderId _id').sort({ createdAt: -1 }).limit(50);

            const redemptions = orders.map((order: any) => ({
                type: 'REDEEMED',
                amount: order.coinsRedeemed,
                date: order.createdAt,
                description: `Used on Order #${order._id.toString().slice(-6)}` // Simple ID display
            }));

            // 3. Merge and Sort
            const allTransactions = [...spins, ...redemptions].sort((a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            return res.status(200).json({
                success: true,
                data: allTransactions
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/rewards/apply-coins
     * Apply coins to current cart
     * Body: { action: 'apply' | 'remove' }
     */
    static async applyCoins(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const { action } = req.body; // 'apply' or 'remove'

            const cart = await Cart.findOne({ userId }).populate("items.productId");
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }

            const wallet = await CoinWallet.findOne({ userId });
            if (!wallet) {
                return res.status(400).json({ message: "No coins available" });
            }

            if (action === 'remove') {
                cart.appliedCoins = 0;
                cart.coinDiscount = 0;
                await cart.save();
                return res.status(200).json({ success: true, message: "Coins removed", cartTotal: 0 });
            }

            // Calculate Cart Total
            let subtotal = 0;
            cart.items.forEach((item: any) => {
                const product = item.productId;
                if (product && product.packs) {
                    // Find the pack that matches item.pack
                    const pack = product.packs.find((p: any) => p.label === item.pack);

                    // If no pack found (or item.pack is undefined), try default or first? 
                    // CartController validation suggests item.pack should match. 
                    // Fallback to first pack if needed for robustness, but preferably exact match.
                    const selectedPack = pack || product.packs[0];

                    if (selectedPack) {
                        const price = selectedPack.discountPrice && selectedPack.discountPrice > 0
                            ? selectedPack.discountPrice
                            : selectedPack.price;

                        subtotal += price * item.quantity;
                    }
                }
            });

            if (subtotal === 0) {
                return res.status(200).json({
                    success: true,
                    data: { subtotal: 0, coinsApplied: 0, discountAmount: 0, finalTotal: 0 }
                });
            }

            // Business Rule: Max 20% of order value
            const MAX_PERCENTAGE = 0.20; // Config variable
            const maxDiscount = Math.floor(subtotal * MAX_PERCENTAGE);

            // 1 Coin = 0.1 Rupee => 10 Coins = 1 Rupee
            // Max coins allowed for this order
            const maxCoinsAllowed = maxDiscount * 10;

            // Available coins from wallet
            const availableCoins = wallet.balance;

            // Requested coins to apply (from User) - Optional
            // If not provided, default to MAX possible
            let requestedCoins = req.body.coinsToApply;

            // Logic to determine final coins to use
            // 1. Cap by Wallet Balance
            // 2. Cap by Order Max Limit (20%)
            // 3. Cap by User Request (if provided)

            let coinsToUse = Math.min(availableCoins, maxCoinsAllowed);

            if (typeof requestedCoins === 'number' && requestedCoins >= 0) {
                coinsToUse = Math.min(coinsToUse, requestedCoins);
            }

            const discountAmount = coinsToUse / 10;

            // Update Cart
            cart.appliedCoins = coinsToUse;
            cart.coinDiscount = discountAmount;
            await cart.save();

            return res.status(200).json({
                success: true,
                data: {
                    subtotal,
                    coinsApplied: coinsToUse,
                    discountAmount,
                    finalTotal: subtotal - discountAmount
                }
            });

        } catch (error) {
            next(error);
        }
    }
}
