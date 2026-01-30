"use client";

import BusinessHub from "@/components/business/BusinessHub";
import { Suspense } from "react";

export default function OrderHubPage() {
    return (
        <div className="pt-20 pb-20 px-8 bg-[#f8fafc] min-h-screen text-[#0f172a] font-sans">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">Loading...</div>}>
                <BusinessHub />
            </Suspense>
        </div>
    );
}
