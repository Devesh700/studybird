"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { selectAdminLandingPath, selectAuthInitialized, selectIsAdmin, selectIsAuthenticated } from "@/features/auth/auth.selectors";
import { useAppSelector } from "@/store/hooks";

export default function AdminEntryPage() {
  const router = useRouter();
  const initialized = useAppSelector(selectAuthInitialized);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);
  const landing = useAppSelector(selectAdminLandingPath);

  useEffect(() => {
    if (!initialized) return;
    if (!isAuthenticated) {
      router.replace("/login?next=/admin");
      return;
    }
    if (!isAdmin) {
      router.replace("/");
      return;
    }
    router.replace(landing || "/");
  }, [initialized, isAuthenticated, isAdmin, landing, router]);

  return <p className="text-sm text-muted-foreground">Redirecting...</p>;
}
