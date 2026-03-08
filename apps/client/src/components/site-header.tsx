"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  BookOpenText,
  Lightbulb,
  Trophy,
  HeartPulse,
  Users,
  House,
  Info,
  LifeBuoy,
  BookText,
  Brush,
  Mic2,
  ImageIcon,
  Utensils,
  LogIn,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/auth.slice";
import { selectAuthUser, selectIsAdmin, selectIsAuthenticated } from "@/features/auth/auth.selectors";

export interface NavItem {
  href?: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);
  const profileSlug = (authUser?.name ?? "me").trim().toLowerCase().replace(/\s+/g, "-");
  const accountHref = `/profile/${encodeURIComponent(profileSlug || "me")}`;
  const isAdminRoute = pathname.startsWith("/admin");
  const adminPortalHref = isAdminRoute ? "/" : "/admin";
  const adminPortalLabel = isAdminRoute ? "Website" : "Admin Panel";
  const getProtectedHref = (href?: string) =>
    isAuthenticated ? (href ?? "/") : `/login?next=${encodeURIComponent(href ?? "/")}`;
  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isAdminRoute) {
    return null;
  }

  const navItems: NavItem[] = [
    {
      label: "Explore",
      icon: <BookOpenText className="h-4 w-4 text-blue-500" />,
      children: [
        { label: "Read", href: "/explore", icon: <BookText className="h-4 w-4" /> },
        { label: "Listen", href: "/listening", icon: <Mic2 className="h-4 w-4" /> },
        { label: "Art Gallery", href: "/drawing", icon: <ImageIcon className="h-4 w-4" /> },
        { label: "Recipes & Experiments", href: "/culinary", icon: <Utensils className="h-4 w-4" /> },
        { label: "Well-Being Library", href: "/explore", icon: <HeartPulse className="h-4 w-4" /> },
      ],
    },
    {
      label: "Create & Submit",
      icon: <Lightbulb className="h-4 w-4 text-amber-500" />,
      children: [
        { label: "Written Submission", href: "/stories/new", icon: <BookText className="h-4 w-4" /> },
        { label: "Artwork Upload", href: "/drawing", icon: <Brush className="h-4 w-4" /> },
        { label: "Audio Upload", href: "/listening", icon: <Mic2 className="h-4 w-4" /> },
        { label: "Submission Guidelines", href: "/stories/new", icon: <BookOpenText className="h-4 w-4" /> },
      ],
    },
    {
      label: "Events & Challenges",
      icon: <Trophy className="h-4 w-4 text-rose-500" />,
      children: [
        { label: "Ongoing Events", href: "/explore" },
        { label: "Upcoming Events", href: "/explore" },
        { label: "Past Highlights", href: "/explore" },
        { label: "Certificates", href: "/explore" },
      ],
    },
    {
      label: "Well-Being",
      icon: <HeartPulse className="h-4 w-4 text-emerald-600" />,
      children: [
        { label: "Physical Well-Being", href: "/explore" },
        { label: "Mental & Emotional", href: "/explore" },
        { label: "Audio Wellness", href: "/listening" },
      ],
    },
    {
      label: "Mentors",
      icon: <Users className="h-4 w-4 text-cyan-700" />,
      children: [
        { label: "Mentor Categories", href: "/mentors" },
        { label: "Mentor Profiles", href: "/mentors" },
        { label: "Request Guidance", href: "/mentors" },
      ],
    },
    {
      label: "Parent Corner",
      icon: <House className="h-4 w-4 text-violet-600" />,
      children: [
        { label: "Platform Overview", href: "/parent-corner" },
        { label: "Safety & Moderation", href: "/parent-corner" },
        { label: "Permissions & Controls", href: "/parent-corner" },
      ],
    },
    {
      label: "About",
      icon: <Info className="h-4 w-4 text-slate-600" />,
      children: [
        { label: "About Us", href: "/about" },
        { label: "Vision & Mission", href: "/about" },
        { label: "Community Values", href: "/about" },
      ],
    },
    {
      label: "Support",
      icon: <LifeBuoy className="h-4 w-4 text-indigo-600" />,
      children: [
        { label: "Help & FAQs", href: "/support" },
        { label: "Contact Us", href: "/support" },
        { label: "Privacy & Safety", href: "/support" },
        { label: "Terms & Conditions", href: "/support" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-all">
          Storybird
        </Link>

        <nav className="hidden md:flex items-center gap-4 ml-8 relative">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <button
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all hover:bg-pink-200",
                    hovered === item.label && "bg-pink-200",
                    pathname === item.href && "bg-pink-300 text-pink-900"
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>

                {hovered === item.label && (
                  <div className="absolute left-0 pt-2 w-48 animate-fadeIn z-50">
                    <div className="bg-white border border-pink-100 rounded-2xl shadow-lg py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={getProtectedHref(child.href)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-pink-700 hover:bg-pink-100 transition-all"
                        >
                          {child.icon ?? ""}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={getProtectedHref(item.href)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all hover:bg-pink-200",
                  pathname === item.href && "bg-pink-300 text-pink-900"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2 ml-4">
          {!mounted ? null : !isAuthenticated ? (
            <>
              <Button asChild className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 font-semibold text-white shadow-md transition-all hover:from-pink-600 hover:to-rose-600 hover:shadow-lg">
                <Link href="/login">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
            </>
          ) : (
            <>
              {isAdmin ? (
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={adminPortalHref}>{adminPortalLabel}</Link>
                </Button>
              ) : null}
              {!isAdmin && !isAdminRoute ? (
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={accountHref}>
                    <UserCircle className="h-4 w-4" />
                    Account
                  </Link>
                </Button>
              ) : null}
              <Button variant="outline" className="rounded-full" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-200">
                <Menu className="h-5 w-5 text-pink-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-pink-50 overflow-y-auto">
              <div className="flex flex-col gap-3 mt-8">
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <span className="flex items-center gap-2 font-semibold text-pink-700">
                        {item.icon}
                        {item.label}
                      </span>
                      <div className="ml-6 mt-1 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link key={child.label} href={getProtectedHref(child.href)} className="text-sm text-pink-600 hover:underline">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={getProtectedHref(item.href)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-pink-700 hover:bg-pink-200 transition-all"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  )
                )}

                <div className="border-t border-pink-200 pt-3 mt-2 flex flex-col gap-2">
                  {!mounted ? null : !isAuthenticated ? (
                    <>
                      <Link href="/login" className="text-sm text-pink-700 hover:underline">
                        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1.5 font-medium text-white">
                          <LogIn className="h-3.5 w-3.5" />
                          Login
                        </span>
                      </Link>
                    </>
                  ) : (
                    <>
                      {isAdmin ? (
                        <Link href={adminPortalHref} className="text-sm text-pink-700 hover:underline">
                          {adminPortalLabel}
                        </Link>
                      ) : null}
                      {!isAdmin && !isAdminRoute ? (
                        <Link href={accountHref} className="text-sm text-pink-700 hover:underline">
                          Account
                        </Link>
                      ) : null}
                      <button className="text-left text-sm text-pink-700 hover:underline" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t mt-12 bg-gradient-to-r from-pink-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-pink-700">
        Copyright {new Date().getFullYear()} Storybird Clone
      </div>
    </footer>
  );
}
