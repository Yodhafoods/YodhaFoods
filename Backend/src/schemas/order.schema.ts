import { z } from "zod";

/**
 * Frontend only sends addressId
 * Everything else is derived from Cart + DB
 */
export const createOrderSchema = z.object({
  addressId: z
    .string()
    .min(1, "Address is required"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
