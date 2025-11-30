import { z } from "zod";

export const StoryCreateSchema = z.object({
  title: z.string().min(1).max(160),
  body: z.string().min(1),
  tags: z.array(z.string()).default([]),
  author: z.string().min(1).max(80).optional(),
  // New fields for Communication Section - Writing
  workType: z.enum(["Story", "Article", "Poem"]),
  description: z.string().min(1).max(500),
  whatItsAbout: z.string().min(1).max(1000),
  originalWork: z.string().optional().default(""),
  validation: z.string().optional().default(""),
  suggestedHashtags: z.array(z.string()).default([]),
  categories: z.array(z.string()).min(1), // At least one category required
});

export const StoryUpdateSchema = StoryCreateSchema.partial();
