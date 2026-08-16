import { RevealGroup, RevealItem } from "@/components/reveal";

const steps = [
  {
    title: "تعیین سطح در کوتاه‌ترین زمان",
    points: ["بررسی گرامر، واژگان، لیسنینگ و درک مطلب بر اساس استاندارد CEFR"],
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  },
  {
    title: "دریافت نتیجه تعیین سطح",
    points: [
      "مشخص شدن سطح زبان شما از A1 تا C2",
      "بررسی نقاط قوت و ضعف شما",
      "شناخت مهارت‌هایی که نیاز به تقویت دارند",
    ],
    icon: (
      <>
        <path d="M4 20V11M10 20V6M16 20v-8M4 20h16" />
      </>
    ),
  },
  {
    title: "جلسه مسیریابی اختصاصی (Personal Roadmap)",
    points: [
      "استاد مناسب بر اساس هدف و نتیجه تست شما مشخص می‌شود",
      "تعیین نقاط ضعف و اولویت‌ها",
      "ساخت roadmap اختصاصی",
    ],
    icon: (
      <>
        <path d="M5 20l4.5-14 4.5 10 3-7 2 4" />
        <circle cx="19" cy="6" r="2" />
      </>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="shell scroll-mt-24 py-20 md:py-24">
      <h2 className="max-w-3xl text-2xl font-bold leading-relaxed text-brand-600 sm:text-3xl md:text-[2.15rem]">
        تعیین سطح شما در اسپیک‌نو دقیقاً چطور انجام می‌شود؟{" "}
        <span aria-hidden>↓</span>
      </h2>

      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <RevealItem key={step.title} index={i}>
            <article className="flex h-full flex-col rounded-card border border-hairline bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {step.icon}
                </svg>
              </span>
              <span className="en mt-5 text-sm font-medium text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1.5 text-lg font-semibold">{step.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {step.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[0.92rem] leading-loose text-ink-muted">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
