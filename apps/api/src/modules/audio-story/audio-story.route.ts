import { Router } from "express";
import {
  getAudioStories,
  playAudioStory,
  postAudioStory,
} from "./audio-story.controller";

export const audioStories = Router();

audioStories.get("/", getAudioStories);
audioStories.post("/:id/play", playAudioStory);
audioStories.post("/", postAudioStory);
