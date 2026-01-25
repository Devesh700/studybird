// components/tag-cloud.tsx
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const popularTags = [
  { name: "Fantasy", count: 1_234 },
  { name: "Romance", count: 987 },
  { name: "Sci-Fi", count: 765 },
  { name: "Poetry", count: 543 },
  { name: "Mystery", count: 432 },
];

export function TagCloud() {
  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50/80 to-indigo-50/80 backdrop-blur-sm shadow-xl">
      <h3 className="font-bold text-lg text-purple-700 mb-6">Popular Tags</h3>
      <div className="grid grid-cols-2 gap-2">
        {popularTags.map((tag) => (
          <Link
            key={tag.name}
            href={`/explore?tag=${tag.name.toLowerCase()}`}
            className="group"
          >
            <Badge 
              variant="secondary" 
              className="w-full justify-between px-3 py-2 h-auto text-xs hover:bg-purple-200 transition-all group-hover:scale-[1.02]"
            >
              <span>{tag.name}</span>
              <span className="text-muted-foreground ml-2">{tag.count}</span>
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
