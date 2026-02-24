"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Palette, BookOpen, Utensils, Music, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCreativityShowcase } from "@/features/creativity/creativity.slice";
import CreativityShowcaseCard from "./components/creativity-showcase-card";
import ShareSkillDialog from "./components/share-skill-dialog";

export default function CreativityCornerPage() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector(s => s.creativity);
  const [activeTab, setActiveTab] = useState("featured");
  const [showShareDialog, setShowShareDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchCreativityShowcase({ category: activeTab === "featured" ? undefined : activeTab }));
  }, [activeTab, dispatch]);



  const SKILL_CATEGORIES = [
    { value: "featured", label: "⭐ Featured", icon: Star, color: "bg-gradient-to-r from-yellow-400 to-orange-400" },
    { value: "cooking", label: "🍳 Cooking", icon: Utensils, color: "bg-gradient-to-r from-orange-500 to-red-500" },
    { value: "reading", label: "📚 Reading", icon: BookOpen, color: "bg-gradient-to-r from-blue-500 to-indigo-500" },
    { value: "art", label: "🎨 Art", icon: Palette, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { value: "music", label: "🎵 Music", icon: Music, color: "bg-gradient-to-r from-emerald-500 to-teal-500" },
  ];

  const getCategoryColor = (category: string) => {
    const cat = SKILL_CATEGORIES.find(c => c.value === category) || SKILL_CATEGORIES[0];
    return cat.color;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-xl px-8 py-6 rounded-3xl shadow-2xl mb-8 border border-white/50">
            <Sparkles className="h-12 w-12 text-purple-500 drop-shadow-lg" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Creativity Corner
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Show the world your amazing skills! 👏 Cooking, art, reading, music - 
                <br className="md:hidden" /> share your talents and inspire others ✨
              </p>
            </div>
          </div>
          
          <Button 
            size="lg" 
            onClick={() => setShowShareDialog(true)}
            className="rounded-3xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-xl px-12 h-14 text-lg font-semibold text-white"
          >
            ✨ Share Your Skill
          </Button>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-16">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-2xl rounded-3xl p-2 shadow-2xl border-0 gap-2 max-w-7xl mx-auto">
            {SKILL_CATEGORIES.map(({ value, label, icon: Icon, color }) => (
              <TabsTrigger 
                key={value}
                value={value}
                className="rounded-2xl py-4 data-[state=active]:shadow-2xl data-[state=active]:translate-y-1 data-[state=active]:border-0 flex flex-col items-center gap-2 h-24 font-semibold group transition-all hover:scale-105 hover:shadow-lg"
              >
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shadow-lg group-data-[state=active]:shadow-xl`}>
                  <Icon className="h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <span className="text-sm">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Featured Content */}
          <TabsContent value="featured" className="space-y-12">
            {/* Top Creators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {[1,2,3,4].map((creator) => (
                <Card key={creator} className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-xl shadow-xl hover:shadow-2xl border-0 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                  <div className="p-8 text-center">
                    <div className="relative mx-auto mb-6">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-2xl group-hover:scale-110 transition-transform">
                        <AvatarImage src={`https://i.pravatar.cc/120?u=${creator}`} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-2xl font-bold">
                          {creator}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-3 -right-3 bg-yellow-400 rounded-full p-2 shadow-lg">
                        <Star className="h-6 w-6 text-yellow-900 fill-current" />
                      </div>
                    </div>
                    <CardTitle className="font-bold text-xl mb-2 text-purple-900 group-hover:text-purple-700">
                      Sara's Kitchen
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 justify-center">
                      <Utensils className="h-4 w-4" />
                      <span>127 Applauses</span>
                    </div>
                    <div className="flex gap-2 justify-center flex-wrap">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">Cooking</Badge>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">Baking</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Showcase Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {status === "pending" ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-80 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 animate-pulse shadow-xl" />
                ))
              ) : (
                items.map((showcase) => (
                  <motion.div
                    key={showcase._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -12 }}
                  >
                    <CreativityShowcaseCard showcase={showcase} />
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Category-specific content */}
          {SKILL_CATEGORIES.slice(1).map(({ value }) => (
            <TabsContent key={value} value={value} className="py-20">
              <div className="text-center max-w-4xl mx-auto">
                <div className={`w-32 h-32 mx-auto mb-8 rounded-3xl ${getCategoryColor(value)} flex items-center justify-center shadow-2xl`}>
                  <Sparkles className="h-16 w-16 text-white drop-shadow-lg" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6 capitalize">{value.replace('-', ' ')} Showcase</h2>
                <p className="text-xl text-muted-foreground mb-12">
                  Amazing {value.replace('-', ' ')} creations from our young creators coming soon!
                </p>
                <Button size="lg" className="rounded-3xl shadow-xl px-12 h-14" onClick={() => setShowShareDialog(true)}>
                  Be the First to Share ✨
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <ShareSkillDialog open={showShareDialog} onOpenChange={setShowShareDialog} />
    </div>
  );
}
