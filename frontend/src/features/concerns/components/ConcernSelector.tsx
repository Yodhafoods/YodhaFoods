"use client";

import { Concern } from "../data/mockData";
import { Scale, Heart, Activity, Apple, ShieldCheck, Check } from "lucide-react";

interface ConcernSelectorProps {
    concerns: Concern[];
    activeConcernId: string;
    onSelect: (id: string) => void;
}

const IconMap: Record<string, any> = {
    "Scale": Scale,
    "Heart": Heart,
    "Activity": Activity,
    "Apple": Apple,
    "ShieldCheck": ShieldCheck
};

export default function ConcernSelector({ concerns, activeConcernId, onSelect }: ConcernSelectorProps) {
    return (
        <div className="w-full flex justify-center pt-8 overflow-x-auto no-scrollbar px-4">
            <div className="flex gap-6 md:gap-12 min-w-max">
                {concerns.map((concern) => {
                    const isActive = concern.id === activeConcernId;
                    const Icon = IconMap[concern.icon] || Scale;

                    return (
                        <button
                            key={concern.id}
                            onClick={() => onSelect(concern.id)}
                            className="group flex flex-col items-center gap-3 transition-all duration-300"
                        >
                            <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 ${concern.color} ${isActive ? "ring-4 ring-offset-2 ring-emerald-600 scale-110" : "hover:scale-105"}`}>
                                <Icon size={isActive ? 36 : 32} className={`text-gray-700 transition-colors ${isActive ? "text-gray-900 stroke-2" : "text-gray-600"}`} />

                                {isActive && (
                                    <div className="absolute -top-1 -right-1 bg-emerald-600 text-white rounded-full p-1 shadow-md">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                            <span className={`text-sm md:text-base font-medium whitespace-nowrap transition-colors ${isActive ? "text-emerald-700 font-bold" : "text-gray-600 group-hover:text-gray-900"}`}>
                                {concern.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
