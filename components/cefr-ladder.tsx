"use client";

import { useEffect, useRef, useState } from "react";
import { levels } from "@/lib/site";

const MAX_CUM = levels[levels.length - 1].cum;
const STEM_MIN = 24;
const STEM_RANGE = 156;

/** Stem length encodes cumulative study hours, so the climb is the real data. */
const stemFor = (cum: number) => STEM_MIN + (cum / MAX_CUM) * STEM_RANGE;

export function CefrLadder() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Desktop: the ladder climbs right-to-left, following the reading direction */}
      <div className="hidden items-end gap-4 md:flex">
        {levels.map((level, i) => (
          <div key={level.code} className="flex flex-1 flex-col justify-end">
            <article className="group relative origin-bottom rounded-card border border-hairline bg-white p-5 text-center shadow-[0_18px_40px_-30px_rgba(13,13,13,0.5)] transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.06] hover:shadow-[0_28px_55px_-30px_rgba(13,13,13,0.55)]">
              <div className="en text-4xl font-bold leading-none text-brand-500">
                {level.code}
              </div>
              <h3 className="mt-2 font-semibold text-ink">{level.fa}</h3>
              <p className="mt-3 text-[0.82rem] leading-loose text-ink-muted">
                {level.can}
              </p>

              {/* hidden until hover: the extra detail, revealed with a smooth height transition */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-3 border-t border-brand-100 pt-3 text-[0.78rem] leading-relaxed text-brand-600">
                    {level.detail}
                  </p>
                </div>
              </div>
            </article>

            {/* stem = the hours it takes to stand this high */}
            <div
              className="relative mx-auto w-px origin-bottom bg-[repeating-linear-gradient(to_bottom,var(--color-brand-300)_0_6px,transparent_6px_12px)] transition-transform duration-700 ease-out"
              style={{
                height: `${stemFor(level.cum)}px`,
                transform: shown ? "scaleY(1)" : "scaleY(0)",
                transitionDelay: `${i * 110}ms`,
              }}
            >
              <span className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-[calc(50%+0.75rem)] whitespace-nowrap text-[0.7rem] text-ink-faint">
                {level.hours} ساعت
              </span>
              <span className="absolute -bottom-1 right-1/2 h-2 w-2 translate-x-1/2 rounded-full bg-brand-400" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-1 hidden items-center gap-3 md:flex">
        <span className="text-xs text-ink-faint">شروع از صفر</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>

      {/* Mobile: bar length carries the same number */}
      <ul className="space-y-3 md:hidden">
        {levels.map((level) => (
          <li
            key={level.code}
            className="rounded-card border border-hairline bg-white p-5"
          >
            <div className="flex items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-2.5">
                <span className="en text-3xl font-bold leading-none text-brand-500">
                  {level.code}
                </span>
                <span className="font-semibold text-ink">{level.fa}</span>
              </div>
              <span className="text-xs text-ink-faint">{level.hours} ساعت</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-brand-50">
              <div
                className="h-full rounded-full bg-brand-400 transition-[width] duration-700 ease-out"
                style={{ width: shown ? `${(level.cum / MAX_CUM) * 100}%` : "0%" }}
              />
            </div>
            <p className="mt-3 text-[0.85rem] leading-loose text-ink-muted">
              {level.can}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
