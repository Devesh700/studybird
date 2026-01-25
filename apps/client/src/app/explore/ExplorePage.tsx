"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Sparkles, Star, Clock, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchStories } from "@/features/story/slice";
import StoryCard from "@/components/story-card";
import { ExploreFilters } from "./components/explore-filters";
import { TagCloud } from "./components/tags-cloud";

export default function ExplorePage() {
  const sp = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, status, page, totalPages, total } = useAppSelector((s) => s.stories);
  
  const [searchQuery, setSearchQuery] = useState(sp.get("q") || "");
  const [activeTab, setActiveTab] = useState<"trending" | "new" | "tags" | "categories">(
    (sp.get("tab") as any) || "trending"
  );
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search
  useEffect(() => {
    const q = searchQuery || undefined;
    const tag = sp.get("tag") ?? undefined;
    const p = sp.get("page") ? Number(sp.get("page")) : 1;
    
    const params = new URLSearchParams(sp.toString());
    if (q !== sp.get("q")) {
      q ? params.set("q", q) : params.delete("q");
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`);
    }
    
    dispatch(fetchStories({ q, tag, page: p, limit: 20 }));
  }, [searchQuery, sp.get("tag"), sp.get("page"), dispatch, pathname, router, sp]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as any);
    const params = new URLSearchParams(sp.toString());
    params.set("tab", tab);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const hasMore = page < totalPages && status !== "loading";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Discover Magical Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore trending tales, new releases, and hidden gems from our creative community
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <form 
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                const params = new URLSearchParams({ q: searchQuery });
                router.push(`/explore?${params.toString()}`);
              }}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories, authors, or magical moments..."
                className="h-14 pl-12 pr-20 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl border-0 focus-visible:ring-2 focus-visible:ring-rose-300/50 text-lg"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg h-11 px-6"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Explore
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6 hidden lg:block"
          >
            <ExploreFilters />
            <TagCloud />
          </motion.div>

          {/* Stories Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
              <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-xl rounded-3xl p-1 shadow-2xl border-0 max-w-2xl mx-auto">
                <TabsTrigger 
                  value="trending" 
                  className="rounded-2xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:shadow-lg data-[state=active]:text-white transition-all"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger 
                  value="new" 
                  className="rounded-2xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:shadow-lg data-[state=active]:text-white transition-all"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  New
                </TabsTrigger>
                <TabsTrigger 
                  value="tags" 
                  className="rounded-2xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:shadow-lg data-[state=active]:text-white transition-all"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Tags
                </TabsTrigger>
              </TabsList>

              {/* Trending Stories */}
              <TabsContent value="trending" className="mt-8">
                <div className="space-y-6">
                  <AnimatePresence>
                    {status === "loading" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <motion.div
                            key={`skeleton-${i}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-80 rounded-3xl bg-gradient-to-br from-pink-100/50 to-purple-100/50 backdrop-blur-sm shadow-xl animate-pulse"
                          />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {status === "succeeded" && items.length > 0 && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {items.map((story, index) => (
                            <motion.div
                              key={story._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <StoryCard
                                id={story._id}
                                title={story.title}
                                author={story.author || "Anonymous"}
                                tags={story.tags || []}
                                body={story.description || story.body?.slice(0, 120) + "..."}
                              />
                            </motion.div>
                          ))}
                        </div>

                        {/* Load More Button */}
                        {hasMore && (
                          <div className="flex justify-center mt-12">
                            <Button
                              size="lg"
                              className="rounded-3xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-xl px-12 h-14 text-lg font-semibold"
                              onClick={() => {
                                const nextPage = page + 1;
                                const params = new URLSearchParams(sp.toString());
                                params.set("page", nextPage.toString());
                                router.push(`${pathname}?${params.toString()}`);
                              }}
                            >
                              Load More Stories
                              <Sparkles className="h-5 w-5 ml-2" />
                            </Button>
                          </div>
                        )}

                        {items.length === 0 && (
                          <Card className="text-center py-20 bg-white/60 backdrop-blur-sm">
                            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <h3 className="text-2xl font-bold text-muted-foreground mb-2">
                              No stories found
                            </h3>
                            <p className="text-muted-foreground mb-6">
                              Try adjusting your search or explore different categories
                            </p>
                            <div className="flex gap-3 justify-center">
                              <Button variant="outline" className="rounded-full">
                                Clear Filters
                              </Button>
                              <Button className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500">
                                Browse All
                              </Button>
                            </div>
                          </Card>
                        )}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </TabsContent>

              {/* New Stories */}
              <TabsContent value="new" className="mt-8">
                <div className="text-center py-20">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="h-24 w-24 text-emerald-400 mx-auto mb-8" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-emerald-600 mb-4">
                    Fresh Stories Coming Soon!
                  </h3>
                  <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
                    Be the first to read newly published works from our creative community
                  </p>
                  <Link href="/stories/new">
                    <Button size="lg" className="rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xl px-12 h-14">
                      Create Your Story
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              {/* Tags */}
              <TabsContent value="tags" className="mt-8">
                <TagCloud />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
