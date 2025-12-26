import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string().min(2, "Name too short"),
  last_name: z.string().optional(),
  contact_number: z.string().optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
