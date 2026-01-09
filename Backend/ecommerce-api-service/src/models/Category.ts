import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string | null;

  isActive: boolean;
  sortOrder: number;

  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  subCategories: {
    name: string;
    slug: string;
    description?: string;
    isActive: boolean;
  }[];

  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
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
      maxlength: 500,
      default: "",
    },

    imageUrl: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    seo: {
      title: { type: String, maxlength: 120 },
      description: { type: String, maxlength: 200 },
      keywords: [{ type: String }],
    },

    subCategories: [
      {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        description: String,
        isActive: { type: Boolean, default: true },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Auto-generate slug if missing
CategorySchema.pre("validate", function (this: any) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  }
});

const Category =
  (mongoose.models.Category as mongoose.Model<ICategory>) ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
