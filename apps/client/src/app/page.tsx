import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featured = [
  { id: "s-1", title: "A Walk in the Woods", author: "Aria", tags: ["Nature", "Short"] },
  { id: "s-2", title: "City of Dreams", author: "Ravi", tags: ["Fiction", "Urban"] },
];

export default function Page() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Featured stories</h1>
        <p className="text-muted-foreground">Read hand‑picked stories from the community.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((s) => (
          <Link key={s.id} href={`/stories/${s.id}`}>
            <Card className="hover:shadow">
              <CardHeader>
                <CardTitle className="line-clamp-1">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">by {s.author}</span>
                <div className="flex gap-2">
                  {s.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
