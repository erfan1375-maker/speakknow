import { NextRequest, NextResponse } from "next/server";
import { isValidEmail, normalizeIranianPhone } from "@/lib/exam/otp";
import { insertContactRequest } from "@/lib/contact/requests";
import { notifyAdminOfContactRequest } from "@/lib/contact/notify";
import { contactGoals } from "@/lib/site";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : "";
  const rawPhone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const rawEmail = typeof body?.email === "string" ? body.email.trim() : "";
  const goal = typeof body?.goal === "string" ? body.goal.trim() : "";

  if (fullName.length < 2) {
    return NextResponse.json({ error: "نام و نام‌خانوادگی معتبر نیست" }, { status: 400 });
  }

  const phone = normalizeIranianPhone(rawPhone);
  if (!phone) {
    return NextResponse.json({ error: "شماره تماس معتبر نیست" }, { status: 400 });
  }

  if (rawEmail && !isValidEmail(rawEmail)) {
    return NextResponse.json({ error: "ایمیل معتبر نیست" }, { status: 400 });
  }

  if (!contactGoals.some((g) => g.value === goal)) {
    return NextResponse.json({ error: "هدف انتخاب‌شده معتبر نیست" }, { status: 400 });
  }

  insertContactRequest(fullName, phone, rawEmail || null, goal);

  notifyAdminOfContactRequest(fullName, phone, rawEmail || null, goal).catch((err) =>
    console.error("notifyAdminOfContactRequest failed:", err),
  );

  return NextResponse.json({ ok: true });
}
