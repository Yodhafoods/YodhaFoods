"use client";

import React, { useState } from "react";
import { useProducts } from "../../products/hooks/useProducts";
import { Product } from "@/types";
import { Search, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductSelectorProps {
    selected: Product | null;
    onSelect: (product: Product) => void;
}

export const ProductSelector = ({ selected, onSelect }: ProductSelectorProps) => {
    const { products, loading } = useProducts();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
                />
            </div>

            {/* Product Grid */}
            <div className="grid max-h-[400px] gap-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-200 md:grid-cols-2">
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-20 animate-pulse rounded-xl bg-neutral-100"
                        />
                    ))
                ) : filteredProducts.length === 0 ? (
                    <div className="col-span-full py-8 text-center text-neutral-500">
                        No products found
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <motion.div
                            key={product._id}
                            layoutId={product._id}
                            onClick={() => onSelect(product)}
                            className={`group relative flex cursor-pointer items-center gap-4 rounded-xl border p-3 transition-all hover:shadow-md ${selected?._id === product._id
                                ? "border-amber-500 bg-amber-50/50 ring-1 ring-amber-500"
                                : "border-neutral-200 bg-white hover:border-amber-200"
                                }`}
                        >
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                                {product.images[0] && (
                                    <img
                                        src={product.images[0].url}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                    />
                                )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h3 className="truncate font-medium text-neutral-900">
                                    {product.name}
                                </h3>
                                <p className="truncate text-xs text-neutral-500">
                                    {product.packs[0]?.price ? `₹${product.packs[0].price}` : "N/A"}
                                </p>
                            </div>
                            {selected?._id === product._id && (
                                <div className="absolute right-3 top-3 text-amber-600">
                                    <Check className="h-5 w-5" />
                                </div>
                            )}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};
