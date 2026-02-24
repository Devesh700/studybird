import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Storybird Clone",
  description: "Read, write, discover stories.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>
          <SiteHeader />
          <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
