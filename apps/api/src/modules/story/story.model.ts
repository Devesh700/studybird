import { Schema, model, models } from "mongoose";

const StorySchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    body: { type: String, required: true },
    author: { type: String, default: "Anonymous", index: true },
    tags: { type: [String], index: true },
    // New fields for Communication Section - Writing
    workType: { 
      type: String, 
      enum: ["Story", "Article", "Poem"], 
      required: true,
      index: true 
    },
    description: { type: String, required: true },
    whatItsAbout: { type: String, required: true },
    originalWork: { type: String, default: "" }, // If referenced from somewhere
    validation: { type: String, default: "" },
    suggestedHashtags: { type: [String], default: [] },
    categories: { 
      type: [String], 
      required: true,
      index: true 
    }, // Multiple selection: Environment, Life, Friendship, etc.
  },
  { timestamps: true }
);

// Simple text index for basic search
StorySchema.index({ title: "text", body: "text", description: "text", whatItsAbout: "text" });

export type StoryDoc = {
  _id: string;
  title: string;
  body: string;
  author: string;
  tags: string[];
  workType: "Story" | "Article" | "Poem";
  description: string;
  whatItsAbout: string;
  originalWork: string;
  validation: string;
  suggestedHashtags: string[];
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const Story = models.Story || model("Story", StorySchema);
