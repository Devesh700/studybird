"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/features/auth/auth.slice";
import { selectAdminLandingPath, selectAuthState, selectIsAuthenticated } from "@/features/auth/auth.selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const adminLandingPath = useAppSelector(selectAdminLandingPath);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!auth.initialized || !isAuthenticated) return;
    router.replace(adminLandingPath || "/");
  }, [adminLandingPath, auth.initialized, isAuthenticated, router]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await dispatch(registerUser({ name, email, password }));
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
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
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
              />
            </div>
            {auth.error ? <p className="text-sm text-red-600">{auth.error}</p> : null}
            <Button type="submit" className="w-full" disabled={auth.status === "loading"}>
              {auth.status === "loading" ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link className="font-medium underline" href="/login">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
