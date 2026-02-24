import AdminShell from "@/components/admin/admin-shell";
import { superAdminNavItems } from "@/components/admin/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const roleRules = [
  { role: "Teacher", access: "Classroom tools, submissions, student progress" },
  { role: "Admin", access: "User operations, content moderation, reports" },
  { role: "Super Admin", access: "All modules, policy controls, system settings" },
];

export default function SuperAdminRolesPage() {
  return (
    <AdminShell
      title="Roles & Permissions"
      subtitle="Manage access policy and module visibility across the platform."
      navItems={superAdminNavItems}
    >
      <div className="space-y-3">
        {roleRules.map((rule) => (
          <Card key={rule.role} className="border-pink-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-pink-700">{rule.role}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{rule.access}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
