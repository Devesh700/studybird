import { Router } from "express";
import { Story } from "./story.model";
import { StoryCreateSchema, StoryUpdateSchema } from "./story.validation";

export const stories = Router();

// List with pagination, search, and tag filter
stories.get("/", async (req, res) => {
  const page = Math.max(parseInt(String(req.query.page ?? "1")), 1);
  const limit = Math.min(Math.max(parseInt(String(req.query.limit ?? "12")), 1), 50);
  const q = String(req.query.q ?? "").trim();
  const tag = String(req.query.tag ?? "").trim();

  const filter: any = {};
  if (q) filter.$text = { $search: q };
  if (tag) filter.tags = tag;

  const [items, total] = await Promise.all([
    Story.find(filter)
      .sort(q ? { score: { $meta: "textScore" } } : { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec(),
    Story.countDocuments(filter).exec(),
  ]);

  res.json({
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
});

// Create
stories.post("/", async (req, res) => {
  const parsed = StoryCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const story = await Story.create({
    ...parsed.data,
    author: parsed.data.author ?? "Anonymous",
  });
  res.status(201).json(story);
});

// Detail
stories.get("/:id", async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) return res.status(404).json({ error: "Not found" });
  res.json(story);
});

// Update
stories.patch("/:id", async (req, res) => {
  const parsed = StoryUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const story = await Story.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!story) return res.status(404).json({ error: "Not found" });
  res.json(story);
});

// Delete
stories.delete("/:id", async (req, res) => {
  const story = await Story.findByIdAndDelete(req.params.id);
  if (!story) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});
