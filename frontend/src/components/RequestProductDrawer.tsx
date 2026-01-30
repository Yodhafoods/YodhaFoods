"use client";

import React, { useRef, MouseEvent, useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { closeDrawer } from "@/features/ui/store/uiSlice";
import { toast } from "sonner";

/* ---------------- Fonts ---------------- */
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "600", "800"],
    variable: "--font-jakarta"
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["700"],
    variable: "--font-playfair"
});

export default function RequestProductDrawer() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.ui.activeDrawer === "productRequest");
    const containerRef = useRef<HTMLDivElement>(null);

    // Form State
    const [productReq, setProductReq] = useState("");
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


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
    const handleSubmit = async () => {
        if (!productReq || !userName || !userPhone) {
            toast.error("Please fill in all fields.");
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success("Request submitted successfully! We'll contact you soon.");
        setIsSubmitting(false);
        // Reset form
        setProductReq("");
        setUserName("");
        setUserPhone("");
        // Close drawer
        dispatch(closeDrawer());
    };

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <div className={`${jakarta.variable} ${playfair.variable} font-sans`}>
            {/* Drawer Overlay */}
            <div
                className={`fixed inset-0 z-10000 flex justify-center items-end transition-all duration-500 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
            >
                {/* Backdrop to close */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => dispatch(closeDrawer())}
                />

                {/* Actual Slide Container */}
                <div
                    className={`w-full max-w-[1440px] px-2 md:px-12 relative transition-transform duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] transform ${isOpen ? "-translate-y-8" : "translate-y-full"}`}
                >

                    {/* Main Card (HeroBannerFour Style) */}
                    <div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        className="relative h-[490px] rounded-[40px] overflow-hidden bg-linear-to-br from-[#0a0a1f] to-[#050514] border border-white/10 text-white shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => dispatch(closeDrawer())}
                            className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors pointer-events-auto"
                        >
                            ✕
                        </button>

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

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] h-full pointer-events-auto">
                            {/* LEFT */}
                            <div className="p-8 lg:p-10 flex flex-col justify-between lg:justify-center h-full">
                                <span className="mb-3 lg:mb-6 inline-flex px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400 text-emerald-400 text-[0.6rem] lg:text-xs font-extrabold tracking-widest uppercase w-fit">
                                    Beyond the Catalog
                                </span>

                                <h1
                                    className={`${playfair.className} text-3xl lg:text-[3.5rem] mb-3 lg:mb-5 leading-tight`}
                                >
                                    Your Wish Is <br />
                                    <span className="text-yellow-300">Yodha’s Wish.</span>
                                </h1>

                                <p className="opacity-80 max-w-[520px] mb-4 lg:mb-8 text-xs lg:text-base">
                                    Can't find the product? Tell us what you need and our global
                                    sourcing team will take care of it.
                                </p>

                                <div className="grid-cols-2 gap-4 max-w-[520px] hidden md:grid">
                                    <Benefit icon={<FaGlobe />} title="Global Sourcing" />
                                    <Benefit icon={<FaTruckLoading />} title="Direct Delivery" />
                                    <div className="col-span-2">
                                        <Benefit icon={<FaCheckCircle />} title="Purity Standards" />
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT (FORM) */}
                            <div
                                className="relative bg-black/25 p-8 flex flex-col justify-center border-l border-white/5 h-full"
                            >
                                <div className="space-y-5">
                                    <Field
                                        label="What are you looking for?"
                                        id="productReq"
                                        isTextArea
                                        value={productReq}
                                        onChange={(e: any) => setProductReq(e.target.value)}
                                        placeholder="e.g. Organic Black Garlic..."
                                    />
                                    <Field
                                        label="Name"
                                        id="userName"
                                        value={userName}
                                        onChange={(e: any) => setUserName(e.target.value)}
                                        placeholder="Your Name"
                                    />
                                    <Field
                                        label="WhatsApp Contact"
                                        id="userPhone"
                                        value={userPhone}
                                        onChange={(e: any) => setUserPhone(e.target.value)}
                                        placeholder="+91 98765 43210"
                                    />

                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full mt-2 bg-linear-to-br from-yellow-300 to-amber-500 text-[#020617] py-4 rounded-full font-extrabold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                                    >
                                        {isSubmitting ? "Sending..." : "Submit Request"} <FaWhatsapp />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

function Field({ label, id, value, onChange, isTextArea, placeholder }: any) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-yellow-300 text-xs font-extrabold tracking-widest uppercase">
                {label}
            </label>
            {isTextArea ? (
                <textarea
                    id={id}
                    rows={3}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 resize-none text-white focus:outline-none focus:border-yellow-300/50 transition-colors placeholder:text-white/20"
                />
            ) : (
                <input
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-300/50 transition-colors placeholder:text-white/20"
                />
            )}
        </div>
    );
}
