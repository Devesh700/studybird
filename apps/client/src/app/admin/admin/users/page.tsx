import AdminShell from "@/components/admin/admin-shell";
import { adminNavItems } from "@/components/admin/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const users = [
  { name: "Aria Kumar", role: "Student", status: "Active" },
  { name: "Ravi Shah", role: "Teacher", status: "Pending Review" },
  { name: "Meera Iyer", role: "Parent", status: "Active" },
];

export default function AdminUsersPage() {
  return (
    <AdminShell title="User Management" subtitle="Review account health, role status, and onboarding state." navItems={adminNavItems}>
      <div className="space-y-3">
        {users.map((user) => (
          <Card key={user.name} className="border-pink-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-pink-700">{user.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{user.role}</p>
              <Badge variant="secondary">{user.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
