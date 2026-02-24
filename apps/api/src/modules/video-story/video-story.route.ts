import { Router } from "express";
import {
  getVideoStories,
  postVideoStory,
  viewVideoStory,
} from "./video-story.controller";

export const videoStories = Router();

videoStories.get("/", getVideoStories);
videoStories.post("/", postVideoStory);
videoStories.post("/:id/view", viewVideoStory);
