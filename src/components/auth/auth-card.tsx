"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Chrome, Loader2, LockKeyhole, Mail } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { isSupabaseConfigured, signInWithGoogle, supabase } from "@/lib/supabase";

type AuthMode = "login" | "signup";

type AuthCardProps = {
  mode: AuthMode;
};

export function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const isSignup = mode === "signup";

  async function handleEmailAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      if (!supabase) {
        setMessage("Demo mode: Supabase is not configured, so you can continue to the dashboard.");
        router.push("/dashboard");
        return;
      }

      const result = isSignup
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (result.error) {
        setMessage(result.error.message);
        return;
      }

      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setLoading(true);
    setMessage(null);

    try {
      await signInWithGoogle();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Google authentication could not start.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.24),transparent_30%)] px-4 py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <BrandLogo />
        <ThemeToggle />
      </div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="hidden lg:block">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-500">StudyMate AI access</p>
          <h1 className="mt-5 text-5xl font-black leading-tight text-slate-950 dark:text-white">
            Sign in to your AI-powered study command center.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Save recent chats, generate quizzes, plan exam prep, and keep every learning tool in one mobile-first dashboard.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            {["Google authentication ready", "Supabase backend hooks", "Dark and light mode included"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/60 p-4 shadow-sm dark:bg-white/10">
                <LockKeyhole className="size-4 text-violet-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <Card className="glass-card mx-auto w-full max-w-md rounded-[2rem]">
          <CardHeader className="space-y-2 p-6 text-center sm:p-8">
            <CardTitle className="text-3xl font-black">
              {isSignup ? "Create your account" : "Welcome back"}
            </CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isSignup
                ? "Start studying with AI summaries, quizzes, and planning."
                : "Continue your learning sessions and AI study progress."}
            </p>
          </CardHeader>
          <CardContent className="space-y-5 p-6 pt-0 sm:p-8 sm:pt-0">
            {!isSupabaseConfigured ? (
              <Alert className="border-violet-200 bg-violet-50 text-violet-900 dark:border-white/10 dark:bg-white/10 dark:text-violet-100">
                <AlertDescription>
                  Supabase environment variables are not set. Forms run in demo mode until configured.
                </AlertDescription>
              </Alert>
            ) : null}

            {message ? (
              <Alert>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            ) : null}

            <Button
              type="button"
              variant="outline"
              className="h-12 w-full rounded-full bg-white/80 dark:bg-white/10"
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Chrome className="size-4" />}
              Continue with Google
            </Button>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">or</span>
              <Separator className="flex-1" />
            </div>

            <form className="space-y-4" onSubmit={handleEmailAuth}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input id="email" name="email" type="email" required placeholder="student@example.com" className="h-12 rounded-full pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input id="password" name="password" type="password" required minLength={6} placeholder="Minimum 6 characters" className="h-12 rounded-full pl-10" />
                </div>
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:opacity-95"
                disabled={loading}
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                {isSignup ? "Create account" : "Log in"}
                <ArrowRight className="size-4" />
              </Button>
            </form>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              {isSignup ? "Already have an account?" : "New to StudyMate AI?"}{" "}
              <Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-violet-600 hover:underline dark:text-violet-300">
                {isSignup ? "Log in" : "Create account"}
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
