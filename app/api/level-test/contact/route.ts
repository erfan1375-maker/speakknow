import { NextResponse } from "next/server";
import { readSessionId } from "@/lib/exam/cookie";
import { isValidEmail, normalizeIranianPhone, PHONE_COOLDOWN_MS } from "@/lib/exam/otp";
import { issueOtp } from "@/lib/exam/otp-store";
import { getSession, setContactInfo, wasPhoneRecentlyCompleted } from "@/lib/exam/session";

export async function POST(request: Request) {
  const sessionId = await readSessionId();
  if (!sessionId) {
    return NextResponse.json({ error: "no active session" }, { status: 401 });
  }

  const session = getSession(sessionId);
  if (!session) {
    return NextResponse.json({ error: "session not found" }, { status: 401 });
  }
  if (session.status !== "in_progress" && session.status !== "awaiting_otp") {
    return NextResponse.json({ error: "session already finished" }, { status: 409 });
  }

  const answeredCount = Object.keys(session.answers).length;
  if (answeredCount < session.questions.length) {
    return NextResponse.json({ error: "exam not finished yet" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const fullName = String(body?.fullName ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const rawPhone = String(body?.phone ?? "").trim();

  if (fullName.length < 2) {
    return NextResponse.json({ error: "نام و نام‌خانوادگی معتبر نیست" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "ایمیل معتبر نیست" }, { status: 400 });
  }
  const phone = normalizeIranianPhone(rawPhone);
  if (!phone) {
    return NextResponse.json({ error: "شماره موبایل معتبر نیست" }, { status: 400 });
  }

  if (wasPhoneRecentlyCompleted(phone, PHONE_COOLDOWN_MS)) {
    return NextResponse.json(
      { error: "این شماره اخیراً یک آزمون تکمیل کرده. لطفاً بعداً دوباره امتحان کن." },
      { status: 429 },
    );
  }

  setContactInfo(sessionId, fullName, email, phone);
  const { expiresAt, devCode } = await issueOtp(sessionId, phone);

  return NextResponse.json({ ok: true, expiresAt, devCode });
}
