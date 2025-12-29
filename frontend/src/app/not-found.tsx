"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(7);

    useEffect(() => {
        // Timer to decrement countdown
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Timeout to redirect after 7 seconds
        const redirectTimeout = setTimeout(() => {
            router.push("/");
        }, 7000);

        // Cleanup intervals and timeouts on unmount
        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimeout);
        };
    }, [router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <div className="space-y-6 max-w-lg w-full">
                {/* Mascot or Image */}
                <div className="relative w-64 h-64 mx-auto animate-bounce-slow">
                    <Image
                        src="/assets/images/mascot/2.png"
                        alt="Page Not Found Mascot"
                        fill
                        className="object-contain drop-shadow-xl"
                        priority
                    />
                </div>

                <h1 className="text-6xl font-black text-orange-600">404</h1>
                <h2 className="text-2xl font-bold text-gray-900">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-600 text-lg">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-800 font-medium mb-4">
                        Redirecting to Homepage in{" "}
                        <span className="text-orange-600 font-bold text-xl inline-block min-w-[1ch]">
                            {countdown}
                        </span>{" "}
                        seconds...
                    </p>

                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-orange-500 transition-all duration-1000 ease-linear"
                            style={{ width: `${(countdown / 7) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                    <Home size={20} />
                    Go Home Now <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
}
