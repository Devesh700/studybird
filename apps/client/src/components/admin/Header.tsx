"use client";

import { Bell, Menu } from "lucide-react";

type HeaderProps = {
  title: string;
  subtitle?: string;
  onOpenMobileSidebar: () => void;
};

export default function Header({ title, subtitle, onOpenMobileSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 md:text-xl">{title}</h1>
            {subtitle ? <p className="text-xs text-slate-500 md:text-sm">{subtitle}</p> : null}
          </div>
        </div>
        <button
          type="button"
          className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

