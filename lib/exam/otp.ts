import { createHash, randomInt } from "node:crypto";

export const OTP_TTL_MS = 2 * 60 * 1000; // 2 minutes
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds
export const OTP_MAX_ATTEMPTS = 5;
export const PHONE_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

/** SQLite's datetime('now') produces "YYYY-MM-DD HH:MM:SS" in UTC with no
 * timezone marker — normalize it so `new Date(...)` parses it correctly. */
export function parseSqliteDatetime(value: string): Date {
  return new Date(value.replace(" ", "T") + "Z");
}

export function generateOtpCode(): string {
  return String(randomInt(1000, 10000)); // 4 digits, 1000-9999
}

export function hashOtpCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

/** Accepts 09XXXXXXXXX, +989XXXXXXXXX, 00989XXXXXXXXX, or 9XXXXXXXXX and
 * normalizes to the canonical 09XXXXXXXXX form. Returns null if invalid. */
export function normalizeIranianPhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0098")) digits = digits.slice(4);
  else if (digits.startsWith("98")) digits = digits.slice(2);
  if (digits.length === 10 && digits.startsWith("9")) digits = "0" + digits;
  return /^09\d{9}$/.test(digits) ? digits : null;
}
