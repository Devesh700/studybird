import { Router } from "express";
import { loginHandler, meHandler, registerHandler } from "./auth.controller";
import { authenticate } from "./auth.middleware";

export const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/me", authenticate, meHandler);
