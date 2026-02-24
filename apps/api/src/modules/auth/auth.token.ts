import jwt from "jsonwebtoken";
import type { AccessTokenPayload } from "./auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? "7d") as jwt.SignOptions["expiresIn"];

export function signAccessToken(payload: Omit<AccessTokenPayload, "iat" | "exp">) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as AccessTokenPayload;
}
