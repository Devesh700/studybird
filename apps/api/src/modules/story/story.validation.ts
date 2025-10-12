import { z } from "zod";

export const StoryCreateSchema = z.object({
  title: z.string().min(1).max(160),
  body: z.string().min(1),
  tags: z.array(z.string()).default([]),
  author: z.string().min(1).max(80).optional(),
});

export const StoryUpdateSchema = StoryCreateSchema.partial();
