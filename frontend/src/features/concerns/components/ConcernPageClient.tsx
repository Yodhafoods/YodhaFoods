"use client";

import { useState } from "react";
import { concerns, mockProducts } from "../data/mockData";
import ConcernSelector from "./ConcernSelector";
import ProductCard from "@/features/products/components/ProductCard";

export default function ConcernPageClient() {
    const [activeConcernId, setActiveConcernId] = useState(concerns[0].id);

    // Filter products based on the active concern's tag
    // Since mockProducts have tags array, we check if the concern id exists in tags
    const filteredProducts = mockProducts.filter(product =>
        product.tags?.includes(activeConcernId)
    );

    const activeConcernName = concerns.find(c => c.id === activeConcernId)?.name;

    return (
        <div className="min-h-screen bg-white">
            {/* Top Section - Concern Selector */}
            <div className="bg-orange-50/50 pt-8 pb-12 border-b border-orange-100">
                <div className="container mx-auto px-4 text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shop By Concern</h1>
                    <p className="text-gray-600">Select a health goal to find perfectly curated products for you.</p>
                </div>

                <ConcernSelector
                    concerns={concerns}
                    activeConcernId={activeConcernId}
                    onSelect={setActiveConcernId}
                />
            </div>

            {/* Product Section */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                        {activeConcernName}
                    </h2>
                    <div className="h-1 w-20 bg-emerald-500 mt-2 rounded-full"></div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">No products found for this concern yet.</p>
                        <p className="text-gray-400 text-sm mt-1">We are adding new products soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
