"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAdminGuard } from "@/features/auth/use-admin-guard";

const titles: Record<string, { title: string; subtitle: string }> = {
  "/admin": { title: "Dashboard", subtitle: "Overview of platform activity" },
  "/admin/users": { title: "Users", subtitle: "Manage all registered accounts" },
  "/admin/posts": { title: "Posts", subtitle: "Moderate stories and content status" },
  "/admin/settings": { title: "Settings", subtitle: "Configure core admin settings" },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { initialized, isAuthenticated, isAdmin } = useAdminGuard();

  const headerCopy = useMemo(() => titles[pathname] ?? titles["/admin"], [pathname]);

  if (!initialized || !isAuthenticated || !isAdmin) {
    return <p className="p-6 text-sm text-slate-500">Checking access...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className={`min-h-screen transition-all duration-300 ${collapsed ? "lg:ml-20" : "lg:ml-72"}`}>
        <Header title={headerCopy.title} subtitle={headerCopy.subtitle} onOpenMobileSidebar={() => setMobileOpen(true)} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

