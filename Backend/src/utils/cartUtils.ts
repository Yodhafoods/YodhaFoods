import Cart from "../models/Cart.js";

export const mergeGuestCart = async (userId: string, guestId: string) => {
    if (!userId || !guestId) return;

    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ userId });

        if (guestCart) {
            if (!userCart) {
                // Assign guest cart to user
                guestCart.userId = userId;
                guestCart.guestId = null;
                await guestCart.save();
            } else {
                // Merge items
                guestCart.items.forEach((gItem: any) => {
                    const uItem = userCart.items.find(
                        (i: any) => i.productId.toString() === gItem.productId.toString()
                    );

                    if (uItem) {
                        uItem.quantity += gItem.quantity;
                    } else {
                        userCart.items.push(gItem);
                    }
                });

                await userCart.save();
                await Cart.deleteOne({ guestId });
            }
        }
    } catch (error) {
        console.error("Error merging guest cart:", error);
    }
};
