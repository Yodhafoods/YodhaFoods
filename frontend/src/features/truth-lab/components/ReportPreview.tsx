"use client";

import React from "react";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";

interface ReportPreviewProps {
    selectedProduct: Product | null;
    consumptionKg: number;
}

export const ReportPreview = ({ selectedProduct, consumptionKg }: ReportPreviewProps) => {
    if (!selectedProduct) {
        return (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-8 text-center">
                <div className="mb-4 rounded-full bg-neutral-100 p-4">
                    <Info className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900">No Product Selected</h3>
                <p className="text-neutral-500">
                    Select a product and enter consumption to see a preview of your nutrition report.
                </p>
            </div>
        );
    }

    // Calculate generic nutrition scaling (MVP Logic)
    // Assuming nutritionTable values are per 100g strings like "12g", "50kcal"
    // For precise calc, we need to parse these strings. For now, just showing raw table + Myth Busters

    const weeklyConsumptionGrams = consumptionKg * 1000;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 rounded-2xl bg-white p-6 shadow-xl shadow-amber-900/5 ring-1 ring-neutral-200"
        >
            <div className="border-b border-neutral-100 pb-4">
                <h3 className="text-lg font-semibold text-neutral-900">Report Preview</h3>
                <p className="text-sm text-neutral-500">
                    Based on {consumptionKg}kg of {selectedProduct.name} per week
                </p>
            </div>

            {/* Dynamic Nutrition Preview (Simplified) */}
            <div className="space-y-3">
                <h4 className="font-medium text-neutral-900">Weekly Intake Estimate</h4>
                <div className="grid grid-cols-2 gap-3">
                    {selectedProduct.nutritionTable?.slice(0, 4).map((nut) => (
                        <div key={nut.name} className="bg-neutral-50 p-3 rounded-lg">
                            <div className="text-xs text-neutral-500">{nut.name}</div>
                            <div className="font-semibold text-neutral-900">{nut.value} (per 100g)</div>
                            {/* Placeholder for calculation */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Myth Buster Section */}
            <div className="rounded-xl bg-amber-50 p-4 border border-amber-100">
                <div className="flex items-center gap-2 mb-2 text-amber-700">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-bold">Myth Buster</span>
                </div>
                <p className="text-sm font-medium text-amber-900">Myth: "All processed foods are bad."</p>
                <p className="text-sm text-amber-800 mt-1">Fact: Processing can sometimes preserve nutrients (like freezing vegetables). It depends on the ingredients!</p>
            </div>

            {/* Do You Know Section */}
            <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-2 text-blue-700">
                    <Lightbulb className="h-5 w-5" />
                    <span className="font-bold">Do You Know?</span>
                </div>
                <p className="text-sm text-blue-900">
                    Your body needs a balance of macro and micro nutrients to function optimally.
                    Understanding your intake is the first step!
                </p>
            </div>

            <div className="text-center text-xs text-neutral-400 pt-2">
                *Full detailed report will be sent to your email
            </div>
        </motion.div>
    );
};
