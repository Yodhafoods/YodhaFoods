import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    price: z.number().positive(),
    category: z.string().min(1), // id (ObjectId) or slug
    stock: z.number().int().min(0).optional(),
    images: z.array(z.object({ url: z.string(), public_id: z.string() })).optional()
  })
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    category: z.string().optional(), // id or slug
    stock: z.number().int().min(0).optional(),
    images: z.array(z.object({ url: z.string(), public_id: z.string() })).optional()
  })
});
