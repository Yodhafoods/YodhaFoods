import { z } from "zod";

export const createAddressSchema = z.object({
    label: z.enum(["home", "work", "other"]).optional(),
    fullName: z.string().min(2),
    phone: z.string().min(10),

    addressLine1: z.string().min(5),
    addressLine2: z.string().optional(),

    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.string().min(5),
    country: z.string().optional(),

    isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
