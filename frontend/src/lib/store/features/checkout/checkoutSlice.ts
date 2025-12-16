import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "@/types/address";
import { CartItem } from "../cart/cartSlice";

interface CheckoutState {
    selectedAddress?: Address;
    couponCode?: string;
    discount: number;
}

const initialState: CheckoutState = {
    selectedAddress: undefined,
    couponCode: undefined,
    discount: 0,
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setSelectedAddress(state, action: PayloadAction<Address>) {
            state.selectedAddress = action.payload;
        },

        applyCoupon(
            state,
            action: PayloadAction<{ code: string; discount: number }>
        ) {
            state.couponCode = action.payload.code;
            state.discount = action.payload.discount;
        },

        removeCoupon(state) {
            state.couponCode = undefined;
            state.discount = 0;
        },

        resetCheckout() {
            return initialState;
        },
    },
});

export const {
    setSelectedAddress,
    applyCoupon,
    removeCoupon,
    resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

/** ==========================
 * Selectors
 * ========================== */

export const selectCheckout = (state: any) => state.checkout;

export const selectCheckoutTotals = (
    state: any,
    items: CartItem[]
) => {
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const deliveryFee = subtotal > 500 ? 0 : 40;
    const discount = state.checkout.discount;
    const total = subtotal + deliveryFee - discount;

    return { subtotal, deliveryFee, discount, total };
};
