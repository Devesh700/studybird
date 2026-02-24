"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WaveSurfer from "wavesurfer.js";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setPlaying, setCurrentTime, setPlayerProgress } from "@/features/audio-stories/audio-stories.slice";

export default function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<WaveSurfer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { current, player } = useAppSelector(s => s.audioStories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!current?.audioUrl) return;

    const audio = audioRef.current!;
    audio.src = current.audioUrl;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current!,
      waveColor: 'rgb(236, 72, 153)',
      progressColor: 'rgb(244, 63, 94)',
      height: 40,
      barWidth: 2,
    //   responsive: true,
    });

    waveformRef.current = wavesurfer;
    wavesurfer.load(current.audioUrl);

    const handleTimeUpdate = () => {
      dispatch(setPlayerProgress({
        currentTime: audio.currentTime,
        duration: audio.duration,
      }));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', () => {
      dispatch(setPlayerProgress({
        currentTime: 0,
        duration: audio.duration,
      }));
    });

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      wavesurfer.destroy();
    };
  }, [current, dispatch]);

  const togglePlay = () => {
    const audio = audioRef.current!;
    if (player.isPlaying) {
      audio.pause();
      dispatch(setPlaying(false));
    } else {
      audio.play();
      dispatch(setPlaying(true));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!current) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white shadow-2xl z-50 border-t-4 border-rose-500/50 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="relative">
            <img 
              src={current.thumbnail || "/api/placeholder/80/80"} 
              alt={current.title}
              className="w-16 h-16 rounded-2xl shadow-2xl object-cover"
            />
            <div className={`absolute -inset-1 bg-white/20 rounded-2xl blur animate-ping ${player.isPlaying ? 'opacity-100' : 'opacity-0'}`} />
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm truncate">{current.title}</h3>
            <p className="text-xs opacity-90 truncate">{current.author}</p>
          </div>

          {/* Waveform */}
          <div ref={containerRef} className="flex-1 max-w-md mx-4" />

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="h-10 w-10 p-0 rounded-full">
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              onClick={togglePlay}
              className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 shadow-2xl border-2 border-white/30"
            >
              {player.isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
            </Button>
            
            <Button size="sm" variant="ghost" className="h-10 w-10 p-0 rounded-full">
              <SkipForward className="h-5 w-5" />
            </Button>

            {/* Volume & Progress */}
            <div className="flex items-center gap-4 ml-4">
              <Slider 
                value={[player.volume * 100]} 
                onValueChange={(v) => {
                  const audio = audioRef.current;
                  if (audio) audio.volume = v[0] / 100;
                }}
                max={100}
                step={1}
                className="w-20 h-2"
              />
              <span className="text-xs font-mono w-12 text-right">
                {formatTime(player.currentTime)} / {formatTime(player.duration)}
              </span>
            </div>
          </div>
        </div>

        <audio ref={audioRef} />
      </div>
    </motion.div>
  );
}
