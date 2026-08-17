import { sendEmail } from "@/lib/email";
import { contactGoalLabel } from "@/lib/site";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? null;

export async function notifyAdminOfContactRequest(
  fullName: string,
  phone: string,
  email: string | null,
  goal: string,
): Promise<void> {
  if (!ADMIN_EMAIL) {
    console.log("[Email stub] ADMIN_EMAIL env var not set — skipping contact-form notification.");
    return;
  }

  const subject = `[درخواست تماس جدید] ${fullName}`;
  const body = [
    `نام: ${fullName}`,
    `شماره تماس: ${phone}`,
    `ایمیل: ${email ?? "—"}`,
    `هدف: ${contactGoalLabel(goal)}`,
  ].join("\n");

  await sendEmail(ADMIN_EMAIL, subject, body);
}
