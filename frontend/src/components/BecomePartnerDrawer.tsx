"use client";

import React, { useRef, MouseEvent, useState, useEffect } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { closeDrawer } from "@/features/ui/store/uiSlice";
import { toast } from "sonner";
import { usePost } from "@/hooks/usePost";

/* ---------------- Fonts ---------------- */
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "600", "800"],
    variable: "--font-jakarta"
});

export default function BecomePartnerDrawer() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.ui.activeDrawer === "becomePartner");
    const containerRef = useRef<HTMLDivElement>(null);
    const { postData, isLoading } = usePost("/partner/join"); // Adjust API path if needed

    // Form State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        city: "",
        state: "",
        associationType: "",
        source: "",
        agreeToTerms: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }));
    };

    /* ---------- Handlers ---------- */
    const handleSubmit = async () => {
        if (!formData.firstName || !formData.email || !formData.mobile || !formData.city || !formData.state || !formData.associationType) {
            toast.error("Please fill in all required fields marked with *");
            return;
        }

        try {
            await postData(formData);
            toast.success("Request submitted successfully! We'll contact you soon.");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                city: "",
                state: "",
                associationType: "",
                source: "",
                agreeToTerms: false
            });
            dispatch(closeDrawer());
        } catch (error) {
            console.error("Submission error", error);
            // Toast handled by usePost
        }
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
        <div className={`${jakarta.variable} font-sans`}>
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
                    className={`w-full max-w-[600px] px-2 md:px-0 relative transition-transform duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] transform ${isOpen ? "-translate-y-8" : "translate-y-full"}`}
                >
                    {/* Main Card */}
                    <div
                        className="relative h-[85vh] md:h-[90vh] rounded-[40px] overflow-hidden bg-white text-gray-800 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-[#8cc63f] p-6 text-center relative shrink-0">
                            <button
                                onClick={() => dispatch(closeDrawer())}
                                className="absolute top-6 right-6 z-50 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                ✕
                            </button>
                            <h2 className="text-2xl font-bold text-white">Become a Distributor</h2>
                            <p className="text-white/80 text-sm mt-1">Please share your details with us</p>
                        </div>

                        {/* Scrollable Form Area */}
                        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-4">
                            <Field id="firstName" label="First name *" value={formData.firstName} onChange={handleChange} placeholder="Start typing..." />
                            <Field id="lastName" label="Last name" value={formData.lastName} onChange={handleChange} placeholder="Start typing..." />
                            <Field id="email" label="Email *" value={formData.email} onChange={handleChange} placeholder="Start typing..." type="email" />
                            <Field id="mobile" label="Mobile *" value={formData.mobile} onChange={handleChange} placeholder="Enter number" type="tel" />

                            <Field id="city" label="City name *" value={formData.city} onChange={handleChange} placeholder="Start typing..." />
                            <Field id="state" label="State name *" value={formData.state} onChange={handleChange} placeholder="Start typing..." />

                            <SelectField
                                id="associationType"
                                label="How you want to associate with us *"
                                value={formData.associationType}
                                onChange={handleChange}
                                options={["Distributor", "Retailer", "Super Stockist", "Institutional Sales", "Other"]}
                            />

                            <SelectField
                                id="source"
                                label="How did you hear about us?"
                                value={formData.source}
                                onChange={handleChange}
                                options={["Social Media", "Website", "friend/Family", "Advertisement", "Other"]}
                            />

                            <div className="pt-2">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={handleCheckboxChange}
                                        className="mt-1 w-4 h-4 text-[#8cc63f] border-gray-300 rounded focus:ring-[#8cc63f]"
                                    />
                                    <span className="text-xs text-gray-500">I agree to receive communication on newsletters, promotional content, offers and events & calls.</span>
                                </label>
                            </div>
                        </div>

                        {/* Footer / Submit Button */}
                        <div className="p-6 border-t border-gray-100 shrink-0 bg-white">
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full bg-[#1e2a3b] text-white py-4 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#2c3e50] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------------- Helper Components ---------------- */
function Field({ label, id, value, onChange, placeholder, type = "text" }: any) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-gray-600 text-xs font-semibold">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#8cc63f] focus:ring-1 focus:ring-[#8cc63f] transition-all text-sm"
            />
        </div>
    );
}

function SelectField({ label, id, value, onChange, options }: any) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-gray-600 text-xs font-semibold">
                {label}
            </label>
            <div className="relative">
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:border-[#8cc63f] focus:ring-1 focus:ring-[#8cc63f] transition-all text-sm appearance-none cursor-pointer"
                >
                    <option value="" disabled>Click to select</option>
                    {options.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                    ▼
                </div>
            </div>
        </div>
    )
}
