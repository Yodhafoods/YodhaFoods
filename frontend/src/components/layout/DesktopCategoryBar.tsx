"use client";

import React, { useRef, useState, useEffect } from "react";
import { Category } from "@/types";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

interface DesktopCategoryBarProps {
    categories: Category[];
    selectedCategory: string | undefined;
    onSelectCategory: (slug: string | undefined) => void;
}

export default function DesktopCategoryBar({
    categories,
    selectedCategory,
    onSelectCategory,
}: DesktopCategoryBarProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 2);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [categories]);

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    return (
        <div className="hidden md:block relative w-full mb-8">
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex items-center gap-4 overflow-x-auto no-scrollbar py-4 px-4"
            >
                {/* "All" Option */}
                <button
                    onClick={() => onSelectCategory(undefined)}
                    className={`
                        relative flex-shrink-0 w-[140px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group
                        ${selectedCategory === undefined
                            ? "ring-4 ring-orange-500 scale-105 shadow-xl"
                            : "hover:scale-105 hover:shadow-lg opacity-80 hover:opacity-100"
                        }
                    `}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-black text-xl uppercase tracking-widest">ALL</span>
                        </div>
                    </div>
                </button>

                {categories.map((category, index) => (
                    <button
                        key={category._id}
                        onClick={() => onSelectCategory(category.slug)}
                        className={`
                            relative flex-shrink-0 w-[140px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group
                            ${selectedCategory === category.slug
                                ? "ring-4 ring-orange-500 scale-105 shadow-xl"
                                : "hover:scale-105 hover:shadow-lg opacity-90 hover:opacity-100"
                            }
                        `}
                    >
                        <div className="relative w-full h-full bg-gray-900">
                            {category.imageUrl ? (
                                <Image
                                    src={category.imageUrl}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="140px"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-800">
                                    <span className="text-gray-500 font-bold text-xs">No Image</span>
                                </div>
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                            {/* Number Overlay */}
                            <div className="absolute top-0 left-3 text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors pointer-events-none select-none" style={{ lineHeight: 0.8 }}>
                                {index + 1}
                            </div>

                            {/* Selected Indicator Text */}
                            {selectedCategory === category.slug && (
                                <div className="absolute bottom-4 left-0 w-full text-center">
                                    <span className="text-orange-500 text-[10px] font-bold tracking-widest bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
                                        SELECTED
                                    </span>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Left Arrow Button */}
            {showLeftArrow && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-xl border border-gray-100 hover:text-orange-600 hover:scale-110 transition-all duration-300 flex items-center justify-center"
                    aria-label="Scroll Left"
                >
                    <ChevronLeft size={20} />
                </button>
            )}

            {/* Right Arrow Button */}
            {showRightArrow && (
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-xl border border-gray-100 hover:text-orange-600 hover:scale-110 transition-all duration-300 flex items-center justify-center"
                    aria-label="Scroll Right"
                >
                    <ChevronRight size={20} />
                </button>
            )}
        </div>
    );
}
