"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const router = useRouter();
  const sp = useSearchParams();

  function go(to: number) {
    const q = new URLSearchParams(sp.toString());
    q.set("page", String(to));
    router.push(`/explore?${q.toString()}`);
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={() => go(page - 1)} disabled={page <= 1}>Prev</Button>
      <span className="text-sm">Page {page} of {totalPages}</span>
      <Button variant="outline" onClick={() => go(page + 1)} disabled={page >= totalPages}>Next</Button>
    </div>
  );
}
