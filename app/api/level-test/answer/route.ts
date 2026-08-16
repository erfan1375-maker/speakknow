import { NextResponse } from "next/server";
import { readSessionId } from "@/lib/exam/cookie";
import { getSession, saveAnswer } from "@/lib/exam/session";

const VALID_OPTIONS = new Set(["a", "b", "c", "d"]);

export async function POST(request: Request) {
  const sessionId = await readSessionId();
  if (!sessionId) {
    return NextResponse.json({ error: "no active session" }, { status: 401 });
  }

  const session = getSession(sessionId);
  if (!session) {
    return NextResponse.json({ error: "session not found" }, { status: 401 });
  }
  if (session.status !== "in_progress") {
    return NextResponse.json({ error: "session already finished" }, { status: 409 });
  }

  const body = await request.json().catch(() => null);
  const questionId = Number(body?.questionId);
  const selectedOption = body?.selectedOption;
  const currentIndex = Number(body?.currentIndex);

  if (
    !Number.isInteger(questionId) ||
    !VALID_OPTIONS.has(selectedOption) ||
    !Number.isInteger(currentIndex)
  ) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const belongsToSession = session.questions.some((q) => q.id === questionId);
  if (!belongsToSession) {
    return NextResponse.json({ error: "question not in this session" }, { status: 400 });
  }

  saveAnswer(sessionId, questionId, selectedOption, currentIndex);
  return NextResponse.json({ ok: true });
}
