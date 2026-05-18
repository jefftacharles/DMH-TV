import { NextResponse } from "next/server";

import { demoStudyResponse, requireText, runStudyPrompt } from "@/lib/openai";

export async function POST(request: Request) {
  const body = await request.json();
  const notes = requireText(body.notes);

  const system = `You are StudyMate AI. Summarize student notes into exam-friendly revision material.
Return clear headings, bullet points, definitions, formulas where relevant, and three recall questions.`;

  const summary =
    (await runStudyPrompt(system, `Summarize these notes:\n\n${notes}`)) ||
    demoStudyResponse("summarize", notes);

  return NextResponse.json({ summary });
}
