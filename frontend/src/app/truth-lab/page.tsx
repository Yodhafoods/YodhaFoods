"use client";

import React, { useState } from "react";
import { SavingsEngine } from "../../features/truth-lab/components/SavingsEngine";
import { InfoSections } from "../../features/truth-lab/components/InfoSections";
import { TruthInTheBoxForm } from "../../features/truth-lab/components/TruthInTheBoxForm";
import { TruthOfTheDay } from "../../features/truth-lab/components/TruthOfTheDay";
import { Product } from "@/types";

export default function TruthLabPage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [consumptionKg, setConsumptionKg] = useState<number>(0.5); // Default 500g

    return (
        <div className="bg-[#faf6ec] text-[#0f2f2b] font-[family-name:var(--font-jakarta)]">
            {/* HERO SECTION */}
            <header className="relative bg-gradient-to-b from-[#0f2f2b] to-[#173e3a] pb-[140px] pt-[80px] text-center text-[#f6f1e7] [clip-path:ellipse(150%_100%_at_50%_0%)]">
                <h1 className="m-0 font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,5vw,4.5rem)] uppercase tracking-[2px]">Truth Laboratory</h1>
                <p className="mt-[15px] text-[0.9rem] font-light tracking-[3px] text-[#e6c36b]">
                    Where ancient ingredient wisdom is verified by modern molecular science.
                </p>
                <div className="absolute bottom-0 left-[10%] h-[4px] w-4/5 rounded-full bg-[#c79a2d] shadow-[0_4px_15px_#b88a24]"></div>
            </header>

            <main className="mx-auto max-w-[1100px] px-[20px]">
                {/* SAVINGS ENGINE (Product + Input + Gauge) */}
                <SavingsEngine
                    onProductSelect={setSelectedProduct}
                    onConsumptionChange={setConsumptionKg}
                />

                {/* MYTH BUSTERS & DO YOU KNOW */}
                <InfoSections />

                {/* FORM */}
                <TruthInTheBoxForm
                    selectedProduct={selectedProduct}
                    consumptionKg={consumptionKg}
                />

                {/* TRUTH OF THE DAY */}
                <TruthOfTheDay />
            </main>
        </div>
    );
}
