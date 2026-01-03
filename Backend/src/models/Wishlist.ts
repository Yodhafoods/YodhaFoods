import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWishlistItem {
    productId: Types.ObjectId;
    addedAt: Date;
}

export interface IWishlist extends Document {
    userId?: Types.ObjectId | null;
    guestId?: string | null;
    items: IWishlistItem[];
    createdAt: Date;
    updatedAt: Date;
}

const WishlistSchema = new Schema<IWishlist>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        guestId: {
            type: String,
            default: null,
        },

        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                addedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/**
 * One wishlist per user
 */
WishlistSchema.index(
    { userId: 1 },
    {
        unique: true,
        partialFilterExpression: { userId: { $exists: true, $ne: null } },
    }
);

/**
 * One wishlist per guest
 */
WishlistSchema.index(
    { guestId: 1 },
    {
        unique: true,
        partialFilterExpression: { guestId: { $exists: true, $ne: null } },
    }
);

const Wishlist = mongoose.models.Wishlist || mongoose.model<IWishlist>("Wishlist", WishlistSchema);
export default Wishlist;
