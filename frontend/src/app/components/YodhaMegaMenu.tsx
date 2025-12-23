"use client";

import React from "react";
import Link from "next/link";
import { FaUsers, FaUtensils } from "react-icons/fa";
import { ShiftingTabs, TabItem } from "./mega-menu/ShiftingTabs";
import { ShopByCategory, ShopByConcern, FarmsAndSourcing } from "./mega-menu/MenuSections";

export default function YodhaMegaMenu() {
    return (
        <div className="flex h-fit w-full justify-center px-2 py-1 text-gray-800">
            <div className="flex items-center gap-6">
                {/* Static Links */}
                <Link
                    href="/kitchen"
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
                >
                    <FaUtensils className="text-lg" />
                    Explore Kitchen
                </Link>
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                    <FaUsers className="text-lg text-orange-500" />
                    Join YodhaFam
                </Link>

                <div className="h-4 w-px bg-gray-300 mx-2"></div>

                {/* Dropdown Tabs */}
                <ShiftingTabs items={TABS} />
            </div>
        </div>
    );
}

const TABS: TabItem[] = [
    {
        title: "Shop by Category",
        Component: ShopByCategory,
        id: 1,
    },
    {
        title: "Shop by Concern",
        Component: ShopByConcern,
        id: 2,
    },
    {
        title: "Farms & Sourcing",
        Component: FarmsAndSourcing,
        id: 3,
    },
];

