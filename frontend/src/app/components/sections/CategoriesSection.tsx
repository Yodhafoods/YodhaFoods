"use client";

import React, { useRef, useState, useEffect } from "react";
import { useCategories } from "@/hooks/useCategories";
import CategoryCard from "@/components/CategoryCard";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";

export default function CategoriesSection() {
    const { categories, loading, error } = useCategories();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 10);
            // Allow some tolerance (e.g., 2px) for verifying end of scroll
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 2);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [categories]);

    // Skeletons
    if (loading) {
        return (
            <section className="mb-20 mt-10">
                <div className="h-8 w-48 bg-gray-200 rounded mb-8 animate-pulse"></div>
                <div className="flex overflow-x-auto gap-6 pb-4 md:pb-0 no-scrollbar">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[40vw] md:w-[220px] aspect-[3/4] bg-gray-200 rounded-xl animate-pulse"
                        ></div>
                    ))}
                </div>
            </section>
        );
    }

    if (error || categories.length === 0) return null;

    // Limit to first 6 categories
    const displayedCategories = categories.slice(0, 6);

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    return (
        <section className="mb-2 mt-12 relative group/section">
            <div className="flex justify-between items-baseline mb-6 px-1">
                <h2 className="flex group items-center gap-1 text-lg md:text-xl font-bold text-gray-900 tracking-tight cursor-pointer">Top Categories
                    <ChevronRight size={24} strokeWidth={3} className="text-gray-700 group-hover:text-orange-600 hover:text-orange-600 group-hover:translate-x-2 transition-all text-xl font-bold" /> </h2>
                <Link href="/shop" className="text-sm group font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors">
                    View All <ArrowRight size={16} className=" group-hover:translate-x-2 transition-all" />
                </Link>
            </div>

            <div className="relative">
                {/* Container: Horizontal Scroll for ALL screens */}
                {/* Left padding added to containers within layouts if needed, avoiding global padding issues */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:pb-0 no-scrollbar"
                >

                    {displayedCategories.map((category, index) => (
                        // Mobile: w-[40vw] to show ~2.5 cards. Desktop: Calculated for 6 items.
                        <div key={category._id} className="snap-start flex-shrink-0 w-[40vw] sm:w-[180px] md:w-[calc(16.666%-14px)] min-w-[140px] md:min-w-[180px]">
                            <CategoryCard category={category} index={index} />
                        </div>
                    ))}

                    {/* View All Card (The 7th item) */}
                    <Link
                        href="/shop"
                        className="snap-start flex-shrink-0 w-[40vw] sm:w-[180px] md:w-[calc(16.666%-14px)] min-w-[140px] md:min-w-[180px] group relative block"
                    >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <ArrowRight className="text-gray-400 group-hover:text-orange-600 transition-colors" size={32} />
                            </div>
                            <span className="font-bold text-gray-400 group-hover:text-orange-700 text-sm uppercase tracking-wider text-center px-4">
                                View All<br /> Categories
                            </span>
                        </div>
                    </Link>

                    {/* Spacer for right padding */}
                    <div className="w-1 flex-shrink-0"></div>
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
        </section>
    );
}
