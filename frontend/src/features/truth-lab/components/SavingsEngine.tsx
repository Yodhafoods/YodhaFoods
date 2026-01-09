"use client";

import React, { useEffect, useState, useRef } from "react";
import { useProducts } from "../../products/hooks/useProducts";
import { Product } from "@/types";
import { Loader2, Search } from "lucide-react";

interface SavingsEngineProps {
    onProductSelect: (product: Product) => void;
    onConsumptionChange: (grams: number) => void;
}

export const SavingsEngine = ({ onProductSelect, onConsumptionChange }: SavingsEngineProps) => {
    const { products, loading } = useProducts();
    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [consumptionGrams, setConsumptionGrams] = useState<number>(500);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // Filter products
    console.log("SavingsEngine: Products:", products);
    console.log("SavingsEngine: SearchTerm:", searchTerm);

    const filteredProducts = products.filter(p => {
        if (!p || !p.name) return false;
        const productName = p.name.toLowerCase().trim();
        const search = searchTerm.toLowerCase().trim();
        return productName.includes(search);
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectProduct = (product: Product) => {
        setSelectedProductId(product._id);
        setSearchTerm(product.name);
        setIsDropdownOpen(false);
        onProductSelect(product);
    };

    // Initial Selection when products load
    useEffect(() => {
        if (products.length > 0 && !selectedProductId) {
            setSelectedProductId(products[0]._id);
            setSearchTerm(products[0].name);
            onProductSelect(products[0]);
        }
    }, [products, selectedProductId, onProductSelect]);



    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setConsumptionGrams(val);
        onConsumptionChange(val / 1000); // Convert to Kg for parent state
    };

    const selectedProduct = products.find((p) => p._id === selectedProductId);

    // Calculation logic
    const equivalent = Math.round(consumptionGrams / 4.2);

    let pricePerKg = 0;
    if (selectedProduct && selectedProduct.packs.length > 0) {
        const pack = selectedProduct.packs[0];
        pricePerKg = (pack.price / pack.weightInGrams) * 1000;
    } else {
        pricePerKg = 60; // Fallback
    }

    const monthlySavings = Math.round(((consumptionGrams * 4) / 1000) * pricePerKg * 1.3 + 250);
    const currentCost = ((consumptionGrams / 1000) * pricePerKg).toFixed(2);

    // Gauge parameters
    const radius = 100;
    const circumference = 2 * Math.PI * radius; // ~628
    const offset = circumference - (consumptionGrams / 2000) * circumference;

    if (loading) return <div className="p-8 text-center text-white"><Loader2 className="animate-spin mx-auto h-8 w-8" /></div>;

    return (
        <div className="grid grid-cols-1 gap-10 -mt-20 mb-20 md:grid-cols-[1.1fr_0.9fr]">
            {/* LEFT PANEL: CALCULATOR */}
            <div className="rounded-[30px] bg-[#173e3a] p-11 text-white shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
                <h2 className="mb-8 text-center text-xs tracking-[2px] text-[#c79a2d]">THE PURITY SAVINGS ENGINE</h2>

                <div className="mb-5 relative" ref={dropdownRef}>
                    <label className="mb-2 block text-[0.7rem] font-extrabold uppercase text-[#e6c36b]">CHOOSE INGREDIENT</label>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0f2f2b]/50" />
                        <input
                            type="text"
                            className="w-full rounded-lg border-none bg-[#faf6ec] py-4 pl-10 pr-4 font-semibold text-[#0f2f2b] outline-none placeholder:text-[#0f2f2b]/30"
                            placeholder="Search ingredients..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setIsDropdownOpen(true);
                            }}
                            onFocus={() => setIsDropdownOpen(true)}
                        />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute left-0 top-full z-10 mt-1 max-h-[200px] w-full overflow-y-auto rounded-lg bg-[#faf6ec] shadow-lg">
                            {filteredProducts.length === 0 ? (
                                <div className="p-3 text-center text-sm text-[#0f2f2b]/60">
                                    No ingredients found
                                </div>
                            ) : (
                                filteredProducts.map((product) => (
                                    <button
                                        key={product._id}
                                        className="w-full px-4 py-3 text-left text-sm font-medium text-[#0f2f2b] transition-colors hover:bg-[#e6c36b]/20"
                                        onClick={() => handleSelectProduct(product)}
                                    >
                                        {product.name}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>

                <div className="mb-5">
                    <label className="mb-2 block text-[0.7rem] font-extrabold uppercase text-[#e6c36b]">CONSUMPTION: {consumptionGrams}g / WEEK</label>
                    <input
                        type="range"
                        min="100"
                        max="2000"
                        step="100"
                        value={consumptionGrams}
                        onChange={handleSliderChange}
                        className="w-full cursor-pointer accent-[#c79a2d]"
                    />
                </div>

                <div className="rounded-2xl border border-[#c79a2d] bg-[#c79a2d]/10 p-6 text-center">
                    <p className="m-0 text-[0.7rem] uppercase opacity-80">
                        Est. Monthly Indian Household Saving
                    </p>
                    <strong className="block text-2xl text-[#c79a2d]">₹{monthlySavings.toLocaleString("en-IN")} Saved</strong>
                    <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#e6c36b]">
                        Market Reality: You pay ₹{currentCost} today for {selectedProduct?.name} (mostly water weight)
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: GAUGE RESULT */}
            <div className="flex flex-col items-center justify-center rounded-[30px] bg-white p-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                <div className="relative h-[220px] w-[220px]">
                    <svg viewBox="0 0 220 220">
                        <circle
                            cx="110"
                            cy="110"
                            r="100"
                            fill="none"
                            stroke="#f0f0f0"
                            strokeWidth="6"
                            strokeDasharray="4 4"
                        />
                        <circle
                            cx="110"
                            cy="110"
                            r="100"
                            fill="none"
                            stroke="#c79a2d"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray="628"
                            strokeDashoffset="628"
                            className="transition-all duration-300 ease-out"
                            style={{ strokeDashoffset: offset }}
                        />
                    </svg>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <h3 className="m-0 text-5xl text-[#0f2f2b]">{equivalent}g</h3>
                        <p className="mt-10 text-[0.6rem] font-extrabold text-[#c79a2d]">
                            YODHA EQUIVALENT
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
