"use client";

import { useState } from "react";
import { contactGoals } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(0|0098|\+98)?9\d{9}$/;

export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errors: Record<string, string> = {};
    if (fullName.trim().length < 2) errors.fullName = "نام و نام‌خانوادگی رو کامل بنویس";
    if (!PHONE_RE.test(phone.trim().replace(/\s/g, ""))) errors.phone = "شماره تماس معتبر نیست";
    if (email.trim() && !EMAIL_RE.test(email.trim())) errors.email = "ایمیل معتبر نیست";
    if (!goal) errors.goal = "یکی از گزینه‌ها رو انتخاب کن";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          goal,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "مشکلی پیش اومد، دوباره امتحان کن.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("مشکلی در ارتباط با سرور پیش اومد.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-hairline bg-white p-8 text-center shadow-[0_20px_45px_-30px_rgba(13,13,13,0.4)]">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mt-4 text-lg font-bold text-ink">پیام شما دریافت شد</h3>
        <p className="mt-2 leading-loose text-ink-muted">به‌زودی باهاتون تماس می‌گیریم.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-card border border-hairline bg-white p-6 shadow-[0_20px_45px_-30px_rgba(13,13,13,0.4)] sm:p-8" noValidate>
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-fullName">
            نام و نام‌خانوادگی
          </label>
          <input
            id="contact-fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-2xl border border-hairline bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand-400"
            placeholder="مثلاً سارا احمدی"
          />
          {fieldErrors.fullName && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.fullName}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-phone">
            شماره تماس
          </label>
          <input
            id="contact-phone"
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

        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-email">
            ایمیل <span className="text-ink-faint">(اختیاری)</span>
          </label>
          <input
            id="contact-email"
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
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="contact-goal">
            هدف از یادگیری زبان انگلیسی
          </label>
          <select
            id="contact-goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full rounded-2xl border border-hairline bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand-400"
          >
            <option value="" disabled>
              انتخاب کن…
            </option>
            {contactGoals.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
          {fieldErrors.goal && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.goal}</p>}
        </div>

        {serverError && <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-600">{serverError}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand-500 px-8 py-3.5 font-medium text-white shadow-[0_12px_30px_-12px_var(--color-brand-500)] transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "در حال ارسال…" : "ارسال پیام"}
        </button>
      </div>
    </form>
  );
}
