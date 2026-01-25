import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AudioStoryCardProps {
  story: any;
  onPlay: () => void;
}

export default function AudioStoryCard({ story, onPlay }: AudioStoryCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <Card className="group relative h-full overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 border-0 hover:-translate-y-2 cursor-pointer" onClick={onPlay}>
      <div className="relative h-48 overflow-hidden rounded-t-3xl">
        <Image 
          src={story.thumbnail || "/api/placeholder/400/300"} 
          alt={story.title}
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <Button
          size="sm"
          className="absolute bottom-3 left-3 right-3 bg-white/90 hover:bg-white text-rose-600 shadow-lg border-0 rounded-2xl backdrop-blur-sm"
        >
          <Play className="h-4 w-4 mr-2" />
          Play
        </Button>
      </div>
      
      <CardHeader className="p-6 pb-3">
        <CardTitle className="text-lg font-bold line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
          {story.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>by {story.author}</span>
          <div className="w-1 h-1 bg-current rounded-full" />
          <Clock className="h-3 w-3" />
          {formatDuration(story.duration)}
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-0 space-y-3">
        <p className="text-sm line-clamp-2 text-muted-foreground leading-relaxed">{story.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Heart className="h-3 w-3 fill-current text-rose-400" />
            <span>{story.likes.toLocaleString()}</span>
            <span>•</span>
            <span>{story.plays.toLocaleString()} plays</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {story.categories.slice(0, 2).map((cat: string) => (
              <Badge key={cat} variant="secondary" className="px-2 py-0.5 text-xs">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
