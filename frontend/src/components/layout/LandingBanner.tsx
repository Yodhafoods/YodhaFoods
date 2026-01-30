"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function LandingBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if banner has been shown in this session
        const hasSeenBanner = sessionStorage.getItem("hasSeenLandingBanner");
        if (!hasSeenBanner) {
            setIsVisible(true);

            // Auto-close after 5 seconds if no interaction
            const timer = setTimeout(() => {
                handleClose();
            }, 50000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        // Wait for animation to finish before removing from DOM
        setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("hasSeenLandingBanner", "true");
        }, 500); // 500ms fade out
    };

    const handleBusinessClick = (e: React.MouseEvent) => {
        e.preventDefault();
        sessionStorage.setItem("hasSeenLandingBanner", "true");
        router.push("/business");
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${isClosing ? "opacity-0" : "opacity-100"
                }`}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/cta.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Overall overlay for readability */}
            </div>

            {/* Container - Content Overlay */}
            <div className="relative z-10 flex flex-col md:flex-row w-full h-full max-w-[1440px] mx-auto items-center justify-center md:justify-between gap-8 md:gap-0 overflow-y-auto md:overflow-hidden py-20 md:py-0">

                {/* Left Side - Consumer */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full md:p-8">
                    <div className="w-full max-w-sm md:max-w-md space-y-4 md:space-y-6 p-6 md:p-10 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl bg-black/30 md:bg-transparent">
                        <div className="space-y-3 md:space-y-4">
                            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/90 text-black text-[10px] md:text-xs font-black tracking-widest uppercase shadow-md">
                                Direct To Consumer
                            </span>
                            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                Pure Foods,<br />
                                <span className="text-[#FFB74D]">Your Kitchen.</span>
                            </h2>
                            <p className="text-white text-sm md:text-lg font-medium leading-relaxed opacity-90">
                                Experience the vitality of superfoods.<br className="hidden md:block" />
                                Directly from our farms to your table.
                            </p>
                        </div>

                        <button
                            onClick={handleClose}
                            className="group relative inline-flex items-center justify-center cursor-pointer px-8 py-2 md:px-10 md:py-2 bg-linear-to-r from-[#FF8F00] to-[#E65100] text-white text-base md:text-lg font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 w-full md:w-auto"
                        >
                            <span className="relative z-10">Shop Retail</span>
                            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>
                </div>

                {/* Center Mascot */}
                <div className="relative md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-20 pointer-events-none my-4 md:my-0 shrink-0 block">
                    <div className="relative w-40 h-40 md:w-96 md:h-96 drop-shadow-2xl filter brightness-110 contrast-125">
                        <Image
                            src="/assets/images/mascot/3.png"
                            alt="Yodha Mascot"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Right Side - Business */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full md:p-8">
                    <div className="w-full max-w-sm md:max-w-md space-y-4 md:space-y-6 p-6 md:p-10 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl bg-black/30 md:bg-transparent">
                        <div className="space-y-3 md:space-y-4">
                            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/90 text-black text-[10px] md:text-xs font-black tracking-widest uppercase shadow-md">
                                Enterprise Infrastructure
                            </span>
                            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                Global<br />
                                <span className="text-[#42A5F5]">Ingredient Flow.</span>
                            </h2>
                            <p className="text-white text-sm md:text-lg font-medium leading-relaxed opacity-90">
                                Precision procurement, botanical<br className="hidden md:block" />
                                specifications, and optimized for global<br className="hidden md:block" />
                                manufacturers.
                            </p>
                        </div>

                        <button
                            onClick={handleBusinessClick}
                            className="group relative inline-flex items-center justify-center px-8 py-2 md:px-10 md:py-2 cursor-pointer bg-linear-to-r from-[#1976D2] to-[#0D47A1] text-white text-base md:text-lg font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 w-full md:w-auto"
                        >
                            <span className="relative z-10">B2B Portal</span>
                            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>
                </div>

                {/* Close Button (Absolute Top Right for safety) */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                    <X size={32} className="md:w-10 md:h-10" strokeWidth={2.5} />
                </button>

                {/* Bottom Text */}
                <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 text-white/80 text-[10px] md:text-sm tracking-[0.2em] font-bold uppercase z-20 shadow-sm w-full text-center">
                    Select Your Experience
                </div>

            </div>
        </div>
    );
}
