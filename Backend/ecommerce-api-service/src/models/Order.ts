import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Order lifecycle (logistics focused)
 */
export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

/**
 * Payment lifecycle (payment focused)
 */
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

/**
 * Snapshot of product at time of order
 * (IMPORTANT: product may change later, order must not)
 */
interface OrderItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: OrderItem[];

  subtotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  coinsRedeemed: number;
  couponCode?: string;
  totalAmount: number;

  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };

  status: OrderStatus;
  paymentStatus: PaymentStatus;

  payment?: {
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Order Item Schema (embedded)
 */
const OrderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
  },
  { _id: false }
);

/**
 * Order Schema
 */
const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: {
      type: [OrderItemSchema],
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    shippingFee: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    discount: { type: Number, default: 0 },
    coinsRedeemed: { type: Number, default: 0 },
    couponCode: { type: String },

    /**
     * Address snapshot (NEVER store addressId)
     */
    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: "India" },
    },

    status: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PLACED",
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    /**
     * Razorpay references (filled after payment)
     */
    payment: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
    },
  },
  { timestamps: true }
);

/**
 * Index for fast order listing
 */
OrderSchema.index({ createdAt: -1 });

/**
 * Prevent model overwrite in dev / hot reload
 */
const Order =
  mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
