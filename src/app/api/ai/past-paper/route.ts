import { NextResponse } from "next/server";

import { demoStudyResponse, requireText, runStudyPrompt } from "@/lib/openai";

export async function POST(request: Request) {
  const body = await request.json();
  const question = requireText(body.question);

  const system = `You are StudyMate AI. Help students understand past-paper questions.
Explain the answer step by step, identify the command word, show working where useful, and end with a quick exam tip.`;

  const answer =
    (await runStudyPrompt(system, `Explain this past-paper question:\n\n${question}`)) ||
    demoStudyResponse("past-paper", question);

  return NextResponse.json({ answer });
}
