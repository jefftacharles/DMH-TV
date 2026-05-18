import { NextResponse } from "next/server";

import { demoStudyResponse, runStudyPrompt } from "@/lib/openai";

type IncomingMessage = {
  role?: "assistant" | "user";
  content?: string;
};

export async function POST(request: Request) {
  const body = await request.json();
  const messages = Array.isArray(body.messages) ? (body.messages as IncomingMessage[]) : [];
  const latestQuestion = messages.filter((message) => message.role === "user").at(-1)?.content || "";

  const system = `You are StudyMate AI by J & J Media, a friendly education assistant for African students.
Give simple, accurate academic explanations. Use concise steps, relatable examples, and encourage follow-up questions.
Do not claim to replace teachers. If a question is unsafe or non-academic, redirect to learning support.`;

  const conversation = messages
    .map((message) => `${message.role === "assistant" ? "Assistant" : "Student"}: ${message.content}`)
    .join("\n");

  const answer =
    (await runStudyPrompt(system, conversation || latestQuestion)) ||
    demoStudyResponse("chat", latestQuestion);

  return NextResponse.json({ answer });
}
