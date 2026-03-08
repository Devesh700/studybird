import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categories = ["Writing", "Art", "Speaking / Audio", "Personality Development"];

const mentors = [
  { name: "Aarav Mehta", specialty: "Writing", focus: "Story structure and imagination" },
  { name: "Riya Sharma", specialty: "Art", focus: "Drawing confidence and craft" },
  { name: "Dev Kapoor", specialty: "Speaking / Audio", focus: "Voice expression and clarity" },
];

export default function MentorsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-sky-50 to-indigo-50 p-6 md:p-8">
        <Badge className="mb-3 bg-cyan-700 text-white hover:bg-cyan-800">Mentors</Badge>
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Guidance from experts across creativity tracks.</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-700 md:text-base">
          Children can explore mentor profiles, request support, and join structured sessions for skill growth.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Mentor Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {mentors.map((mentor) => (
          <Card key={mentor.name}>
            <CardHeader>
              <CardTitle>{mentor.name}</CardTitle>
              <CardDescription>{mentor.specialty}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">{mentor.focus}</CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request Guidance</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            Submit your support request by sharing your current goal and preferred mentor category.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Sessions / Messages</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            Track upcoming mentor sessions and message updates from your dashboard.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
