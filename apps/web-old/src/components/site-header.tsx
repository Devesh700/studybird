"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PenTool, Home, Compass, User, Trophy, NewspaperIcon, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: "/", label: "Home", icon: <Home/> },
  { href: "/explore", label: "Explore", icon: <Compass/> },
  { href: "/stories/new", label: "Write", icon: <PenTool/> },
];

const extraLinks = [
  { href: "/challenges", label: "Challenges", icon: <Trophy/> },
  { href: "/blog", label: "Blog", icon:<NewspaperIcon/> },
  { href: "/help", label: "Help", icon:<HelpCircle/> },
];


const links = [
  { href: "/", label: "Home", icon: <Home className="h-4 w-4 text-pink-500" /> },
  { href: "/explore", label: "Explore", icon: <Compass className="h-4 w-4 text-yellow-500" /> },
  { href: "/stories/new", label: "Write", icon: <PenTool className="h-4 w-4 text-blue-500" /> },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-all"
          >
            ✨ Storybird
          </Link>

          {/* <nav className="hidden md:flex items-center gap-3 ml-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-pink-200 hover:text-pink-800",
                  pathname === l.href && "bg-pink-300 text-pink-900"
                )}
              >
                {l.icon}
                {l.label}
              </Link>
            ))}
          </nav> */}

          <nav className="hidden md:flex items-center gap-3 ml-4">
  {primaryLinks.map((l) => (
    <Link key={l.href} href={l.href} className={cn(
      "flex items-center gap-1 px-3 py-2 rounded-full transition hover:bg-pink-200",
      pathname === l.href && "bg-pink-300 text-pink-900"
    )}>
      {l.icon}
      {l.label}
    </Link>
  ))}
  <div className="border-l h-6 border-gray-300 mx-2" />
  {extraLinks.map((l) => (
    <Link key={l.href} href={l.href} className={cn(
      "px-2 py-1 rounded-md text-sm hover:bg-pink-100 flex items-center gap-1",
      pathname === l.href && "bg-pink-200"
    )}>
        {l.icon}
      {l.label}
    </Link>
  ))}
</nav>

        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Input
              placeholder="🔍 Search stories..."
              className="w-64 rounded-full border-pink-200 bg-white shadow-inner"
            />
          </div>

          <Button
            asChild
            className="rounded-full bg-pink-500 hover:bg-pink-600 text-white"
          >
            <Link href="/stories/new">✏️ Write</Link>
          </Button>

          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">More ▾</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    {extraLinks.map((l) => (
      <DropdownMenuItem key={l.href} asChild>
        <Link href={l.href}>{l.label}</Link>
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>

        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-pink-200"
              >
                <Menu className="h-5 w-5 text-pink-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-pink-50">
              <div className="flex flex-col gap-3 mt-8">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-pink-700 hover:bg-pink-200 transition-all",
                      pathname === l.href && "bg-pink-300"
                    )}
                  >
                    {l.icon}
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/auth"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-pink-700 hover:bg-pink-200 transition-all"
                >
                  🔐 Sign in
                </Link>
              </div>
            </SheetContent>
          </Sheet> */}
    <Sheet>
          <SheetContent side="right" className="w-64 bg-pink-50">
  <div className="flex flex-col gap-3 mt-8">
    {primaryLinks.concat(extraLinks).map((l) => (
      <Link
        key={l.href}
        href={l.href}
        className={cn(
          "px-4 py-2 rounded-full hover:bg-pink-200 transition",
          pathname === l.href && "bg-pink-300"
        )}
      >
        {l.icon ?? null}
        {l.label}
      </Link>
    ))}
    <Link
      href="/auth"
      className="px-4 py-2 rounded-full hover:bg-pink-200 transition"
    >
      🔐 Sign in
    </Link>
  </div>
</SheetContent>
</Sheet>
        </div>
      </div>
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
