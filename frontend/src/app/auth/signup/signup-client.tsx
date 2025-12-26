"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthActions } from "@/hooks/useAuthActions";
import GoogleButton from "../../components/GoogleButton";

export default function SignupClient() {
  const { signup } = useAuthActions();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await signup(form);

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50 px-4 py-6 lg:px-10 lg:pt-2 lg:pb-10 flex-col-reverse lg:flex-row gap-6 lg:gap-0">
      {/* Left Side - Mascot & Promo */}
      <div className="flex w-full lg:w-1/2 bg-linear-to-b from-orange-600 to-orange-400 items-center justify-center relative overflow-hidden rounded-[3rem] p-8 lg:p-12 min-h-[500px] lg:min-h-auto">
        <div className="relative z-10 text-center max-w-lg">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Rooted in Legacy - Guided by Tradition.</h1>
          <p className="text-white/90 text-base lg:text-lg mb-8">
            Discover nutritious and natural superfood powders. <br />Good health starts with good choices.
          </p>
          <div className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80">
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
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Yodha Foods Logo"
                width={150}
                height={50}
                className="h-20 w-auto"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
            <p className="mt-2 text-gray-500">From Nature, For Your Strength. Join Yodhas Club</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7426] focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7426] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <input
                  type="text" // using text to prevent spinner but validate as number
                  inputMode="numeric"
                  placeholder="Mobile Number (10 digits) *"
                  value={form.contact_number}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setForm({ ...form, contact_number: val });
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7426] focus:border-transparent outline-none transition-all"
                  required
                  pattern="\d{10}"
                  title="Please enter a valid 10-digit mobile number"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email address *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7426] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password *"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7426] focus:border-transparent outline-none transition-all"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#FF7426] hover:bg-[#ff6818] text-white py-3 cursor-pointer rounded-xl font-semibold shadow-lg shadow-orange-200 transition-all duration-200 ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
                }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or Sign up with</span>
              </div>
            </div>

            <GoogleButton text="Google" />

            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-[#FF7426] font-semibold hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
