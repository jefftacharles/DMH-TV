import { NextResponse } from "next/server";

import { demoStudyResponse, requireText, runStudyPrompt } from "@/lib/openai";

export async function POST(request: Request) {
  const body = await request.json();
  const schedule = requireText(body.schedule);

  const system = `You are StudyMate AI. Create practical study timetables for students.
Use mobile-readable sections, focus blocks, rest breaks, past paper practice, and final revision checkpoints.`;

  const plan =
    (await runStudyPrompt(system, `Create a study timetable from this information:\n\n${schedule}`)) ||
    demoStudyResponse("planner", schedule);

  return NextResponse.json({ plan });
}
