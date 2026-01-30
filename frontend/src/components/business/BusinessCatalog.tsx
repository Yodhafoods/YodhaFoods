"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";

const pageVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const products = [
    { name: "Onion Powder", cat: "Vegetable", sku: "YF-V-06" },
    { name: "Tomato Powder", cat: "Vegetable", sku: "YF-V-07" },
    { name: "Spinach Powder", cat: "Vegetable", sku: "YF-V-09" },
    { name: "Mango Powder", cat: "Fruit", sku: "YF-F-28" },
    { name: "Turmeric Powder", cat: "Spice", sku: "YF-S-68" },
    { name: "Chia Seed Powder", cat: "Seed", sku: "YF-SD-87" }
];

interface BusinessCatalogProps {
    openRfq: (sku: string) => void;
}

export default function BusinessCatalog({ openRfq }: BusinessCatalogProps) {
    const [catFilter, setCatFilter] = useState("all");

    return (
        <motion.section
            key="catalog"
            variants={pageVariants}
            initial="initial" animate="animate" exit="exit"
            className="max-w-[1440px] mx-auto min-h-[70vh]"
        >
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <h2 className="text-5xl font-extrabold text-slate-900">Technical Inventory</h2>
                    <p className="text-slate-500 mt-4 text-lg">Verified B2B stock availability</p>
                </div>
                <select
                    value={catFilter}
                    onChange={(e) => setCatFilter(e.target.value)}
                    className="border border-slate-200 rounded-xl px-6 py-4 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="all">All Categories</option>
                    <option value="Vegetable">Vegetables</option>
                    <option value="Fruit">Fruits</option>
                    <option value="Spice">Spices</option>
                    <option value="Seed">Seeds</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products
                    .filter(p => catFilter === "all" || p.cat === catFilter)
                    .map(p => (
                        <motion.div
                            key={p.sku}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ y: -4, borderColor: "#2563eb", boxShadow: "0 20px 40px rgba(37, 99, 235, 0.08)" }}
                            transition={{ duration: 0.3 }}
                            className="group p-8 h-72 flex flex-col justify-between border border-slate-200 rounded-[32px] bg-white overflow-hidden transition-all"
                        >
                            <div>
                                <span className="font-mono text-xs text-slate-400">{p.sku}</span>
                                <h4 className="text-xl font-extrabold mt-4 text-slate-900">{p.name}</h4>
                                <p className="text-blue-600 text-xs font-black uppercase mt-2">{p.cat}</p>
                            </div>
                            <button
                                onClick={() => openRfq(p.name)}
                                className="bg-slate-50 py-4 rounded-xl font-black text-xs text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
                            >
                                Request Spec Sheet
                            </button>
                        </motion.div>
                    ))}
            </div>
        </motion.section>
    );
}
