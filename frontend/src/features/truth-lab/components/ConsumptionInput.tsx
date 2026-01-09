"use client";

import React from "react";
import { Scale } from "lucide-react";

interface ConsumptionInputProps {
    value: number;
    onChange: (value: number) => void;
}

export const ConsumptionInput = ({ value, onChange }: ConsumptionInputProps) => {
    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-neutral-700">
                How much do you consume per week?
            </label>
            <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                    <Scale className="h-5 w-5" />
                </div>
                <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={value || ""}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-12 text-lg font-semibold text-neutral-900 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
                    placeholder="0.0"
                />
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-medium text-neutral-500">
                    Kg
                </div>
            </div>
            <p className="text-xs text-neutral-500">
                Enter the approximate weight in Kilograms (e.g. 0.5 for 500g)
            </p>
        </div>
    );
};
