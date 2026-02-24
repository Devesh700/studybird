import type { Request, Response } from "express";
import { AppError } from "../auth/auth.error";
import { hasPermission } from "../auth/auth.policy";
import {
  createUser,
  getUserById,
  hardDeleteUserById,
  softDeleteUserById,
  updateUserById,
} from "./user.service";
import { UserCreateSchema, UserUpdateSchema } from "./user.validation";

function getStatus(error: unknown) {
  return error instanceof AppError ? error.statusCode : 500;
}

function getMessage(error: unknown) {
  return error instanceof AppError ? error.message : "Internal server error";
}

function canAssignRoles(req: Request, targetUserId?: string) {
  if (!req.auth) return false;
  const isSelf = Boolean(targetUserId && req.auth.userId === targetUserId);
  return hasPermission(req.auth.roles, "user.assign_roles", { isSelf });
}

export async function createUserHandler(req: Request, res: Response) {
  try {
    const parsed = UserCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    if (parsed.data.roles && !canAssignRoles(req)) {
      return res.status(403).json({ error: "Forbidden to assign roles" });
    }

    const user = await createUser(parsed.data, req.auth?.userId);
    res.status(201).json(user);
  } catch (error) {
    res.status(getStatus(error)).json({ error: getMessage(error) });
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  try {
    const parsed = UserUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    if (parsed.data.roles && !canAssignRoles(req, req.params.id)) {
      return res.status(403).json({ error: "Forbidden to update roles" });
    }

    const user = await updateUserById(req.params.id, parsed.data);
    res.json(user);
  } catch (error) {
    res.status(getStatus(error)).json({ error: getMessage(error) });
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(getStatus(error)).json({ error: getMessage(error) });
  }
}

export async function softDeleteUserHandler(req: Request, res: Response) {
  try {
    if (!req.auth) return res.status(401).json({ error: "Unauthorized" });
    const user = await softDeleteUserById(req.params.id, req.auth.userId);
    res.json(user);
  } catch (error) {
    res.status(getStatus(error)).json({ error: getMessage(error) });
  }
}

export async function hardDeleteUserHandler(req: Request, res: Response) {
  try {
    const result = await hardDeleteUserById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(getStatus(error)).json({ error: getMessage(error) });
  }
}
