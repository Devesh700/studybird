import type { NextFunction, Request, Response } from "express";
import { User } from "../user/user.model";
import { AppError } from "./auth.error";
import { hasPermission } from "./auth.policy";
import { verifyAccessToken } from "./auth.token";

function extractBearerToken(authorizationHeader?: string) {
  if (!authorizationHeader) return undefined;
  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || !token) return undefined;
  return token;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = extractBearerToken(req.headers.authorization);
    if (!token) throw new AppError(401, "Missing or invalid Authorization header");

    const payload = verifyAccessToken(token);
    const user = (await User.findOne({ _id: payload.sub, isDeleted: false })
      .select("_id email roles")
      .exec()) as any;

    if (!user) throw new AppError(401, "Invalid authentication token");

    req.auth = {
      userId: String(user._id),
      email: user.email,
      roles: user.roles ?? [],
    };

    next();
  } catch (error) {
    const message = error instanceof AppError ? error.message : "Unauthorized";
    const statusCode = error instanceof AppError ? error.statusCode : 401;
    res.status(statusCode).json({ error: message });
  }
}

type AuthorizeOptions = {
  selfResolver?: (req: Request) => string | undefined;
};

export function authorize(action: string, options?: AuthorizeOptions) {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = req.auth;
    if (!auth) return res.status(401).json({ error: "Unauthorized" });

    const subjectId = options?.selfResolver?.(req);
    const isSelf = Boolean(subjectId && subjectId === auth.userId);
    const allowed = hasPermission(auth.roles, action, { isSelf });

    if (!allowed) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}
