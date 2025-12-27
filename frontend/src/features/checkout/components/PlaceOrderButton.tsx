"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectCheckoutTotals, resetCheckout } from "@/features/checkout/store/checkoutSlice";
import { clearCartItems } from "@/features/cart/store/cartSlice";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRazorpay } from "@/hooks/useRazorpay";
import { api } from "@/lib/api";

export default function PlaceOrderButton() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user } = useAuth();
    const { displayRazorpay } = useRazorpay();
    const [loading, setLoading] = useState(false);

    const items = useAppSelector((state) => state.cart.items);
    const selectedAddress = useAppSelector((state) => state.checkout.selectedAddress);

    // We might need totals for validation, though logic just checks items.length

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
                        router.push(`/profile`);
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
        <button
            disabled={!selectedAddress || items.length === 0 || loading}
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition cursor-pointer"
        >
            {loading ? "Processing..." : "Place Order"}
        </button>
    );
}
