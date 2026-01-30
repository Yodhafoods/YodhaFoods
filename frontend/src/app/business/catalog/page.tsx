"use client";

import BusinessCatalog from "@/components/business/BusinessCatalog";
import RFQModal from "@/components/business/RFQModal";
import { useState, Suspense } from "react";

function CatalogContent() {
    const [showRfq, setShowRfq] = useState(false);
    const [rfqSku, setRfqSku] = useState("");

    const openRfq = (sku = "") => {
        setRfqSku(sku ? `RE: ${sku}` : "");
        setShowRfq(true);
    };

    return (
        <div className="pt-10 pb-20 px-8 bg-[#f8fafc] min-h-screen text-[#0f172a] font-sans">
            <BusinessCatalog openRfq={openRfq} />
            <RFQModal
                isOpen={showRfq}
                onClose={() => setShowRfq(false)}
                rfqSku={rfqSku}
            />
        </div>
    );
}

export default function CatalogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">Loading...</div>}>
            <CatalogContent />
        </Suspense>
    );
}
