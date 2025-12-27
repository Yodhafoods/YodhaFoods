'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/features/auth/context/AuthContext";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import DashboardOverview from "@/features/admin/components/DashboardOverview";
import ProductsView from "@/features/admin/components/ProductsView";
import CategoriesView from "@/features/admin/components/CategoriesView";
import OrdersView from "@/features/admin/components/OrdersView";
import CouponsView from "@/features/admin/components/CouponsView";
import KitchenView from "@/features/admin/components/KitchenView";

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                router.replace('/');
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardOverview />;
            case 'categories':
                return <CategoriesView />;
            case 'products':
                return <ProductsView />;
            case 'orders':
                return <OrdersView />;
            case 'coupons':
                return <CouponsView />;
            case 'kitchen':
                return <KitchenView />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <div className="flex min-h-screen bg-white text-gray-900">
            {/* Sidebar */}
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
