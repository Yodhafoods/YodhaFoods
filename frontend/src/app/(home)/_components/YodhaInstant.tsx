"use client";

import { useState } from "react";
import ProductCard from "@/features/products/components/ProductCard";
import { useAppDispatch } from "@/lib/store/hooks";
import { useProducts } from "@/features/products/hooks/useProducts";

import { Product } from "@/types";

export default function YodhaInstant() {
    const { products, loading } = useProducts("yodha-instant");

    return (
        <section
            id="instant"
            className="container mx-auto mb-28 rounded-[40px] bg-[#050505] text-white px-6 md:px-10 py-10 relative overflow-hidden"
        >
            {/* Header */}
            <div className="text-center mb-12 relative z-10">
                <h2 className="font-fraunces text-[2.5rem] md:text-[3.5rem] font-bold">
                    Yodha Instant ⚡
                </h2>
                <p className="text-lg mt-2 opacity-80">
                    Ready-to-Drink mixes. Just add water.
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <p className="text-center text-gray-400">Loading Instant Products...</p>
            )}

            {/* Grid */}
            {!loading && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 relative z-10">
                    {products.map((product) => (
                        <div key={product._id} className="zoom-in-95 duration-300">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
