"use client";

import React from "react";
import { Category } from "@/types";
import { CiShop } from "react-icons/ci";

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
    return (
        <div className="hidden md:flex flex-row items-center gap-4 py-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b border-gray-200 bg-white">
            {/* "All" Option */}
            <button
                onClick={() => onSelectCategory(undefined)}
                className={`
                    flex flex-col items-center justify-center w-[80px] h-20 cursor-pointer px-1 rounded-lg transition-all shrink-0
                    ${selectedCategory === undefined
                        ? "bg-orange-50 border border-orange-300 border-b-3 border-b-orange-500 "
                        : "hover:bg-orange-100 border border-gray-200"
                    }
                `}
            >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 transition-colors ${selectedCategory === undefined ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500"}`}>
                    <CiShop className="text-2xl" />
                </div>
                <span
                    className={`text-xs font-medium text-center w-full truncate px-1 leading-tight ${selectedCategory === undefined ? "text-orange-700 font-normal" : "text-gray-600 font-normal"
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
                        flex flex-col items-center justify-center w-[80px] h-20 px-1 rounded-lg transition-all shrink-0 border cursor-pointer
                        ${selectedCategory === category.slug
                            ? "bg-orange-100 border-orange-300 border-b-3 border-b-orange-500"
                            : "hover:bg-orange-100 border-gray-200"
                        }
                    `}
                >
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-gray-100 mb-1">
                        {category.imageUrl ? (
                            <img
                                src={category.imageUrl}
                                alt={category.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400">
                                No Img
                            </div>
                        )}
                    </div>
                    <span
                        className={`text-xs font-normal text-center w-full truncate px-1 leading-tight ${selectedCategory === category.slug
                            ? "text-orange-600 font-normal"
                            : "text-gray-600 font-normal"
                            }`}
                    >
                        {category.name}
                    </span>
                </button>
            ))}
        </div>
    );
}
