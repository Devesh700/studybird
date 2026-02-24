import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import { stories } from "./modules/story/story.routes";
import { audioStories } from "./modules/audio-story/audio-story.route";
import { videoStories } from "./modules/video-story/video-story.route";
import { creativityShowcases } from "./modules/creativity-showcase/creativity-showcase.route";
import { authRoutes } from "./modules/auth/auth.route";
import { userRoutes } from "./modules/user/user.route";

const app = express();
app.use(express.json());

const origin = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({ origin, credentials: true }));

app.get("/", (_req, res) => res.json({ message: "API running" }));
app.use("/stories", stories);
app.use("/audio-stories", audioStories);
app.use("/video-stories", videoStories);
app.use("/videos", videoStories);
app.use("/creativity-showcases", creativityShowcases);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


const PORT = Number(process.env.PORT || 5000);

async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`[api] listening on :${PORT}`));
}

start();
