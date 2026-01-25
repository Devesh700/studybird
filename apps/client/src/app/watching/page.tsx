"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Film, BookOpen, Video, Tv } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchVideos, setCurrentVideo } from "@/features/videos/videos.slice";
import VideoStoryCard from "./components/video-story-card";
import GlobalVideoPlayer from "@/components/shared/video-player";

export default function WatchingPage() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector(s => s.videos);
  const [activeTab, setActiveTab] = useState("featured");

  useEffect(() => {
    dispatch(fetchVideos({ category: activeTab === "featured" ? undefined : activeTab }));
  }, [activeTab, dispatch]);

  const playVideo = (video: any) => {
    dispatch(setCurrentVideo(video));
  };

  const CATEGORIES = [
    { value: "featured", label: "Featured", icon: Play },
    { value: "animations", label: "Animations", icon: Film },
    { value: "read-aloud", label: "Read Aloud", icon: BookOpen },
    { value: "tutorials", label: "Story Tutorials", icon: Video },
    { value: "live", label: "Live Readings", icon: Tv },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl px-8 py-4 rounded-3xl shadow-2xl mb-8">
              <Play className="h-10 w-10 text-orange-600" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
                Watch Stories Come Alive
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Animated tales, live readings, and video tutorials. 
              Visual storytelling for every imagination.
            </p>
          </motion.div>

          {/* Categories */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-16">
            <TabsList className="grid w-full grid-cols-5 bg-white/70 backdrop-blur-2xl rounded-3xl p-2 shadow-2xl border-0 gap-2 max-w-5xl mx-auto">
              {CATEGORIES.map(({ value, label, icon: Icon }) => (
                <TabsTrigger 
                  key={value}
                  value={value}
                  className="rounded-2xl py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-rose-500 data-[state=active]:shadow-2xl data-[state=active]:text-white flex items-center gap-2 h-20 font-semibold transition-all hover:scale-[1.02]"
                >
                  <Icon className="h-6 w-6" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Featured Videos */}
            <TabsContent value="featured" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {status === "loading" ? (
                  Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-80 rounded-3xl bg-gradient-to-br from-orange-100 to-rose-100 animate-pulse shadow-xl" />
                  ))
                ) : (
                  items.map((video) => (
                    <motion.div
                      key={video._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -12, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <VideoStoryCard video={video} onPlay={() => playVideo(video)} />
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Placeholder tabs */}
            {CATEGORIES.slice(1).map(({ value }) => (
              <TabsContent key={value} value={value} className="text-center py-24">
                <Card className="max-w-2xl mx-auto p-12 bg-white/60 backdrop-blur-xl shadow-2xl border-0">
                  <Play className="h-28 w-28 text-orange-400 mx-auto mb-8 opacity-70" />
                  <h3 className="text-3xl font-bold text-orange-700 mb-4 capitalize">{value.replace('-', ' ')}</h3>
                  <p className="text-xl text-muted-foreground mb-8">Exciting {value} content coming soon!</p>
                  <Button size="lg" className="rounded-3xl bg-gradient-to-r from-orange-500 to-rose-500 shadow-xl px-12">
                    Stay Tuned
                  </Button>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <GlobalVideoPlayer />
    </>
  );
}
