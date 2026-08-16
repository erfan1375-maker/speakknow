import { NextResponse } from "next/server";
import { readSessionId, writeSessionCookie } from "@/lib/exam/cookie";
import { createSession, getSession } from "@/lib/exam/session";

export async function POST() {
  const existingId = await readSessionId();

  if (existingId) {
    const existing = getSession(existingId);
    // Resume anything short of "expired" — including "completed", so a refresh
    // right after finishing shows the success screen instead of a fresh exam.
    if (existing && existing.status !== "expired") {
      return NextResponse.json(existing);
    }
  }

  const session = createSession();
  await writeSessionCookie(session.sessionId);
  return NextResponse.json(session);
}
