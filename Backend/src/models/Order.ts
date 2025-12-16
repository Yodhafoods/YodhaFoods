import mongoose, { Schema, Document, Types } from "mongoose";

export type OrderStatus =
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

export default Order;
