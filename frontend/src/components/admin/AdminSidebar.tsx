"use client";

import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingBag,
    TicketPercent,
    BarChart3,
    LogOut
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
    const { logout } = useAuth();
    const router = useRouter();

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "products", label: "Products", icon: Package },
        { id: "categories", label: "Categories", icon: Tags },
        { id: "orders", label: "Orders", icon: ShoppingBag },
        { id: "coupons", label: "Coupons", icon: TicketPercent },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
    ];

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 shadow-lg h-screen sticky top-0 flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                    Yodha Admin
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium cursor-pointer ${isActive
                                ? "bg-orange-100 text-orange-600"
                                : "text-gray-600  hover:bg-orange-100 cursor-pointer"
                                }`}
                        >
                            <Icon size={20} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t dark:border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
}
