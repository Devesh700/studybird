"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Headphones, Mic2, BookOpen, Music, Volume2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAudioStories } from "@/features/audio-stories/audio-stories.slice";
import { setCurrent } from "@/features/audio-stories/audio-stories.slice";
import GlobalAudioPlayer from "@/components/shared/audio-player";
import AudioStoryCard from "./components/audio-story-card";

export default function ListeningPage() {
  const sp = useSearchParams();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector(s => s.audioStories);
  const [activeTab, setActiveTab] = useState("featured");

  useEffect(() => {
    dispatch(fetchAudioStories({ category: activeTab === "featured" ? undefined : activeTab, limit: 12 }));
  }, [activeTab, dispatch]);

  const playStory = (story: any) => {
    dispatch(setCurrent(story));
  };

  const CATEGORIES = [
    { value: "featured", label: "Featured", icon: Volume2 },
    { value: "stories", label: "Narrated Stories", icon: BookOpen },
    { value: "podcasts", label: "Podcasts", icon: Mic2 },
    { value: "audiobooks", label: "Audiobooks", icon: Music },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-3xl shadow-xl mb-8">
              <Headphones className="h-8 w-8 text-purple-600" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                Audio Stories
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Listen to professionally narrated stories, podcasts, and audiobooks. 
              Perfect for commutes, workouts, or bedtime.
            </p>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border-0 gap-2 max-w-4xl mx-auto">
              {CATEGORIES.map(({ value, label, icon: Icon }) => (
                <TabsTrigger 
                  key={value}
                  value={value}
                  className="rounded-2xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:shadow-xl data-[state=active]:text-white flex items-center gap-2 h-16 font-semibold transition-all"
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Featured Stories */}
            <TabsContent value="featured" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {status === "loading" ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i} className="h-64 animate-pulse bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-xl" />
                  ))
                ) : (
                  items.map((story) => (
                    <motion.div
                      key={story._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -8 }}
                    >
                      <AudioStoryCard story={story} onPlay={() => playStory(story)} />
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Other tabs with placeholder content */}
            <TabsContent value="stories" className="text-center py-20">
              <Card className="max-w-2xl mx-auto p-12 bg-white/60 backdrop-blur-xl shadow-2xl">
                <BookOpen className="h-24 w-24 text-purple-400 mx-auto mb-6 opacity-70" />
                <h3 className="text-3xl font-bold text-purple-700 mb-4">Narrated Stories</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Professionally narrated fiction coming soon
                </p>
                <Button size="lg" className="rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl px-12">
                  Stay Tuned
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="podcasts" className="text-center py-20">
              <Card className="max-w-2xl mx-auto p-12 bg-white/60 backdrop-blur-xl shadow-2xl">
                <Mic2 className="h-24 w-24 text-emerald-400 mx-auto mb-6 opacity-70" />
                <h3 className="text-3xl font-bold text-emerald-700 mb-4">Podcasts</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Storytelling podcasts and discussions
                </p>
                <Button size="lg" className="rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xl px-12">
                  Coming Soon
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="audiobooks" className="text-center py-20">
              <Card className="max-w-2xl mx-auto p-12 bg-white/60 backdrop-blur-xl shadow-2xl">
                <Music className="h-24 w-24 text-rose-400 mx-auto mb-6 opacity-70" />
                <h3 className="text-3xl font-bold text-rose-700 mb-4">Audiobooks</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Full-length narrated books
                </p>
                <Button size="lg" className="rounded-3xl bg-gradient-to-r from-rose-500 to-orange-500 shadow-xl px-12">
                  Soon Available
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Global Player - Always visible when playing */}
      <GlobalAudioPlayer />
    </>
  );
}
