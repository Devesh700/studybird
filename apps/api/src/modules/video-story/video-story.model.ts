import { Schema, model, models } from "mongoose";

const VideoStorySchema = new Schema({
  title: { type: String, required: true, index: true },
  description: String,
  videoUrl: { type: String, required: true }, // YouTube/Vimeo embed URL
  thumbnail: String,
  duration: Number,
  author: { type: String, default: "Storybird Team" },
  categories: [String],
  tags: [String],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: true },
}, { timestamps: true });

VideoStorySchema.index({ title: "text", description: "text", author: "text", tags: "text" });

export type VideoStoryDoc = {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail?: string;
  duration: number;
  author: string;
  categories: string[];
  tags: string[];
  views: number;
  likes: number;
};

export const VideoStory = models.VideoStory || model("VideoStory", VideoStorySchema);
