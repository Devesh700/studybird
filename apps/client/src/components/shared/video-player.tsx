"use client";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import { X, Maximize2, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setCurrentVideo } from "@/features/videos/videos.slice";

export default function GlobalVideoPlayer() {
  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { current } = useAppSelector(s => s.videos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!current) setIsExpanded(false);
  }, [current]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const closePlayer = () => {
    dispatch(setCurrentVideo(null));
  };

  if (!current) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-all ${
        isExpanded ? 'expanded' : ''
      }`}
    >
      <div className="w-full max-w-4xl h-[80vh] md:h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-500/50">
        
        {/* Video Container */}
        <div className="flex-1 relative bg-black rounded-t-3xl overflow-hidden">
          <ReactPlayer
            ref={videoRef}
            playing={isPlaying}
            volume={volume}
            width="100%"
            height="100%"
            controls={false}
            onProgress={(state: any) => setProgress(state.played)}
            className="rounded-t-3xl"
            oEmbedUrl={current.videoUrl}
            autoPlay
            // {...{ url: current.videoUrl }}
          />
          
          {/* Overlay Controls */}
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <Button
                variant="ghost"
                size="sm"
                onClick={closePlayer}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
              >
                <X className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
              >
                <Maximize2 className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                onClick={togglePlay}
                className="h-16 w-16 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/40 shadow-2xl border-2 border-white/50 text-white"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
              
              <Slider
                value={[progress * 100]}
                onValueChange={(v) => {
                  const played = v[0] / 100;
                  videoRef.current?.seekTo(played,"fraction");
                }}
                className="flex-1 h-2 mx-4 [&_.rc-slider-rail]:bg-white/30 [&_.rc-slider-track]:bg-white/80"
              />
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-6 bg-gradient-to-r from-purple-600/95 to-pink-600/95 text-white">
          <h2 className="text-2xl font-bold mb-2">{current.title}</h2>
          <div className="flex items-center gap-4 text-sm opacity-90 mb-4">
            <span>{current.author}</span>
            <div className="w-1 h-1 bg-white/70 rounded-full" />
            <span>{Math.floor(current.duration / 60)} min</span>
            <div className="flex gap-1">
              {current.categories.map(cat => (
                <Badge key={cat} variant="secondary" className="bg-white/20 border-white/40">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
          <p className="text-sm opacity-90 line-clamp-2 mb-4">{current.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs opacity-80">
              <span>👁️ {current.views.toLocaleString()}</span>
              <span>❤️ {current.likes.toLocaleString()}</span>
            </div>
            
            <Slider
              value={[volume * 100]}
              onValueChange={(v) => setVolume(v[0] / 100)}
              max={100}
              step={1}
              className="w-32 h-3 [&_.rc-slider-rail]:bg-white/30 [&_.rc-slider-track]:bg-white/80"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
