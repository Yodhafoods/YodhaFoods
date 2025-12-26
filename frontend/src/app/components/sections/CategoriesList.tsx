"use client";

import React from "react";
import CategoryCard from "@/components/CategoryCard";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { useContainerScroll } from "@/hooks/useContainerScroll";
import { Category } from "@/types";

interface CategoriesListProps {
    categories: Category[];
}

export default function CategoriesList({ categories }: CategoriesListProps) {
    const {
        scrollContainerRef,
        showLeftArrow,
        showRightArrow,
        scrollLeft,
        scrollRight,
        checkScroll
    } = useContainerScroll([categories]);

    // Limit to first 6 categories
    const displayedCategories = categories.slice(0, 6);

    return (
        <div className="relative">
            {/* Container: Horizontal Scroll for ALL screens */}
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:pb-0 no-scrollbar"
            >
                {displayedCategories.map((category, index) => (
                    // Mobile: w-[40vw] to show ~2.5 cards. Desktop: Calculated for 6 items.
                    <div
                        key={category._id}
                        className="snap-start shrink-0 w-[40vw] sm:w-[180px] md:w-[calc(16.666%-14px)] min-w-[140px] md:min-w-[180px]"
                    >
                        <CategoryCard category={category} index={index} />
                    </div>
                ))}

                {/* View All Card (The 7th item) */}
                <Link
                    href="/shop"
                    className="snap-start shrink-0 w-[40vw] sm:w-[180px] md:w-[calc(16.666%-14px)] min-w-[140px] md:min-w-[180px] group relative block"
                >
                    <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <ArrowRight
                                className="text-gray-400 group-hover:text-orange-600 transition-colors"
                                size={32}
                            />
                        </div>
                        <span className="font-bold text-gray-400 group-hover:text-orange-700 text-sm uppercase tracking-wider text-center px-4">
                            View All<br /> Categories
                        </span>
                    </div>
                </Link>

                {/* Spacer for right padding */}
                <div className="w-1 shrink-0"></div>
            </div>

            {/* Left Arrow Button */}
            {showLeftArrow && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-xl border border-gray-100 hover:text-orange-600 hover:scale-110 transition-all duration-300 hidden md:flex items-center justify-center cursor-pointer"
                    aria-label="Scroll Left"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            {/* Right Arrow Button */}
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
