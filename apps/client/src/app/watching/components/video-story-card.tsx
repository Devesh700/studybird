import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Eye, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface VideoStoryCardProps {
  video: any;
  onPlay: () => void;
}

export default function VideoStoryCard({ video, onPlay }: VideoStoryCardProps) {
  return (
    <Card 
      className="group relative h-full overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 border-0 cursor-pointer hover:-translate-y-3" 
      onClick={onPlay}
    >
      <div className="relative h-56 overflow-hidden rounded-t-3xl">
        <Image 
          src={video.thumbnail || "/api/placeholder/400/225"} 
          alt={video.title}
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <Badge className="bg-white/90 text-orange-600 backdrop-blur-sm font-semibold">NEW</Badge>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Eye className="h-4 w-4" />
              <span>{video.views.toLocaleString()}</span>
            </div>
          </div>
          
          <Button
            size="lg"
            className="mt-4 w-full bg-white/95 hover:bg-white text-orange-600 shadow-2xl backdrop-blur-sm border-0 font-semibold rounded-2xl h-12"
          >
            <Play className="h-5 w-5 mr-2" />
            Play Story
          </Button>
        </div>
      </div>
      
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-xl font-bold line-clamp-2 leading-tight hover:text-orange-600 transition-colors group-hover:text-orange-600">
          {video.title}
        </CardTitle>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="font-semibold text-orange-700">{video.author}</span>
          <div className="w-1 h-1 bg-current rounded-full" />
          <Clock className="h-4 w-4" />
          <span>{Math.floor(video.duration / 60)} min</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-0">
        <p className="text-sm line-clamp-3 text-muted-foreground leading-relaxed mb-4">
          {video.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs opacity-75">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-rose-500 fill-current" />
              <span>{video.likes.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {video.categories.slice(0, 2).map((cat: string) => (
              <Badge key={cat} variant="outline" className="border-orange-200 text-orange-700 bg-orange-50/80">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
