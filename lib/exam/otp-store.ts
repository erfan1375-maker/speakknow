import { db } from "@/lib/db";
import { generateOtpCode, hashOtpCode, OTP_TTL_MS } from "./otp";
import { sendOtpSms } from "./sms";

interface OtpRow {
  id: number;
  session_id: string;
  phone: string;
  code_hash: string;
  attempts: number;
  expires_at: string;
  verified_at: string | null;
  created_at: string;
}

/**
 * Generates a fresh code, stores it, and "sends" it.
 *
 * `devCode` is only populated outside production — a stopgap so the code can be
 * shown on-page while there's no real SMS provider wired up yet. Remove the
 * `devCode` field (here and in the two API routes that forward it, plus the
 * <OtpForm> banner that renders it) once a real provider is connected.
 */
export async function issueOtp(sessionId: string, phone: string) {
  const code = generateOtpCode();
  const codeHash = hashOtpCode(code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();

  db.prepare(
    "INSERT INTO otp_codes (session_id, phone, code_hash, attempts, expires_at) VALUES (?, ?, ?, 0, ?)",
  ).run(sessionId, phone, codeHash, expiresAt);

  await sendOtpSms(phone, code);

  const devCode = process.env.NODE_ENV !== "production" ? code : undefined;
  return { expiresAt, devCode };
}

export function getLatestOtp(sessionId: string): OtpRow | undefined {
  return db
    .prepare(
      "SELECT * FROM otp_codes WHERE session_id = ? ORDER BY created_at DESC, id DESC LIMIT 1",
    )
    .get(sessionId) as OtpRow | undefined;
}

export function incrementAttempts(otpId: number) {
  db.prepare("UPDATE otp_codes SET attempts = attempts + 1 WHERE id = ?").run(otpId);
}

export function markVerified(otpId: number) {
  db.prepare("UPDATE otp_codes SET verified_at = datetime('now') WHERE id = ?").run(otpId);
}
