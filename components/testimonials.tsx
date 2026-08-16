import { RevealGroup, RevealItem } from "@/components/reveal";

const testimonials = [
  {
    name: "نگار احمدی",
    goal: "آماده‌سازی مهاجرت",
    rating: 5,
    quote:
      "تعیین سطح رایگان دقیقاً نشونم داد کجای کارم ضعیفم. سه ماه بعد، مکالمه‌ام اونقدر جا افتاد که برای مصاحبه دیگه استرس نداشتم.",
  },
  {
    name: "امیرحسین رضایی",
    goal: "انگلیسی محیط کاری",
    rating: 5,
    quote:
      "بعد از سال‌ها کلاس رفتن بی‌نتیجه، اینجا اول واقعاً سطحم رو سنجیدن و بعد یه برنامه‌ی مشخص برام نوشتن. فرقش کاملاً حس می‌شد.",
  },
  {
    name: "مریم قاسمی",
    goal: "آیلتس",
    rating: 4,
    quote:
      "پشتیبانی‌شون واقعاً هر روزه‌ست، حتی جمعه‌ها جواب دادن. نمره‌ی رایتینگم توی دو ماه از ۵.۵ به ۶.۵ رسید.",
  },
  {
    name: "پویا صادقی",
    goal: "مکالمه روزمره",
    rating: 5,
    quote:
      "بیشتر از یه کلاس، شبیه یه مسیر بود. هر جلسه می‌دونستم دقیقاً روی چی کار می‌کنیم و چرا.",
  },
  {
    name: "الهام کریمی",
    goal: "Business English",
    rating: 5,
    quote:
      "استادی که برام گذاشتن دقیقاً با حوزه‌ی کاریم آشنا بود. جلسات مذاکره و ایمیل‌نویسی خیلی به‌دردم خورد.",
  },
];

const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵"];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-brand-400" aria-label={`${faDigits[rating]} از ۵ ستاره`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.3"
        >
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.8l-5.2 2.9 1-5.9-4.3-4.1 5.9-.8L10 1.5Z" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-brand-50/60 py-20 md:py-24">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-brand-600">نظرات واقعی</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">نظرات زبان‌آموزان</h2>
        </div>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealItem key={t.name} index={i}>
              <article className="flex h-full flex-col rounded-card bg-white p-6">
                <Stars rating={t.rating} />
                <p className="mt-4 flex-1 leading-loose text-ink-muted">“{t.quote}”</p>
                <div className="mt-5 flex items-center gap-3 border-t border-hairline pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-600">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-medium text-ink">{t.name}</p>
                    <p className="text-sm text-ink-faint">{t.goal}</p>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
