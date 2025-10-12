"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchStoryById, clearCurrent } from "@/features/story/slice";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";

export default function StoryPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const { current, currentStatus } = useAppSelector((s) => s.stories);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    dispatch(fetchStoryById(params.id));
    return () => {
      dispatch(clearCurrent());
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    };
  }, [params.id, dispatch]);

  const handleSpeechToggle = () => {
    if (!current?.body) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(current.body);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  if (currentStatus === "loading" || !current) {
    return (
      <div className="h-72 w-full max-w-3xl mx-auto mt-10 rounded-3xl border animate-pulse bg-gradient-to-br from-pink-100 to-blue-100 shadow-md" />
    );
  }

  return (
    <div className="relative py-10 px-4 flex flex-col items-center">
      {/* Floating background decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-16 w-56 h-56 bg-blue-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      </div>

      <article className="max-w-3xl w-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-lg p-6 md:p-10 border border-pink-100 relative overflow-hidden backdrop-blur-sm">
        {/* Decorative bubbles */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-pink-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30" />

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-700 mb-2 drop-shadow-sm">
          📖 {current.title}
        </h1>
        <p className="text-center text-pink-600 mb-6 italic text-sm">
          by {current.author || "Anonymous"}
        </p>

        <div className="flex justify-center mb-6">
          <Button
            onClick={handleSpeechToggle}
            className={`rounded-full px-5 py-2 flex items-center gap-2 text-white ${
              isSpeaking
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX size={18} /> Stop Reading
              </>
            ) : (
              <>
                <Volume2 size={18} /> Read Aloud
              </>
            )}
          </Button>
        </div>

        <hr className="border-pink-200 mb-6" />

        {/* Story Body */}
        <div className="prose dark:prose-invert max-w-none text-gray-700 leading-relaxed text-lg">
          {current.body.split("\n").map((p: string, i: number) => (
            <p
              key={i}
              className="mb-5 first-letter:text-4xl first-letter:font-bold first-letter:text-pink-600"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            className="rounded-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 text-base shadow-md"
          >
            <Link href="/explore">⬅️ Back to Explore</Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
