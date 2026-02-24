import AdminShell from "@/components/admin/admin-shell";
import { teacherNavItems } from "@/components/admin/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const classrooms = [
  { name: "Grade 2 - Story Basics", students: 26, completion: "84%" },
  { name: "Grade 3 - Creative Writing", students: 31, completion: "71%" },
];

export default function TeacherClassroomPage() {
  return (
    <AdminShell title="Classroom Management" subtitle="Track class progress and learning completion by group." navItems={teacherNavItems}>
      <div className="grid gap-4 sm:grid-cols-2">
        {classrooms.map((room) => (
          <Card key={room.name} className="border-pink-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-pink-700">{room.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              <p>Students: {room.students}</p>
              <p>Completion: {room.completion}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
