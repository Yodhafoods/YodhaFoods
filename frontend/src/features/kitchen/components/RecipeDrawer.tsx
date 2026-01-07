"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface RecipeDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    recipe: any;
}

export default function RecipeDrawer({ isOpen, onClose, recipe }: RecipeDrawerProps) {
    // Handle escape key to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleStartRitual = () => {
        toast.success("Added to your Daily Ritual Path");
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[4999] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-white/98 backdrop-blur-xl shadow-[-15px_0_50px_rgba(0,0,0,0.1)] z-[5000] p-6 flex flex-col transition-transform duration-600 cubic-bezier(0.16,1,0.3,1) overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <button
                    onClick={onClose}
                    className="self-end p-2 -mr-2 text-[#2d4a22] hover:bg-black/5 rounded-full transition-colors"
                >
                    <X size={24} />
                </button>

                {recipe && (
                    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-500 delay-100">
                        <h2 className="text-[#2d4a22] text-xl font-bold mt-0 mb-1 leading-tight">
                            {recipe.title}
                        </h2>
                        <span className="text-[#c5a059] text-[0.65rem] font-extrabold tracking-widest mb-4">
                            BATCH #742: DEHYDRATED 24h AGO
                        </span>

                        {/* Nutrient Math */}
                        <div className="bg-white border border-gray-100 rounded-[20px] p-4 mb-3 flex flex-col gap-2 shadow-sm">
                            <div className="flex justify-between items-center text-sm">
                                <div className="text-center">
                                    <div className="text-lg mb-0.5">🥗</div>
                                    <b className="text-gray-800 text-xs">350g Raw</b>
                                </div>
                                <ArrowRight className="text-[#c5a059] stroke-[3px]" size={16} />
                                <div className="text-center">
                                    <div className="text-lg mb-0.5"> spoons</div>
                                    <b className="text-gray-800 text-xs">15g Yodha</b>
                                </div>
                            </div>
                            <p className="text-[0.7rem] text-gray-500 m-0 text-center leading-relaxed">
                                Precision Dehydration preserves 97% fiber and vital enzymes.
                            </p>
                        </div>

                        {/* Product Card */}
                        <div className="text-center p-4 bg-white rounded-[25px] border border-gray-100 mb-3 shadow-sm">
                            <div className="relative w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden bg-gray-50">
                                {recipe.image ? (
                                    <Image
                                        src={recipe.image}
                                        alt={recipe.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200" />
                                )}
                            </div>

                            <h3 className="text-gray-800 font-bold m-0 text-base">
                                Yodha {recipe.prod || "Specialty"}
                            </h3>

                            <div className="text-xl font-extrabold text-[#2d4a22] my-2">
                                ₹{recipe.price || 499}
                            </div>

                            <button
                                onClick={handleStartRitual}
                                className="w-full bg-[#2d4a22] text-white py-3 rounded-xl font-extrabold text-xs hover:bg-[#c5a059] transition-colors shadow-lg shadow-[#2d4a22]/20"
                            >
                                Start My 24h Ritual
                            </button>
                        </div>

                        {/* Synergy Pair */}
                        <div className="bg-[#fff8e7] border-2 border-dashed border-[#c5a059] p-3 rounded-[16px] mt-auto">
                            <p className="text-[0.75rem] font-extrabold m-0 mb-0.5 text-gray-800">
                                OPTIMAL SYNERGY PAIR
                            </p>
                            <p className="text-[0.7rem] text-gray-600 m-0 mb-2">
                                Add Turmeric Essence to double anti-inflammatory absorption.
                            </p>
                            <button className="bg-transparent border border-[#c5a059] px-3 py-1 rounded-lg font-bold text-[#c5a059] text-[0.65rem] hover:bg-[#c5a059] hover:text-white transition-colors">
                                + Add & Save 15%
                            </button>
                        </div>
                    </div>
                )}
            </div >
        </>
    );
}
