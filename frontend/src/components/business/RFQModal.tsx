"use client";

import { motion, AnimatePresence } from "framer-motion";

interface RFQModalProps {
    isOpen: boolean;
    onClose: () => void;
    rfqSku: string;
}

export default function RFQModal({ isOpen, onClose, rfqSku }: RFQModalProps) {
    const handleRfq = (e: React.FormEvent) => {
        e.preventDefault();
        alert("RFQ submitted successfully.");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/90 z-[200] flex items-center justify-center p-6 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white w-full max-w-4xl rounded-[48px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
                    >
                        <div className="bg-slate-950 p-10 md:p-16 text-white md:w-2/5">
                            <h3 className="text-3xl md:text-4xl font-bold italic mb-6">Request Wholesale Quote</h3>
                            <p className="text-slate-400">Submit volume requirements for formal pricing.</p>
                        </div>
                        <div className="p-10 md:p-16 md:w-3/5 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 text-slate-400 font-bold hover:text-slate-600"
                            >
                                ✕ Close
                            </button>
                            <form onSubmit={handleRfq} className="space-y-8 mt-4">
                                <input required placeholder="Corporate Email" className="w-full border-b border-slate-200 py-4 font-bold outline-none text-slate-900 placeholder:text-slate-300 focus:border-blue-600 transition-colors" />
                                <input required placeholder="Delivery Pincode / Port" className="w-full border-b border-slate-200 py-4 font-bold outline-none text-slate-900 placeholder:text-slate-300 focus:border-blue-600 transition-colors" />
                                <input
                                    required
                                    defaultValue={rfqSku}
                                    placeholder="Requested SKUs & Volume"
                                    className="w-full border-b border-slate-200 py-4 font-bold outline-none text-slate-900 placeholder:text-slate-300 focus:border-blue-600 transition-colors"
                                />
                                <button className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-colors">
                                    Submit RFQ
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
