"use client";

import { useAuth } from "@/features/auth/context/AuthContext";
import { User, ShoppingBag, MapPin, LogOut } from "lucide-react";
import { RiCoupon2Line } from "react-icons/ri";

interface SidebarProps {
    active: "orders" | "addresses" | "account" | "offers";
    setActive: (v: "orders" | "addresses" | "account" | "offers") => void;
}

export default function Sidebar({ active, setActive }: SidebarProps) {
    const { logout } = useAuth();
    const menuItems = [
        {
            id: "orders",
            label: "My Orders",
            icon: ShoppingBag,
            value: "orders" as const,
        },
        {
            id: "addresses",
            label: "Addresses",
            icon: MapPin,
            value: "addresses" as const,
        },
        {
            id: "offers",
            label: "Offers & Coupons",
            icon: RiCoupon2Line,
            value: "offers" as const,
        },
        {
            id: "account",
            label: "Profile",
            icon: User,
            value: "account" as const,
        },
    ];

    return (
        <aside className="w-auto md:w-72 bg-white rounded-xl shadow-sm border border-gray-100 h-fit overflow-hidden sticky top-24 z-10 shrink-0">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 hidden md:block">My Account</h2>
            </div>

            <nav className="p-4 flex flex-col space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActive(item.value)}
                        className={`w-full flex items-center justify-center md:justify-start gap-4 p-3 md:px-6 md:py-4 rounded-lg cursor-pointer transition-all duration-200 group ${active === item.value
                            ? "bg-orange-50 text-orange-600 font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 "
                            }`}
                    >
                        <item.icon
                            className={`w-5 h-5 ${active === item.value ? "text-orange-600" : "text-gray-400 group-hover:text-gray-600"
                                }`}
                        />
                        <span className="text-[15px] hidden md:block">{item.label}</span>
                    </button>
                ))}

                <div className="pt-4 mt-2 border-t border-gray-100">
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center md:justify-start gap-4 p-3 md:px-6 md:py-4 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                    >
                        <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                        <span className="text-[15px] hidden md:block">Sign Out</span>
                    </button>
                </div>
            </nav>
        </aside>
    );
}
