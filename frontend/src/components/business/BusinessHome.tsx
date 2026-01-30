"use client";

import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

const pageVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

interface BusinessHomeProps {
    mode: string;
}

export default function BusinessHome({ mode }: BusinessHomeProps) {
    const router = useRouter();
    return (
        <motion.section
            key="home"
            variants={pageVariants}
            initial="initial" animate="animate" exit="exit"
            className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-20 items-center min-h-[70vh]"
        >
            <div className="space-y-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span className="text-[11px] font-black text-orange-700 uppercase tracking-[0.2em]">
                        Tier-1 Global Supplier
                    </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.85] text-slate-900">
                    Precision <br />
                    <span className="text-blue-600 italic">Ingredient Flow.</span>
                </h1>

                <p className="text-xl text-slate-500 max-w-xl font-medium leading-relaxed">
                    Enterprise-grade procurement for 100% natural dehydrated powders with verified COA and optimized logistics.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                    <button
                        onClick={() => router.push('/business/catalog')}
                        className="bg-slate-950 text-white px-12 py-6 rounded-2xl font-bold shadow-2xl hover:bg-blue-600 hover:-translate-y-1 transition-all"
                    >
                        Explore Inventory
                    </button>
                    <button className="bg-white border border-slate-200 px-12 py-6 rounded-2xl font-bold hover:bg-slate-50 transition text-slate-900">
                        Guided Tour →
                    </button>
                </div>
            </div>

            <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-2xl min-h-[400px]">
                <div className="flex justify-between items-center mb-10 pb-8 border-b border-slate-50">
                    <h3 className="font-black uppercase italic text-sm text-slate-400">Supply Chain Architecture</h3>
                    <span className="text-[11px] font-black uppercase text-blue-600 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                        {mode === 'int' ? 'International' : 'Domestic'}
                    </span>
                </div>
                <div className="space-y-4">
                    {/* Placeholder Flow Steps */}
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">1</div>
                        <div className="text-sm font-bold text-slate-700">Order Placed</div>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">2</div>
                        <div className="text-sm font-bold text-slate-400">Processing</div>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">3</div>
                        <div className="text-sm font-bold text-slate-400">Quality Check</div>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">4</div>
                        <div className="text-sm font-bold text-slate-400">Dispatch</div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
