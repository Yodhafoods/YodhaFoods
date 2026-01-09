"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/features/ui/store/uiSlice";
import { motion } from "framer-motion";

interface Wallet {
    balance: number;
    lifetimeEarned: number;
    spinsToday: number;
    maxSpins: number;
}

interface Transaction {
    type: 'EARNED' | 'REDEEMED';
    amount: number;
    date: string;
    description: string;
}

export default function OffersList() {
    const dispatch = useDispatch();
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [history, setHistory] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [walletRes, historyRes] = await Promise.all([
                api.get<any>("/api/rewards/wallet"),
                api.get<any>("/api/rewards/history")
            ]);

            if (walletRes.success && walletRes.data) {
                setWallet(walletRes.data);
            }
            if (historyRes.success && historyRes.data) {
                setHistory(historyRes.data);
            }
        } catch (error) {
            console.error("Failed to fetch offers data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSpinClick = () => {
        dispatch(openDrawer("spinWheel"));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Wallet Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
            >
                {/* Background decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-orange-100 font-medium mb-1">Your Balance</p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-2 flex items-baseline">
                            {wallet?.balance || 0}
                            <span className="text-xl ml-2 font-normal opacity-80">Coins</span>
                        </h2>
                        <p className="text-sm text-orange-100 opacity-90">
                            Lifetime Earned: {wallet?.lifetimeEarned || 0} Coins
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <button
                            onClick={handleSpinClick}
                            className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold shadow-md hover:scale-105 active:scale-95 transition-all text-center"
                        >
                            SPIN & WIN
                        </button>
                        <p className="text-xs text-center text-orange-100">
                            {wallet && wallet.spinsToday >= wallet.maxSpins
                                ? "Daily limit reached"
                                : "Spin available now!"}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Transaction History */}
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Transaction History</h3>

                {history.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500">No transactions yet.</p>
                        <button onClick={handleSpinClick} className="text-orange-600 font-medium mt-2 hover:underline">
                            Start spinning to earn coins!
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {history.map((tx, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
                                        ${tx.type === 'EARNED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                                    `}>
                                        {tx.type === 'EARNED' ? '+' : '-'}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{tx.description}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(tx.date).toLocaleDateString('en-IN', {
                                                day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className={`font-bold ${tx.type === 'EARNED' ? 'text-green-600' : 'text-red-600'}`}>
                                    {tx.type === 'EARNED' ? '+' : '-'}{tx.amount}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}