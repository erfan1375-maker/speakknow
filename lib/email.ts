/**
 * Stub email sender. Swap this out for a real provider (Resend, SendGrid, etc.)
 * later — every call site already awaits this, so the change is contained here.
 */
export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  console.log(`[Email stub] To: ${to}\nSubject: ${subject}\n${body}\n`);
}
