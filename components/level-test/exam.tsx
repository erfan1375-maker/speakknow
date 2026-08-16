"use client";

import { useEffect, useRef, useState } from "react";
import { ContactForm } from "./contact-form";
import { OtpForm } from "./otp-form";
import { Report } from "./report";

export type OptionKey = "a" | "b" | "c" | "d";
type Category = "vocabulary" | "grammar" | "reading" | "listening";

interface QuestionPublic {
  id: number;
  index: number;
  category: Category;
  difficulty: "easy" | "medium" | "hard";
  text: string;
  options: Record<OptionKey, string>;
  passage?: { title: string; body: string };
  audio?: { url: string };
}

export interface SessionState {
  sessionId: string;
  status: "in_progress" | "awaiting_otp" | "completed" | "expired";
  currentIndex: number;
  questions: QuestionPublic[];
  answers: Record<number, OptionKey>;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  otpExpiresAt: string | null;
}

const CATEGORY_LABEL: Record<Category, string> = {
  vocabulary: "واژگان",
  grammar: "گرامر",
  reading: "درک مطلب",
  listening: "درک شنیداری",
};

const OPTION_KEYS: OptionKey[] = ["a", "b", "c", "d"];

export function Exam() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [answers, setAnswers] = useState<Record<number, OptionKey>>({});
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finishClicked, setFinishClicked] = useState(false);
  const [devCode, setDevCode] = useState<string | undefined>(undefined);
  const startedRef = useRef(false);

  useEffect(() => {
    // Guards against React Strict Mode's dev-only double-invoke, which would
    // otherwise start two competing sessions racing over the same cookie.
    if (startedRef.current) return;
    startedRef.current = true;

    fetch("/api/level-test/start", { method: "POST" })
      .then((res) => {
        if (!res.ok) throw new Error("start failed");
        return res.json();
      })
      .then((data: SessionState) => {
        setSession(data);
        setAnswers(data.answers);
        setIndex(Math.min(data.currentIndex, data.questions.length - 1));
      })
      .catch(() => setError("مشکلی در بارگذاری آزمون پیش اومد. صفحه رو رفرش کن."))
      .finally(() => setLoading(false));
  }, []);

  // Keep the server's resume-point in sync whenever the visible question changes,
  // not just when an answer is saved — otherwise a refresh after "next" (with no
  // new answer) would drop the user back to their last-answered question.
  useEffect(() => {
    if (!session || session.status !== "in_progress") return;
    fetch("/api/level-test/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentIndex: index }),
    }).catch(() => {});
  }, [session, index]);

  const question = session?.questions[index];
  const total = session?.questions.length ?? 30;
  const answeredCount = Object.keys(answers).length;

  async function selectOption(option: OptionKey) {
    if (!session || !question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: option }));
    setSaving(true);
    try {
      await fetch("/api/level-test/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          selectedOption: option,
          currentIndex: index,
        }),
      });
    } finally {
      setSaving(false);
    }
  }

  function goNext() {
    if (!session) return;
    setIndex((i) => Math.min(i + 1, session.questions.length - 1));
  }

  function goPrev() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  if (loading) {
    return (
      <div className="shell flex min-h-[60vh] items-center justify-center">
        <p className="text-ink-muted">در حال آماده‌سازی آزمون…</p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="shell flex min-h-[60vh] items-center justify-center text-center">
        <p className="text-ink-muted">{error ?? "سوالی برای نمایش وجود نداره."}</p>
      </div>
    );
  }

  if (session.status === "completed") {
    return <Report />;
  }

  if (session.status === "awaiting_otp") {
    return (
      <OtpForm
        phone={session.phone ?? ""}
        otpExpiresAt={session.otpExpiresAt}
        initialDevCode={devCode}
        onVerified={() => setSession({ ...session, status: "completed" })}
      />
    );
  }

  if (finishClicked || answeredCount >= total) {
    return (
      <ContactForm
        onSubmitted={(expiresAt, phone, code) => {
          setDevCode(code);
          setSession({ ...session, status: "awaiting_otp", otpExpiresAt: expiresAt, phone });
        }}
      />
    );
  }

  if (!question) {
    return (
      <div className="shell flex min-h-[60vh] items-center justify-center text-center">
        <p className="text-ink-muted">سوالی برای نمایش وجود نداره.</p>
      </div>
    );
  }

  const isLast = index === total - 1;
  const isAnswered = Boolean(answers[question.id]);

  return (
    <div className="shell max-w-2xl py-10 md:py-14">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-ink-muted">
          <span>
            سوال <span className="en font-semibold text-ink">{index + 1}</span> از{" "}
            <span className="en font-semibold text-ink">{total}</span>
          </span>
          <span>{answeredCount} پاسخ داده‌شده</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-50">
          <div
            className="h-full rounded-full bg-brand-500 transition-[width] duration-300 ease-out"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <article className="rounded-card border border-hairline bg-white p-6 shadow-[0_20px_45px_-30px_rgba(13,13,13,0.4)] sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
          {CATEGORY_LABEL[question.category]}
        </span>

        {question.passage && <ReadingPassage passage={question.passage} />}
        {question.audio && <ListeningPlayer url={question.audio.url} />}

        <h2 className="en mt-5 text-lg font-semibold leading-relaxed text-ink sm:text-xl">
          {question.text}
        </h2>

        <div className="mt-6 space-y-3">
          {OPTION_KEYS.map((key) => {
            const selected = answers[question.id] === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => selectOption(key)}
                className={`en flex w-full items-center gap-3 rounded-2xl border p-4 text-right transition-colors ${
                  selected
                    ? "border-brand-500 bg-brand-50"
                    : "border-hairline bg-white hover:border-brand-200"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    selected
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-hairline text-ink-faint"
                  }`}
                >
                  {key.toUpperCase()}
                </span>
                <span className="text-[0.95rem] text-ink">{question.options[key]}</span>
              </button>
            );
          })}
        </div>
      </article>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          className="rounded-full px-5 py-3 font-medium text-ink-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-ink-muted"
        >
          سوال قبلی
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={() => setFinishClicked(true)}
            disabled={!isAnswered}
            className="rounded-full bg-brand-500 px-8 py-3 font-medium text-white shadow-[0_12px_30px_-12px_var(--color-brand-500)] transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-500"
          >
            پایان تعیین سطح
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={!isAnswered || saving}
            className="rounded-full bg-brand-500 px-8 py-3 font-medium text-white shadow-[0_12px_30px_-12px_var(--color-brand-500)] transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-500"
          >
            سوال بعدی
          </button>
        )}
      </div>
    </div>
  );
}

function ReadingPassage({ passage }: { passage: { title: string; body: string } }) {
  return (
    <div className="mt-5 rounded-2xl bg-brand-50/60 p-5">
      <h3 className="en font-semibold text-ink">{passage.title}</h3>
      <p className="en mt-2 max-h-56 overflow-y-auto text-sm leading-relaxed text-ink-muted">
        {passage.body}
      </p>
    </div>
  );
}

function ListeningPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => setPlaying(false));
    }
  }

  return (
    <div className="mt-5 flex items-center gap-4 rounded-2xl bg-brand-50/60 p-5">
      <button
        type="button"
        onClick={toggle}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600"
        aria-label={playing ? "توقف پخش" : "پخش فایل صوتی"}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <div className="text-sm text-ink-muted">
        فایل صوتی را پخش کن و سؤال را جواب بده.
        <audio
          ref={audioRef}
          src={url}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="hidden"
        />
      </div>
    </div>
  );
}
