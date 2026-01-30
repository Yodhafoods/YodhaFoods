"use client";

import { motion, Variants } from "framer-motion";

const pageVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export default function BusinessSolutions() {
    return (
        <motion.section
            key="solutions"
            variants={pageVariants}
            initial="initial" animate="animate" exit="exit"
            className="max-w-[1440px] mx-auto min-h-[70vh] text-center"
        >
            <div className="mb-20">
                <h2 className="text-6xl font-extrabold tracking-tight text-slate-900">Industry Blueprints</h2>
                <p className="text-slate-500 mt-6 text-xl max-w-2xl mx-auto">
                    Ingredient specifications mapped to manufacturing use-cases.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Mock Solutions */}
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center text-slate-300 font-bold">
                        Use Case {i}
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
