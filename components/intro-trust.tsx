import { site } from "@/lib/site";

const items = [
  {
    title: `آکادمی آنلاین ${site.name}`,
    body: "۷ سال سابقه، رضایت بالای ۹۰٪ زبان‌آموزان.",
    icon: (
      <>
        <path d="M12 3l9 5-9 5-9-5 9-5Z" />
        <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
      </>
    ),
  },
  {
    title: "پشتیبانی همه‌روزه",
    body: "بازگشت کامل وجه در صورت عدم رضایت.",
    icon: (
      <>
        <path d="M4 13a8 8 0 0 1 16 0" />
        <rect x="3" y="13" width="5" height="7" rx="1.5" />
        <rect x="16" y="13" width="5" height="7" rx="1.5" />
      </>
    ),
  },
  {
    title: "برنامه اختصاصی رایگان",
    body: "متناسب با هدف و سطح خودت.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4.3" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

const CARD_START = 250;
const CARD_STAGGER = 150;

// A gentle curve per card — top and bottom cards bend toward the photo in the
// middle, the middle card gets a soft S-wave — instead of one straight line.
const CONNECTOR_PATHS = [
  "M2 4 Q22 18 42 10",
  "M2 10 Q12 2 22 10 T42 10",
  "M2 16 Q22 2 42 10",
];

export function IntroTrust() {
  return (
    <>
      {/* Desktop: a column of cards beside the photo, each tied to it with a curved dashed lead line */}
      <ul className="hidden h-full flex-col justify-between lg:flex">
        {items.map((item, i) => {
          const delay = CARD_START + i * CARD_STAGGER;
          return (
            <li key={item.title} className="flex items-center gap-0">
              <div
                className="animate-slide-in-r flex w-full items-center gap-3 rounded-2xl bg-white p-3.5 shadow-[0_16px_36px_-16px_rgba(13,13,13,0.35)]"
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-relaxed text-ink">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-faint">{item.body}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                  <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </span>
              </div>
              <svg
                aria-hidden
                viewBox="0 0 44 20"
                className="animate-draw-line h-5 w-11 shrink-0 text-brand-300"
                style={{ animationDelay: `${delay}ms` }}
                fill="none"
              >
                <path d={CONNECTOR_PATHS[i]} stroke="currentColor" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
              </svg>
              <span
                aria-hidden
                className="animate-fade-in h-2 w-2 shrink-0 rounded-full bg-brand-500"
                style={{ animationDelay: `${delay + 400}ms`, animationDuration: "250ms" }}
              />
            </li>
          );
        })}
      </ul>

      {/* Mobile: same three items, stacked below the photo instead of beside it */}
      <ul className="mt-6 space-y-3 lg:hidden">
        {items.map((item, i) => (
          <li
            key={item.title}
            className="animate-fade-up flex items-center gap-3 rounded-2xl border border-hairline bg-white p-4"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div>
              <h3 className="font-semibold leading-snug">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                {item.icon}
              </svg>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
