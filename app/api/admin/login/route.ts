import { NextRequest, NextResponse } from "next/server";
import {
  clearLoginAttempts,
  createAdminSession,
  isLoginThrottled,
  registerFailedLogin,
  verifyAdminCredentials,
} from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";

  if (isLoginThrottled(ip)) {
    return NextResponse.json(
      { error: "تلاش‌های ناموفق زیاد بود. چند دقیقه دیگر دوباره امتحان کن." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username || !password || !verifyAdminCredentials(username, password)) {
    registerFailedLogin(ip);
    return NextResponse.json({ error: "نام کاربری یا رمز عبور اشتباه است" }, { status: 401 });
  }

  clearLoginAttempts(ip);
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
