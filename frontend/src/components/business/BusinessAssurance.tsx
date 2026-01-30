"use client";

import { motion, Variants } from "framer-motion";

const pageVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export default function BusinessAssurance() {
    return (
        <motion.section
            key="assurance"
            variants={pageVariants}
            initial="initial" animate="animate" exit="exit"
            className="max-w-5xl mx-auto min-h-[70vh]"
        >
            <h2 className="text-5xl font-extrabold mb-6 text-slate-900">Compliance & Regulatory Hub</h2>
            <p className="text-slate-500 mb-16 text-lg">
                Download certifications, COAs and legal documentation.
            </p>
            <div className="grid gap-6">
                <div className="p-8 border rounded-2xl bg-white flex justify-between items-center hover:shadow-lg transition">
                    <div className="font-bold text-slate-900">FSSAI License</div>
                    <button className="text-blue-600 font-bold text-sm">Download ↓</button>
                </div>
                <div className="p-8 border rounded-2xl bg-white flex justify-between items-center hover:shadow-lg transition">
                    <div className="font-bold text-slate-900">ISO 22000:2018</div>
                    <button className="text-blue-600 font-bold text-sm">Download ↓</button>
                </div>
            </div>
        </motion.section>
    );
}
