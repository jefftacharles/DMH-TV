import { NextResponse } from "next/server";

import { demoQuiz, parseJsonFromText, requireText, runStudyPrompt } from "@/lib/openai";

export async function POST(request: Request) {
  const body = await request.json();
  const topic = requireText(body.topic, "general study skills");

  const system = `You are StudyMate AI. Generate a multiple-choice quiz for a student.
Return only JSON in this exact shape:
{"questions":[{"question":"...","options":["...","...","...","..."],"answer":"...","explanation":"..."}]}
Create exactly 5 questions. The answer must exactly match one option.`;

  const response = await runStudyPrompt(system, `Create a quiz from this topic or notes:\n\n${topic}`);
  const quiz = response ? parseJsonFromText(response, demoQuiz) : demoQuiz;

  return NextResponse.json(quiz);
}
