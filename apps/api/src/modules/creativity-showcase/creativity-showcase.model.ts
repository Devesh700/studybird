import { Schema, model, models } from "mongoose";

const CreativityShowcaseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  mediaUrl: String, // Image/Video URL (S3/CDN)
  mediaType: { type: String, enum: ['image', 'video', 'audio'] },
  skillCategory: { 
    type: String, 
    enum: ['cooking', 'reading', 'art', 'dance', 'music', 'crafts', 'personality', 'sports'],
    required: true 
  },
  creatorName: String,
  creatorAge: Number, // Optional for kids
  tags: [String],
  applause: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: true },
}, { timestamps: true });

CreativityShowcaseSchema.index({ title: "text", description: "text", creatorName: "text", tags: "text" });

export type CreativityShowcaseDoc = {
  _id: string;
  title: string;
  description?: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'audio';
  skillCategory: string;
  creatorName: string;
  creatorAge?: number;
  tags: string[];
  applause: number;
  views: number;
};

export const CreativityShowcase = models.CreativityShowcase || model("CreativityShowcase", CreativityShowcaseSchema);
