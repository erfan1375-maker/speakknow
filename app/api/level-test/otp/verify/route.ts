import { NextResponse } from "next/server";
import { readSessionId } from "@/lib/exam/cookie";
import { sendReportEmails } from "@/lib/exam/email";
import { hashOtpCode, OTP_MAX_ATTEMPTS, parseSqliteDatetime } from "@/lib/exam/otp";
import { getLatestOtp, incrementAttempts, markVerified } from "@/lib/exam/otp-store";
import { getExamResult, saveExamResult } from "@/lib/exam/results";
import { computeReport } from "@/lib/exam/scoring";
import { getScoredQuestions, getSession, markSessionCompleted } from "@/lib/exam/session";

export async function POST(request: Request) {
  const sessionId = await readSessionId();
  if (!sessionId) {
    return NextResponse.json({ error: "no active session" }, { status: 401 });
  }

  const session = getSession(sessionId);
  if (!session || session.status !== "awaiting_otp") {
    return NextResponse.json({ error: "no pending verification" }, { status: 409 });
  }

  const latest = getLatestOtp(sessionId);
  if (!latest) {
    return NextResponse.json({ error: "کدی برای این آزمون ارسال نشده" }, { status: 400 });
  }

  if (latest.verified_at) {
    markSessionCompleted(sessionId);
    return NextResponse.json({ ok: true });
  }

  if (latest.attempts >= OTP_MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "تعداد تلاش‌های مجاز تمام شده. یک کد جدید درخواست کن." },
      { status: 429 },
    );
  }

  if (parseSqliteDatetime(latest.expires_at).getTime() < Date.now()) {
    return NextResponse.json(
      { error: "کد منقضی شده. یک کد جدید درخواست کن." },
      { status: 400 },
    );
  }

  const body = await request.json().catch(() => null);
  const code = String(body?.code ?? "").trim();

  if (hashOtpCode(code) !== latest.code_hash) {
    incrementAttempts(latest.id);
    const attemptsLeft = Math.max(0, OTP_MAX_ATTEMPTS - (latest.attempts + 1));
    return NextResponse.json({ ok: false, error: "کد اشتباه است", attemptsLeft }, { status: 400 });
  }

  markVerified(latest.id);
  markSessionCompleted(sessionId);

  // Score once, right here — this is the one moment we know the exam is over
  // and the identity behind it is confirmed. Never recomputed or exposed earlier.
  const scoredQuestions = getScoredQuestions(sessionId);
  const report = computeReport(scoredQuestions, session.answers);
  saveExamResult(sessionId, report, session.fullName ?? "", session.email ?? "", session.phone ?? "");

  const result = getExamResult(sessionId);
  if (result) {
    sendReportEmails(result).catch((err) => console.error("sendReportEmails failed:", err));
  }

  return NextResponse.json({ ok: true });
}
