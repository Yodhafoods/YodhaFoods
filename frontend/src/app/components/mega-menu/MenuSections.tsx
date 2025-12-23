"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { FaLeaf, FaSeedling, FaUtensils, FaTractor } from "react-icons/fa";

/* ============================================================
   CONTENT COMPONENTS
============================================================ */

export const ShopByCategory = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <Link href="/categories/vegetable-powders" className="group">
                <div className="flex flex-col gap-1 hover:bg-green-100 p-2 rounded-md transition-colors">
                    <div className="flex items-center gap-2 text-green-700">
                        <FaLeaf className="text-lg" />
                        <h4 className="font-semibold text-sm">Vegetable Powders</h4>
                    </div>
                    <p className="text-xs text-gray-500">Pure, dehydrated veggie goodness.</p>
                </div>
            </Link>
            <Link href="/categories/fruit-powders" className="group">
                <div className="flex flex-col gap-1 hover:bg-orange-100 p-2 rounded-md transition-colors">
                    <div className="flex items-center gap-2 text-orange-600">
                        <FaSeedling className="text-lg" />
                        <h4 className="font-semibold text-sm">Fruit Powders</h4>
                    </div>
                    <p className="text-xs text-gray-500">Natural sweetness, zero additives.</p>
                </div>
            </Link>
            <Link href="/categories/yodha-instant" className="group col-span-2">
                <div className="flex flex-col gap-1 hover:bg-red-100 p-2 rounded-md transition-colors">
                    <div className="flex items-center gap-2 text-red-600">
                        <FaUtensils className="text-lg" />
                        <h4 className="font-semibold text-sm">Instant Mixes</h4>
                    </div>
                    <p className="text-xs text-gray-500">Ready to cook, healthy meals.</p>
                </div>
            </Link>
        </div>
    );
};

export const ShopByConcern = () => {
    return (
        <div className="grid grid-cols-1 gap-2">
            {[
                { label: "Diabetes Care", href: "/concern/diabetes" },
                { label: "Gut Health", href: "/concern/gut-health" },
                { label: "Weight Management", href: "/concern/weight-loss" },
            ].map((item, i) => (
                <Link href={item.href} key={i}>
                    <div className="block p-2 rounded hover:bg-green-100 transition-colors">
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        <FiArrowRight className="inline ml-2 text-gray-400 text-xs" />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export const FarmsAndSourcing = () => {
    return (
        <div className="flex flex-col gap-3">
            <Link href="/farms" className="flex items-start gap-3 p-2 hover:bg-green-100 rounded-lg transition-colors">
                <div className="mt-1 bg-green-100 p-2 rounded-full text-green-600">
                    <FaTractor />
                </div>
                <div>
                    <h4 className="font-semibold text-sm text-gray-800">Our Farms</h4>
                    <p className="text-xs text-gray-500">Meet the farmers behind the food.</p>
                </div>
            </Link>
            <Link href="/sourcing" className="flex items-start gap-3 p-2 hover:bg-orange-100 rounded-lg transition-colors">
                <div className="mt-1 bg-orange-100 p-2 rounded-full text-orange-600">
                    <FaLeaf />
                </div>
                <div>
                    <h4 className="font-semibold text-sm text-gray-800">Sourcing Ethics</h4>
                    <p className="text-xs text-gray-500">How we ensure 100% purity.</p>
                </div>
            </Link>
        </div>
    );
};
