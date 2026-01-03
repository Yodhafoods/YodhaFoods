import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import { toast } from "sonner";

export interface WishlistItem {
    productId: any; // Full product object populated
    addedAt: string;
}

interface WishlistState {
    items: WishlistItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: WishlistState = {
    items: [],
    status: 'idle',
    error: null,
};

// Async Thunks
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<any>("/api/wishlist");
            return response?.items || [];
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to fetch wishlist");
        }
    }
);

export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async (product: any, { rejectWithValue, dispatch }) => {
        try {
            // Optimistic update handled by builder or manually? 
            // We usually fetch after add or return the updated list.
            // Backend returns { message, wishlist }
            const response = await api.post<any>("/api/wishlist/add", { productId: product._id });
            return response.wishlist.items;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to add to wishlist");
        }
    }
);

export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeFromWishlist",
    async (productId: string, { rejectWithValue }) => {
        try {
            await api.del<any>(`/api/wishlist/remove/${productId}`);
            return productId;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to remove from wishlist");
        }
    }
);

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        clearLocalWishlist: (state) => {
            state.items = [];
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        // Fetch
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });

        // Add
        builder
            .addCase(addToWishlist.fulfilled, (state, action) => {
                // The payload here is the full items list from backend to ensure consistency
                // OR we can just push if we trust the input. 
                // Let's use the payload from backend for single source of truth
                // Wait, if payload is items list:
                state.items = action.payload;
                toast.success("Added to wishlist");
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                toast.error(action.payload as string || "Failed to add");
            });

        // Remove
        builder
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.productId._id !== action.payload);
                toast.success("Removed from wishlist");
            });
    }
});

export const { clearLocalWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
