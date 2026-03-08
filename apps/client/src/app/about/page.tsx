import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const values = [
  { title: "Safe Expression", text: "Every child gets a moderated and respectful environment to express ideas." },
  { title: "Creative Confidence", text: "We encourage writing, art, and audio creation through positive reinforcement." },
  { title: "Inclusive Growth", text: "The platform is designed for diverse learners, families, and mentors." },
];

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-sky-50 to-emerald-50 p-6 md:p-8">
        <Badge className="mb-3 bg-indigo-700 text-white hover:bg-indigo-800">About Storybird</Badge>
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Vision-led creative learning for every child.</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-700 md:text-base">
          Storybird helps children explore stories, art, and audio in a safe ecosystem while building confidence, empathy, and communication skills.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>About Us</CardTitle>
            <CardDescription>Who we are and why this platform exists.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            We are educators, creators, and technologists building a child-first platform where creativity is treated as a growth pathway.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vision & Mission</CardTitle>
            <CardDescription>What we aim to build at scale.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            Our vision is to make expression-led learning accessible. Our mission is to provide safe tools, guided challenges, and mentorship.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Values</CardTitle>
            <CardDescription>The culture we uphold.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            {values.map((value) => (
              <div key={value.title}>
                <p className="font-semibold text-slate-900">{value.title}</p>
                <p>{value.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
