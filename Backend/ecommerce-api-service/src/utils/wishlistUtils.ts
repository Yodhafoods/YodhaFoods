import Wishlist, { IWishlistItem } from "../models/Wishlist.js";

/**
 * Merge Guest Wishlist into User Wishlist
 * Logic:
 * 1. Find Query: Guest Wishlist
 * 2. Find Query: User Wishlist
 * 3. Merge: Add unique items from Guest to User
 * 4. Delete Guest Wishlist (or clear items)
 */
export const mergeGuestWishlist = async (userId: string, guestId: string) => {
    try {
        const guestWishlist = await Wishlist.findOne({ guestId });
        if (!guestWishlist || guestWishlist.items.length === 0) return;

        let userWishlist = await Wishlist.findOne({ userId });

        if (!userWishlist) {
            // If user has no wishlist, convert guest wishlist to user wishlist
            // BUT we must be careful: if we just update guestWishlist.userId, it might conflict if we didn't check properly (though we did check).
            // Safer to just create new or update fields.
            guestWishlist.userId = userId as any; // Cast for TS if needed
            guestWishlist.guestId = null;
            await guestWishlist.save();
        } else {
            // Merge items
            const existingProductIds = new Set(
                userWishlist.items.map((i: IWishlistItem) => i.productId.toString())
            );

            const newItems = guestWishlist.items.filter(
                (i: IWishlistItem) => !existingProductIds.has(i.productId.toString())
            );

            if (newItems.length > 0) {
                userWishlist.items.push(...newItems);
                await userWishlist.save();
            }

            // Cleanup guest wishlist
            await Wishlist.deleteOne({ _id: guestWishlist._id });
        }
    } catch (error) {
        console.error("Error merging guest wishlist:", error);
        // Don't block login if merge fails, just log it
    }
};
