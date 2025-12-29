import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId?: Types.ObjectId | null;
  guestId?: string | null;
  items: ICartItem[];
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
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Ensure:
 * - one cart per logged-in user
 * - one cart per guest user
 */
CartSchema.index(
  { userId: 1 },
  { unique: true, partialFilterExpression: { userId: { $ne: null } } }
);

CartSchema.index(
  { guestId: 1 },
  { unique: true, partialFilterExpression: { guestId: { $ne: null } } }
);

const Cart =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
