import Link from "next/link";
import { ArrowRight, AudioLines, HeartPulse, Sparkles, UserRoundCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const featuredCreations = [
  { id: "s-1", title: "A Walk in the Woods", type: "Story", author: "Aria", href: "/stories/s-1" },
  { id: "s-2", title: "City of Dreams", type: "Poem", author: "Ravi", href: "/stories/s-2" },
  { id: "s-3", title: "Rainbow Kitchen Craft", type: "Recipe", author: "Meera", href: "/culinary" },
];

export default function Page() {
  return (
    <div className="space-y-10 pb-8">
      <section className="relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-amber-50 via-rose-50 to-sky-100 p-8 md:p-12">
        <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="relative z-10 max-w-3xl space-y-5">
          <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">Safe, Creative, Child-First Platform</Badge>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Create stories, art, and voice with confidence.
          </h1>
          <p className="text-base text-slate-700 md:text-lg">
            Explore learning through expression, participate in events, and grow with mentor guidance in one moderated space.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
              <Link href="/explore">Explore</Link>
            </Button>
            <Button asChild className="rounded-full bg-rose-600 text-white hover:bg-rose-700">
              <Link href="/stories/new">Submit</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-slate-300 bg-white/80">
              <Link href="/signup">Join</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Featured Creations</h2>
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/explore">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredCreations.map((item) => (
            <Link key={item.id} href={item.href}>
              <Card className="h-full border-0 bg-gradient-to-br from-white to-slate-50 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {item.type}
                  </Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>by {item.author}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-orange-100 bg-orange-50/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Sparkles className="h-5 w-5 text-orange-600" /> Why This Platform
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            Creative learning through stories, art, and audio with positive moderation.
          </CardContent>
        </Card>
        <Card className="border-teal-100 bg-teal-50/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <HeartPulse className="h-5 w-5 text-teal-600" /> Well-Being Built In
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            Physical and emotional wellness resources integrated with learning journeys.
          </CardContent>
        </Card>
        <Card className="border-cyan-100 bg-cyan-50/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <UserRoundCheck className="h-5 w-5 text-cyan-700" /> Mentor Support
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            Guided growth via mentors across writing, art, speaking, and personality development.
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AudioLines className="h-5 w-5 text-indigo-700" /> About & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <p>About Us - Vision & Mission - Community Values</p>
            <p>Help & FAQs - Contact Us - Privacy & Safety Policy - Terms & Conditions</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
