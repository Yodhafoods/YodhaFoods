import mongoose, { Schema, Document, Types } from "mongoose";

export type OrderStatus =
  | "CREATED"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        name: String, // snapshot
        price: Number, // snapshot
        quantity: Number,
      },
    ],

    subtotal: Number,
    total: Number,

    status: {
      type: String,
      enum: ["CREATED", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "CREATED",
    },
  },
  { timestamps: true }
);

const Order =
  mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
