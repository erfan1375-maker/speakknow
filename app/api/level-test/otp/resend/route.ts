import { NextResponse } from "next/server";
import { readSessionId } from "@/lib/exam/cookie";
import { OTP_RESEND_COOLDOWN_MS, parseSqliteDatetime } from "@/lib/exam/otp";
import { getLatestOtp, issueOtp } from "@/lib/exam/otp-store";
import { getSession } from "@/lib/exam/session";

export async function POST() {
  const sessionId = await readSessionId();
  if (!sessionId) {
    return NextResponse.json({ error: "no active session" }, { status: 401 });
  }

  const session = getSession(sessionId);
  if (!session || session.status !== "awaiting_otp" || !session.phone) {
    return NextResponse.json({ error: "no pending verification" }, { status: 409 });
  }

  const latest = getLatestOtp(sessionId);
  if (latest) {
    const elapsedMs = Date.now() - parseSqliteDatetime(latest.created_at).getTime();
    if (elapsedMs < OTP_RESEND_COOLDOWN_MS) {
      const retryAfterSeconds = Math.ceil((OTP_RESEND_COOLDOWN_MS - elapsedMs) / 1000);
      return NextResponse.json(
        { error: "لطفاً کمی صبر کن", retryAfterSeconds },
        { status: 429 },
      );
    }
  }

  const { expiresAt, devCode } = await issueOtp(sessionId, session.phone);
  return NextResponse.json({ ok: true, expiresAt, devCode });
}
