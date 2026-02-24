import type { Request, Response } from "express";
import {
  createAudioStory,
  incrementAudioStoryPlay,
  listAudioStories,
} from "./audio-story.service";

function toNumber(value: unknown, fallback: number) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

export async function getAudioStories(req: Request, res: Response) {
  const category = String(req.query.category ?? "").trim() || undefined;
  const q = String(req.query.q ?? "").trim() || undefined;
  const page = toNumber(req.query.page, 1);
  const limit = toNumber(req.query.limit, 12);

  const result = await listAudioStories({ category, q, page, limit });
  res.json(result);
}

export async function playAudioStory(req: Request, res: Response) {
  const result = await incrementAudioStoryPlay(req.params.id);
  res.json(result);
}

export async function postAudioStory(req: Request, res: Response) {
  const story = await createAudioStory(req.body);
  res.status(201).json(story);
}
