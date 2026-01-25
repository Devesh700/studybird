import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, Share2, MessageCircle, Eye, Utensils, BookOpen, Palette, Music, Sparkles } from "lucide-react";
import { SkillCategory } from "@/features/creativity/creativity.slice";

const SKILL_ICONS: Record<SkillCategory, any> = {
  cooking: Utensils,
  reading: BookOpen,
  art: Palette,
  dance: Music,
  music: Music,
  crafts: Palette,
  personality: Sparkles,
  sports: Star,
};

interface CreativityShowcaseCardProps {
  showcase: any;
}

export default function CreativityShowcaseCard({ showcase }: CreativityShowcaseCardProps) {
  const Icon = SKILL_ICONS[showcase.skillCategory as SkillCategory] || Star;
  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'cooking':
        return 'bg-gradient-to-r from-orange-500 to-red-500';
      case 'reading':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500';
      case 'art':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'music':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      default:
        return 'bg-gradient-to-r from-yellow-400 to-orange-400';
    }
  }
  return (
    <Card className="group relative h-full overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl border-0 hover:-translate-y-3 transition-all duration-500 cursor-pointer hover:bg-white">
      {/* Media Preview */}
      <div className="relative h-64 overflow-hidden rounded-t-3xl group-hover:brightness-105">
        {showcase.mediaType === 'image' ? (
          <Image 
            src={showcase.mediaUrl} 
            alt={showcase.title}
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center">
            <video className="w-full h-full object-cover" src={showcase.mediaUrl} />
          </div>
        )}
        
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-lg">
            {showcase.mediaType.toUpperCase()}
          </Badge>
          <Badge className={`text-white font-semibold shadow-lg ${getCategoryBadgeColor(showcase.skillCategory)}`}>
            <Icon className="h-3 w-3 mr-1" />
            {showcase.skillCategory}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-purple-200">
              <AvatarImage src={`https://i.pravatar.cc/48?u=${showcase._id}`} />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold text-sm">
                {showcase.creatorName.split(' ').map((n:any) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-bold leading-tight hover:text-purple-700 group-hover:text-purple-700 transition-colors line-clamp-1">
                {showcase.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {showcase.creatorName} {showcase.creatorAge ? `(${showcase.creatorAge})` : ''}
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-all">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 pb-6">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6">
          {showcase.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{showcase.applause}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{showcase.views.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {showcase.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5 border-purple-200">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
