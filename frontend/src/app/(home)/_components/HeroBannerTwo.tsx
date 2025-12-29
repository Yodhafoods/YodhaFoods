"use client";

import React, { useState, useRef, useEffect, MouseEvent } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import {
    FaGlobe,
    FaTruckLoading,
    FaCheckCircle,
    FaWhatsapp,
} from "react-icons/fa";

/* ---------------- Fonts ---------------- */
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "600", "800"],
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["700"],
});

/* ---------------- Props ---------------- */
interface HeroBannerTwoProps {
    onExpire?: () => void;
    onUserInteracted?: () => void;
}

/* ---------------- Form ---------------- */
interface FormData {
    productReq: string;
    userName: string;
    userPhone: string;
}

export default function HeroBannerTwo({
    onExpire,
    onUserInteracted,
}: HeroBannerTwoProps) {
    const containerRef = useRef<HTMLDivElement>(null);

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

    /* ---------- State ---------- */
    const [formData, setFormData] = useState<FormData>({
        productReq: "",
        userName: "",
        userPhone: "",
    });

    const [timerStarted, setTimerStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);
    const [hasExpired, setHasExpired] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    /* ---------- Countdown ---------- */
    useEffect(() => {
        if (!timerStarted) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [timerStarted]);

    /* ---------- Expiry ---------- */
    useEffect(() => {
        if (timeLeft === 0 && !hasExpired) {
            setHasExpired(true);
            onExpire?.();
        }
    }, [timeLeft, hasExpired, onExpire]);

    const formatTime = (s: number) =>
        `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60)
            .toString()
            .padStart(2, "0")}`;

    /* ---------- Handlers ---------- */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (!timerStarted) {
            setTimerStarted(true);
            onUserInteracted?.(); // 🔑 freeze carousel
        }
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const submitRequest = () => {
        const { productReq, userName, userPhone } = formData;
        if (!productReq || !userName || !userPhone) {
            alert("Please fill all fields.");
            return;
        }

        setIsSuccess(true);

        const phone = "911234567890";
        const message = `YODHA GLOBAL SOURCING
Requirement: ${productReq}
Name: ${userName}
Phone: ${userPhone}`;

        setTimeout(() => {
            window.open(
                `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
                    message
                )}`,
                "_blank"
            );
        }, 1200);
    };

    return (
        <section className={`w-full flex justify-center ${jakarta.className}`}>
            <div className="max-w-[1440px] w-full px-2 md:px-12 mt-6">
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    className="relative h-[650px] rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0a0a1f] to-[#050514] border border-white/10 text-white"
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
                        <div className="p-8 pb-28 lg:pb-12 lg:p-12 flex flex-col justify-center">
                            <span className="mb-6 inline-flex px-4 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400 text-emerald-400 text-xs font-extrabold tracking-widest uppercase w-fit">
                                Beyond the Catalog
                            </span>

                            <h1
                                className={`${playfair.className} text-4xl lg:text-[3.5rem] mb-5`}
                            >
                                Your Wish Is <br />
                                <span className="text-yellow-300">Yodha’s Wish.</span>
                            </h1>

                            <p className="opacity-80 max-w-[520px] mb-8">
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

                        {/* RIGHT (DESKTOP FORM) */}
                        <div className="hidden lg:flex relative bg-black/25 p-10 flex-col justify-center border-l border-white/5">
                            {timerStarted && (
                                <div className="absolute top-6 right-8 text-yellow-300 text-xs font-extrabold tracking-widest">
                                    {formatTime(timeLeft)}
                                </div>
                            )}

                            <AnimatePresence>
                                {isSuccess && (
                                    <motion.div className="absolute inset-0 bg-[#050514] z-20 flex flex-col items-center justify-center">
                                        <FaCheckCircle className="text-5xl text-emerald-400 mb-4" />
                                        <h2 className="text-xl font-bold">
                                            Requirement Received
                                        </h2>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-5">
                                <Field
                                    label="What are you looking for?"
                                    id="productReq"
                                    isTextArea
                                    value={formData.productReq}
                                    onChange={handleChange}
                                />
                                <Field
                                    label="Name"
                                    id="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                />
                                <Field
                                    label="WhatsApp Contact"
                                    id="userPhone"
                                    value={formData.userPhone}
                                    onChange={handleChange}
                                />

                                <button
                                    onClick={submitRequest}
                                    className="w-full mt-4 bg-gradient-to-br from-yellow-300 to-amber-500 text-[#020617] py-4 rounded-full font-extrabold uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                                >
                                    Submit Request <FaWhatsapp />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 📱 MOBILE SUBMIT BUTTON (HEIGHT SAFE) */}
                    <div className="lg:hidden absolute bottom-4 left-4 right-4 z-30">
                        <button
                            onClick={submitRequest}
                            className="w-full bg-gradient-to-br from-yellow-300 to-amber-500 text-[#020617]
                         py-4 rounded-full font-extrabold uppercase tracking-widest text-sm
                         flex items-center justify-center gap-2 shadow-lg"
                        >
                            Submit Your Request <FaWhatsapp />
                        </button>
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
                    onChange={onChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                />
            ) : (
                <input
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                />
            )}
        </div>
    );
}
