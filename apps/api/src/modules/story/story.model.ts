import { Schema, model, models } from "mongoose";

const StorySchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    body: { type: String, required: true },
    author: { type: String, default: "Anonymous", index: true },
    tags: { type: [String], index: true },
  },
  { timestamps: true }
);

// Simple text index for basic search
StorySchema.index({ title: "text", body: "text" });

export type StoryDoc = {
  _id: string;
  title: string;
  body: string;
  author: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const Story = models.Story || model("Story", StorySchema);
