"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  courses,
  goals,
  ieltsBands,
  ieltsSkillsNote,
  ieltsTypes,
  pathBooksNote,
  pathContent,
  pathFormatNote,
  type PathKey,
} from "@/lib/courses";
import { CloseIcon } from "@/components/icons";
import { BriefcaseIcon, OpenBookIcon, RibbonIcon, BubblesIcon, CheckIcon } from "@/components/courses/icons";

const PATH_ICONS: Record<PathKey, (props: { className?: string }) => React.ReactElement> = {
  business: BriefcaseIcon,
  general: OpenBookIcon,
  ielts: RibbonIcon,
  speaking: BubblesIcon,
};

export function CourseExplorer() {
  const [activeKey, setActiveKey] = useState<PathKey | null>(null);
  // Lags behind activeKey so the panel's content stays visible while it animates closed.
  const [renderKey, setRenderKey] = useState<PathKey | null>(null);

  useEffect(() => {
    if (activeKey) setRenderKey(activeKey);
  }, [activeKey]);

  function toggle(key: PathKey) {
    setActiveKey((prev) => (prev === key ? null : key));
  }

  const content = renderKey ? pathContent[renderKey] : null;
  const isIelts = renderKey === "ielts";

  return (
    <div>
      {/* Goal tabs */}
      <p className="text-center text-sm text-ink-muted">
        اول هدفت رو انتخاب کن تا بهترین مسیر رو به تو پیشنهاد بدهیم:
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {goals.map((g) => {
          const Icon = PATH_ICONS[g.key];
          const active = activeKey === g.key;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => toggle(g.key)}
              aria-pressed={active}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors ${
                active
                  ? "border-brand-500 bg-brand-500 text-white shadow-[0_10px_24px_-10px_var(--color-brand-500)]"
                  : "border-hairline bg-white text-ink-muted hover:border-brand-300 hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4" />
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Course cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {courses.map((c, i) => {
          const Icon = PATH_ICONS[c.key];
          const active = activeKey === c.key;
          return (
            <div
              key={c.key}
              className="animate-fade-up flex flex-col overflow-visible"
              style={{ animationDelay: `${i * 130}ms` }}
            >
              <div
                className={`flex flex-1 flex-col overflow-hidden rounded-card border bg-white transition-all duration-300 hover:-translate-y-1 ${
                  active
                    ? "border-brand-400 shadow-[0_24px_50px_-28px_rgba(236,72,153,0.55)]"
                    : "border-hairline shadow-[0_16px_36px_-24px_rgba(13,13,13,0.35)] hover:shadow-[0_24px_50px_-24px_rgba(13,13,13,0.4)]"
                }`}
              >
                <div className="group relative h-40 w-full overflow-hidden">
                  <Image
                    src={c.photo}
                    alt=""
                    fill
                    priority
                    quality={75}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  <span className="absolute -bottom-4 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_8px_20px_-6px_rgba(236,72,153,0.7)] ring-4 ring-white">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-7">
                  <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                  <p className="en mt-1 text-sm text-ink-faint">{c.subtitleEn}</p>

                  <ul className="mt-4 space-y-2.5">
                    {c.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                          <CheckIcon className="h-2.5 w-2.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-600">
                    مناسب برای: <span className="en">{c.levelRange}</span>
                  </p>

                  <button
                    type="button"
                    onClick={() => toggle(c.key)}
                    aria-pressed={active}
                    className={`mt-6 w-full rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                      active ? "bg-brand-600 text-white" : "bg-brand-500 text-white hover:bg-brand-600"
                    }`}
                  >
                    این مسیر به من می‌خوره
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shared accordion panel — always mounted so the collapse animates smoothly */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          activeKey ? "mt-8 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`rounded-card border border-brand-200 bg-brand-50/60 p-6 transition-opacity duration-300 sm:p-8 ${
              activeKey ? "opacity-100 delay-150" : "opacity-0"
            }`}
          >
            {content && (
              <>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-ink">مسیر {content.label}</h3>
                  <button
                    type="button"
                    onClick={() => setActiveKey(null)}
                    aria-label="بستن"
                    className="text-ink-faint transition-colors hover:text-ink"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className={`mt-5 grid gap-6 ${content.photo ? "md:grid-cols-[1fr_16rem]" : ""}`}>
                  <div className="space-y-5 text-sm leading-loose text-ink-muted">
                    <p>{content.intro}</p>

                    {isIelts && (
                      <div className="space-y-4 rounded-2xl bg-white p-4">
                        <div>
                          <p className="font-semibold text-ink">دو نوع آزمون آیلتس</p>
                          <div className="mt-2 grid gap-3 sm:grid-cols-2">
                            {ieltsTypes.map((t) => (
                              <div key={t.name} className="rounded-xl border border-hairline p-3">
                                <p className="en text-sm font-semibold text-brand-600">{t.name}</p>
                                <p className="text-xs text-ink-muted">{t.fa}</p>
                                <p className="mt-1 text-xs leading-relaxed text-ink-faint">{t.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="font-semibold text-ink">
                            سیستم نمره‌دهی <span className="en">(Band Score)</span>
                          </p>
                          <p className="mt-1 text-xs text-ink-faint">نمره از ۰ تا ۹ داده می‌شه:</p>
                          <div className="mt-2 overflow-hidden rounded-xl border border-hairline">
                            <table className="w-full text-xs">
                              <tbody>
                                {ieltsBands.map((b, i) => (
                                  <tr key={b.range} className={i !== ieltsBands.length - 1 ? "border-b border-hairline" : ""}>
                                    <td className="en px-3 py-2 font-semibold text-brand-600">Band {b.range}</td>
                                    <td className="px-3 py-2 text-ink-muted">{b.label}</td>
                                    <td className="en px-3 py-2 text-ink-faint">{b.en}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <p className="text-xs leading-relaxed text-ink-faint">{ieltsSkillsNote}</p>
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-ink">کتاب‌های پیشنهادی</p>
                      <ul className="mt-2 space-y-2">
                        {content.books.map((b) => (
                          <li key={b.name}>
                            <span className="en font-medium text-ink">{b.name}</span>
                            <span className="text-ink-muted"> — {b.note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-ink-faint">{pathBooksNote}</p>
                    <p>{pathFormatNote}</p>

                    <Link
                      href="/level-test"
                      className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_-12px_var(--color-brand-500)] transition-colors hover:bg-brand-600"
                    >
                      شروع تعیین سطح رایگان
                    </Link>
                  </div>

                  {content.photo && (
                    <div className="relative hidden h-full min-h-[16rem] overflow-hidden rounded-2xl md:block">
                      <Image src={content.photo} alt="" fill quality={75} sizes="16rem" className="object-cover" />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
