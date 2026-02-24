"use client";

import AdminShell from "@/components/admin/admin-shell";
import { teacherNavItems } from "@/components/admin/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const teacherActions = [
  { label: "Classroom", href: "/admin/teacher/classroom", description: "Manage classes and student groups." },
  { label: "Submissions", href: "/admin/teacher/submissions", description: "Review student work and feedback status." },
];

export default function TeacherRolePage() {
  return (
    <AdminShell
      title="Teacher Dashboard"
      subtitle="Monitor student activity and manage classroom learning flow."
      navItems={teacherNavItems}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {teacherActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="h-full border-pink-100 transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base text-pink-700">{action.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
