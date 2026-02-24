import AdminShell from "@/components/admin/admin-shell";
import { superAdminNavItems } from "@/components/admin/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const settingsGroups = [
  { title: "Security", description: "Password policy, session timeout, and login guardrails." },
  { title: "Moderation", description: "Flag thresholds, blocked terms, and escalation flow." },
  { title: "Platform", description: "Feature toggles, homepage sections, and API usage limits." },
];

export default function SuperAdminSettingsPage() {
  return (
    <AdminShell title="Platform Settings" subtitle="Configure global controls and compliance settings." navItems={superAdminNavItems}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {settingsGroups.map((group) => (
          <Card key={group.title} className="border-pink-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-pink-700">{group.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{group.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
