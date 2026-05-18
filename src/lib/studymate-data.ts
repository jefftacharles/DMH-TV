import {
  BarChart3,
  Bot,
  CalendarClock,
  FileQuestion,
  Languages,
  MessageSquareText,
  Mic,
  NotebookPen,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const features = [
  {
    title: "AI Study Assistant",
    description: "Ask academic questions and get simple explanations, examples, and next steps.",
    icon: Bot,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Notes Summarizer",
    description: "Turn long notes into key points, definitions, and quick revision cards.",
    icon: NotebookPen,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Quiz Generator",
    description: "Generate multiple-choice quizzes from topics or pasted class notes.",
    icon: FileQuestion,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "Study Planner",
    description: "Create AI-assisted timetables from subjects, exam dates, and study goals.",
    icon: CalendarClock,
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    title: "Past Paper Assistant",
    description: "Upload or paste exam questions and receive step-by-step answer explanations.",
    icon: MessageSquareText,
    gradient: "from-sky-500 to-violet-500",
  },
  {
    title: "Progress Dashboard",
    description: "Track recent chats, upcoming exams, study streaks, and subject progress.",
    icon: BarChart3,
    gradient: "from-fuchsia-500 to-pink-500",
  },
];

export const extras = [
  { label: "Voice assistant", icon: Mic, status: "Preview" },
  { label: "WhatsApp integration", icon: MessageSquareText, status: "Soon" },
  { label: "Local language support", icon: Languages, status: "Soon" },
  { label: "Safe learning workspace", icon: ShieldCheck, status: "Built in" },
];

export const testimonials = [
  {
    quote:
      "StudyMate AI makes my biology notes easier to understand before tests. The summaries are short, clear, and practical.",
    name: "Amina K.",
    role: "Grade 12 learner, Lusaka",
  },
  {
    quote:
      "The quiz generator helps my study group practise together after school without waiting for extra worksheets.",
    name: "Daniel O.",
    role: "University foundation student",
  },
  {
    quote:
      "I like the planner because it breaks exam prep into smaller tasks instead of one stressful revision week.",
    name: "Thandi M.",
    role: "First-year commerce student",
  },
];

export const dashboardStats = [
  { label: "Study streak", value: "12 days", helper: "+4 this month" },
  { label: "AI sessions", value: "38", helper: "8 recent chats" },
  { label: "Quiz average", value: "84%", helper: "+11% improvement" },
  { label: "Exam readiness", value: "71%", helper: "3 exams tracked" },
];

export const recentChats = [
  "Explain photosynthesis in simple steps",
  "Summarize economics inflation notes",
  "Create algebra practice questions",
];

export const upcomingExams = [
  { subject: "Mathematics", date: "June 04", progress: 78 },
  { subject: "Biology", date: "June 10", progress: 64 },
  { subject: "History", date: "June 18", progress: 52 },
];

export const starterMessages = [
  {
    role: "assistant" as const,
    content:
      "Hi, I am StudyMate AI. Ask me for a simple explanation, a study plan, quiz questions, or help with a past paper.",
  },
];

export const trustSignals = [
  { label: "Built for African classrooms", icon: Sparkles },
  { label: "Mobile-first learning", icon: Bot },
  { label: "AI study workflows", icon: CalendarClock },
];
