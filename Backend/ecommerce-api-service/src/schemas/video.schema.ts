import { z } from "zod";

export const createVideoSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100),

  description: z
    .string()
    .max(500)
    .optional(),

  productId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),

  isActive: z.boolean().optional(),
});

export type CreateVideoInput = z.infer<typeof createVideoSchema>;
