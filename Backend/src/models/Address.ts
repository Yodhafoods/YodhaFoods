import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAddress extends Document {
    userId: Types.ObjectId;

    label: "home" | "work" | "other";
    fullName: string;
    phone: string;

    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;

    isDefault: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        label: {
            type: String,
            enum: ["home", "work", "other"],
            default: "home",
        },

        fullName: { type: String, required: true },
        phone: { type: String, required: true },

        addressLine1: { type: String, required: true },
        addressLine2: { type: String },

        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, default: "India" },

        isDefault: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Address =
    mongoose.models.Address ||
    mongoose.model<IAddress>("Address", AddressSchema);

export default Address;
