import { sendEmail } from "@/lib/email";
import { site } from "@/lib/site";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? null;

export async function notifyAdminOfChatMessage(
  sessionId: string,
  userName: string | null,
  message: string,
): Promise<void> {
  if (!ADMIN_EMAIL) {
    console.log("[Email stub] ADMIN_EMAIL env var not set — skipping chat notification.");
    return;
  }

  const link = `${site.url}/admin/chat/${sessionId}`;
  const subject = `پیام چت جدید از ${userName ?? "بازدیدکننده ناشناس"}`;
  const body = [`نام: ${userName ?? "—"}`, `پیام: ${message}`, `مکالمه: ${link}`].join("\n");

  await sendEmail(ADMIN_EMAIL, subject, body);
}
