"use client";

import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { useRazorpay } from "@/hooks/useRazorpay";
import { clearCartItems } from "@/features/cart/store/cartSlice";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { resetCheckout, selectCheckoutTotals } from "../store/checkoutSlice";
import FreeDeliveryProgressBar from "@/features/cart/components/FreeDeliveryProgressBar";
import CoinRedemptionSection from "./CoinRedemptionSection";

export default function PriceSummary() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cart.items);
    const totals = useAppSelector((state) =>
        selectCheckoutTotals(state, items)
    );
    const selectedAddress = useAppSelector(
        (state) => state.checkout.selectedAddress
    );
    const coinsApplied = useAppSelector((state) => state.checkout.coinsApplied);
    const { user } = useAuth(); // Use AuthContext instead of Redux

    const router = useRouter();
    const { displayRazorpay } = useRazorpay();
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select a delivery address");
            return;
        }

        try {
            setLoading(true);

            // 1. Create Order
            const orderRes = await api.post<{ order: any }>("/api/orders", {
                addressId: selectedAddress._id,
                coinsApplied,
            });
            const orderId = orderRes.order._id;

            // 2. Create Razorpay Order
            const paymentRes = await api.post<{
                razorpayOrderId: string;
                amount: number;
                currency: string;
                key: string;
            }>("/api/payments/create-razorpay-order", { orderId });

            // 3. Open Razorpay Modal
            const options = {
                key: paymentRes.key,
                amount: paymentRes.amount,
                currency: paymentRes.currency,
                name: "Yodha Foods",
                description: `Order #${orderId}`,
                // image: "/logo.png", // Add logo if available
                order_id: paymentRes.razorpayOrderId,
                handler: async function (response: any) {
                    try {
                        // 4. Verify Payment on Success
                        const verifyRes = await api.post("/api/payments/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId,
                        });

                        toast.success("Order placed successfully!");
                        // Clear cart locally
                        dispatch(clearCartItems());
                        dispatch(resetCheckout());
                        router.push(`/profile`); // Redirect to profile page (orders tab is default)
                    } catch (verifyError) {
                        console.error("Payment verification failed", verifyError);
                        toast.error("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: user?.name || "",
                    email: user?.email || "",
                    contact: selectedAddress.phone || "",
                },
                notes: {
                    address: `${selectedAddress.addressLine1}, ${selectedAddress.city}`,
                },
                theme: {
                    color: "#ea580c", // orange-600
                },
            };

            await displayRazorpay(options);

        } catch (error: any) {
            console.error("Order placement failed", error);
            const msg = error?.body?.message || "Failed to place order";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow sticky top-24">
            <h2 className="font-semibold text-lg mb-4">Price Summary</h2>

            <div className="mb-4">
                <FreeDeliveryProgressBar subtotal={totals.subtotal} />
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totals.subtotal}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹{totals.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{totals.discount}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{totals.total}</span>
                </div>
            </div>

            {/* Coin Redemption */}
            <div className="mb-6 border-t border-b border-gray-100 py-4">
                <CoinRedemptionSection />
            </div>

            <button
                disabled={!selectedAddress || items.length === 0 || loading}
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition cursor-pointer"
            >
                {loading ? "Processing..." : "Place Order"}
            </button>
        </div>
    );
}
