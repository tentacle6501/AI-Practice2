import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  website: z.string().optional(),
});

export const updateUserSchema = z
  .object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    website: z.string().optional(),
  })
  .partial();

export type UserCreateInput = z.infer<typeof createUserSchema>;
export type UserUpdateInput = z.infer<typeof updateUserSchema>;
