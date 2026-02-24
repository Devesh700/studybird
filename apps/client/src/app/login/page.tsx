"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/features/auth/auth.slice";
import { selectAdminLandingPath, selectAuthState, selectIsAuthenticated } from "@/features/auth/auth.selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAppSelector(selectAuthState);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const adminLandingPath = useAppSelector(selectAdminLandingPath);

  useEffect(() => {
    if (!auth.initialized || !isAuthenticated) return;
    const next = searchParams.get("next");
    router.replace(next || adminLandingPath || "/");
  }, [adminLandingPath, auth.initialized, isAuthenticated, router, searchParams]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await dispatch(loginUser({ email, password }));
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            {auth.error ? <p className="text-sm text-red-600">{auth.error}</p> : null}
            <Button type="submit" className="w-full" disabled={auth.status === "loading"}>
              {auth.status === "loading" ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            New here?{" "}
            <Link className="font-medium underline" href="/signup">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
