"use client";

import { useEffect, useState } from "react";

const RESEND_COOLDOWN_MS = 60 * 1000;

interface Props {
  phone: string;
  otpExpiresAt: string | null;
  /** Dev-only: the plaintext code, shown on-page until a real SMS provider is wired up. */
  initialDevCode?: string;
  onVerified: () => void;
}

function formatCountdown(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function OtpForm({ phone, otpExpiresAt, initialDevCode, onVerified }: Props) {
  const [expiresAt, setExpiresAt] = useState(otpExpiresAt);
  const [devCode, setDevCode] = useState(initialDevCode);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const expiresAtMs = expiresAt ? new Date(expiresAt).getTime() : 0;
  const remainingMs = expiresAtMs - now;
  const expired = expiresAt !== null && remainingMs <= 0;
  // The 60s resend cooldown always ends 60s before the 2-minute code expiry.
  const resendAvailableAtMs = expiresAtMs - RESEND_COOLDOWN_MS;
  const resendRemainingMs = resendAvailableAtMs - now;
  const canResend = !expiresAt || resendRemainingMs <= 0;

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (code.trim().length !== 4) {
      setError("کد ۴ رقمی رو کامل وارد کن");
      return;
    }

    setVerifying(true);
    try {
      const res = await fetch("/api/level-test/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "کد اشتباه است");
        if (typeof data.attemptsLeft === "number") setAttemptsLeft(data.attemptsLeft);
        return;
      }
      onVerified();
    } catch {
      setError("مشکلی در ارتباط با سرور پیش اومد.");
    } finally {
      setVerifying(false);
    }
  }

  async function handleResend() {
    setError(null);
    setResending(true);
    try {
      const res = await fetch("/api/level-test/otp/resend", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "مشکلی پیش اومد.");
        return;
      }
      setExpiresAt(data.expiresAt ?? null);
      setDevCode(data.devCode);
      setCode("");
      setAttemptsLeft(null);
    } catch {
      setError("مشکلی در ارتباط با سرور پیش اومد.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="shell max-w-lg py-10 md:py-14">
      <h1 className="text-2xl font-bold text-ink">کد تأیید رو وارد کن</h1>
      <p className="mt-2 leading-loose text-ink-muted">
        یه کد ۴ رقمی به شماره‌ی <span className="en font-medium text-ink">{phone}</span> پیامک شد.
      </p>

      {devCode && (
        <p className="en mt-4 inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
          کد تست: {devCode}
        </p>
      )}

      <form onSubmit={handleVerify} className="mt-8 space-y-5">
        <div>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            dir="ltr"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="en w-full rounded-2xl border border-hairline bg-white px-4 py-4 text-center text-2xl tracking-[0.5em] text-ink outline-none transition-colors focus:border-brand-400"
            placeholder="----"
            autoFocus
          />
          <div className="mt-2 flex items-center justify-between text-sm text-ink-faint">
            <span>
              {expired ? (
                <span className="text-red-600">کد منقضی شده</span>
              ) : (
                <>اعتبار کد: <span className="en">{formatCountdown(remainingMs)}</span></>
              )}
            </span>
            {attemptsLeft !== null && (
              <span>{attemptsLeft} تلاش باقی‌مانده</span>
            )}
          </div>
        </div>

        {error && <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={verifying || code.length !== 4}
          className="w-full rounded-full bg-brand-500 px-8 py-3.5 font-medium text-white shadow-[0_12px_30px_-12px_var(--color-brand-500)] transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {verifying ? "در حال بررسی…" : "تأیید کد"}
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend || resending}
          className="w-full rounded-full px-8 py-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resending
            ? "در حال ارسال…"
            : canResend
              ? "ارسال مجدد کد"
              : `ارسال مجدد کد (${formatCountdown(resendRemainingMs)})`}
        </button>
      </form>
    </div>
  );
}
