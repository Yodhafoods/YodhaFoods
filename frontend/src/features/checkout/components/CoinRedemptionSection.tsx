"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useState, useEffect } from "react";
import { applyCoins, removeCoins, selectCheckoutTotals } from "../store/checkoutSlice";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function CoinRedemptionSection() {
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const items = useAppSelector((state) => state.cart.items);
    const totals = useAppSelector(selectCheckoutTotals);

    // Check local slice state
    const coinsApplied = useAppSelector((state) => state.checkout.coinsApplied);

    const [customCoins, setCustomCoins] = useState<number>(0);
    const [useCustom, setUseCustom] = useState(false);

    // Sync customCoins with Redux state when it changes (e.g. initial load or successful application)
    useEffect(() => {
        if (coinsApplied > 0) {
            setCustomCoins(coinsApplied);
        }
    }, [coinsApplied]);

    // Restore missing state and fetch logic
    const [wallet, setWallet] = useState<{ balance: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        if (user) {
            fetchWallet();
        }
    }, [user]);

    const fetchWallet = async () => {
        try {
            setLoading(true);
            const res = await api.get<any>("/api/rewards/wallet");
            if (res && res.success && res.data) {
                setWallet(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyCoins = async (coins: number) => {
        if (!wallet || wallet.balance <= 0) return;
        setApplying(true);
        try {
            const res = await api.post<any>("/api/rewards/apply-coins", {
                action: 'apply',
                coinsToApply: coins
            });

            if (res && res.data) {
                dispatch(applyCoins({
                    coins: res.data.coinsApplied,
                    discount: res.data.discountAmount
                }));
                const saved = res.data.discountAmount;
                const coinsUsed = res.data.coinsApplied;
                if (coinsUsed > 0) {
                    toast.success(`Applied ${coinsUsed} coins for ₹${saved} off`);
                } else {
                    toast("No coins applied (limit reached or balance empty)");
                }
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to apply coins");
        } finally {
            setApplying(false);
        }
    };

    const handleRemoveCoins = async () => {
        try {
            const res = await api.post<any>("/api/rewards/apply-coins", {
                action: 'remove'
            });
            if (res && res.success) {
                dispatch(removeCoins());
                toast.success("Coins removed");
                setCustomCoins(0); // Reset input
            }
        } catch (error) {
            toast.error("Failed to remove coins");
        }
    };

    const handleToggle = () => {
        if (coinsApplied > 0) {
            handleRemoveCoins();
        } else {
            // Default: Apply MAX
            handleApplyCoins(wallet?.balance || 0); // Backend caps it anyway
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value) || 0;
        setCustomCoins(val);
    };

    const handleInputBlur = () => {
        if (customCoins > 0) {
            handleApplyCoins(customCoins);
        }
    };

    if (!user || loading || !wallet || wallet.balance === 0) return null;

    // Determine max usable coins locally for UI hint?
    // Max 20% of subtotal. 
    // totals.subtotal might be available.
    // 10 coins = 1 rs. Max discount = 0.2 * subtotal. Max coins = 2 * subtotal.
    const maxCoinsByOrder = Math.floor(totals.subtotal * 0.2 * 10);
    const maxUsable = Math.min(wallet.balance, maxCoinsByOrder);

    return (
        <div className="rounded-xl">
            <h2 className="font-semibold text-sm mb-3 flex items-center justify-between text-gray-700">
                <span>Yodha Coins</span>
                <span className="text-xs font-normal text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                    Bal: {wallet.balance}
                </span>
            </h2>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500">
                            Use coins to save (Max {maxUsable})
                        </p>
                        {coinsApplied > 0 && (
                            <p className="text-green-600 text-xs mt-1 font-medium">
                                Saved ₹{totals.discount}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleToggle}
                        disabled={applying}
                        className={`
                            relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                            ${coinsApplied > 0 ? "bg-orange-600" : "bg-gray-200"}
                        `}
                    >
                        <span
                            className={`
                                inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform
                                ${coinsApplied > 0 ? "translate-x-4" : "translate-x-1"}
                            `}
                        />
                    </button>
                </div>

                {/* Custom Input when Active */}
                {coinsApplied > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                        <input
                            type="number"
                            value={customCoins}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:border-orange-500 outline-none"
                            placeholder={`Max ${maxUsable}`}
                            max={maxUsable}
                            min={1}
                        />
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                            / {maxUsable}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
