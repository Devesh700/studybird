import AdminShell from "@/components/admin/admin-shell";
import { teacherNavItems } from "@/components/admin/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const submissions = [
  { title: "My Dream Garden", student: "Anaya", status: "Awaiting feedback" },
  { title: "The Busy Bee", student: "Krish", status: "Approved" },
  { title: "Rainy Day Poem", student: "Ishita", status: "Needs revision" },
];

export default function TeacherSubmissionsPage() {
  return (
    <AdminShell title="Submission Review" subtitle="Provide feedback and update learning status for each submission." navItems={teacherNavItems}>
      <div className="space-y-3">
        {submissions.map((item) => (
          <Card key={item.title} className="border-pink-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-pink-700">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Student: {item.student}</p>
              <Badge variant="secondary">{item.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
