import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import { stories } from "./modules/story/story.routes";

const app = express();
app.use(express.json());

const origin = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({ origin, credentials: true }));

app.get("/", (_req, res) => res.json({ message: "API running" }));
app.use("/stories", stories);

const PORT = Number(process.env.PORT || 5000);

async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`[api] listening on :${PORT}`));
}

start();
