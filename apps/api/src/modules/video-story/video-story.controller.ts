import type { Request, Response } from "express";
import {
  createVideoStory,
  incrementVideoStoryView,
  listVideoStories,
} from "./video-story.service";

function toNumber(value: unknown, fallback: number) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

export async function getVideoStories(req: Request, res: Response) {
  const category = String(req.query.category ?? "").trim() || undefined;
  const q = String(req.query.q ?? "").trim() || undefined;
  const page = toNumber(req.query.page, 1);
  const limit = toNumber(req.query.limit, 12);

  const result = await listVideoStories({ category, q, page, limit });
  res.json(result);
}

export async function viewVideoStory(req: Request, res: Response) {
  const result = await incrementVideoStoryView(req.params.id);
  res.json(result);
}

export async function postVideoStory(req: Request, res: Response) {
  const story = await createVideoStory(req.body);
  res.status(201).json(story);
}
