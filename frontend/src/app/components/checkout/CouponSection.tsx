"use client";

import { applyCoupon, removeCoupon } from "@/lib/store/features/checkout/checkoutSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useState } from "react";

export default function CouponSection() {
    const [code, setCode] = useState("");
    const dispatch = useAppDispatch();
    const couponCode = useAppSelector((state) => state.checkout.couponCode);

    return (
        <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold text-lg mb-4">Apply Coupon</h2>

            {!couponCode ? (
                <div className="flex gap-3">
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 border p-2 rounded"
                    />
                    <button
                        onClick={() =>
                            dispatch(applyCoupon({ code: code || "SAVE50", discount: 50 }))
                        }
                        className="bg-orange-600 text-white px-4 rounded"
                    >
                        Apply
                    </button>
                </div>
            ) : (
                <div className="text-green-700 text-sm">
                    Coupon <b>{couponCode}</b> applied
                    <button
                        onClick={() => dispatch(removeCoupon())}
                        className="ml-3 text-orange-600"
                    >
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
}
