"use client";

import AddressSection from "@/features/checkout/components/AddressSection";
import CouponSection from "@/features/checkout/components/CouponSection";
import OrderItemsReview from "@/features/checkout/components/OrderItemsReview";
import PriceSummary from "@/features/checkout/components/PriceSummary";
import PlaceOrderButton from "@/features/checkout/components/PlaceOrderButton";


export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">
                    <AddressSection />
                    <OrderItemsReview />
                </div>

                {/* RIGHT SIDE */}
                <div className="lg:col-span-1 space-y-6">
                    <PriceSummary />
                    <CouponSection />
                </div>
            </div>
        </div>
    );
}
