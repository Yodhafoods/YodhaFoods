
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import BusinessHome from "@/components/business/BusinessHome";

function BusinessContent() {
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode") || "dom";

    return (
        <div className="pt-20 pb-20 px-8 bg-[#f8fafc] min-h-screen text-[#0f172a] font-sans">
            <BusinessHome mode={mode} />
        </div>
    );
}

export default function Business() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">Loading...</div>}>
            <BusinessContent />
        </Suspense>
    );
}
