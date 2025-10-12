"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { createStory } from "@/features/story/slice";

export default function NewStoryPage() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePublish() {
    setLoading(true);
    try {
      const payload = {
        title,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        body,
      };
      const res = await dispatch(createStory(payload)).unwrap();
      setTitle("");
      setTags("");
      setBody("");
      alert(`🎉 Published: ${res.title}`);
    } catch {
      alert("❌ Failed to publish");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-10 px-4 flex justify-center items-start min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-3xl bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-lg p-6 md:p-10 border border-pink-100"
      >
        {/* Decorative background blobs */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-pink-200 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-200 blur-3xl opacity-25" />

        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 text-center mb-8">
          🪶 Create Your Magical Story
        </h1>

        <div className="space-y-4 relative z-10">
          <Input
            placeholder="✨ Enter a beautiful title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-full border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
          />
          <Input
            placeholder="🏷️ Add tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="rounded-full border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
          />
          <Textarea
            placeholder="🖋️ Start writing your story..."
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
          />

          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Button
              variant="outline"
              disabled={loading}
              className="rounded-full border-pink-200 hover:bg-pink-100"
            >
              💾 Save Draft
            </Button>
            <Button
              onClick={handlePublish}
              disabled={loading}
              className="rounded-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 shadow-md"
            >
              {loading ? "Publishing..." : "✨ Publish Story"}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
