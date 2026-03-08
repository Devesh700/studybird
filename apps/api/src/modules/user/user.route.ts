import { Router } from "express";
import { authenticate, authorize } from "../auth/auth.middleware";
import {
  createUserHandler,
  getUserHandler,
  hardDeleteUserHandler,
  listUsersHandler,
  softDeleteUserHandler,
  updateUserHandler,
} from "./user.controller";

export const userRoutes = Router();

userRoutes.use(authenticate);

userRoutes.post("/", authorize("user.create"), createUserHandler);
userRoutes.get("/", authorize("user.read"), listUsersHandler);
userRoutes.get("/:id", authorize("user.read", { selfResolver: (req) => req.params.id }), getUserHandler);
userRoutes.patch("/:id", authorize("user.update", { selfResolver: (req) => req.params.id }), updateUserHandler);
userRoutes.delete(
  "/:id",
  authorize("user.soft_delete", { selfResolver: (req) => req.params.id }),
  softDeleteUserHandler
);
userRoutes.delete("/:id/hard", authorize("user.hard_delete"), hardDeleteUserHandler);
