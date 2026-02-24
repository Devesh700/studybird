"use client";

import AdminShell from "@/components/admin/admin-shell";
import { adminNavItems } from "@/components/admin/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quickActions = [
  { label: "Review users", href: "/admin/admin/users", description: "Approve or block user accounts." },
  { label: "Moderate content", href: "/admin/admin/content", description: "Handle flagged stories and uploads." },
  { label: "Check reports", href: "/admin/admin/reports", description: "Track engagement and safety metrics." },
];

export default function AdminRolePage() {
  return (
    <AdminShell title="Admin Dashboard" subtitle="Manage users, submissions, and platform quality." navItems={adminNavItems}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
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
