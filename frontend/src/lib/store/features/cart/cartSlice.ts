import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    qty: number;
    image: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const itemConfig = action.payload;
            const existItem = state.items.find((x) => x.id === itemConfig.id);

            if (existItem) {
                state.items = state.items.map((x) =>
                    x.id === existItem.id ? { ...existItem, qty: existItem.qty + 1 } : x
                );
            } else {
                state.items.push({ ...itemConfig, qty: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((x) => x.id !== action.payload);
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; qty: number }>
        ) => {
            const { id, qty } = action.payload;
            const existItem = state.items.find((x) => x.id === id);
            if (existItem) {
                if (qty <= 0) {
                    state.items = state.items.filter((x) => x.id !== id);
                } else {
                    existItem.qty = qty;
                }
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
