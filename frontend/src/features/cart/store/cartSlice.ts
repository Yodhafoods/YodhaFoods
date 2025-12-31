import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

export interface CartItem {
    id: string; // Composite ID for frontend
    productId: string; // Backend ID
    name: string;
    price: number;
    qty: number;
    image: string;
    pack?: string;
    stock?: number;
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
            // Backend returns: { items: [ { productId: { ... }, quantity: 123, pack: 'Standard', ... } ... ], ... }
            const items = (response?.items || []).map((item: any) => {
                const product = item.productId;
                const packLabel = item.pack;
                let price = product.price || 0;
                let stock = product.stock || 0;

                if (packLabel && product.packs) {
                    const foundPack = product.packs.find((p: any) => p.label === packLabel);
                    if (foundPack) {
                        price = foundPack.price;
                        stock = foundPack.stock;
                    }
                } else if (product.packs && product.packs.length > 0) {
                    price = product.packs[0].price;
                    stock = product.packs[0].stock;
                }

                return {
                    id: packLabel ? `${product._id}-${packLabel}` : product._id, // Composite ID for frontend uniqueness
                    productId: product._id, // Keep original ID for API calls
                    name: packLabel ? `${product.name} (${packLabel})` : product.name,
                    price: price,
                    qty: item.quantity,
                    image: product.images?.[0]?.url || "",
                    pack: packLabel,
                    stock: stock // Useful for UI limits
                };
            });
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
            await api.post<any>("/api/cart/add", {
                productId: product.productId || product.id, // Handle if productId is missing (legacy)
                quantity,
                pack: product.pack
            });
            return { product, quantity };
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to add item");
        }
    }
);

export const updateCartItemQty = createAsyncThunk(
    "cart/updateCartItemQty",
    async ({ productId, quantity, pack }: { productId: string; quantity: number; pack?: string }, { rejectWithValue }) => {
        try {
            await api.put<any>("/api/cart/update", { productId, quantity, pack });
            return { productId, quantity, pack };
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to update quantity");
        }
    }
);

export const removeItemFromCart = createAsyncThunk(
    "cart/removeItemFromCart",
    async ({ productId, pack }: { productId: string; pack?: string }, { rejectWithValue }) => {
        try {
            const query = pack ? `?pack=${encodeURIComponent(pack)}` : '';
            await api.del<any>(`/api/cart/remove/${productId}${query}`);
            return { productId, pack };
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
            const { productId, quantity, pack } = action.payload;
            // Find by composite ID logic: if item has pack, id was set to `id-pack`.
            // But here we rely on the `id` property in state items.
            // If reducers used `id` as key, we can find by that.
            // Wait, fetchCartItems sets `id` to composite.
            // The action payload from component needs to pass the correct ID or we reconstruct it?
            // Safer to find by matching productId and pack.
            const item = state.items.find(i => i.productId === productId && i.pack === pack);
            if (item) {
                item.qty = quantity;
            }
        });

        // Remove
        builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
            const { productId, pack } = action.payload;
            state.items = state.items.filter(i => !(i.productId === productId && i.pack === pack));
        });

        // Clear
        builder.addCase(clearCartItems.fulfilled, (state) => {
            state.items = [];
        });
    },
});

export default cartSlice.reducer;

