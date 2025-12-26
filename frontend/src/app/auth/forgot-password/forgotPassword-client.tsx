"use client";

import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordClient() {
    const [form, setForm] = useState({ email: "" });
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        toast.info("Feature is coming soon");
        setLoading(false);
    }

    return (
        <div className="flex min-h-screen w-full bg-gray-50 px-4 py-6 lg:px-10 lg:pt-2 lg:pb-10 flex-col-reverse lg:flex-row gap-6 lg:gap-0">
            {/* Left Side - Mascot & Promo */}
            <div className="flex w-full lg:w-1/2 bg-linear-to-b from-orange-600 to-orange-400 items-center justify-center relative overflow-hidden rounded-[3rem] p-8 lg:p-12 min-h-[500px] lg:min-h-auto">
                <div className="relative z-10 text-center max-w-lg">
                    <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                        Rooted in Legacy - Guided by Tradition.
                    </h1>
                    <p className="text-white/90 text-lg mb-8">
                        Discover nutritious and natural superfood powders. <br />Good health starts with good choices.
                    </p>
                    <div className="relative mx-auto w-80 h-80">
                        {/* Mascot Image */}
                        <Image
                            src="/assets/images/mascot/1.png"
                            alt="Yodha Foods Mascot"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Background decorative circles/blobs if needed, for now plain orange is clean as per ref mostly */}
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <Image
                                src="/logo.png"
                                alt="Yodha Foods Logo"
                                width={150}
                                height={150}
                                className="h-20 w-auto"
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
                        <p className="mt-2 text-gray-500">Enter your email address and we will send you a password reset link.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7426] focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-[#FF7426] hover:bg-[#ff6818] text-white py-3 cursor-pointer rounded-xl font-semibold shadow-lg shadow-orange-200 transition-all duration-200 ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
                                }`}
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                        <div className="text-center text-sm text-gray-500">
                            Remember your password?{" "}
                            <Link
                                href="/auth/signin"
                                className="text-[#FF7426] cursor-pointer font-semibold hover:underline"
                            >
                                Signin
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
