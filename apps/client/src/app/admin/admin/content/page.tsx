import AdminShell from "@/components/admin/admin-shell";
import { adminNavItems } from "@/components/admin/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const flaggedItems = [
  { title: "Ocean Adventure", type: "Story", reason: "Language review required" },
  { title: "Kitchen Fire Demo", type: "Video", reason: "Needs safety disclaimer" },
  { title: "Paint Splash Contest", type: "Image", reason: "Duplicate submission" },
];

export default function AdminContentPage() {
  return (
    <AdminShell title="Content Moderation" subtitle="Check flagged items and decide publish, hold, or reject." navItems={adminNavItems}>
      <div className="grid gap-3">
        {flaggedItems.map((item) => (
          <Card key={item.title} className="border-pink-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-pink-700">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {item.type} - {item.reason}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
