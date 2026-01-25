import { Router } from "express";
import { AudioStory } from "./audio-story.model";
// import { requireAuth } from "../middleware/auth";

export const audioStories = Router();

// List with filters
audioStories.get("/", async (req, res) => {
  const { category, q, page = 1, limit = 12 } = req.query;
  const filter: any = { isPublic: true };
  
  if (category) filter.categories = category;
  if (q) filter.$text = { $search: q };
  
  const [items, total] = await Promise.all([
    AudioStory.find(filter)
      .sort({ plays: -1, createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select("-__v")
      .exec(),
    AudioStory.countDocuments(filter).exec(),
  ]);
  
  res.json({ items, page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) });
});

// Increment play count
audioStories.post("/:id/play", async (req, res) => {
  await AudioStory.findByIdAndUpdate(req.params.id, { $inc: { plays: 1, views: 1 } });
  res.json({ success: true });
});

audioStories.post("/", async (req, res) => {
    const audioStories = req.body;
  const story = await AudioStory.create(req.body);
  res.status(201).json(story);
})
