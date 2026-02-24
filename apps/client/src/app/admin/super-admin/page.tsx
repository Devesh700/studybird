"use client";

import AdminShell from "@/components/admin/admin-shell";
import { superAdminNavItems } from "@/components/admin/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const superAdminActions = [
  { label: "Roles", href: "/admin/super-admin/roles", description: "Define permissions and access policy." },
  { label: "Settings", href: "/admin/super-admin/settings", description: "Control global platform and security settings." },
];

export default function SuperAdminRolePage() {
  return (
    <AdminShell
      title="Super Admin Dashboard"
      subtitle="Global controls for permissions, compliance, and platform configuration."
      navItems={superAdminNavItems}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {superAdminActions.map((action) => (
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
