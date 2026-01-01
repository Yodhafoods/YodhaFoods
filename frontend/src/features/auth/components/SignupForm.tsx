import { useState } from "react";
import Link from "next/link";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions";
import GoogleButton from "@/features/auth/components/GoogleButton";

interface SignupFormProps {
    onSuccess?: () => void;
    onSwitchToSignin?: () => void;
}

export default function SignupForm({ onSuccess, onSwitchToSignin }: SignupFormProps) {
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

        try {
            await signup(form);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Signup failed", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                <p className="mt-2 text-gray-500">Join Yodhas Club</p>
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
                            type="text"
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
                    {onSwitchToSignin ? (
                        <button
                            type="button"
                            onClick={onSwitchToSignin}
                            className="text-[#FF7426] font-semibold hover:underline"
                        >
                            Login
                        </button>
                    ) : (
                        <Link
                            href="/auth/signin"
                            className="text-[#FF7426] font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </form>
        </div>
    );
}
