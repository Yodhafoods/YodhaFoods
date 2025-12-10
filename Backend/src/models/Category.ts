import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String }
  },
  { timestamps: true }
);

// Auto-generate slug
categorySchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "");
  }
});

const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", categorySchema);

export default Category;
