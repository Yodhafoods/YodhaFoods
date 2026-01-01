import { useState } from "react";
import Link from "next/link";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions";
import GoogleButton from "@/features/auth/components/GoogleButton";

interface SigninFormProps {
    onSuccess?: () => void;
    onSwitchToSignup?: () => void;
    isDrawer?: boolean;
}

export default function SigninForm({ onSuccess, onSwitchToSignup, isDrawer = false }: SigninFormProps) {
    const { signin } = useAuthActions();

    const [form, setForm] = useState({ identifier: "", password: "" });
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            await signin(form, !isDrawer);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Signin failed", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="mt-2 text-gray-500">Please login to your account</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Email or Mobile No. (10-digits)"
                            value={form.identifier}
                            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7426] focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF7426] focus:border-transparent outline-none transition-all"
                            required
                        />
                        {!isDrawer && (
                            <div className="flex justify-end mt-1">
                                <Link href="/auth/forgot-password" className="text-xs text-gray-500 hover:text-[#FF7426]">
                                    Forgot password?
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-[#FF7426] hover:bg-[#ff6818] text-white py-3 cursor-pointer rounded-xl font-semibold shadow-lg shadow-orange-200 transition-all duration-200 ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
                        }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-50 text-gray-500">Or Login with</span>
                    </div>
                </div>

                <GoogleButton text="Google" />

                <div className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    {onSwitchToSignup ? (
                        <button
                            type="button"
                            onClick={onSwitchToSignup}
                            className="text-[#FF7426] cursor-pointer font-semibold hover:underline"
                        >
                            Signup
                        </button>
                    ) : (
                        <Link
                            href="/auth/signup"
                            className="text-[#FF7426] cursor-pointer font-semibold hover:underline"
                        >
                            Signup
                        </Link>
                    )}
                </div>
            </form>
        </div>
    );
}
