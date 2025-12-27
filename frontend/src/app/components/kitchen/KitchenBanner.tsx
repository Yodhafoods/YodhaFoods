"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Link from "next/link";

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
            initial={{ y: 0 }}
            whileHover={{
                y: -5,
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }
            }}
            className="fixed bottom-[25px] left-1/2 -translate-x-1/2 w-[90%] max-w-[780px] h-[64px] bg-[#051a0e]/98 backdrop-blur-[50px] border border-white/[0.08] rounded-[100px] shadow-[0_25px_50px_rgba(0,0,0,0.5)] z-[10000] flex items-center gap-[15px] px-6 py-2 overflow-hidden transition-all duration-500"
        >
            {/* Mascot Avatar */}
            <motion.div
                className="w-[58px] h-[58px] shrink-0 bg-contain bg-no-repeat rounded-full"
                style={{
                    backgroundColor: 'rgba(255,255,255,0.1)'
                }}
                animate={{ scale: step === 2 ? 1.08 : 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Content Flow */}
            <div className="flex-1 h-full relative">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full flex items-center justify-between"
                        >
                            <div className="flex flex-col mr-[15px]">
                                <span className="text-white text-[14px] font-semibold tracking-tight whitespace-nowrap">
                                    Select your focus
                                </span>
                                <span className="text-white text-[11px] opacity-50 whitespace-nowrap">
                                    we will help you
                                </span>
                            </div>

                            <div className="flex flex-1 justify-between items-center max-w-[450px]">
                                {goals.map((g) => (
                                    <div
                                        key={g.id}
                                        onClick={() => handleGoalSelect(g)}
                                        className="group flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-[30px] transition-all duration-300"
                                    >
                                        <div
                                            className={`w-[30px] h-[30px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[15px] transition-all duration-300 ${g.hoverClass} group-hover:border-transparent`}
                                        >
                                            {g.icon}
                                        </div>
                                        <span className="text-white text-[12px] font-medium opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                            {g.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && goal && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full flex items-center justify-between"
                        >
                            <div className="text-white text-[12.5px] leading-[1.4] flex-1 pr-5">
                                Get <span style={{ color: "#32d74b", fontWeight: 700 }}>FREE {goal.name} recipes</span> and track your goals effortlessly with Yodha WhatsApp Assist.
                            </div>
                            <a
                                href="https://wa.me/YOUR_PHONE_NUMBER"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleJoinClick}
                                className="bg-white text-black border-none px-[22px] py-[10px] rounded-[40px] font-bold text-[13px] whitespace-nowrap cursor-pointer hover:scale-105 hover:bg-[#32d74b] transition-all duration-300 no-underline"
                            >
                                Join for Free
                            </a>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full flex items-center justify-between"
                        >
                            <div className="text-white text-[12.5px] leading-[1.4] flex-1 pr-5">
                                Guide sent! Check your WhatsApp. Ready to start your Yodha journey?
                            </div>
                            <Link
                                href="https://yodhafoods.com/shop"
                                className="text-black border-none px-[22px] py-[10px] rounded-[40px] font-bold text-[13px] whitespace-nowrap cursor-pointer hover:scale-105 transition-all duration-300 no-underline"
                                style={{ background: "#32d74b" }}
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
