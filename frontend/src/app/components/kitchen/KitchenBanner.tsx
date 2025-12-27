"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Target } from "lucide-react";
import Link from "next/link";
import { TbTargetArrow } from "react-icons/tb";

const KitchenBanner = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [goal, setGoal] = useState<{ name: string; color: string } | null>(null);

    const goals = [
        {
            id: "muscle",
            label: "Muscle",
            icon: "💪",
            color: "#b83227", // Deep Oxide Red
            hoverClass: "group-hover:bg-[#b83227] group-hover:shadow-[0_0_15px_rgba(184,50,39,0.3)]",
        },
        {
            id: "lean",
            label: "Lean",
            icon: "🍃",
            color: "#2ecc71", // Fresh Emerald
            hoverClass: "group-hover:bg-[#2ecc71] group-hover:shadow-[0_0_15px_rgba(46,204,113,0.3)]",
        },
        {
            id: "vitality",
            label: "Vitality",
            icon: "⚡",
            color: "#f39c12", // Warm Amber
            hoverClass: "group-hover:bg-[#f39c12] group-hover:shadow-[0_0_15px_rgba(243,156,18,0.3)]",
        },
        {
            id: "cleanse",
            label: "Cleanse",
            icon: "🧘",
            color: "#8e44ad", // Muted Amethyst
            hoverClass: "group-hover:bg-[#8e44ad] group-hover:shadow-[0_0_15px_rgba(142,68,173,0.3)]",
        },
    ];

    const handleGoalSelect = (selectedGoal: typeof goals[0]) => {
        // 1. Fire confetti
        confetti({
            particleCount: 80,
            spread: 50,
            origin: { y: 0.9 },
            colors: ["#ffffff", "#32d74b"],
        });

        // 2. Set goal and advance step
        setGoal({ name: selectedGoal.label, color: selectedGoal.color });
        setStep(2);
    };

    const handleJoinClick = () => {
        // Mimic the setTimeout from original code
        setTimeout(() => {
            setStep(3);
        }, 400);
    };

    return (
        <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-[20px] left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-[720px] min-h-[60px] bg-green-950/90 backdrop-blur-[20px]
             border border-green-900/50 rounded-[100px] shadow-[0_10px_40px_rgba(0,0,0,0.4)] z-100
              flex items-center px-4 md:px-6 py-2 transition-all duration-500"
        >
            {/* Content Flow */}
            <div className="w-full h-full relative flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                            className="w-full flex items-center justify-between gap-4"
                        >
                            <div className="hidden md:flex items-center gap-3 shrink-0">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-inner ring-1 ring-white/10">
                                    <TbTargetArrow className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white text-[14px] font-semibold tracking-tight whitespace-nowrap">
                                        Select your focus
                                    </span>
                                    <span className="text-white text-[11px] opacity-60 whitespace-nowrap">
                                        we will help you
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-1 items-center justify-between md:justify-end gap-2 md:gap-4 overflow-x-auto no-scrollbar scroll-smooth">
                                {goals.map((g) => (
                                    <motion.div
                                        key={g.id}
                                        onClick={() => handleGoalSelect(g)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group flex flex-col md:flex-row items-center gap-1.5 md:gap-2 cursor-pointer px-2 py-1 rounded-[30px] transition-all duration-300 shrink-0"
                                    >
                                        <div
                                            className={`w-[32px] h-[32px] md:w-[30px] md:h-[30px] rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[16px] md:text-[15px] transition-all duration-300 ${g.hoverClass} group-hover:border-transparent`}
                                        >
                                            {g.icon}
                                        </div>
                                        <span className="text-white text-[10px] md:text-[12px] font-medium opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                                            {g.label}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && goal && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="w-full flex items-center justify-between gap-3 text-center md:text-left"
                        >
                            <div className="text-white text-[12px] md:text-[13px] leading-[1.4] flex-1">
                                Get <span style={{ color: "#32d74b", fontWeight: 700 }}>FREE {goal.name} recipes</span> on WhatsApp.
                            </div>
                            <a
                                href="https://wa.me/YOUR_PHONE_NUMBER"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleJoinClick}
                                className="bg-[#32d74b] text-black border-none px-5 py-2.5 rounded-full font-bold text-[13px] whitespace-nowrap cursor-pointer hover:bg-[#28b83e] hover:shadow-lg transition-all duration-300 transform hover:scale-105 no-underline shrink-0"
                            >
                                Join Free
                            </a>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="w-full flex items-center justify-between gap-4"
                        >
                            <div className="text-white text-[13px] leading-[1.4] flex-1">
                                Guide sent! Check WhatsApp.
                            </div>
                            <Link
                                href="/shop"
                                className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-[13px] whitespace-nowrap cursor-pointer hover:bg-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105 no-underline shrink-0"
                            >
                                Enter Shop
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default KitchenBanner;
