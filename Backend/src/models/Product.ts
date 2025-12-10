import mongoose, { Schema, Document } from "mongoose";

export interface IProductImage {
  url: string;
  public_id: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;
  price: number;
  images: IProductImage[];
  category: mongoose.Types.ObjectId; // reference to Category
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },

    slug: { type: String, required: true, unique: true, lowercase: true },

    description: { type: String },

    price: { type: Number, required: true },

    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
      }
    ],

    // category is now a reference to Category collection
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },

    stock: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

productSchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }
});

productSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return obj;
};

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
export default Product;
