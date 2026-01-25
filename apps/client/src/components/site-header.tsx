"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  PenTool,
  Home,
  Compass,
  Palette,
  Trophy,
  NewspaperIcon,
  HelpCircle,
  BookText,
  Mail,
  Feather,
  Brush,
  ImageIcon,
  Paintbrush2,
  Ticket,
  Voicemail,
  VideoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export interface NavItem {
  href?: string;
  label: string;
  icon?: React.ReactNode;
  children?:NavItem[];
}

export function SiteHeader() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const navItems:NavItem[] = [
    // { href: "/", label: "Home", icon: <Home className="h-4 w-4 text-pink-500" /> },
    // { href: "/explore", label: "Explore", icon: <Compass className="h-4 w-4 text-yellow-500" /> },
    {
      label: "Communication",
      icon: <PenTool className="h-4 w-4 text-blue-500" />,
      children: [
        { label: "Writing", href: "/stories/new", icon: <Feather className="h-4 w-4" /> },
        { label: "Reading", href: "/explore", icon: <BookText className="h-4 w-4" /> },
        { label: "Listening", href: "/listening", icon: <Voicemail className="h-4 w-4" /> },
        { label: "Watching", href: "/watching", icon: <VideoIcon className="h-4 w-4" /> },
      ],
    },
    {
      label: "Creativity Corner",
      icon: <Palette className="h-4 w-4 text-purple-500" />,
      children: [
        { label: "Culinary", href: "/culinary", icon: <Brush className="h-4 w-4" /> },
        { label: "Art Gallery", href: "/drawing", icon: <ImageIcon className="h-4 w-4" /> },
        { label: "Motor Skills", href: "/motor-skills", icon: <Paintbrush2 className="h-4 w-4" /> },
      ],
    },
    {
      label: "Wellness",
      icon: <Trophy className="h-4 w-4 text-amber-500" />,
      children: [
        { label: "Physical", href: "/physical" },
        { label: "Mental", href: "/mental" },
      ],
    },
    {
      label: "Printables",
      icon: <Palette className="h-4 w-4 text-purple-500" />,
      children: [
        { label: "Worksheet", href: "/worksheet", icon: <Brush className="h-4 w-4" /> },
        { label: "Art Work", href: "/art", icon: <ImageIcon className="h-4 w-4" /> },
        { label: "Customized", href: "/customized", icon: <Paintbrush2 className="h-4 w-4" /> },
      ],
    },

    {
      label: "Personality Development",
      icon: <Ticket className="h-4 w-4 text-blue-500" />,
      children: [
        { label: "On Stage", href: "/on-stage", icon: <Brush className="h-4 w-4" /> },
        { label: "Talking Tactics", href: "/talkin-tactics", icon: <ImageIcon className="h-4 w-4" /> },
        { label: "Presentations", href: "/presentations", icon: <Paintbrush2 className="h-4 w-4" /> },
      ],
    },
    // { href: "/blog", label: "Blog", icon: <NewspaperIcon className="h-4 w-4 text-green-500" /> },
    // { href: "/help", label: "Help", icon: <HelpCircle className="h-4 w-4 text-red-500" /> },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Left Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-all"
        >
          ✨ Storybird
        </Link>

        {/* Desktop Nav */}
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

                {/* Dropdown */}
                {hovered === item.label && (
                  <div className="absolute left-0 mt-2 bg-white border border-pink-100 rounded-2xl shadow-lg py-2 w-48 animate-fadeIn z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href ?? "/"}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-pink-700 hover:bg-pink-100 transition-all"
                      >
                        {child.icon ?? ""}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
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

        {/* Right Section */}
        {/* <div className="hidden md:flex items-center gap-4">
          <Input
            placeholder="🔍 Search stories..."
            className="w-64 rounded-full border-pink-200 bg-white shadow-inner focus:ring-2 focus:ring-pink-300"
          />

          <Button
            asChild
            className="rounded-full bg-pink-500 hover:bg-pink-600 text-white px-5"
          >
            <Link href="/stories/new">✏️ Write</Link>
          </Button>
        </div> */}

        {/* Mobile Menu */}
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
                          <Link
                            key={child.label}
                            href={child.href ?? "/"}
                            className="text-sm text-pink-600 hover:underline"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href!}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-pink-700 hover:bg-pink-200 transition-all"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  )
                )}
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
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-pink-700">
        © {new Date().getFullYear()} Storybird Clone • Made with 💖 for kids
      </div>
    </footer>
  );
}
