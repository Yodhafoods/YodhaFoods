import { z } from "zod";

const parseJson = (val: unknown) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  return val;
};

const parseBoolean = (val: unknown) => {
  if (val === "true") return true;
  if (val === "false") return false;
  return val;
};

// --- Sub-Schemas based on Interfaces ---

const packSchema = z.object({
  label: z.string().min(1, "Label is required"),
  weightInGrams: z.number().min(1, "Weight must be positive"),
  price: z.number().min(0, "Price must be non-negative"),
  discountPrice: z.number().min(0, "Discount price must be non-negative").optional(),
  stock: z.number().min(0, "Stock must be non-negative"),
  sku: z.string().optional(),
  isDefault: z.boolean().default(false),
});

const nutritionSchema = z.object({
  name: z.string().min(1, "Nutrition name is required"),
  value: z.string().min(1, "Nutrition value is required"),
});

const productInfoSchema = z.object({
  genericName: z.string().optional(),
  netQuantity: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  manufacturer: z.string().optional(),
  marketedBy: z.string().optional(),
  fssaiLicense: z.string().optional(),
});

const specificationsSchema = z.object({
  brand: z.string().optional(), // default "Yodha Foods" in model
  form: z.string().optional(),
  organic: z.boolean().default(false),
  ayurvedic: z.boolean().default(false),
  vegan: z.boolean().default(false),
  allergens: z.string().optional(),
  containerType: z.string().optional(),
  servingSize: z.string().optional(),
});

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

// --- Main Schemas ---

export const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().optional(), // Auto-generated if not provided, but allow override
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category ID is required"),
  subCategory: z.string().optional(),

  // Arrays and Objects coming as JSON strings in multipart/form-data
  packs: z.preprocess(
    parseJson,
    z.array(packSchema).min(1, "At least one pack is required")
  ),

  ingredients: z.string().min(1, "Ingredients are required"),
  shelfLifeMonths: z.coerce.number().min(1, "Shelf life is required"),

  storageInstructions: z.string().optional(),
  howToUse: z.string().optional(),

  nutritionTable: z.preprocess(
    parseJson,
    z.array(nutritionSchema).optional()
  ),

  highlights: z.preprocess(
    parseJson,
    z.array(z.string()).optional()
  ),

  productInfo: z.preprocess(
    parseJson,
    productInfoSchema.optional()
  ),

  specifications: z.preprocess(
    parseJson,
    specificationsSchema
  ),

  seo: z.preprocess(
    parseJson,
    seoSchema.optional()
  ),

  isActive: z.preprocess(parseBoolean, z.boolean().default(true)),
  isFeatured: z.preprocess(parseBoolean, z.boolean().default(false)),
});

export const updateProductSchema = createProductSchema.partial();

