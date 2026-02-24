"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectAuthInitialized, selectIsAdmin, selectIsAuthenticated } from "./auth.selectors";

export function useAdminGuard() {
  const router = useRouter();
  const initialized = useAppSelector(selectAuthInitialized);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);

  useEffect(() => {
    if (!initialized) return;
    if (!isAuthenticated) {
      router.replace("/login?next=/admin");
      return;
    }
    if (!isAdmin) {
      router.replace("/");
    }
  }, [initialized, isAuthenticated, isAdmin, router]);

  return { initialized, isAuthenticated, isAdmin };
}
