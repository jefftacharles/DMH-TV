"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FormEvent, useMemo, useState } from "react";
import {
  BarChart3,
  Bot,
  CalendarClock,
  CheckCircle2,
  FileQuestion,
  Home,
  Languages,
  LayoutDashboard,
  Loader2,
  MessageCircle,
  Mic,
  NotebookPen,
  Send,
  Sparkles,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { dashboardStats, recentChats, starterMessages, upcomingExams } from "@/lib/studymate-data";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

type QuizPayload = {
  questions: QuizQuestion[];
};

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#overview" },
  { label: "AI Chat", icon: Bot, href: "#assistant" },
  { label: "Summaries", icon: NotebookPen, href: "#workspace" },
  { label: "Planner", icon: CalendarClock, href: "#workspace" },
];

async function postJson<T>(url: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("StudyMate AI could not complete that request. Please try again.");
  }

  return response.json() as Promise<T>;
}

export function StudyMateDashboard() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(starterMessages);
  const [chatInput, setChatInput] = useState("");
  const [summaryInput, setSummaryInput] = useState("");
  const [summary, setSummary] = useState("");
  const [quizTopic, setQuizTopic] = useState("");
  const [quiz, setQuiz] = useState<QuizPayload | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [plannerInput, setPlannerInput] = useState("Mathematics exam on June 4, Biology on June 10, History on June 18");
  const [plan, setPlan] = useState("");
  const [pastPaperInput, setPastPaperInput] = useState("");
  const [pastPaperAnswer, setPastPaperAnswer] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const quizScore = useMemo(() => {
    if (!quiz) return null;
    const correct = quiz.questions.filter((question, index) => answers[index] === question.answer).length;
    return { correct, total: quiz.questions.length };
  }, [answers, quiz]);

  async function handleChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = chatInput.trim();
    if (!question) return;

    const nextMessages: ChatMessage[] = [...chatMessages, { role: "user", content: question }];
    setChatMessages(nextMessages);
    setChatInput("");
    setLoading("chat");

    try {
      const data = await postJson<{ answer: string }>("/api/ai/chat", { messages: nextMessages });
      setChatMessages([...nextMessages, { role: "assistant", content: data.answer }]);
    } catch (error) {
      setChatMessages([
        ...nextMessages,
        { role: "assistant", content: error instanceof Error ? error.message : "Something went wrong." },
      ]);
    } finally {
      setLoading(null);
    }
  }

  async function handleSummarize() {
    if (!summaryInput.trim()) return;
    setLoading("summary");
    try {
      const data = await postJson<{ summary: string }>("/api/ai/summarize", { notes: summaryInput });
      setSummary(data.summary);
    } catch (error) {
      setSummary(error instanceof Error ? error.message : "Summary generation failed.");
    } finally {
      setLoading(null);
    }
  }

  async function handleQuiz() {
    if (!quizTopic.trim()) return;
    setLoading("quiz");
    try {
      const data = await postJson<QuizPayload>("/api/ai/quiz", { topic: quizTopic });
      setQuiz(data);
      setAnswers({});
    } catch {
      setQuiz({
        questions: [
          {
            question: "StudyMate AI could not generate a quiz right now. What should you try next?",
            options: ["Try again", "Ignore studying", "Delete notes", "Skip revision"],
            answer: "Try again",
            explanation: "Temporary AI errors are usually solved by retrying with a clearer topic.",
          },
        ],
      });
    } finally {
      setLoading(null);
    }
  }

  async function handlePlanner() {
    if (!plannerInput.trim()) return;
    setLoading("planner");
    try {
      const data = await postJson<{ plan: string }>("/api/ai/planner", { schedule: plannerInput });
      setPlan(data.plan);
    } catch (error) {
      setPlan(error instanceof Error ? error.message : "Planner generation failed.");
    } finally {
      setLoading(null);
    }
  }

  async function handlePastPaper() {
    if (!pastPaperInput.trim()) return;
    setLoading("past-paper");
    try {
      const data = await postJson<{ answer: string }>("/api/ai/past-paper", { question: pastPaperInput });
      setPastPaperAnswer(data.answer);
    } catch (error) {
      setPastPaperAnswer(error instanceof Error ? error.message : "Past paper explanation failed.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.20),transparent_30%)]">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/10 bg-white/70 p-5 backdrop-blur-2xl dark:bg-slate-950/70 lg:block">
          <BrandLogo />
          <nav className="mt-8 space-y-2">
            {navigation.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-violet-100 hover:text-violet-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
                  index === 0 && "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-violet-500/25 hover:text-white"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </a>
            ))}
          </nav>
          <Card className="mt-8 rounded-3xl border-violet-200 bg-gradient-to-br from-slate-950 to-violet-950 text-white">
            <CardContent className="p-5">
              <Mic className="mb-4 size-6 text-cyan-300" />
              <h3 className="font-bold">Voice assistant</h3>
              <p className="mt-2 text-sm text-slate-300">Placeholder ready for speech-to-text learning commands.</p>
              <Button className="mt-4 w-full rounded-full bg-white text-slate-950 hover:bg-slate-100">
                Coming soon
              </Button>
            </CardContent>
          </Card>
        </aside>

        <section className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/75 p-4 shadow-xl shadow-violet-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-3 lg:hidden">
              <BrandLogo showTagline={false} />
            </div>
            <div>
              <Badge className="rounded-full bg-violet-100 text-violet-700 hover:bg-violet-100 dark:bg-white/10 dark:text-violet-200">
                <Sparkles className="mr-2 size-4" />
                Student dashboard
              </Badge>
              <h1 className="mt-2 text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">
                Welcome back, future graduate.
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="rounded-full bg-white/70 dark:bg-white/10">
                <Link href="/">
                  <Home className="size-4" />
                  Home
                </Link>
              </Button>
              <ThemeToggle />
            </div>
          </header>

          <section id="overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((stat) => (
              <Card key={stat.label} className="glass-card rounded-3xl">
                <CardContent className="p-5">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-3xl font-black">{stat.value}</p>
                  <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-300">{stat.helper}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card id="assistant" className="glass-card rounded-3xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="size-5 text-violet-500" />
                    AI Study Assistant
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Ask academic questions and get simple, exam-ready explanations.
                  </p>
                </div>
                <Badge variant="outline" className="rounded-full bg-white/70 dark:bg-white/10">Live</Badge>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[420px] pr-4">
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div
                        key={`${message.role}-${index}`}
                        className={cn(
                          "max-w-[88%] rounded-3xl p-4 text-sm leading-6",
                          message.role === "user"
                            ? "ml-auto bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                            : "border border-violet-100 bg-white text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
                        )}
                      >
                        {message.content}
                      </div>
                    ))}
                    {loading === "chat" ? (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Loader2 className="size-4 animate-spin" />
                        StudyMate AI is thinking...
                      </div>
                    ) : null}
                  </div>
                </ScrollArea>
                <form onSubmit={handleChat} className="mt-4 flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    placeholder="Ask: Explain quadratic equations simply..."
                    className="h-12 rounded-full"
                  />
                  <Button type="submit" size="icon" className="size-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card className="glass-card rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="size-5 text-violet-500" />
                    Upcoming exams
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {upcomingExams.map((exam) => (
                    <div key={exam.subject}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold">{exam.subject}</span>
                        <span className="text-slate-500 dark:text-slate-400">{exam.date}</span>
                      </div>
                      <Progress value={exam.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="size-5 text-violet-500" />
                    Recent chats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentChats.map((chat) => (
                    <div key={chat} className="rounded-2xl border border-violet-100 bg-white/70 p-3 text-sm dark:border-white/10 dark:bg-white/10">
                      {chat}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="workspace" className="mt-6">
            <Tabs defaultValue="summarizer" className="w-full">
              <TabsList className="grid h-auto w-full grid-cols-2 rounded-3xl bg-white/70 p-1 dark:bg-white/10 lg:grid-cols-4">
                <TabsTrigger value="summarizer" className="rounded-2xl">Summarizer</TabsTrigger>
                <TabsTrigger value="quiz" className="rounded-2xl">Quiz</TabsTrigger>
                <TabsTrigger value="planner" className="rounded-2xl">Planner</TabsTrigger>
                <TabsTrigger value="past-paper" className="rounded-2xl">Past paper</TabsTrigger>
              </TabsList>

              <TabsContent value="summarizer" className="mt-5">
                <ToolCard
                  title="Notes Summarizer"
                  description="Paste long notes and turn them into key revision points."
                  icon={NotebookPen}
                >
                  <Textarea
                    value={summaryInput}
                    onChange={(event) => setSummaryInput(event.target.value)}
                    placeholder="Paste your notes here..."
                    className="min-h-40 rounded-3xl bg-white/70 dark:bg-white/10"
                  />
                  <Button onClick={handleSummarize} disabled={loading === "summary"} className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                    {loading === "summary" ? <Loader2 className="size-4 animate-spin" /> : null}
                    Summarize notes
                  </Button>
                  {summary ? <ResultBlock content={summary} /> : null}
                </ToolCard>
              </TabsContent>

              <TabsContent value="quiz" className="mt-5">
                <ToolCard title="Quiz Generator" description="Generate multiple-choice questions from notes or a topic." icon={FileQuestion}>
                  <Textarea
                    value={quizTopic}
                    onChange={(event) => setQuizTopic(event.target.value)}
                    placeholder="Enter a topic or paste notes for quiz generation..."
                    className="min-h-32 rounded-3xl bg-white/70 dark:bg-white/10"
                  />
                  <Button onClick={handleQuiz} disabled={loading === "quiz"} className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                    {loading === "quiz" ? <Loader2 className="size-4 animate-spin" /> : null}
                    Generate quiz
                  </Button>
                  {quiz ? (
                    <div className="space-y-4">
                      {quiz.questions.map((question, index) => (
                        <div key={question.question} className="rounded-3xl border border-violet-100 bg-white/75 p-4 dark:border-white/10 dark:bg-white/10">
                          <p className="font-semibold">{index + 1}. {question.question}</p>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {question.options.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}
                                className={cn(
                                  "rounded-2xl border p-3 text-left text-sm transition",
                                  answers[index] === option
                                    ? "border-violet-500 bg-violet-100 text-violet-900 dark:bg-violet-500/30 dark:text-white"
                                    : "border-violet-100 bg-white/70 hover:border-violet-300 dark:border-white/10 dark:bg-white/10"
                                )}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                          {answers[index] ? (
                            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                              <span className="font-semibold">Answer:</span> {question.answer}. {question.explanation}
                            </p>
                          ) : null}
                        </div>
                      ))}
                      {quizScore ? (
                        <div className="flex items-center gap-2 rounded-3xl bg-emerald-50 p-4 font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                          <CheckCircle2 className="size-5" />
                          Score: {quizScore.correct}/{quizScore.total}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </ToolCard>
              </TabsContent>

              <TabsContent value="planner" className="mt-5">
                <ToolCard title="Study Planner" description="Enter subjects, exam dates, and priorities for a timetable." icon={CalendarClock}>
                  <Textarea
                    value={plannerInput}
                    onChange={(event) => setPlannerInput(event.target.value)}
                    className="min-h-32 rounded-3xl bg-white/70 dark:bg-white/10"
                  />
                  <Button onClick={handlePlanner} disabled={loading === "planner"} className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                    {loading === "planner" ? <Loader2 className="size-4 animate-spin" /> : null}
                    Create timetable
                  </Button>
                  {plan ? <ResultBlock content={plan} /> : null}
                </ToolCard>
              </TabsContent>

              <TabsContent value="past-paper" className="mt-5">
                <ToolCard title="Past Paper Assistant" description="Paste a past-paper question for a step-by-step answer." icon={UploadCloud}>
                  <Textarea
                    value={pastPaperInput}
                    onChange={(event) => setPastPaperInput(event.target.value)}
                    placeholder="Paste or type the question here..."
                    className="min-h-36 rounded-3xl bg-white/70 dark:bg-white/10"
                  />
                  <Button onClick={handlePastPaper} disabled={loading === "past-paper"} className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                    {loading === "past-paper" ? <Loader2 className="size-4 animate-spin" /> : null}
                    Explain answer
                  </Button>
                  {pastPaperAnswer ? <ResultBlock content={pastPaperAnswer} /> : null}
                </ToolCard>
              </TabsContent>
            </Tabs>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-2">
            <Card className="glass-card rounded-3xl">
              <CardContent className="flex items-center justify-between gap-4 p-5">
                <div>
                  <h3 className="font-bold">WhatsApp integration</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Placeholder for reminders and AI prompts through WhatsApp.</p>
                </div>
                <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-200">Soon</Badge>
              </CardContent>
            </Card>
            <Card className="glass-card rounded-3xl">
              <CardContent className="flex items-center justify-between gap-4 p-5">
                <div>
                  <h3 className="font-bold">Local language support</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ready for Bemba, Nyanja, Swahili, Yoruba, and more.</p>
                </div>
                <Languages className="size-7 text-violet-500" />
              </CardContent>
            </Card>
          </section>
        </section>
      </div>
    </main>
  );
}

function ToolCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <Card className="glass-card rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-5 text-violet-500" />
          {title}
        </CardTitle>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}

function ResultBlock({ content }: { content: string }) {
  return (
    <div className="rounded-3xl border border-violet-100 bg-white/80 p-4 text-sm leading-7 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
      {content.split("\n").map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
