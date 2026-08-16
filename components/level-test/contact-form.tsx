"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(0|0098|\+98)?9\d{9}$/;

interface Props {
  onSubmitted: (otpExpiresAt: string | null, phone: string, devCode?: string) => void;
}

export function ContactForm({ onSubmitted }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errors: Record<string, string> = {};
    if (fullName.trim().length < 2) errors.fullName = "نام و نام‌خانوادگی رو کامل بنویس";
    if (!EMAIL_RE.test(email.trim())) errors.email = "ایمیل معتبر نیست";
    if (!PHONE_RE.test(phone.trim().replace(/\s/g, ""))) errors.phone = "شماره موبایل معتبر نیست";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/level-test/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: fullName.trim(), email: email.trim(), phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "مشکلی پیش اومد، دوباره امتحان کن.");
        return;
      }
      onSubmitted(data.expiresAt ?? null, phone.trim(), data.devCode);
    } catch {
      setServerError("مشکلی در ارتباط با سرور پیش اومد.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="shell max-w-lg py-10 md:py-14">
      <h1 className="text-2xl font-bold text-ink">یه قدم تا گزارش تعیین سطحت</h1>
      <p className="mt-2 leading-loose text-ink-muted">
        مشخصاتت رو وارد کن تا کد تأیید برای شماره‌ات پیامک بشه.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="fullName">
            نام و نام‌خانوادگی
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-2xl border border-hairline bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand-400"
            placeholder="مثلاً سارا احمدی"
          />
          {fieldErrors.fullName && (
            <p className="mt-1.5 text-sm text-red-600">{fieldErrors.fullName}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="email">
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="en w-full rounded-2xl border border-hairline bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand-400"
            placeholder="you@example.com"
          />
          {fieldErrors.email && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="phone">
            شماره موبایل
          </label>
          <input
            id="phone"
            type="tel"
            dir="ltr"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="en w-full rounded-2xl border border-hairline bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand-400"
            placeholder="0912xxxxxxx"
          />
          {fieldErrors.phone && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.phone}</p>}
        </div>

        {serverError && (
          <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-600">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand-500 px-8 py-3.5 font-medium text-white shadow-[0_12px_30px_-12px_var(--color-brand-500)] transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "در حال ارسال…" : "دریافت کد تأیید"}
        </button>
      </form>
    </div>
  );
}
