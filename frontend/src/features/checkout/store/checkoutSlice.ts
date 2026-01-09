import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Address } from "@/types/address";
import { CartItem } from "@/features/cart/store/cartSlice";

interface CheckoutState {
    selectedAddress?: Address;
    couponCode?: string;
    discount: number;
    coinsApplied: number;
    coinDiscount: number;
}

const initialState: CheckoutState = {
    selectedAddress: undefined,
    couponCode: undefined,
    discount: 0,
    coinsApplied: 0,
    coinDiscount: 0,
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

        applyCoins(
            state,
            action: PayloadAction<{ coins: number; discount: number }>
        ) {
            state.coinsApplied = action.payload.coins;
            state.coinDiscount = action.payload.discount;
        },

        removeCoins(state) {
            state.coinsApplied = 0;
            state.coinDiscount = 0;
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
    applyCoins,
    removeCoins,
    resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

/** ==========================
 * Selectors
 * ========================== */

export const selectCheckout = (state: any): CheckoutState => state.checkout;

export const selectCheckoutTotals = createSelector(
    [selectCheckout, (state: any) => state.cart.items],
    (checkout, items: CartItem[]) => {
        const subtotal = items.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
        );

        const deliveryFee = subtotal > 299 ? 0 : 40;
        const discount = checkout.discount + checkout.coinDiscount;
        const total = subtotal + deliveryFee - discount;

        return { subtotal, deliveryFee, discount, total };
    }
);
