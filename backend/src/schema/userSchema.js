import mongoose from "mongoose";
import { z } from "zod";
const usernameSchema = z
  .string({
    error: "Username should be a string",
  })
  .trim()
  .min(8, "Username must be 8 characters long")
  .max(15, "Username cannot exceed 15 characters long")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username may only contain letters, numbers and underscores",
  );
const emailSchema = z.string().trim().toLowerCase().email({
  error: "Not valid Email",
});
const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 character long")
  .max(15, "Password cannot exceed 15 character long")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/\d/, "Password must contain a number")
  .regex(/[@$!%*?&]/, "Password must contain a special character");
const pageSchema = z.coerce
  .number()
  .int()
  .min(1, "Page must be at least 1")
  .default(1);
const limitSchema = z.coerce
  .number()
  .int()
  .min(1, "Page must be at least 1")
  .max(100, "Limit cannot exceed 100")
  .default(10);
const idSchema = z
  .string()
  .refine((id) => mongoose.Types.ObjectId.isValid(id), {
    error: "Invalid User ID",
  });

export const createUserSchema = z.object({
  body: z
    .object({
      username: usernameSchema,
      email: emailSchema,
      password: passwordSchema,
    })
    .strict(),
});

export const getAllUsersSchema = z.object({
  query: z.object({
    page: pageSchema,
    limit: limitSchema,
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: idSchema,
  }),

  body: z
    .object({
      username: usernameSchema.optional(),
      email: emailSchema.optional(),
      password: passwordSchema.optional(),
    })
    .strict()
    .refine((body) => Object.keys(body).length > 0, {
      message: "Provide at least one field to update",
    }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
});
