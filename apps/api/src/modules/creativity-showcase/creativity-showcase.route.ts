import { Router } from "express";
import {
  applaudCreativityShowcase,
  getCreativityShowcases,
  postCreativityShowcase,
} from "./creativity-showcase.controller";

export const creativityShowcases = Router();

creativityShowcases.get("/", getCreativityShowcases);
creativityShowcases.post("/", postCreativityShowcase);
creativityShowcases.post("/:id/applause", applaudCreativityShowcase);
