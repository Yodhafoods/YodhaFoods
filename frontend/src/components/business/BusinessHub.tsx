"use client";

import { motion, Variants } from "framer-motion";

const pageVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const mockHubData = [
    { id: "#YF-IND-8821", status: "Dispatch Ready", doc: "E-Way Bill" }
];

export default function BusinessHub() {
    return (
        <motion.section
            key="hub"
            variants={pageVariants}
            initial="initial" animate="animate" exit="exit"
            className="max-w-6xl mx-auto min-h-[70vh]"
        >
            <h2 className="text-5xl font-extrabold mb-12 text-slate-900">Procurement Management</h2>
            <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[11px] font-black uppercase text-slate-400">
                        <tr>
                            <th className="px-10 py-6">Consignment ID</th>
                            <th className="px-10 py-6">Status</th>
                            <th className="px-10 py-6">Documentation</th>
                            <th className="px-10 py-6">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {mockHubData.map(d => (
                            <tr key={d.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                <td className="px-10 py-8 font-mono text-blue-600 font-black text-sm">{d.id}</td>
                                <td className="px-10 py-8 text-slate-700 font-bold">{d.status}</td>
                                <td className="px-10 py-8 font-mono text-slate-400 text-sm">{d.doc}</td>
                                <td className="px-10 py-8 text-blue-600 font-bold cursor-pointer hover:underline">Verify →</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.section>
    );
}
