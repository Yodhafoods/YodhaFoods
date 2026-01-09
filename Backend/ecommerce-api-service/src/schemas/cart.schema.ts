import { z } from "zod";

/**
 * Cart Item
 */
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

/**
 * Cart (user OR guest)
 */
export const cartSchema = z.object({
  userId: z.string().optional().nullable(),
  guestId: z.string().optional().nullable(),

  items: z.array(cartItemSchema).min(1, "Cart cannot be empty"),
})
.refine(
  (data) => data.userId || data.guestId,
  {
    message: "Either userId or guestId is required",
    path: ["userId"],
  }
);
