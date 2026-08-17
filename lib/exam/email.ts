import { sendEmail } from "@/lib/email";
import type { StoredExamResult } from "./results";

/** Set this once a real inbox is chosen — every completed report gets emailed here too. */
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? null;

export async function sendReportEmails(result: StoredExamResult): Promise<void> {
  const subject = `گزارش تعیین سطح ${result.fullName}`;
  const body = [
    `سطح نهایی: ${result.level} (${result.totalPercentage}%)`,
    `واژگان: ${result.vocabularyScore}%`,
    `گرامر: ${result.grammarScore}%`,
    `درک مطلب: ${result.readingScore}%`,
    `درک شنیداری: ${result.listeningScore}%`,
    `شماره تماس: ${result.phone}`,
  ].join("\n");

  await sendEmail(result.email, subject, body);

  if (ADMIN_EMAIL) {
    await sendEmail(ADMIN_EMAIL, `[لید جدید] ${subject}`, body);
  } else {
    console.log("[Email stub] ADMIN_EMAIL env var not set — skipping admin copy.");
  }
}
