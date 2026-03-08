import Link from "next/link";
import { Calendar, MessageCircleHeart, Rocket, ShieldCheck, Sparkles, Trophy, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const creationStats = [
  { label: "Stories", value: 12 },
  { label: "Artwork", value: 8 },
  { label: "Audio", value: 5 },
];

const events = [
  { title: "Spring Story Sprint", status: "Ongoing", date: "Mar 18, 2026" },
  { title: "Creative Audio Week", status: "Upcoming", date: "Apr 03, 2026" },
  { title: "Art Sparks Festival", status: "Completed", date: "Feb 12, 2026" },
];

const achievements = ["First Story Published", "Art Explorer", "Kind Collaborator", "Mindful Creator"];

export default function ProfilePage({ params }: { params: { username: string } }) {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-emerald-50 to-amber-50 p-6 md:p-8">
        <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-cyan-200/40 blur-2xl" />
        <div className="absolute -bottom-10 right-4 h-36 w-36 rounded-full bg-amber-200/40 blur-2xl" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">Child Dashboard</p>
            <h1 className="text-3xl font-black text-slate-900 md:text-4xl">@{params.username}</h1>
            <p className="mt-1 text-sm text-slate-700">Track your creations, events, progress, and mentor connections.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
              <Link href="/stories/new">Create New</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/explore">Explore</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserRound className="h-5 w-5 text-cyan-700" /> My Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <p>Learning focus: Creative writing, drawing, and speaking.</p>
            <p>Current streak: 6 days of activity.</p>
            <p>Safety status: Verified and moderated.</p>
            <div className="pt-2">
              <Badge className="bg-cyan-700 text-white hover:bg-cyan-800">
                <ShieldCheck className="mr-1 h-3 w-3" /> Safe Account
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">My Creations</CardTitle>
            <CardDescription>Snapshot of your published and in-progress work.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            {creationStats.map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">{item.label}</p>
                <p className="text-3xl font-bold text-slate-900">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-amber-600" /> My Events
            </CardTitle>
            <CardDescription>Ongoing, upcoming, and recently completed challenges.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.map((event) => (
              <div key={event.title} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <div>
                  <p className="font-semibold text-slate-900">{event.title}</p>
                  <p className="text-sm text-slate-600">{event.date}</p>
                </div>
                <Badge variant={event.status === "Ongoing" ? "default" : "secondary"}>{event.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircleHeart className="h-5 w-5 text-rose-600" /> Mentor Connect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>Next guidance session: Tuesday, 5:30 PM</p>
            <p>Unread mentor messages: 2</p>
            <Button asChild size="sm" className="rounded-full bg-rose-600 text-white hover:bg-rose-700">
              <Link href="/explore">Open Messages</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-emerald-100 bg-emerald-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5 text-emerald-700" /> Achievements & Badges
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {achievements.map((badge) => (
              <Badge key={badge} className="bg-emerald-700 text-white hover:bg-emerald-800">
                <Sparkles className="mr-1 h-3 w-3" /> {badge}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Rocket className="h-5 w-5 text-indigo-700" /> Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start rounded-xl">
              <Link href="/stories/new">Submit New Creation</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start rounded-xl">
              <Link href="/culinary">Open Creative Lab</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start rounded-xl">
              <Link href="/explore">Browse Events & Challenges</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
