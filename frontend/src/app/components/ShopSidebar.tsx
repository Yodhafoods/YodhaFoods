"use client";

import React from "react";
import { Category } from "@/types";
import { CiShop } from "react-icons/ci";

interface ShopSidebarProps {
    categories: Category[];
    selectedCategory: string | undefined;
    onSelectCategory: (slug: string | undefined) => void;
}

export default function ShopSidebar({
    categories,
    selectedCategory,
    onSelectCategory,
}: ShopSidebarProps) {
    return (
        <aside className="w-[85px] md:w-28 lg:w-32 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto no-scrollbar pb-20">
            <div className="flex flex-col">
                {/* "All" Option */}
                <button
                    onClick={() => onSelectCategory(undefined)}
                    className={`
                        flex flex-col items-center justify-center py-4 px-1 border-b border-gray-100 transition-all
                        ${selectedCategory === undefined
                            ? "bg-orange-100 border-r-4 border-r-orange-500"
                            : "hover:bg-orange-100 cursor-pointer border-r-4 border-r-transparent"
                        }
                    `}
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-1 overflow-hidden">
                        {/* Fallback Icon for 'All' */}
                        <span className="text-xl"><CiShop /></span>
                    </div>
                    <span
                        className={`text-[10px] md:text-xs font-medium text-center leading-tight ${selectedCategory === undefined ? "text-green-700 font-bold" : "text-gray-500"
                            }`}
                    >
                        All
                    </span>
                </button>

                {categories.map((category) => (
                    <button
                        key={category._id}
                        onClick={() => onSelectCategory(category.slug)}
                        className={`
                            flex flex-col items-center justify-center py-4 px-1 border-b border-gray-100 transition-all
                            ${selectedCategory === category.slug
                                ? "bg-orange-100 border-r-4 border-r-orange-500"
                                : "hover:bg-orange-100 cursor-pointer border-r-4 border-r-transparent"
                            }
                        `}
                    >
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-100 rounded-xl mb-1 overflow-hidden relative">
                            {category.imageUrl ? (
                                <img
                                    src={category.imageUrl}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                    No Img
                                </div>
                            )}
                        </div>
                        <span
                            className={`text-[10px] md:text-sm font-medium text-center leading-tight px-1 line-clamp-2 ${selectedCategory === category.slug
                                ? "text-green-700 font-bold"
                                : "text-gray-500"
                                }`}
                        >
                            {category.name}
                        </span>
                    </button>
                ))}
            </div>
        </aside>
    );
}
