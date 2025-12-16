"use client";

import { selectCheckoutTotals } from "@/lib/store/features/checkout/checkoutSlice";
import { useAppSelector } from "@/lib/store/hooks";


export default function PriceSummary() {
    const items = useAppSelector((state) => state.cart.items);
    const totals = useAppSelector((state) =>
        selectCheckoutTotals(state, items)
    );
    const selectedAddress = useAppSelector(
        (state) => state.checkout.selectedAddress
    );

    return (
        <div className="bg-white rounded-xl p-6 shadow sticky top-24">
            <h2 className="font-semibold text-lg mb-4">Price Summary</h2>

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

            <button
                disabled={!selectedAddress || items.length === 0}
                className="w-full mt-6 bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold"
            >
                Place Order
            </button>
        </div>
    );
}
