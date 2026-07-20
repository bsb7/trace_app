import mongoose from "mongoose";
import mnongoose from "mongoose";
import { optional, z } from "zod";

const titleSchema = z
  .string({ error: "Title must be string" })
  .trim()
  .min(4, "Title must be at least 4 characters long")
  .max(120, "Title cannot exceed 120 characters long");

const contentSchema = z
  .string({ error: "Content must be string" })
  .trim()
  .min(10, "Content must be at least 10 characters long")
  .max(5000, "Content cannot exceed 5000 characters long");

const typeSchema = z
  .enum(["notes", "diary"], {
    error: "Type must be either 'Note' or 'Diary'",
  })
  .default("note");

const isPrivateSchema = z
  .boolean({ error: "isPrivate must be true or false" })
  .default(true);

const noteIdSchema = z
  .string({ error: "Note Id is Invalid" })
  .refine((id) => mongoose.Types.ObjectId.isValid(id), {
    error: "Note Id is Invalid",
  });

const userIdSchema = z
  .string({ error: "User Id is Invalid" })
  .refine((id) => mongoose.Types.ObjectId.isValid(id), {
    error: "User Id is Invalid",
  });

const pageSchema = z.coerce
  .number("Page should be number")
  .int()
  .min(1, "Page must be at least 1")
  .default(1);

const limitSchema = z.coerce
  .number("Limit must be number")
  .int()
  .min(10, "Limit must be at least 10")
  .max(100, "Limit must not exceed 100")
  .default(10);

export const createNoteSchema = z.object({
  body: z
    .object({
      title: titleSchema,
      content: contentSchema,
      type: typeSchema,
      isPrivate: isPrivateSchema,
      user: userIdSchema,
    })
    .strict(),
});

export const getAllNotesSchema = z.object({
  query: z.object({
    page: pageSchema,
    limit: limitSchema,
  }),
});

export const getNoteSchema = z.object({
  params: z.object({
    id: noteIdSchema,
  }),
});

export const updateNoteSchema = z.object({
  params: z.object({
    id: noteIdSchema,
  }),
  body: z
    .object({
      title: titleSchema.optional(),
      content: contentSchema.optional(),
      type: typeSchema.optional(),
      isPrivate: isPrivateSchema.optional(),
      user: userIdSchema,
    })
    .strict()
    .refine((body) => Object.keys.length > 0, {
      error: "Provide at least one field to update",
    }),
});

export const deleteNoteSchema = z.object({
  params: z.object({
    id: noteIdSchema,
  }),
});
