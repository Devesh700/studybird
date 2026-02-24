import AdminShell from "@/components/admin/admin-shell";
import { adminNavItems } from "@/components/admin/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  { label: "New signups (7d)", value: "248" },
  { label: "Stories published (7d)", value: "419" },
  { label: "Flagged content rate", value: "1.8%" },
  { label: "Daily active learners", value: "3,142" },
];

export default function AdminReportsPage() {
  return (
    <AdminShell title="Reports & Insights" subtitle="Monitor growth, engagement, and moderation trends." navItems={adminNavItems}>
      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border-pink-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-pink-700">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
