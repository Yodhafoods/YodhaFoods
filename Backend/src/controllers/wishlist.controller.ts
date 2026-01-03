import { Response } from "express";
import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";
import { GuestRequest } from "../middlewares/guest.middleware.js";

/**
 * Resolve wishlist owner (user OR guest)
 */
const resolveWishlistFilter = (req: GuestRequest) => {
    if (req.user) return { userId: req.user.id };
    if (req.guestId) return { guestId: req.guestId };
    return null;
};

/**
 * GET /api/wishlist
 */
export const getWishlist = async (req: GuestRequest, res: Response) => {
    try {
        const filter = resolveWishlistFilter(req);
        if (!filter) return res.json({ items: [] });

        const wishlist = await Wishlist.findOne(filter).populate(
            "items.productId",
            "name price discountPrice images stock isActive slug packs"
        );

        // Filter out null products (deleted ones)
        if (wishlist) {
            wishlist.items = wishlist.items.filter((item: any) => item.productId);
        }

        return res.json(wishlist ?? { items: [] });
    } catch (error) {
        console.error("Get wishlist error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

/**
 * POST /api/wishlist/add
 */
export const addToWishlist = async (req: GuestRequest, res: Response) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Invalid product" });
        }

        const filter = resolveWishlistFilter(req);
        if (!filter) {
            return res.status(400).json({ message: "Wishlist owner not resolved" });
        }

        const product = await Product.findById(productId);
        if (!product || !product.isActive) {
            return res.status(404).json({ message: "Product not found" });
        }

        let wishlist = await Wishlist.findOne(filter);

        if (!wishlist) {
            wishlist = await Wishlist.create({
                ...filter,
                items: [{ productId, addedAt: new Date() }],
            });
        } else {
            // Check if already exists
            const exists = wishlist.items.some(
                (item: any) => item.productId.toString() === productId
            );

            if (!exists) {
                wishlist.items.push({ productId, addedAt: new Date() });
                await wishlist.save();
            }
        }

        await wishlist.populate("items.productId", "name price discountPrice images stock isActive slug packs");

        return res.json({ message: "Added to wishlist", wishlist });
    } catch (error) {
        console.error("Add to wishlist error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

/**
 * DELETE /api/wishlist/remove/:productId
 */
export const removeFromWishlist = async (req: GuestRequest, res: Response) => {
    try {
        const { productId } = req.params;

        const filter = resolveWishlistFilter(req);
        if (!filter) {
            return res.status(400).json({ message: "Wishlist owner not resolved" });
        }

        const wishlist = await Wishlist.findOne(filter);
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.items = wishlist.items.filter(
            (item: any) => item.productId.toString() !== productId
        );

        await wishlist.save();
        await wishlist.populate("items.productId", "name price discountPrice images stock isActive slug packs");
        return res.json({ message: "Removed from wishlist", wishlist });
    } catch (error) {
        console.error("Remove from wishlist error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

/**
 * DELETE /api/wishlist/clear
 */
export const clearWishlist = async (req: GuestRequest, res: Response) => {
    try {
        const filter = resolveWishlistFilter(req);
        if (!filter) {
            return res.status(400).json({ message: "Wishlist owner not resolved" });
        }

        await Wishlist.deleteOne(filter);
        return res.json({ message: "Wishlist cleared" });
    } catch (error) {
        console.error("Clear wishlist error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
