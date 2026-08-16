"use client";

import { useEffect, useState } from "react";

type Category = "vocabulary" | "grammar" | "reading" | "listening";

interface ReportData {
  fullName: string;
  level: string;
  totalPercentage: number;
  vocabularyScore: number;
  grammarScore: number;
  readingScore: number;
  listeningScore: number;
  strengths: Category[];
  weaknesses: Category[];
}

const CATEGORY_LABEL: Record<Category, string> = {
  vocabulary: "واژگان",
  grammar: "گرامر",
  reading: "درک مطلب",
  listening: "درک شنیداری",
};

const LEVEL_NAME: Record<string, string> = {
  A1: "مبتدی",
  A2: "پایه",
  B1: "متوسط",
  B2: "بالا متوسط",
  C1: "پیشرفته",
  C2: "پیشرفته حرفه‌ای",
};

export function Report() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/level-test/report")
      .then((res) => {
        if (!res.ok) throw new Error("report fetch failed");
        return res.json();
      })
      .then((data) => setReport(data.result))
      .catch(() => setError("گزارش هنوز آماده نیست. چند لحظه دیگه صفحه رو رفرش کن."));
  }, []);

  if (error) {
    return (
      <div className="shell flex min-h-[60vh] items-center justify-center text-center">
        <p className="text-ink-muted">{error}</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="shell flex min-h-[60vh] items-center justify-center">
        <p className="text-ink-muted">در حال آماده‌سازی گزارش…</p>
      </div>
    );
  }

  const skills: [Category, number][] = [
    ["vocabulary", report.vocabularyScore],
    ["grammar", report.grammarScore],
    ["reading", report.readingScore],
    ["listening", report.listeningScore],
  ];

  return (
    <div className="shell max-w-2xl py-10 md:py-14">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">
        گزارش تعیین سطح {report.fullName}
      </h1>

      <div className="mt-8 rounded-card border border-hairline bg-white p-6 shadow-[0_20px_45px_-30px_rgba(13,13,13,0.4)] sm:p-8">
        <div className="flex items-end justify-between gap-4 border-b border-hairline pb-6">
          <div>
            <div className="en text-6xl font-bold leading-none text-brand-500">
              {report.level}
            </div>
            <p className="mt-2 font-semibold text-ink">{LEVEL_NAME[report.level] ?? ""}</p>
          </div>
          <p className="text-left text-sm leading-loose text-ink-muted">
            امتیاز کل
            <br />
            <span className="en font-semibold text-ink">{report.totalPercentage}%</span>
          </p>
        </div>

        <ul className="mt-6 space-y-4">
          {skills.map(([category, value]) => (
            <li key={category}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-ink">{CATEGORY_LABEL[category]}</span>
                <span className="en text-ink-faint">{value}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-brand-50">
                <div
                  className="h-full rounded-full bg-brand-400 transition-[width] duration-500 ease-out"
                  style={{ width: `${value}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-hairline bg-white p-6">
          <h2 className="font-semibold text-ink">نقاط قوت</h2>
          <ul className="mt-3 space-y-2">
            {report.strengths.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-ink-muted">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {CATEGORY_LABEL[c]}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-card border border-hairline bg-white p-6">
          <h2 className="font-semibold text-ink">نیاز به تقویت</h2>
          <ul className="mt-3 space-y-2">
            {report.weaknesses.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-ink-muted">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
                {CATEGORY_LABEL[c]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 rounded-2xl bg-brand-50 p-4 text-sm leading-loose text-ink-muted">
        گزارش کامل این آزمون به ایمیلت هم ارسال شد.
      </p>
    </div>
  );
}
