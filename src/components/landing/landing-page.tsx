import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Play,
  Smartphone,
  Sparkles,
  Wand2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { extras, features, testimonials, trustSignals } from "@/lib/studymate-data";

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.20),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.22),transparent_28%)]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLogo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <a className="transition hover:text-violet-500" href="#features">
              Features
            </a>
            <a className="transition hover:text-violet-500" href="#testimonials">
              Stories
            </a>
            <a className="transition hover:text-violet-500" href="#pricing">
              Access
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="ghost" className="hidden rounded-full sm:inline-flex">
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:opacity-95"
            >
              <Link href="/signup">
                Start free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
        <div className="absolute inset-0 -z-10 grid-glow opacity-70" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge className="mb-6 rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-violet-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-violet-200">
              <Sparkles className="mr-2 size-4" />
              J &amp; J Media presents StudyMate AI
            </Badge>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              AI-Powered Learning for African Students
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              StudyMate AI helps students ask better questions, summarize notes, generate quizzes,
              plan exam revision, and understand past paper answers with a friendly AI tutor.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-7 text-white shadow-xl shadow-violet-500/25 hover:opacity-95"
              >
                <Link href="/dashboard">
                  Open dashboard
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full bg-white/70 dark:bg-white/10">
                <a href="#features">
                  <Play className="size-4" />
                  Explore tools
                </a>
              </Button>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
              {trustSignals.map((signal) => (
                <div key={signal.label} className="flex items-center gap-2">
                  <signal.icon className="size-4 text-violet-500" />
                  {signal.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-blue-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />
            <Card className="glass-card rounded-[2rem] p-2">
              <CardContent className="space-y-5 p-5">
                <div className="flex items-center justify-between rounded-3xl border border-white/20 bg-slate-950 p-4 text-white shadow-2xl">
                  <div>
                    <p className="text-sm text-violet-200">Live AI session</p>
                    <h2 className="text-xl font-bold">Photosynthesis made simple</h2>
                  </div>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                    <Wand2 className="size-5 text-cyan-300" />
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="ml-auto max-w-[85%] rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-4 text-sm text-white">
                    Explain photosynthesis like I am revising for an exam.
                  </div>
                  <div className="max-w-[90%] rounded-3xl border border-violet-100 bg-white p-4 text-sm text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
                    Photosynthesis is how plants make food. They use sunlight, carbon dioxide,
                    and water to produce glucose and oxygen. Remember it as: light in, food made,
                    oxygen out.
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {["Summary", "Quiz", "Planner"].map((item) => (
                    <div key={item} className="rounded-2xl border border-violet-100 bg-white/80 p-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                      <CheckCircle2 className="mb-2 size-4 text-emerald-500" />
                      {item} ready
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="rounded-full bg-white/60 dark:bg-white/10">
              AI study toolkit
            </Badge>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Everything students need to study smarter
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Each feature is designed for fast mobile use, clear explanations, and exam-focused learning.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="glass-card group rounded-3xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className={`mb-5 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg shadow-violet-500/20`}>
                    <feature.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          {extras.map((extra) => (
            <Card key={extra.label} className="glass-card rounded-3xl">
              <CardContent className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-white/10 dark:text-violet-200">
                    <extra.icon className="size-5" />
                  </span>
                  <p className="font-semibold">{extra.label}</p>
                </div>
                <Badge variant="secondary" className="rounded-full">
                  {extra.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="testimonials" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Badge variant="outline" className="rounded-full bg-white/60 dark:bg-white/10">
                Student stories
              </Badge>
              <h2 className="mt-4 text-3xl font-black text-slate-950 dark:text-white sm:text-5xl">
                Built for real study habits
              </h2>
            </div>
            <p className="max-w-xl text-slate-600 dark:text-slate-300">
              StudyMate AI supports classrooms, after-school revision, and independent learners across mobile and desktop.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="glass-card rounded-3xl">
                <CardContent className="p-6">
                  <p className="text-slate-700 dark:text-slate-200">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 font-bold text-white">
                      {testimonial.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/20 bg-slate-950 p-8 text-center text-white shadow-2xl shadow-violet-950/30 sm:p-12">
          <Badge className="rounded-full bg-white/10 text-white hover:bg-white/10">
            <Smartphone className="mr-2 size-4" />
            Mobile-first access
          </Badge>
          <h2 className="mt-5 text-3xl font-black sm:text-5xl">Ready to study with an AI teammate?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Create your account, open the dashboard, and start with chat, summaries, quizzes, planning, and past paper help.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full bg-white px-7 text-slate-950 hover:bg-slate-100">
              <Link href="/signup">
                Create account
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/20 bg-white/10 px-7 text-white hover:bg-white/20">
              <Link href="/dashboard">
                <MessageCircle className="size-4" />
                Try demo dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-slate-500 dark:text-slate-400 md:flex-row md:items-center">
          <BrandLogo />
          <p>© 2026 J &amp; J Media. StudyMate AI helps students learn with confidence.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-violet-500">
              Login
            </Link>
            <Link href="/signup" className="hover:text-violet-500">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
