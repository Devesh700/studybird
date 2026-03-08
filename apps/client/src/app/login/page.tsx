"use client";

import { Suspense, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/features/auth/auth.slice";
import { selectAdminLandingPath, selectAuthState, selectIsAuthenticated } from "@/features/auth/auth.selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAppSelector(selectAuthState);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const adminLandingPath = useAppSelector(selectAdminLandingPath);
  const isSubmitting = auth.status === "loading";

  useEffect(() => {
    if (!auth.initialized || !isAuthenticated) return;
    const next = searchParams.get("next");
    router.replace(next || adminLandingPath || "/");
  }, [adminLandingPath, auth.initialized, isAuthenticated, router, searchParams]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await dispatch(loginUser({ email: email.trim(), password }));
  }

  return (
    <div className="mx-auto max-w-md pt-6">
      <Card className="overflow-hidden border-pink-100 shadow-xl bg-gradient-to-br from-white via-rose-50/50 to-pink-50/80">
        <div className="h-2 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500" />
        <CardHeader>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-pink-200 bg-pink-100/70 px-3 py-1 text-xs font-medium text-pink-700">
            <Sparkles className="h-3.5 w-3.5" />
            Welcome Back
          </div>
          <CardTitle className="text-2xl text-pink-700">Login</CardTitle>
          <CardDescription>Sign in to continue your learning journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-500/70" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-9 border-pink-200 focus-visible:ring-pink-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-500/70" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-9 pr-10 border-pink-200 focus-visible:ring-pink-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500/80 hover:text-pink-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {auth.error ? <p className="text-sm text-red-600">{auth.error}</p> : null}
            <Button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:from-rose-600 hover:to-pink-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign in
                </>
              )}
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

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
      <LoginContent />
    </Suspense>
  );
}
