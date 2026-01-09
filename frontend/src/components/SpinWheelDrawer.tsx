"use client";

import { api } from "@/lib/api";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpinWheel from "./SpinWheel";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "@/features/ui/store/uiSlice";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRouter } from "next/navigation";

const PRIZES = [
    { label: "5 Coins", value: 5, weight: 40 },
    { label: "10 Coins", value: 10, weight: 30 },
    { label: "20 Coins", value: 20, weight: 15 },
    { label: "50 Coins", value: 50, weight: 10 },
    { label: "100 Coins", value: 100, weight: 5 },
    { label: "Better Luck", value: 0, weight: 0 },
];

export default function SpinWheelDrawer() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useAuth();
    const isOpen = useSelector((state: any) => state.ui.activeDrawer === "spinWheel");

    const [isSpinning, setIsSpinning] = useState(false);
    const [prizeIndex, setPrizeIndex] = useState<number | null>(null);
    const [wonPrize, setWonPrize] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [spinsToday, setSpinsToday] = useState(0);
    const [maxSpins, setMaxSpins] = useState(1);
    const nextReset = "24 hrs";

    // Reset state when drawer opens
    // Reset state and fetch wallet when drawer opens
    useEffect(() => {
        if (isOpen) {
            setWonPrize(null);
            setPrizeIndex(null);
            setIsSpinning(false);
            if (user) {
                fetchWalletAndSpins();
            }
        }
    }, [isOpen, user]);

    const fetchWalletAndSpins = async () => {
        try {
            console.log("Fetching wallet and spins...");
            const res = await api.get<any>("/api/rewards/wallet");
            console.log("Wallet fetch response:", res);
            if (res && res.success && res.data) {
                setSpinsToday(res.data.spinsToday);
                if (res.data.maxSpins) {
                    setMaxSpins(res.data.maxSpins);
                }
            }
        } catch (error) {
            console.error("Failed to fetch spin status", error);
        }
    };

    const startSpin = async () => {
        if (loading || isSpinning) return;

        if (!user) {
            toast.error("Please login to spin!");
            dispatch(closeDrawer());
            router.push("/auth/signin");
            return;
        }

        if (spinsToday >= maxSpins) {
            toast.error("You have already used your daily spin!");
            return;
        }

        setLoading(true);

        try {
            const res = await api.post<{ success: boolean; data: { coinsWon: number } }>("/api/rewards/spin");

            if (res.success) {
                const coinsWon = res.data.coinsWon;
                setSpinsToday((prev) => prev + 1);

                const index = PRIZES.findIndex((p) => p.value === coinsWon);
                if (index !== -1) {
                    setPrizeIndex(index);
                    setIsSpinning(true);
                } else {
                    // Fallback if coinsWon doesn't match predefined prizes perfectly
                    // Usually shouldn't happen if frontend and backend prizes are synced
                    const zeroIndex = PRIZES.findIndex(p => p.value === 0);
                    setPrizeIndex(zeroIndex !== -1 ? zeroIndex : 0);
                    setIsSpinning(true);
                }
            } else {
                toast.error("Spin failed");
            }
        } catch (error: any) {
            // Handle 400 errors from backend (e.g. daily limit reached)
            // Check if it's our custom FetchError (from api.ts)
            const msg = error?.body?.message || error?.response?.data?.message || "Spin failed";
            toast.error(msg);
            fetchWalletAndSpins();
        } finally {
            setLoading(false);
        }
    };

    const handleSpinEnd = (prize: any) => {
        setIsSpinning(false);

        setTimeout(() => {
            setWonPrize(prize);
            if (prize.value > 0) {
                toast.success(`You won ${prize.label}!`);
            } else {
                toast("Better luck next time!", { icon: "😢" });
            }
        }, 500);
    };

    const handleClose = () => {
        dispatch(closeDrawer());
    };

    const handleLogin = () => {
        dispatch(closeDrawer());
        router.push("/auth/signin");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-br from-orange-200 to-amber-300 rounded-t-[30px] p-6 shadow-2xl max-h-[90vh] overflow-auto"
                    >
                        <div className="mx-auto w-12 h-1.5 bg-gray-300 rounded-full mb-6" />

                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-[#0f2f2b]">Daily Spin & Win</h2>
                                <p className="text-sm text-gray-500">Spin to earn Yodha Coins</p>
                            </div>
                            <button onClick={handleClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 min-h-[400px]">

                            {/* Left Column: Spin Wheel */}
                            <div className="flex flex-col items-center justify-center border-r-0 md:border-r border-gray-200">
                                <SpinWheel
                                    prizes={PRIZES}
                                    isSpinning={isSpinning}
                                    prizeIndex={prizeIndex}
                                    onSpinEnd={handleSpinEnd}
                                    onSpinClick={startSpin}
                                />
                            </div>

                            {/* Right Column: Info & Results */}
                            <div className="flex flex-col items-center justify-center p-4">
                                {wonPrize ? (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center"
                                    >
                                        <div className="text-6xl mb-4">{wonPrize.value > 0 ? "🎉" : "😢"}</div>
                                        <h3 className="text-3xl font-bold text-orange-600 mb-2">
                                            {wonPrize.value > 0 ? `+${wonPrize.value} Coins` : "Oh no!"}
                                        </h3>
                                        <p className="text-gray-600 text-lg mb-6">
                                            {wonPrize.value > 0 ? "Added to your wallet!" : "Try again tomorrow."}
                                        </p>
                                        <button
                                            onClick={handleClose}
                                            className="bg-[#0f2f2b] text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-[#1a4a44] transition-colors shadow-lg"
                                        >
                                            Use Coins Now
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="text-center space-y-6 max-w-sm">
                                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                            <h3 className="font-bold text-orange-800 text-lg mb-2">How it works</h3>
                                            <p className="text-sm text-orange-700">
                                                Spin the wheel daily to earn Yodha Coins. Use these coins to get extra discounts at checkout!
                                            </p>
                                        </div>

                                        {!user && (
                                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                                <p className="text-gray-600 mb-4">Login to start winning!</p>
                                                <button
                                                    onClick={handleLogin}
                                                    className={`
                                                        bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg 
                                                        shadow-md hover:scale-105 transition-all w-full
                                                    `}
                                                >
                                                    LOGIN TO SPIN
                                                </button>
                                            </div>
                                        )}

                                        {user && (
                                            <div className="space-y-4">
                                                <div className="bg-white/50 p-4 rounded-xl border border-white/60">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-bold text-gray-700">Spins Today</span>
                                                        <span className="text-sm font-bold text-gray-900">{spinsToday} / {maxSpins}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div
                                                            className="bg-[#0f2f2b] h-2.5 rounded-full transition-all duration-500"
                                                            style={{ width: `${(spinsToday / maxSpins) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    {spinsToday >= maxSpins && (
                                                        <p className="text-xs text-orange-700 mt-2 font-medium">
                                                            Next spin available in {nextReset}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="text-gray-500 text-sm animate-pulse">
                                                    {spinsToday < maxSpins ? 'Click "SPIN" on the wheel!' : 'Come back tomorrow for more!'}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
