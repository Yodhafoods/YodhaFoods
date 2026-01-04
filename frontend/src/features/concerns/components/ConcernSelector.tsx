"use client";

import { Scale, Heart, Activity, Apple, ShieldCheck, Check, Sparkles, Droplet, Sun, Zap, Leaf } from "lucide-react";

interface SubCategory {
    name: string;
    slug: string;
    _id?: string;
}

interface ConcernSelectorProps {
    concerns: SubCategory[];
    activeConcernId: string;
    onSelect: (slug: string) => void;
}

// Extended Icon Map to cover more potential health concerns
const IconMap: Record<string, any> = {
    "weight-loss": Scale,
    "diabetes": Activity,
    "heart-health": Heart,
    "gut-health": Apple,
    "immunity": ShieldCheck,
    "hair-care": Sparkles,
    "skin-care": Droplet,
    "energy": Zap,
    "detox": Leaf,
    "general": Sun
};

const getIconForSlug = (slug: string) => {
    // Try distinct keys
    if (IconMap[slug]) return IconMap[slug];
    // Fallback based on simple keyword matching
    if (slug.includes('weight')) return Scale;
    if (slug.includes('sugar') || slug.includes('diabetes')) return Activity;
    if (slug.includes('heart')) return Heart;
    if (slug.includes('gut') || slug.includes('digest')) return Apple;
    if (slug.includes('immun')) return ShieldCheck;
    if (slug.includes('skin') || slug.includes('face')) return Droplet;
    if (slug.includes('hair')) return Sparkles;
    return Sun; // Default
};

export default function ConcernSelector({ concerns, activeConcernId, onSelect }: ConcernSelectorProps) {
    if (!concerns || concerns.length === 0) return null;

    return (
        <div className="w-full pt-4 overflow-x-auto no-scrollbar pb-2">
            <div className="flex justify-start md:justify-center px-4 md:px-0 min-w-max">
                <div className="flex gap-4 md:gap-8 p-2">
                    {concerns.map((concern) => {
                        const isActive = concern.slug === activeConcernId;
                        const Icon = getIconForSlug(concern.slug);

                        return (
                            <button
                                key={concern.slug}
                                onClick={() => onSelect(concern.slug)}
                                className="group flex flex-col items-center gap-2 md:gap-3 transition-all duration-300 focus:outline-none"
                            >
                                {/* Glassy Icon Container */}
                                <div
                                    className={`
                                        relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center 
                                        transition-all duration-500 ease-out
                                        backdrop-blur-md border border-white/20 shadow-lg cursor-pointer
                                        ${isActive
                                            ? "bg-gradient-to-br from-pink-500/90 to-pink-400/80 -translate-y-2 shadow-pink-200/50"
                                            : "bg-white/40 hover:bg-white/60 hover:-translate-y-1 hover:shadow-xl"
                                        }
                                    `}
                                >
                                    <Icon
                                        size={isActive ? 32 : 24} // Smaller icons on mobile base
                                        className={`
                                            md:w-10 md:h-10 w-8 h-8 
                                            transition-all duration-500
                                            ${isActive ? "text-white scale-110 drop-shadow-md" : "text-pink-400/80 group-hover:text-pink-400"}
                                        `}
                                        strokeWidth={isActive ? 2.5 : 2}
                                    />

                                    {/* Active Indicator Dot (optional, style preference) */}
                                    {isActive && (
                                        <div className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                                    )}
                                </div>

                                {/* Label */}
                                <span
                                    className={`
                                        text-xs md:text-base font-medium whitespace-nowrap transition-colors duration-300
                                        ${isActive ? "text-gray-900 font-bold" : "text-gray-500 group-hover:text-gray-800"}
                                    `}
                                >
                                    {concern.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
