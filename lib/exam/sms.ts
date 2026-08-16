/**
 * Stub SMS sender. Swap this out for a real provider (Kavenegar, etc.) later —
 * every call site already awaits this, so the change is contained to this file.
 */
export async function sendOtpSms(phone: string, code: string): Promise<void> {
  console.log(`[SMS stub] OTP for ${phone}: ${code}`);
}
