"use client";

import { CreditCard, Package, ShoppingBag, Users } from "lucide-react";

export default function DashboardOverview() {
    const stats = [
        { label: "Total Sales", value: "₹1,50,000+", change: "+12%", icon: CreditCard, color: "bg-orange-100 text-orange-600" },
        { label: "Products Sold", value: "1,250+", change: "+5%", icon: Package, color: "bg-green-100 text-green-600" },
        { label: "New Orders", value: "45", change: "Pending", icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
        { label: "Active Users", value: "500+", change: "Online", icon: Users, color: "bg-purple-100 text-purple-600" },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold dark:text-white">Dashboard Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                                    <h3 className="text-2xl font-bold dark:text-white mt-2">{stat.value}</h3>
                                    <p className="text-xs font-medium text-gray-500 mt-1">{stat.change}</p>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Placeholder for Recent Orders or Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 min-h-[300px]">
                    <h3 className="font-bold mb-4 dark:text-white">Recent Orders</h3>
                    <div className="text-center text-gray-400 flex items-center justify-center h-full pb-10">
                        Chart Placeholder
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 min-h-[300px]">
                    <h3 className="font-bold mb-4 dark:text-white">Top Selling Products</h3>
                    <div className="text-center text-gray-400 flex items-center justify-center h-full pb-10">
                        List Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
}
