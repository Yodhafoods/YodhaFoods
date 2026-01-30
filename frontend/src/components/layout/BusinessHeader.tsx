"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useCallback } from "react";

function BusinessHeaderContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Default to 'dom' (domestic) if not present
    const currentMode = searchParams.get("mode") || "dom";

    // Helper to update query params
    const updateParams = useCallback(
        (newParams: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(newParams).forEach(([key, value]) => {
                if (value === null) {
                    params.delete(key);
                } else {
                    params.set(key, value);
                }
            });
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [searchParams, pathname, router]
    );

    const navLinks = [
        { href: "/business/catalog", label: "Catalog" },
        { href: "/business/solutions", label: "Solutions" },
        { href: "/business/compliance", label: "Compliance" },
        { href: "/business/orderhub", label: "Order HUB" },
    ];

    return (
        <nav className="sticky top-0 w-full z-100 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-4 md:px-8 py-4 transition-all duration-300">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <div className="flex items-center gap-6 md:gap-10 w-full md:w-auto justify-between md:justify-start">
                    {/* LOGO */}
                    <div
                        className="text-2xl font-black tracking-tighter uppercase cursor-pointer select-none flex items-center gap-1"
                        onClick={() => router.push(`/business?mode=${currentMode}`)}
                    >
                        <span>Yodha</span>
                        <span className="text-blue-600 italic">Foods</span>
                    </div>

                    {/* MODE TOGGLE */}
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button
                            onClick={() => updateParams({ mode: "dom" })}
                            className={`px-4 md:px-6 py-2 rounded-lg text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all ${currentMode === "dom"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            Domestic
                        </button>
                        <button
                            onClick={() => updateParams({ mode: "int" })}
                            className={`px-4 md:px-6 py-2 rounded-lg text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all ${currentMode === "int"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            International
                        </button>
                    </div>
                </div>

                {/* NAV LINKS DESKTOP */}
                <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={`${link.href}?mode=${currentMode}`}
                            className={`transition-colors ${pathname.startsWith(link.href)
                                ? "text-blue-600"
                                : "text-slate-600 hover:text-blue-600"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => console.log("Open RFQ")} // Placeholder for now
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-xl shadow-blue-100 hover:bg-slate-900 transition-all hover:scale-105 active:scale-95"
                    >
                        Request Quote
                    </button>
                </div>

                {/* MOBILE NAV PLACEHOLDER - could be added if needed, sticking to desktop HTML match for now */}
            </div>
        </nav>
    );
}

export default function BusinessHeader() {
    return (
        <Suspense fallback={<div className="h-20 bg-white/90" />}>
            <BusinessHeaderContent />
        </Suspense>
    );
}
