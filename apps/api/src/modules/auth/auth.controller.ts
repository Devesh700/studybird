import type { Request, Response } from "express";
import { AppError } from "./auth.error";
import { login, register } from "./auth.service";
import { LoginSchema, RegisterSchema } from "./auth.validation";
import { getUserById } from "../user/user.service";

function getStatus(error: unknown) {
  return error instanceof AppError ? error.statusCode : 500;
}

function getMessage(error: unknown) {
  return error instanceof AppError ? error.message : "Internal server error";
}

export async function registerHandler(req: Request, res: Response) {
  try {
    const parsed = RegisterSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const result = await register(parsed.data);
    res.status(201).json(result);
  } catch (error) {
    res.status(getStatus(error)).json({ error: getMessage(error) });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const result = await login(parsed.data);
    res.json(result);
  } catch (error) {
    res.status(getStatus(error)).json({ error: getMessage(error) });
  }
}

export async function meHandler(req: Request, res: Response) {
  try {
    if (!req.auth) return res.status(401).json({ error: "Unauthorized" });
    const user = await getUserById(req.auth.userId);
    res.json(user);
  } catch (error) {
    res.status(getStatus(error)).json({ error: getMessage(error) });
  }
}
