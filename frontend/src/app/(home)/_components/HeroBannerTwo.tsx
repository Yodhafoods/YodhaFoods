"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { FaGlobe, FaTruckLoading, FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

/* ---------------- Fonts ---------------- */
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "600", "800"],
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["700"],
    style: ["italic", "normal"],
});

interface FormData {
    productReq: string;
    userName: string;
    userPhone: string;
}

export default function HeroBannerTwo() {
    const containerRef = useRef<HTMLDivElement>(null);

    /* ---------------- Mouse Follower ---------------- */
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

    /* ---------------- Form Logic (Desktop only) ---------------- */
    const [formData, setFormData] = useState<FormData>({
        productReq: "",
        userName: "",
        userPhone: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const submitRequest = () => {
        const { productReq, userName, userPhone } = formData;
        if (!productReq || !userName || !userPhone) {
            alert("Please complete your request details.");
            return;
        }

        setIsSuccess(true);

        const targetPhone = "911234567890";
        const message = `*YODHA USER REQUEST*%0A--------------------------%0A*Wish:* ${productReq}%0A*Name:* ${userName}%0A*Contact:* ${userPhone}%0A--------------------------`;

        setTimeout(() => {
            window.open(
                `https://api.whatsapp.com/send?phone=${targetPhone}&text=${message}`,
                "_blank"
            );
            setTimeout(() => setIsSuccess(false), 2000);
        }, 1200);
    };

    return (
        <section className={`w-full flex justify-center ${jakarta.className}`}>
            <div className="max-w-[1440px] w-full px-2 md:px-12 mt-6">
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    className="
            relative min-h-[650px] lg:h-[650px]
            rounded-[40px]
            overflow-hidden
            shadow-xl
            bg-gradient-to-br from-[#1e1b4b] to-[#020617]
            text-white
            border border-white/10
          "
                >
                    {/* Glow */}
                    <motion.div
                        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(253,224,71,0.08) 0%, transparent 70%)",
                            x: springX,
                            y: springY,
                        }}
                    />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] h-full">
                        {/* ---------------- LEFT CONTENT ---------------- */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center h-full">
                            <div className="flex items-center gap-2 bg-[#12b981]/15 border border-[#12b981] px-4 py-1.5 rounded-full w-fit mb-6">
                                <span className="text-[#12b981] text-xs font-bold tracking-widest uppercase">
                                    Beyond the Catalog
                                </span>
                            </div>

                            <h1
                                className={`${playfair.className} text-4xl lg:text-[3.5rem] leading-[1.1] mb-4`}
                            >
                                Your Wish Is
                                <br />
                                <span className="text-[#fde047]">Yodha’s Wish.</span>
                            </h1>

                            <p className="text-base lg:text-lg font-light opacity-80 leading-relaxed max-w-[520px] mb-8">
                                Can't find the product? Use our global sourcing feature. Tell us
                                what you need, and we will bring it to your doorstep.
                            </p>

                            {/* Benefits */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                <BenefitCard
                                    icon={<FaGlobe />}
                                    title="Global Sourcing"
                                    description="Accessing international supply chains."
                                />
                                <BenefitCard
                                    icon={<FaTruckLoading />}
                                    title="Direct Delivery"
                                    description="From sourcing to your doorstep."
                                />
                                <div className="col-span-2">
                                    <BenefitCard
                                        icon={<FaCheckCircle />}
                                        title="Purity Standards"
                                        description="Strictly meets Yodha standards."
                                    />
                                </div>
                            </div>

                            {/* MOBILE CTA */}
                            <div className="lg:hidden">
                                <Link
                                    href="/"
                                    className="
                    inline-flex items-center justify-center w-full
                    bg-gradient-to-br from-[#fde047] to-[#f59e0b]
                    text-[#020617]
                    py-4 rounded-full
                    font-bold uppercase tracking-wider text-sm
                    shadow-lg
                  "
                                >
                                    Submit Your Request
                                </Link>
                            </div>
                        </div>

                        {/* ---------------- RIGHT FORM (DESKTOP ONLY) ---------------- */}
                        <div className="hidden lg:flex relative bg-black/20 p-10 flex-col justify-center border-l border-white/5 h-full">
                            <AnimatePresence>
                                {isSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-[#020617] z-20 flex flex-col items-center justify-center text-center p-8"
                                    >
                                        <FaCheckCircle className="text-5xl text-[#12b981] mb-4" />
                                        <h2 className="text-2xl font-bold">Received</h2>
                                        <p className="opacity-60 text-sm mt-2">
                                            Opening WhatsApp...
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mb-6">
                                <h2 className="text-xl font-bold mb-1">
                                    Your Need Comes First
                                </h2>
                                <p className="opacity-50 text-sm">
                                    Built for your requirements.
                                </p>
                            </div>

                            {/* -------- FORM FIELDS WITH LABELS -------- */}
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[#fde047] text-xs font-bold tracking-widest uppercase">
                                        What are you looking for?
                                    </label>
                                    <textarea
                                        id="productReq"
                                        rows={3}
                                        placeholder="Describe the item or extract..."
                                        value={formData.productReq}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[#fde047] text-xs font-bold tracking-widest uppercase">
                                        Name
                                    </label>
                                    <input
                                        id="userName"
                                        placeholder="Your Full Name"
                                        value={formData.userName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[#fde047] text-xs font-bold tracking-widest uppercase">
                                        WhatsApp Contact
                                    </label>
                                    <input
                                        id="userPhone"
                                        placeholder="+91 XXXX XXX XXX"
                                        value={formData.userPhone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm"
                                    />
                                </div>

                                <motion.button
                                    onClick={submitRequest}
                                    className="
                    w-full mt-4
                    bg-gradient-to-br from-[#fde047] to-[#f59e0b]
                    text-[#020617]
                    py-4 rounded-full
                    font-bold uppercase tracking-wider text-sm
                    flex items-center justify-center gap-2
                  "
                                >
                                    Submit Request <FaWhatsapp />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------------- Benefit Card ---------------- */
function BenefitCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col gap-2">
            <div className="text-[#06b6d5] text-lg">{icon}</div>
            <h4 className="text-[0.7rem] uppercase tracking-wide font-bold">
                {title}
            </h4>
            <p className="hidden md:block text-xs opacity-80">{description}</p>
        </div>
    );
}
