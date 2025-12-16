"use client";

import AddressSection from "../components/checkout/AddressSection";
import CouponSection from "../components/checkout/CouponSection";
import OrderItemsReview from "../components/checkout/OrderItemsReview";
import PriceSummary from "../components/checkout/PriceSummary";



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
