import { z } from "zod";

export const orderItemSchema = z.object({
    productId: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().min(1),
    image: z.string(),
});

export const createOrderSchema = z.object({
    items: z.array(orderItemSchema).min(1),

    totalAmount: z.number().min(1),

    shippingAddress: z.object({
        fullName: z.string(),
        phone: z.string(),
        addressLine1: z.string(),
        addressLine2: z.string().optional(),
        city: z.string(),
        state: z.string(),
        pincode: z.string(),
        country: z.string().optional(),
    }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
