import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;

  categoryId: Types.ObjectId;

  images: { url: string; public_id: string }[];

  price: number;
  discountPrice?: number; // optional: if discount exists

  stock: number;
  isActive: boolean;
  isFeatured: boolean;

  tags?: string[];
  attributes?: Map<string, string>;

  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  rating: {
    average: number;
    count: number;
  };

  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      maxlength: 2000,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    tags: [{ type: String }],

    attributes: {
      type: Map,
      of: String,
      default: {},
    },

    seo: {
      title: { type: String, maxlength: 120 },
      description: { type: String, maxlength: 200 },
      keywords: [{ type: String }],
    },

    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Auto-generate slug
ProductSchema.pre("validate", async function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
});

const Product =
  (mongoose.models.Product as mongoose.Model<IProduct>) ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
