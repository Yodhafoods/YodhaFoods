"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HeroBannerThree() {
    return (
        <section className="w-full flex justify-center">
            <div className="max-w-[1440px] w-full px-2 md:px-12 mt-6">

                {/* 🔒 CLIPPING WRAPPER (prevents shadow bleed) */}
                <div className="relative overflow-hidden rounded-[40px] lg:rounded-[80px]">

                    {/* 🧱 MAIN CARD (NO SHADOW HERE) */}
                    <section
                        className="
              w-full h-full min-h-[650px] lg:h-[650px]
              grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]
              relative
              border border-[rgba(199,154,45,0.3)]
            "
                        style={{
                            background: `
                radial-gradient(at 0% 0%, var(--color-mid-green) 0%, transparent 55%),
                radial-gradient(at 100% 0%, var(--color-base-gold) 0%, transparent 50%),
                radial-gradient(at 100% 100%, var(--color-dark-green) 0%, transparent 60%),
                var(--color-dark-green)
              `,
                        }}
                    >
                        {/* LEFT SIDE */}
                        <div className="px-5 py-6 lg:px-[80px] lg:py-8 flex flex-col justify-center text-white h-full z-10">
                            <span className="text-light-gold font-extrabold tracking-[6px] text-xs lg:text-sm mb-[15px] lg:mb-[20px] opacity-80 uppercase text-center lg:text-left">
                                Know Your Truth
                            </span>

                            <h1 className="font-serif text-[2.5rem] sm:text-[3.2rem] lg:text-[5rem] leading-[1.1] lg:leading-none mb-[20px] lg:mb-[30px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] text-center lg:text-left">
                                Stop paying
                                <br />
                                for water.
                            </h1>

                            <div className="bg-white-glass backdrop-blur-[20px] border-l-[3px] border-base-gold p-[15px] lg:p-[25px] rounded-r-[30px] mb-[30px] lg:mb-[40px] max-w-[700px]">
                                <span className="text-light-gold font-extrabold text-[0.75rem] lg:text-[0.9rem] uppercase tracking-[4px] block mb-[8px] lg:mb-[12px]">
                                    Market Reality
                                </span>
                                <p className="text-[0.95rem] sm:text-[1rem] lg:text-[1.2rem] leading-normal font-light text-[rgba(255,255,255,0.95)]">
                                    90% of fresh produce you buy is just water weight.
                                    <br />
                                    <span className="text-light-gold font-semibold border-b border-[rgba(230,195,107,0.4)]">
                                        Experience the 4.2x Nutrient Concentration that fresh food cannot provide.
                                    </span>
                                </p>
                            </div>

                            <div className="text-center lg:text-left">
                                <a
                                    href="#calculator"
                                    className="inline-block bg-base-gold text-white py-[15px] px-[25px] lg:py-[20px] lg:px-[50px] rounded-[100px] font-extrabold text-[0.8rem] lg:text-[0.9rem] uppercase tracking-[3px] shadow-[0_25px_50px_rgba(0,0,0,0.4)] transition-all duration-400 hover:-translate-y-2 hover:bg-light-gold hover:shadow-[0_30px_60px_rgba(199,154,45,0.5)] w-full sm:w-auto"
                                >
                                    Calculate Your Savings
                                </a>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="bg-[rgba(0,0,0,0.25)] flex flex-col items-center justify-center relative p-10 lg:p-0 min-h-[400px]">
                            <div className="relative w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] flex items-center justify-center scale-90 lg:scale-100">
                                <motion.div
                                    className="absolute w-[180px] h-[180px] lg:w-[280px] lg:h-[280px] rounded-full"
                                    style={{
                                        background:
                                            "radial-gradient(circle, rgba(199, 154, 45, 0.15) 0%, transparent 75%)",
                                    }}
                                    animate={{
                                        scale: [0.95, 1.1, 0.95],
                                        opacity: [0.3, 0.8, 0.3],
                                    }}
                                    transition={{
                                        duration: 4,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                    }}
                                />

                                <div className="absolute w-[250px] h-[250px] lg:w-[380px] lg:h-[380px] border border-dashed border-[rgba(199,154,45,0.4)] rounded-full"></div>

                                <motion.div
                                    className="absolute w-full h-full rounded-full border-[3px] border-transparent border-t-base-gold"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1.2,
                                        ease: "linear",
                                        repeat: Infinity,
                                    }}
                                />

                                <div className="relative z-10 font-serif text-[5rem] lg:text-[8.5rem] text-light-gold drop-shadow-[0_0_40px_rgba(199,154,45,0.6)]">
                                    4.2x
                                </div>
                            </div>

                            <div className="mt-5 lg:mt-10 text-center flex flex-col gap-3 items-center">
                                <div className="text-white text-[0.7rem] lg:text-[0.8rem] tracking-[5px] font-extrabold opacity-50 uppercase">
                                    Molecular Density Index
                                </div>

                                <motion.div
                                    className="bg-[rgba(199,154,45,0.1)] border border-[rgba(199,154,45,0.2)] py-2 px-6 rounded-[50px] text-light-gold text-[0.85rem] lg:text-[0.95rem] font-normal tracking-[2px] backdrop-blur-[10px]"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                >
                                    Start investing in cellular health.
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* 🌫️ SHADOW LAYER (clipped perfectly) */}
                    <div
                        aria-hidden
                        className="
              pointer-events-none
              absolute inset-0
              rounded-[40px] lg:rounded-[80px]
              shadow-[0_30px_60px_rgba(0,0,0,0.35)]
              lg:shadow-[0_60px_120px_rgba(0,0,0,0.35)]
            "
                    />
                </div>
            </div>
        </section>
    );
}
