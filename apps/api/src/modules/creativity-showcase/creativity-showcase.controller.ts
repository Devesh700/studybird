import type { Request, Response } from "express";
import {
  createCreativityShowcase,
  incrementCreativityApplause,
  listCreativityShowcases,
} from "./creativity-showcase.service";

function toNumber(value: unknown, fallback: number) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

export async function getCreativityShowcases(req: Request, res: Response) {
  const skillCategory = String(req.query.skillCategory ?? "").trim() || undefined;
  const mediaType = String(req.query.mediaType ?? "").trim() || undefined;
  const q = String(req.query.q ?? "").trim() || undefined;
  const page = toNumber(req.query.page, 1);
  const limit = toNumber(req.query.limit, 12);

  const result = await listCreativityShowcases({ skillCategory, mediaType, q, page, limit });
  res.json(result);
}

export async function applaudCreativityShowcase(req: Request, res: Response) {
  const result = await incrementCreativityApplause(req.params.id);
  res.json(result);
}

export async function postCreativityShowcase(req: Request, res: Response) {
  const showcase = await createCreativityShowcase(req.body);
  res.status(201).json(showcase);
}
