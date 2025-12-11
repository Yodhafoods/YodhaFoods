import { z } from "zod";

// Helper to parse JSON from string (common in multipart/form-data)
const parseJson = (val: unknown) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }
  return val;
};

// Helper to parse boolean from string
const parseBoolean = (val: unknown) => {
  if (val === "true") return true;
  if (val === "false") return false;
  return val;
};

export const createProductSchema = z.object({
  name: z.string().min(2).max(150),
  description: z.string().max(2000).optional(),
  categoryId: z.string().min(1),
  price: z.coerce.number().min(0),
  discountPrice: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().min(0),

  isActive: z.preprocess(parseBoolean, z.boolean().optional().default(true)),
  isFeatured: z.preprocess(parseBoolean, z.boolean().optional().default(false)),

  // Preprocess JSON strings for array/object fields
  tags: z.preprocess(parseJson, z.array(z.string()).optional()),
  attributes: z.preprocess(parseJson, z.record(z.string(), z.string()).optional()),
  seo: z.preprocess(
    parseJson,
    z.object({
      title: z.string().max(120).optional(),
      description: z.string().max(200).optional(),
      keywords: z.array(z.string()).optional(),
    }).optional()
  ),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).max(150).optional(),
  description: z.string().max(2000).optional(),
  categoryId: z.string().min(1).optional(),
  price: z.coerce.number().min(0).optional(),
  discountPrice: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().min(0).optional(),

  isActive: z.preprocess(parseBoolean, z.boolean().optional()),
  isFeatured: z.preprocess(parseBoolean, z.boolean().optional()),

  tags: z.preprocess(parseJson, z.array(z.string()).optional()),
  attributes: z.preprocess(parseJson, z.record(z.string(), z.string()).optional()),
  seo: z.preprocess(
    parseJson,
    z.object({
      title: z.string().max(120).optional(),
      description: z.string().max(200).optional(),
      keywords: z.array(z.string()).optional(),
    }).optional()
  ),
});
