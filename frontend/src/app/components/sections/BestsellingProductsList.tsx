"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import ProductCardHome from "../ProductCardHome";
import { useContainerScroll } from "@/hooks/useContainerScroll";

// Define a simplified Product interface for what's needed here if full type isn't available,
// or import from types if compatible. Using 'any' for now to match strict refactoring pattern 
// unless I'm sure about the product structure passing down.
// Actually, I should use the correct type.
import { Product } from "@/types";

interface BestsellingProductsListProps {
    products: Product[];
}

export default function BestsellingProductsList({ products }: BestsellingProductsListProps) {
    const {
        scrollContainerRef,
        showLeftArrow,
        showRightArrow,
        scrollLeft,
        scrollRight,
        checkScroll
    } = useContainerScroll([products]);

    // Slice first 5 products.
    // Note: The mapping to "displayProducts" (adding 'badge', 'img' fallback etc) 
    // can be done here or in parent. Doing it here allows parent to just pass raw data.
    const displayProducts = products.slice(0, 5).map((p: any) => ({
        id: p._id,
        name: p.name,
        price: p.price,
        img: p.images?.[0]?.url || '/placeholder.jpg',
        slug: p.slug,
        badge: p.isFeatured ? 'Featured' : undefined
    }));

    return (
        <div className="relative">
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:pb-0 no-scrollbar"
            >
                {displayProducts.map((p) => (
                    // Mobile: w-[40vw] to show ~2.5 cards (matches CategoriesList). 
                    // Desktop: md:w-[240px] (matches original ProductCard width).
                    <div key={p.id} className="snap-start shrink-0 w-[40vw] sm:w-[180px] md:w-[240px]">
                        <ProductCardHome product={p} className="h-full" />
                    </div>
                ))}

                {/* View All BestSelling Card (6th card) */}
                <Link
                    href="/shop"
                    className="snap-start shrink-0 w-[40vw] sm:w-[180px] md:w-[240px] group relative block"
                >
                    {/* Mobile: aspect-3/4 to match ProductCardHome. Desktop: h-full/min-h to fill space */}
                    <div className="relative aspect-3/4 sm:aspect-auto sm:h-full sm:min-h-[300px] w-full overflow-hidden rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <ArrowRight className="text-gray-400 group-hover:text-orange-600 transition-colors" size={32} />
                        </div>
                        <span className="font-bold text-gray-400 group-hover:text-orange-700 text-sm uppercase tracking-wider text-center px-4">
                            View all<br /> BestSelling
                        </span>
                    </div>
                </Link>

                {/* Spacer */}
                <div className="w-1 shrink-0"></div>
            </div>

            {/* Left Arrow */}
            {showLeftArrow && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-xl border border-gray-100 hover:text-orange-600 hover:scale-110 transition-all duration-300 hidden md:flex items-center justify-center cursor-pointer"
                    aria-label="Scroll Left"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            {/* Right Arrow */}
            {showRightArrow && (
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-xl border border-gray-100 hover:text-orange-600 hover:scale-110 transition-all duration-300 hidden md:flex items-center justify-center cursor-pointer"
                    aria-label="Scroll Right"
                >
                    <ChevronRight size={24} />
                </button>
            )}
        </div>
    );
}
