"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminGuard } from "@/features/auth/use-admin-guard";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminNavItem } from "./navigation";

export default function AdminShell({
  title,
  subtitle,
  navItems,
  children,
}: {
  title: string;
  subtitle: string;
  navItems: AdminNavItem[];
  children: ReactNode;
}) {
  const { initialized, isAuthenticated, isAdmin } = useAdminGuard();
  const pathname = usePathname();

  if (!initialized || !isAuthenticated || !isAdmin) {
    return <p className="text-sm text-muted-foreground">Checking access...</p>;
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-pink-700">Admin Panel</h2>
            <p className="text-sm text-pink-700/80">Platform tools with role-based navigation.</p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-full border border-pink-300 bg-white px-4 py-2 text-sm font-medium text-pink-700 transition-colors hover:bg-pink-50"
          >
            Go to Website
          </Link>
        </div>
        <nav className="mt-4 flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                pathname === item.href
                  ? "border-pink-400 bg-pink-500 text-white"
                  : "border-pink-200 bg-white text-pink-700 hover:bg-pink-50"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>
      <Card className="border-pink-100">
        <CardHeader>
          <CardTitle className="text-pink-700">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
