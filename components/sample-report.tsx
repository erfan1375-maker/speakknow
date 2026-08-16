const skills = [
  ["Listening", "درک شنیداری", 72],
  ["Speaking", "مکالمه", 54],
  ["Reading", "درک مطلب", 80],
  ["Writing", "نگارش", 46],
] as const;

export function SampleReport() {
  return (
    <section className="shell py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-medium text-brand-600">قبل از شروع بدان چی می‌گیری</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            نمونه‌ای از گزارش تعیین سطح شما
          </h2>
          <p className="mt-5 max-w-md leading-loose text-ink-muted">
            بعد از پایان آزمون، دقیقاً همین‌طور یک گزارش شخصی می‌گیری: سطح
            کلی‌ات روی <span className="en font-medium text-ink">CEFR</span>،
            امتیاز هر چهار مهارت و قدم بعدی پیشنهادی.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-slab border border-hairline bg-white p-7 shadow-[0_40px_80px_-50px_rgba(13,13,13,0.55)]">
            <p className="text-xs tracking-wide text-ink-faint">نمونه‌ی گزارش تعیین سطح</p>

            <div className="mt-4 flex items-end justify-between gap-4 border-b border-hairline pb-5">
              <div>
                <div className="en text-6xl font-bold leading-none text-brand-500">B1</div>
                <p className="mt-2 font-semibold text-ink">سطح متوسط</p>
              </div>
              <p className="text-left text-sm leading-loose text-ink-muted">
                تا اینجا
                <br />
                <span className="font-semibold text-ink">۳۵۰ تا ۴۰۰ ساعت</span>
              </p>
            </div>

            <ul className="mt-5 space-y-3.5">
              {skills.map(([en, fa, v]) => (
                <li key={en}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-ink-muted">
                      <span className="en font-medium text-ink">{en}</span> — {fa}
                    </span>
                    <span className="en text-ink-faint">{v}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-brand-50">
                    <div className="h-full rounded-full bg-brand-400" style={{ width: `${v}%` }} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl bg-brand-50 p-4">
              <p className="text-sm text-ink-muted">
                قدم بعدی پیشنهادی:{" "}
                <span className="en font-medium text-ink">American English File 3</span>{" "}
                + تمرین هفتگی روی نگارش.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-hairline bg-white px-4 py-3 text-sm shadow-[0_18px_40px_-24px_rgba(13,13,13,0.5)] sm:-left-8">
            <span className="text-ink-faint">زمان صرف‌شده</span>{" "}
            <span className="font-semibold text-ink">۴ دقیقه</span>
          </div>
        </div>
      </div>
    </section>
  );
}
