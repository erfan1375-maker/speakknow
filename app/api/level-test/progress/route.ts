import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { readSessionId } from "@/lib/exam/cookie";
import { getSession } from "@/lib/exam/session";

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
  const currentIndex = Number(body?.currentIndex);
  if (
    !Number.isInteger(currentIndex) ||
    currentIndex < 0 ||
    currentIndex >= session.questions.length
  ) {
    return NextResponse.json({ error: "invalid index" }, { status: 400 });
  }

  db.prepare(
    "UPDATE exam_sessions SET current_index = ?, updated_at = datetime('now') WHERE id = ?",
  ).run(currentIndex, sessionId);

  return NextResponse.json({ ok: true });
}
