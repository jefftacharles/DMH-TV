import OpenAI from "openai";

export type StudyTool = "chat" | "summarize" | "quiz" | "planner" | "past-paper";

export const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export function requireText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

export async function runStudyPrompt(system: string, user: string) {
  if (!openai) {
    return null;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.45,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    return completion.choices[0]?.message?.content?.trim() || null;
  } catch {
    return null;
  }
}

export function demoStudyResponse(tool: StudyTool, input: string) {
  const topic = input.slice(0, 90) || "your topic";

  const responses: Record<StudyTool, string> = {
    chat: `Here is a simple way to understand ${topic}: start with the main idea, define the key terms, then connect each point to a real example. Ask a follow-up question and I can break it down further.`,
    summarize: `Key points:\n- ${topic} focuses on the most important ideas from your notes.\n- Convert each paragraph into one sentence.\n- Highlight definitions, dates, formulas, and examples.\n- End with 3 questions you can answer from memory.`,
    quiz: "",
    planner: `Study timetable:\n1. Review the hardest subject first while your energy is high.\n2. Use 35-minute focus blocks with 5-minute breaks.\n3. Practise past questions every second session.\n4. Reserve the final day before each exam for revision and sleep.`,
    "past-paper": `Step-by-step approach:\n1. Identify what the question is asking.\n2. List the facts, formula, or theory needed.\n3. Work through the answer one step at a time.\n4. Check whether your final answer directly addresses the command word.`,
  };

  return responses[tool];
}

export const demoQuiz = {
  questions: [
    {
      question: "What is the best first step when revising a new topic?",
      options: ["Memorize every word", "Identify the main idea", "Skip examples", "Only read headings"],
      answer: "Identify the main idea",
      explanation: "Understanding the main idea gives every detail a useful place in your memory.",
    },
    {
      question: "Why are practice questions useful?",
      options: ["They replace sleep", "They test recall", "They hide weak areas", "They make notes longer"],
      answer: "They test recall",
      explanation: "Recall practice shows what you truly understand and what needs another review.",
    },
    {
      question: "Which habit improves exam preparation?",
      options: ["Cramming once", "Short repeated sessions", "Ignoring feedback", "Studying without breaks"],
      answer: "Short repeated sessions",
      explanation: "Spacing study across sessions improves retention and reduces stress.",
    },
  ],
};

export function parseJsonFromText<T>(text: string, fallback: T): T {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    return fallback;
  }

  try {
    return JSON.parse(cleaned.slice(start, end + 1)) as T;
  } catch {
    return fallback;
  }
}
