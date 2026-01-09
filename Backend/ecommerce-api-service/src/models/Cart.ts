import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
  pack?: string;
  appliedCoins?: number;
  coinDiscount?: number;
}

export interface ICart extends Document {
  userId?: Types.ObjectId | null;
  guestId?: string | null;
  items: ICartItem[];
  appliedCoins: number;   // Total coins applied to the cart
  coinDiscount: number;   // Total discount value in currency
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
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
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        pack: {
          type: String, // Label of the selected pack e.g. "Standard"
          required: false // Optional for backward compatibility? Or make it required if we migrate. Let's say false for now but effectively we want it.
        }
      },
    ],

    appliedCoins: {
      type: Number,
      default: 0
    },

    coinDiscount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * One cart per user
 */
CartSchema.index(
  { userId: 1 },
  {
    unique: true,
    partialFilterExpression: { userId: { $exists: true, $ne: null } },
  }
);

/**
 * One cart per guest
 */
CartSchema.index(
  { guestId: 1 },
  {
    unique: true,
    partialFilterExpression: { guestId: { $exists: true, $ne: null } },
  }
);

const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
