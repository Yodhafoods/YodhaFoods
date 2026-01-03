"use client";

import { useAuth } from "@/features/auth/context/AuthContext";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function ProfileDropdown() {
    const { logout, user } = useAuth();

    return (
        <div className="relative group z-50">
            <Link
                href="/profile"
                className="cursor-pointer hover:bg-gray-100 transition-all duration-100 p-2 rounded-full block"
            >
                <FaUser size={22} />
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1">
                    <Link
                        href="/profile"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                    >
                        Profile
                    </Link>
                    <Link
                        href="/profile"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                    >
                        Orders
                    </Link>

                    {/* Show Dashboard only if user is ADMIN (case-insensitive check) */}
                    {user && (user.role === 'ADMIN' || user.role === 'admin') && (
                        <Link
                            href="/admin/dashboard"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}

                    <div className="h-px bg-gray-100 my-1"></div>

                    {user ? (
                        <button
                            onClick={() => logout()}
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            href="/auth/signin"
                            className="block px-4 py-2.5 text-sm text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
