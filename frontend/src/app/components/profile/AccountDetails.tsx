"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountDetails() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.replace("/auth/signin");
        }
    }, [loading, user, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center px-4 py-10 bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-6">Your Profile</h2>

                {/* User Card */}
                <div className="space-y-4 border p-5 rounded-xl bg-gray-50">
                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-semibold">{user.name}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold">{user.email}</p>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="
            w-full mt-6 bg-red-600 hover:bg-red-700 
            text-white py-3 rounded-lg font-semibold 
            transition cursor-pointer
          "
                >
                    Logout
                </button>
            </div>
        </div>
    );
}