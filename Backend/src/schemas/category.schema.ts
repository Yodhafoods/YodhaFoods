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

export const createCategorySchema = z.object({
  name: z.string().min(2).max(80),
  description: z.string().max(500).optional(),
  imageUrl: z.string().optional(),
  isActive: z.preprocess(parseBoolean, z.boolean().optional()),
  sortOrder: z.coerce.number().optional(),

  seo: z.preprocess(
    parseJson,
    z.object({
      title: z.string().max(120).optional(),
      description: z.string().max(200).optional(),
      keywords: z.array(z.string()).optional(),
    }).optional()
  ),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).max(80).optional(),
  description: z.string().max(500).optional(),
  imageUrl: z.string().optional(),
  isActive: z.preprocess(parseBoolean, z.boolean().optional()),
  sortOrder: z.coerce.number().optional(),

  seo: z.preprocess(
    parseJson,
    z.object({
      title: z.string().max(120).optional(),
      description: z.string().max(200).optional(),
      keywords: z.array(z.string()).optional(),
    }).optional()
  ),
});
