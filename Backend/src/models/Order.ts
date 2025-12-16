import mongoose, { Schema, Document, Types } from "mongoose";

export type OrderStatus =
<<<<<<< HEAD
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
=======
    | "PLACED"
    | "CONFIRMED"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

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

    createdAt: Date;
    updatedAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>(
    {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
    },
    { _id: false }
);

const OrderSchema = new Schema<IOrder>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        items: [OrderItemSchema],

        totalAmount: {
            type: Number,
            required: true,
        },

        shippingAddress: {
            fullName: String,
            phone: String,
            addressLine1: String,
            addressLine2: String,
            city: String,
            state: String,
            pincode: String,
            country: String,
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
    },
    { timestamps: true }
);

const Order =
    mongoose.models.Order ||
    mongoose.model<IOrder>("Order", OrderSchema);
>>>>>>> 77e383d27cf228ea01b38eca1c91ae6364689404

export default Order;
