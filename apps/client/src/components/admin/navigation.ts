export type AdminNavItem = {
  href: string;
  label: string;
};

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin/admin", label: "Overview" },
  { href: "/admin/admin/users", label: "Users" },
  { href: "/admin/admin/content", label: "Content" },
  { href: "/admin/admin/reports", label: "Reports" },
];

export const teacherNavItems: AdminNavItem[] = [
  { href: "/admin/teacher", label: "Overview" },
  { href: "/admin/teacher/classroom", label: "Classroom" },
  { href: "/admin/teacher/submissions", label: "Submissions" },
];

export const superAdminNavItems: AdminNavItem[] = [
  { href: "/admin/super-admin", label: "Overview" },
  { href: "/admin/super-admin/roles", label: "Roles" },
  { href: "/admin/super-admin/settings", label: "Settings" },
];
