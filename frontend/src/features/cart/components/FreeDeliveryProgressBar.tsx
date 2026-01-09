"use client";

import { Truck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FreeDeliveryProgressBarProps {
    subtotal: number;
}

export default function FreeDeliveryProgressBar({ subtotal }: FreeDeliveryProgressBarProps) {
    const threshold = 299;
    const progress = Math.min((subtotal / threshold) * 100, 100);
    const remaining = threshold - subtotal;
    const isFree = subtotal >= threshold;

    return (
        <div className="bg-orange-50 rounded-xl p-4 mb-4 border border-orange-100">
            <div className="flex items-center gap-2 mb-3">
                {isFree ? (
                    <CheckCircle size={18} className="text-green-600" />
                ) : (
                    <Truck size={18} className="text-orange-600" />
                )}
                <p className="text-sm font-medium text-gray-800">
                    {isFree ? (
                        <span className="text-green-700">You've unlocked <span className="font-bold">FREE Delivery!</span></span>
                    ) : (
                        <span>
                            Add <span className="font-bold text-orange-700">₹{remaining.toFixed(0)}</span> more for <span className="font-bold text-orange-700">FREE Delivery</span>
                        </span>
                    )}
                </p>
            </div>

            {/* Progress Track */}
            <div className="h-2 w-full bg-orange-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}
