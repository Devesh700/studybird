import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  "Platform Overview",
  "Safety & Moderation",
  "Child Activity Overview",
  "Permissions & Controls",
  "Well-Being Resources",
  "FAQs",
];

export default function ParentCornerPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 via-rose-50 to-amber-50 p-6 md:p-8">
        <Badge className="mb-3 bg-violet-700 text-white hover:bg-violet-800">Parent Corner</Badge>
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Visibility, control, and support for families.</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-700 md:text-base">
          Parent Corner helps families understand platform activity, manage controls, and support healthy creative growth.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((title) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Guidance and tools for {title.toLowerCase()} are available in this module.
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
