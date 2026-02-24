import { z } from "zod";

export const UserCreateSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  roles: z.array(z.string().min(1)).optional(),
});

export const UserUpdateSchema = z
  .object({
    name: z.string().min(1).max(120).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(128).optional(),
    roles: z.array(z.string().min(1)).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });
