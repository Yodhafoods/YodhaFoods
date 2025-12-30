import mongoose, { Schema, Document, Types } from "mongoose";

interface IPack {
  label: string; // "100 g"
  weightInGrams: number;
  price: number;
  discountPrice?: number;
  stock: number;
  sku?: string;
  isDefault: boolean;
}

interface INutrition {
  name: string;
  value: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;

  categoryId: Types.ObjectId;

  images: { url: string; public_id: string }[];

  packs: IPack[];

  ingredients: string;
  shelfLifeMonths: number;
  storageInstructions?: string;
  howToUse?: string;

  nutritionTable?: INutrition[];
  highlights?: string[];

  productInfo: {
    genericName?: string;
    netQuantity?: string;
    countryOfOrigin?: string;
    manufacturer?: string;
    marketedBy?: string;
    fssaiLicense?: string;
  };

  specifications: {
    brand: string;
    form: string;
    organic: boolean;
    ayurvedic: boolean;
    vegan: boolean;
    allergens?: string;
    containerType?: string;
    servingSize?: string;
  };

  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  rating: {
    average: number;
    count: number;
  };

  isActive: boolean;
  isFeatured: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const PackSchema = new Schema<IPack>(
  {
    label: { type: String, required: true },
    weightInGrams: { type: Number, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    sku: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },

    description: String,

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

    packs: {
      type: [PackSchema],
      validate: [
        {
          validator: (packs: IPack[]) =>
            packs.some((p) => p.isDefault),
          message: "At least one pack must be default",
        },
      ],
    },

    ingredients: { type: String, required: true },
    shelfLifeMonths: { type: Number, required: true },

    storageInstructions: String,
    howToUse: String,

    nutritionTable: [
      {
        name: String,
        value: String,
      },
    ],

    highlights: [String],

    productInfo: {
      genericName: String,
      netQuantity: String,
      countryOfOrigin: String,
      manufacturer: String,
      marketedBy: String,
      fssaiLicense: String,
    },

    specifications: {
      brand: { type: String, default: "Yodha Foods" },
      form: String,
      organic: Boolean,
      ayurvedic: Boolean,
      vegan: Boolean,
      allergens: String,
      containerType: String,
      servingSize: String,
    },

    seo: {
      title: String,
      description: String,
      keywords: [String],
    },

    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

// Auto slug
ProductSchema.pre("validate", function () {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  }
});

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
