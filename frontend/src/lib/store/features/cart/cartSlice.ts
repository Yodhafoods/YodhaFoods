import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/app/lib/api";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    qty: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CartState = {
    items: [],
    status: 'idle',
    error: null,
};

// --- Async Thunks ---

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<any>("/api/cart");
            // Backend returns: { items: [ { productId: { ... }, quantity: 123, _id: "..." } ... ], ... }
            // or { items: [] } if empty/not found.
            // Map to CartItem[]
            const items = (response?.items || []).map((item: any) => ({
                id: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                qty: item.quantity,
                image: item.productId.images?.[0]?.url || "",
            }));
            return items;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to fetch cart");
        }
    }
);

export const addItemToCart = createAsyncThunk(
    "cart/addItemToCart",
    async ({ product, quantity }: { product: CartItem; quantity: number }, { rejectWithValue }) => {
        try {
            await api.post<any>("/api/cart/add", { productId: product.id, quantity });
            // Since backend might not return populated data, we use the passed `product` to update state
            return { product, quantity };
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to add item");
        }
    }
);

export const updateCartItemQty = createAsyncThunk(
    "cart/updateCartItemQty",
    async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
        try {
            await api.put<any>("/api/cart/update", { productId, quantity });
            return { productId, quantity };
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to update quantity");
        }
    }
);

export const removeItemFromCart = createAsyncThunk(
    "cart/removeItemFromCart",
    async (productId: string, { rejectWithValue }) => {
        try {
            await api.del<any>(`/api/cart/remove/${productId}`);
            return productId;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to remove item");
        }
    }
);

export const clearCartItems = createAsyncThunk(
    "cart/clearCartItems",
    async (_, { rejectWithValue }) => {
        try {
            await api.del<any>("/api/cart/clear");
            return;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to clear cart");
        }
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // We can keep these for optimistic updates if needed, or remove them.
        // For now, let's rely on async thunks.
        // But wait, addItemToCart response doesn't have product details.
        // So we MUST accept the product details in the action to update the state effectively
        // without a refetch, OR we just refetch.
        // Let's add a `addProductDetails` payload to `addItemToCart` thunk call in the component.
    },
    extraReducers: (builder) => {
        // Fetch
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // Add
        builder
            .addCase(addItemToCart.fulfilled, (state, action) => {
                const { product, quantity } = action.payload;
                const existItem = state.items.find((x) => x.id === product.id);
                if (existItem) {
                    existItem.qty += quantity;
                } else {
                    state.items.push({ ...product, qty: quantity });
                }
            });

        // Update Qty
        builder.addCase(updateCartItemQty.fulfilled, (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(i => i.id === productId);
            if (item) {
                item.qty = quantity;
            }
        });

        // Remove
        builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(i => i.id !== productId);
        });

        // Clear
        builder.addCase(clearCartItems.fulfilled, (state) => {
            state.items = [];
        });
    },
});

export default cartSlice.reducer;

