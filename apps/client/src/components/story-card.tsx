"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface StoryCardProps {
  id: string;
  title: string;
  author?: string;
  body: string;
  tags?: string[];
}

export default function StoryCard({ id, title, author, body, tags }: StoryCardProps) {
  // Generate a short excerpt from story body
  const excerpt = useMemo(() => {
    const clean = body?.replace(/\n/g, " ").trim();
    return clean.length > 120 ? clean.slice(0, 120) + "..." : clean;
  }, [body]);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative rounded-3xl overflow-hidden shadow-md border border-pink-100 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 hover:shadow-xl transition-all duration-300"
    >
      {/* Decorative soft gradient blob */}
      <div className="absolute -top-6 -right-8 w-32 h-32 bg-pink-200 blur-3xl opacity-25" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200 blur-3xl opacity-25" />

      {/* Card Content */}
      <div className="relative p-6 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-bold text-pink-700 mb-2 line-clamp-2">{title}</h2>
          <p className="text-gray-600 text-sm italic mb-3">by {author || "Anonymous"}</p>
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{excerpt}</p>
        </div>

        {/* Tag & Button Row */}
        <div className="flex items-center justify-between mt-4">
          {tags && tags?.map((tag)=>(
            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full font-medium">
              #{tag}
            </span>
          ))}
          <Link
            href={`/stories/${id}`}
            className="text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors"
          >
            Read →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
