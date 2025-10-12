"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchStories } from "@/features/story/slice";
import StoryCard from "@/components/story-card";
import ExploreCategoryTabs from "./components/explore-category-tabs";

export default function ExplorePage() {
  const sp = useSearchParams();
  const dispatch = useAppDispatch();
  const { items, status, page, totalPages } = useAppSelector((s) => s.stories);
  const [activeTab, setActiveTab] = useState("trending");

  useEffect(() => {
    const q = sp.get("q") ?? undefined;
    const tag = sp.get("tag") ?? undefined;
    const p = sp.get("page") ? Number(sp.get("page")) : 1;
    dispatch(fetchStories({ q, tag, page: p, limit: 12 }));
  }, [sp, dispatch]);

  return (
    <div className="space-y-8 py-6 px-4 md:px-0">
      {/* Search Bar */}
      <form
        className="flex items-center justify-center gap-3"
        action="/explore"
      >
        <Input
          name="q"
          defaultValue={sp.get("q") ?? ""}
          placeholder="🔍 Search magical stories..."
          className="max-w-lg rounded-full border-pink-200 bg-white shadow-inner focus:ring-2 focus:ring-pink-300"
        />
      </form>

      {/* Tabs */}
      <Tabs
        defaultValue={sp.get("tag") ? "tags" : "trending"}
        className="space-y-6"
      >
        <TabsList className="flex justify-center bg-pink-100 p-1 rounded-full shadow-inner max-w-md mx-auto">
          {/* <TabsTrigger
            value="trending"
            className="rounded-full px-4 py-2 text-pink-700 data-[state=active]:bg-pink-300 data-[state=active]:text-pink-900 transition-all"
          >
            🔥 Trending
          </TabsTrigger>
          <TabsTrigger
            value="new"
            className="rounded-full px-4 py-2 text-pink-700 data-[state=active]:bg-pink-300 data-[state=active]:text-pink-900 transition-all"
          >
            🌟 New
          </TabsTrigger>
          <TabsTrigger
            value="tags"
            className="rounded-full px-4 py-2 text-pink-700 data-[state=active]:bg-pink-300 data-[state=active]:text-pink-900 transition-all"
          >
            🏷️ Tags
          </TabsTrigger> */}

          <ExploreCategoryTabs
        defaultTab={activeTab}
        onChange={(t) => setActiveTab(t)}
      />
        </TabsList>

        {/* Trending Stories */}
        <TabsContent
          value="trending"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {status === "loading" &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl border animate-pulse bg-gradient-to-br from-pink-100 to-purple-100 shadow-sm"
              />
            ))}

          {status !== "loading" &&
            items.map((s) => (
              <StoryCard
        key={s._id}
        id={s._id}
        title={s.title}
        author={s.author}
        body={s.body}
        tag={s.tags?.toString()}
      />
            ))}
        </TabsContent>

        {/* New Stories */}
        <TabsContent value="new" className="text-center py-10 text-pink-700">
          🌱 Freshly published stories coming your way soon!
        </TabsContent>

        {/* Tags Section */}
        <TabsContent
          value="tags"
          className="flex gap-3 flex-wrap justify-center"
        >
          {["Fiction", "Poetry", "Kids", "Nature", "Sci-Fi", "Romance"].map(
            (t) => (
              <Link
                key={t}
                href={`/explore?tag=${t}`}
                className="px-4 py-2 rounded-full border border-pink-200 bg-pink-50 hover:bg-pink-200 hover:text-pink-900 text-sm text-pink-700 transition-all"
              >
                #{t}
              </Link>
            )
          )}
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3">
        <Link
          href={`/explore?page=${Math.max(page - 1, 1)}`}
          className={`px-4 py-2 rounded-full border border-pink-200 bg-pink-50 hover:bg-pink-200 text-pink-700 transition-all ${
            page <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          ⬅️ Prev
        </Link>
        <span className="text-sm text-pink-700">
          Page {page} of {totalPages}
        </span>
        <Link
          href={`/explore?page=${page + 1}`}
          className={`px-4 py-2 rounded-full border border-pink-200 bg-pink-50 hover:bg-pink-200 text-pink-700 transition-all ${
            page >= totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next ➡️
        </Link>
      </div>
    </div>
  );
}
