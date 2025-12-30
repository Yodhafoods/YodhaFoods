"use client";

import React, { useRef, MouseEvent } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import {
    FaGlobe,
    FaTruckLoading,
    FaCheckCircle,
    FaWhatsapp,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

/* ---------------- Fonts ---------------- */
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "600", "800"],
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["700"],
});

export default function HeroBannerFour() {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    /* ---------- Glow ---------- */
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - 250);
        mouseY.set(e.clientY - rect.top - 250);
    }

    /* ---------- Handlers ---------- */
    const handleRedirect = () => {
        router.push("/shop");
    };

    return (
        <section className={`w-full flex justify-center ${jakarta.className}`}>
            <div className="max-w-[1440px] w-full px-2 md:px-12 mt-6">
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    className="relative h-[490px] rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0a0a1f] to-[#050514] border border-white/10 text-white"
                >
                    {/* Glow */}
                    <motion.div
                        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(253,224,71,0.08) 0%, transparent 70%)",
                            x: springX,
                            y: springY,
                        }}
                    />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] h-full">
                        {/* LEFT */}
                        <div className="p-4 lg:p-6 flex flex-col justify-between lg:justify-center h-full">
                            <span className="mb-3 lg:mb-6 inline-flex px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400 text-emerald-400 text-[0.6rem] lg:text-xs font-extrabold tracking-widest uppercase w-fit">
                                Beyond the Catalog
                            </span>

                            <h1
                                className={`${playfair.className} text-3xl lg:text-[3.5rem] mb-3 lg:mb-5`}
                            >
                                Your Wish Is <br />
                                <span className="text-yellow-300">Yodha’s Wish.</span>
                            </h1>

                            <p className="opacity-80 max-w-[520px] mb-4 lg:mb-8 text-xs lg:text-base">
                                Can't find the product? Tell us what you need and our global
                                sourcing team will take care of it.
                            </p>

                            <div className="grid grid-cols-2 gap-4 max-w-[520px]">
                                <Benefit icon={<FaGlobe />} title="Global Sourcing" />
                                <Benefit icon={<FaTruckLoading />} title="Direct Delivery" />
                                <div className="col-span-2">
                                    <Benefit icon={<FaCheckCircle />} title="Purity Standards" />
                                </div>
                            </div>
                        </div>

                        {/* 📱 MOBILE SUBMIT BUTTON (IN FLOW) */}
                        <div className="lg:hidden w-full mt-2 px-4 z-30">
                            <button
                                onClick={handleRedirect}
                                className="w-full bg-gradient-to-br from-yellow-300 to-amber-500 text-[#020617]
                                py-3 rounded-full font-extrabold uppercase tracking-widest text-xs
                                flex items-center justify-center gap-2 shadow-lg"
                            >
                                Submit Request <FaWhatsapp />
                            </button>
                        </div>
                        {/* RIGHT (DESKTOP FORM) - All interactions redirect */}
                        <div
                            onClick={handleRedirect}
                            className="hidden lg:flex relative bg-black/25 p-8 flex-col justify-center border border-white/5 cursor-pointer hover:bg-black/30 transition-colors h-[90%] self-center rounded-[30px] mr-6"
                        >
                            <div className="space-y-5 pointer-events-none">
                                <Field
                                    label="What are you looking for?"
                                    id="productReq"
                                    isTextArea
                                    value=""
                                    onChange={() => { }}
                                />
                                <Field
                                    label="Name"
                                    id="userName"
                                    value=""
                                    onChange={() => { }}
                                />
                                <Field
                                    label="WhatsApp Contact"
                                    id="userPhone"
                                    value=""
                                    onChange={() => { }}
                                />

                                <div
                                    className="w-full mt-2 bg-gradient-to-br from-yellow-300 to-amber-500 text-[#020617] py-4 rounded-full font-extrabold uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                                >
                                    Submit Request <FaWhatsapp />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------------- Small ---------------- */
function Benefit({ icon, title }: any) {
    return (
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="text-cyan-400 text-lg mb-2">{icon}</div>
            <h4 className="text-xs uppercase tracking-widest font-extrabold">
                {title}
            </h4>
        </div>
    );
}

function Field({ label, id, value, onChange, isTextArea }: any) {
    return (
        <div className="space-y-2">
            <label className="text-yellow-300 text-xs font-extrabold tracking-widest uppercase">
                {label}
            </label>
            {isTextArea ? (
                <textarea
                    id={id}
                    rows={3}
                    value={value}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 resize-none pointer-events-none"
                />
            ) : (
                <input
                    id={id}
                    value={value}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 pointer-events-none"
                />
            )}
        </div>
    );
}