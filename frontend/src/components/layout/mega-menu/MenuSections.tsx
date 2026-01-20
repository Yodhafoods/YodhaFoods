"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { FaLeaf, FaSeedling, FaUtensils, FaTractor, FaHeartbeat, FaAppleAlt, FaWeight } from "react-icons/fa";
import { TbRibbonHealth } from "react-icons/tb";
import { GiPowderBag } from "react-icons/gi";

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
            <Link href="/categories/yodha-instant" className="group">
                <div className="flex flex-col gap-1 hover:bg-red-100 p-2 rounded-md transition-colors">
                    <div className="flex items-center gap-2 text-red-600">
                        <FaUtensils className="text-lg" />
                        <h4 className="font-semibold text-sm">Instant Mixes</h4>
                    </div>
                    <p className="text-xs text-gray-500">Ready to cook, healthy meals.</p>
                </div>
            </Link>
            <Link href="/categories/spices" className="group">
                <div className="flex flex-col gap-1 hover:bg-yellow-100 p-2 rounded-md transition-colors">
                    <div className="flex items-center gap-2 text-yellow-600">
                        <GiPowderBag className="text-lg" />
                        <h4 className="font-semibold text-sm">Spices</h4>
                    </div>
                    <p className="text-xs text-gray-500">Varied range of spices.</p>
                </div>
            </Link>
        </div>
    );
};

export const ShopByConcern = () => {
    const concerns = [
        { label: "Diabetes Care", href: "/shop-by-concern?concern=diabetes-care", icon: <FaHeartbeat className="text-red-500" /> },
        { label: "Gut Health", href: "/shop-by-concern?concern=gut-health", icon: <FaAppleAlt className="text-green-500" /> },
        { label: "Weight Management", href: "/shop-by-concern?concern=weight-loss", icon: <FaWeight className="text-blue-500" /> },
        { label: "Immunity", href: "/shop-by-concern?concern=immunity", icon: <TbRibbonHealth className="text-orange-500" /> },
    ];

    return (
        <div className="grid grid-cols-1 gap-2">
            {concerns.map((item, i) => (
                <Link href={item.href} key={i}>
                    <div className="flex items-center justify-between p-2 rounded hover:bg-green-100 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="text-lg group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        </div>
                        <FiArrowRight className="text-gray-400 text-xs" />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export const FarmsAndSourcing = () => {
    return (
        <div className="flex flex-col gap-3">
            <Link href="/farms-and-sourcing" className="flex items-start gap-3 p-2 hover:bg-green-100 rounded-lg transition-colors">
                <div className="mt-1 bg-green-100 p-2 rounded-full text-green-600">
                    <FaTractor />
                </div>
                <div>
                    <h4 className="font-semibold text-sm text-gray-800">Our Farms</h4>
                    <p className="text-xs text-gray-500">Meet the farmers behind the food.</p>
                </div>
            </Link>
            <Link href="/farms-and-sourcing" className="flex items-start gap-3 p-2 hover:bg-orange-100 rounded-lg transition-colors">
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
