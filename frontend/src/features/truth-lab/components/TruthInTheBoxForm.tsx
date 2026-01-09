"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface TruthInTheBoxFormProps {
    selectedProduct: Product | null;
    consumptionKg: number;
}

export const TruthInTheBoxForm = ({
    selectedProduct,
    consumptionKg,
}: TruthInTheBoxFormProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        whatsapp: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedProduct) {
            toast.error("Please select a product first");
            return;
        }
        if (consumptionKg <= 0) {
            toast.error("Please check your consumption amount");
            return;
        }

        setLoading(true);
        try {
            await api.post("/api/truth-lab/submit", {
                name: "Truth Seeker",
                ...formData,
                productId: selectedProduct._id,
                consumptionKg,
            });
            toast.success("Report sent successfully! Check your email.");
            setFormData({ email: "", whatsapp: "" });
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to send report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mb-[80px] rounded-[40px] bg-[#0f2f2b] px-[40px] py-[80px] text-center text-[#f6f1e7]">
            <h2 className="mb-[15px] font-[family-name:var(--font-playfair)] text-[2.5rem] text-[#e6c36b]">Truth in the Box</h2>
            <p>
                Unlock your personalized "Nutritional Savings Report" and the
                Molecular Blueprint PDF.
            </p>
            <form className="mx-auto mt-[40px] flex max-w-[500px] flex-col gap-[15px]" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-[100px] border-none bg-[#faf6ec] p-[20px] text-[1rem] text-[#0f2f2b] outline-none"
                />
                <input
                    type="tel"
                    placeholder="WhatsApp Number"
                    required
                    pattern="[0-9]{10}"
                    title="Enter 10 digit number"
                    value={formData.whatsapp}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData({ ...formData, whatsapp: val });
                    }}
                    className="rounded-[100px] border-none bg-[#faf6ec] p-[20px] text-[1rem] text-[#0f2f2b] outline-none"
                />
                <button type="submit" className="cursor-pointer rounded-[100px] border-none bg-[#c79a2d] p-[20px] font-extrabold uppercase text-white shadow-[0_10px_20px_#b88a24] transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:bg-[#c79a2d]/70" disabled={loading}>
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin h-5 w-5" /> Generating...
                        </span>
                    ) : "Get My Report"}
                </button>
            </form>
            <p style={{ marginTop: "20px", fontSize: "0.8rem", opacity: 0.6 }}>
                Join Truth Seekers
            </p>
        </section>
    );
};
