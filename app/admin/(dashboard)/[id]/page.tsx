import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExamResultById } from "@/lib/admin/results";
import { parseSqliteDatetime } from "@/lib/exam/otp";

export const metadata: Metadata = {
  title: "جزئیات نتیجه",
  robots: { index: false, follow: false },
};

const CATEGORY_LABEL: Record<string, string> = {
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

export default async function AdminResultDetailPage(props: PageProps<"/admin/[id]">) {
  const { id } = await props.params;
  const numericId = Number(id);
  const result = Number.isInteger(numericId) ? getExamResultById(numericId) : null;
  if (!result) notFound();

  const skills: [string, number][] = [
    ["vocabulary", result.vocabularyScore],
    ["grammar", result.grammarScore],
    ["reading", result.readingScore],
    ["listening", result.listeningScore],
  ];

  return (
    <div className="max-w-2xl">
      <Link href="/admin" className="text-sm text-ink-muted hover:text-brand-600">
        ← بازگشت به لیست
      </Link>

      <div className="mt-4 rounded-card border border-hairline bg-white p-6 shadow-[0_20px_45px_-30px_rgba(13,13,13,0.4)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-hairline pb-6">
          <div>
            <h1 className="text-xl font-bold text-ink">{result.fullName}</h1>
            <p className="en mt-1 text-sm text-ink-muted">{result.email}</p>
            <p className="en text-sm text-ink-muted">{result.phone}</p>
          </div>
          <div className="text-left">
            <div className="en text-4xl font-bold leading-none text-brand-500">{result.level}</div>
            <p className="mt-1 text-sm text-ink-muted">{LEVEL_NAME[result.level] ?? ""}</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-ink-faint">
          تاریخ آزمون:{" "}
          <span className="en">
            {new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(
              parseSqliteDatetime(result.createdAt),
            )}
          </span>
          {" • "}نمره کل: <span className="en font-medium text-ink">{result.totalPercentage}%</span>
        </p>

        <ul className="mt-6 space-y-4">
          {skills.map(([category, value]) => (
            <li key={category}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-ink">{CATEGORY_LABEL[category]}</span>
                <span className="en text-ink-faint">{value}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-brand-50">
                <div className="h-full rounded-full bg-brand-400" style={{ width: `${value}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-hairline bg-white p-6">
          <h2 className="font-semibold text-ink">نقاط قوت</h2>
          <ul className="mt-3 space-y-2">
            {result.strengths.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-ink-muted">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {CATEGORY_LABEL[c]}
              </li>
            ))}
            {result.strengths.length === 0 && <li className="text-sm text-ink-faint">—</li>}
          </ul>
        </div>
        <div className="rounded-card border border-hairline bg-white p-6">
          <h2 className="font-semibold text-ink">نیاز به تقویت</h2>
          <ul className="mt-3 space-y-2">
            {result.weaknesses.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-ink-muted">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
                {CATEGORY_LABEL[c]}
              </li>
            ))}
            {result.weaknesses.length === 0 && <li className="text-sm text-ink-faint">—</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
