import { Schema, model, models } from "mongoose";

const AudioStorySchema = new Schema({
  title: { type: String, required: true, index: true },
  description: String,
  audioUrl: { type: String, required: true },
  duration: Number, // seconds
  author: { type: String, default: "Anonymous" },
  categories: [String],
  tags: [String],
  thumbnail: String,
  views: { type: Number, default: 0 },
  plays: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: true },
}, { timestamps: true });

AudioStorySchema.index({ title: "text", description: "text", author: "text", tags: "text" });

export type AudioStoryDoc = {
  _id: string;
  title: string;
  description?: string;
  audioUrl: string;
  duration: number;
  author: string;
  categories: string[];
  tags: string[];
  thumbnail?: string;
  views: number;
  plays: number;
  likes: number;
  isPublic: boolean;
};

export const AudioStory = models.AudioStory || model("AudioStory", AudioStorySchema);
