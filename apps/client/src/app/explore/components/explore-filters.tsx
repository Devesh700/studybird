// components/explore-filters.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ExploreFilters() {
  return (
    <div className="space-y-4">
      <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-sm shadow-xl">
        <h3 className="font-bold text-lg text-rose-700 mb-4 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </h3>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {["Fiction", "Romance", "Fantasy"].map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-rose-100">
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full rounded-xl">
            More Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
