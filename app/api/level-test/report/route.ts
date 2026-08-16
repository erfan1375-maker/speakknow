import { NextResponse } from "next/server";
import { readSessionId } from "@/lib/exam/cookie";
import { getExamResult } from "@/lib/exam/results";
import { getSession } from "@/lib/exam/session";

export async function GET() {
  const sessionId = await readSessionId();
  if (!sessionId) {
    return NextResponse.json({ error: "no active session" }, { status: 401 });
  }

  const session = getSession(sessionId);
  if (!session || session.status !== "completed") {
    return NextResponse.json({ error: "report not ready" }, { status: 409 });
  }

  const result = getExamResult(sessionId);
  if (!result) {
    return NextResponse.json({ error: "report not found" }, { status: 404 });
  }

  return NextResponse.json({ result });
}
