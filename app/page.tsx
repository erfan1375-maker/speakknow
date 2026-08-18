import Image from "next/image";
import Link from "next/link";
import { CefrLadder } from "@/components/cefr-ladder";
import { HowItWorks } from "@/components/how-it-works";
import { IntroTrust } from "@/components/intro-trust";
import { SampleReport } from "@/components/sample-report";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Testimonials } from "@/components/testimonials";
import { site } from "@/lib/site";

const gallery = [
  { kind: "عکس", label: "کلاس مکالمه ترم بهار" },
  { kind: "ویدیو", label: "نمونه جلسه Business English" },
  { kind: "عکس", label: "ورکشاپ آمادگی آیلتس" },
  { kind: "ویدیو", label: "تمرین Speaking گروهی" },
  { kind: "عکس", label: "جشن پایان دوره B1" },
  { kind: "عکس", label: "کلاس آنلاین بزرگسالان" },
];

const trust = [
  { stat: "۷ سال", label: "سابقه‌ی تدریس", body: "از مبتدی مطلق تا کلاس‌های تخصصی Business English." },
  { stat: "هر روز", label: "پشتیبانی", body: "جواب سؤالت را همان روز می‌گیری، حتی جمعه و تعطیلات." },
  { stat: "۴ مهارت", label: "زیر نظر استاد", body: "اساتید منتخب با تمرکز روی تک‌تک مهارت‌هایی که شما نیاز دارید." },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ---------------- Hero ---------------- */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-brand-100 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 bottom-0 h-[22rem] w-[22rem] rounded-full bg-brand-50 blur-3xl"
          />
          <div className="shell relative grid items-start gap-10 pt-8 md:pt-12 lg:grid-cols-[1.55fr_1fr]">
            <div className="lg:order-2 lg:min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-ink-muted shadow-[0_10px_30px_-20px_rgba(13,13,13,0.6)]">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                رایگان • کمتر از ۵ دقیقه • بدون ثبت‌نام
              </p>

              <h1 className="mt-7 text-2xl font-bold leading-[1.55] tracking-tight sm:text-3xl lg:text-[2.15rem]">
                سطح واقعی انگلیسی‌تان را در ۵ دقیقه متوجه شوید و مسیر یادگیری
                اختصاصی خودتان را دریافت کنید
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-loose text-ink-muted">
                فقط یک سطح دریافت نمی‌کنید؛ متوجه می‌شوید دقیقاً کجا هستید، چه
                چیزهایی نیاز به تقویت دارد و برای رسیدن به هدف چه مسیری باید طی
                کنید.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/level-test"
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-500 px-8 py-4 text-lg font-medium text-white shadow-[0_20px_45px_-20px_var(--color-brand-500)] transition-colors hover:bg-brand-600"
                >
                  شروع تعیین سطح رایگان
                  <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M11 18l-6-6 6-6" />
                  </svg>
                </Link>
                <Link
                  href="/#how-it-works"
                  className="rounded-full px-5 py-4 font-medium text-ink-muted underline decoration-brand-300 decoration-2 underline-offset-8 transition-colors hover:text-brand-600"
                >
                  چطور اسپیک‌نو به هدفتان می‌رساند؟ ↓
                </Link>
              </div>

              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm text-ink-muted">
                {[
                  ["کاملاً رایگان", "بدون هزینه‌ی پنهان"],
                  ["کمتر از ۵ دقیقه", "همین حالا تمام می‌شود"],
                  ["بدون ثبت‌نام", "فقط برای تماس شماره می‌گیریم"],
                ].map(([t, d]) => (
                  <div key={t}>
                    <dt className="font-medium text-ink">{t}</dt>
                    <dd className="text-ink-faint">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* photo module: one soft card holding the photo, the three cards beside it, and the stats strip underneath — beside the headline, not below it */}
            <div className="w-full rounded-[28px] bg-gradient-to-br from-brand-100/70 via-brand-50 to-white p-5 text-right sm:rounded-[32px] sm:p-6 lg:order-1 lg:min-w-0">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.6fr] lg:items-center lg:gap-3">
                <div className="lg:min-w-0">
                  <IntroTrust />
                </div>

                {/* photo */}
                <div className="relative lg:min-w-0">
                  <div
                    aria-hidden
                    className="absolute right-[6%] top-0 h-[78%] w-[78%] rounded-full bg-brand-100"
                  />
                  <svg
                    aria-hidden
                    viewBox="0 0 80 80"
                    className="absolute -left-3 top-4 h-16 w-16 text-brand-300 lg:h-20 lg:w-20"
                    fill="none"
                  >
                    <circle
                      cx="40"
                      cy="46"
                      r="30"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="1 9"
                    />
                    <path d="M10 16l7 7M18 8l4 10M4 26l10 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>

                  <Image
                    src="/hero-photo-2.png"
                    alt="زبان‌آموز در حال یادگیری آنلاین با اسپیک‌نو"
                    width={1223}
                    height={1286}
                    priority
                    quality={90}
                    sizes="(min-width: 1024px) 46vw, 90vw"
                    className="animate-fade-in relative z-10 h-auto w-full max-w-none drop-shadow-[0_30px_55px_rgba(13,13,13,0.28)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- More than a score ---------------- */}
        <section className="shell py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold leading-relaxed sm:text-4xl">
                تعیین سطح، فقط تعیین سطح نیست
              </h2>
              <p className="mt-6 text-lg leading-loose text-ink-muted">
                دانستن اینکه <span className="en font-medium text-ink">B1</span>{" "}
                هستی به‌تنهایی چیزی را عوض نمی‌کند. کاری که ما می‌کنیم این است که
                سه چیز را کنار هم بگذاریم — هدفت، سطح فعلی‌ات و زمانی که واقعاً
                داری — و از دلش یک مسیر بسازیم که مال خودت است.
              </p>
              <p className="mt-4 leading-loose text-ink-muted">
                کسی که برای مهاجرت می‌خواند با کسی که می‌خواهد در جلسه‌ی کاری
                حرف بزند، حتی اگر هر دو <span className="en">B1</span> باشند،
                نباید یک کتاب و یک برنامه داشته باشند.
              </p>
              <Link
                href="/path"
                className="mt-8 inline-flex items-center gap-2 font-medium text-brand-600 underline decoration-brand-300 decoration-2 underline-offset-8"
              >
                مسیر یادگیری چطور ساخته می‌شود؟
              </Link>
            </div>

            <ol className="space-y-4">
              {[
                {
                  t: "هدفت را می‌پرسیم",
                  d: "کار، مهاجرت، تحصیل یا مکالمه‌ی روزمره — هرکدام مقصد متفاوتی است.",
                },
                {
                  t: "سطحت را می‌سنجیم",
                  d: "چهار مهارت جدا سنجیده می‌شود تا معلوم شود کدام یکی عقب مانده.",
                },
                {
                  t: "فاصله را حساب می‌کنیم",
                  d: "از سطح فعلی تا سطحی که هدفت لازم دارد، چند ساعت و چند ترم راه است.",
                },
                {
                  t: "برنامه را می‌نویسیم",
                  d: "کتاب، کلاس، تمرین هفتگی و نقطه‌ای که دوباره سطح‌سنجی می‌کنی.",
                },
              ].map((step, i) => (
                <li
                  key={step.t}
                  className="flex gap-5 rounded-card border border-hairline bg-white p-6"
                >
                  <span className="en flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.t}</h3>
                    <p className="mt-1.5 leading-loose text-ink-muted">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- CEFR ladder ---------------- */}
        <section className="bg-brand-50/60 py-20 md:py-28">
          <div className="shell">
            <div className="mb-14 max-w-2xl">
              <p className="text-sm font-medium text-brand-600">استاندارد بین‌المللی</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                پنج پله تا انگلیسی روان، از صفر
              </h2>
              <p className="mt-4 leading-loose text-ink-muted">
                ارتفاع هر پله همان ساعت مطالعه‌ای است که از صفر تا آن سطح لازم
                داری. عددها بر پایه‌ی ساعت‌های آموزشی‌ای‌ست که{" "}
                <span className="en font-medium text-ink">Cambridge</span> برای
                هر سطح <span className="en font-medium text-ink">CEFR</span>{" "}
                اعلام کرده است.
              </p>
            </div>

            <CefrLadder />
          </div>
        </section>

        <HowItWorks />

        {/* ---------------- Guarantee ---------------- */}
        <section className="shell py-16">
          <div className="overflow-hidden rounded-slab bg-brand-500 px-8 py-12 text-white md:px-14">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  تضمین بازگشت وجه
                </p>
                <h2 className="mt-5 text-3xl font-bold leading-relaxed sm:text-4xl">
                  اگر راضی نبودی، کل مبلغ برمی‌گردد
                </h2>
                <p className="mt-4 text-lg leading-loose text-white/85">
                  بدون توضیح خواستن، بدون کسر کردن. ریسک شروع کردن با ماست، نه با تو.
                </p>
              </div>
              <Link
                href="/level-test"
                className="shrink-0 rounded-full bg-white px-8 py-4 text-lg font-medium text-brand-600 transition-transform duration-300 hover:-translate-y-0.5"
              >
                شروع کن
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------- Class gallery ---------------- */}
        <section className="shell py-20 md:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">کلاس‌های برگزارشده</h2>
              <p className="mt-3 leading-loose text-ink-muted">
                عکس‌ها و ویدیوهای جلسه‌ها به‌زودی اینجا اضافه می‌شوند.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, i) => (
              <figure
                key={item.label}
                className={`group relative flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-brand-200 bg-brand-50/50 p-6 text-center ${
                  i === 0 || i === 3 ? "sm:row-span-1 aspect-[4/3]" : "aspect-[4/3]"
                }`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-400">
                  {item.kind === "ویدیو" ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="3" />
                      <circle cx="9" cy="10" r="1.6" />
                      <path d="M21 16l-5-5-6 6" />
                    </svg>
                  )}
                </span>
                <figcaption>
                  <span className="block font-medium text-ink">{item.label}</span>
                  <span className="mt-1 block text-sm text-ink-faint">
                    {item.kind} • به‌زودی
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ---------------- Trust ---------------- */}
        <section className="bg-brand-50/60 py-20 md:py-24">
          <div className="shell">
            <h2 className="max-w-2xl text-3xl font-bold leading-relaxed sm:text-4xl">
              چرا می‌توانی به این مسیر تکیه کنی
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {trust.map((t) => (
                <article key={t.label} className="rounded-card bg-white p-8">
                  <p className="text-3xl font-bold text-brand-500">{t.stat}</p>
                  <h3 className="mt-2 font-semibold">{t.label}</h3>
                  <p className="mt-3 leading-loose text-ink-muted">{t.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Final CTA ---------------- */}
        <section className="shell pb-8 pt-12 text-center">
          <h2 className="text-3xl font-bold leading-relaxed sm:text-4xl">
            پنج دقیقه وقت بگذار، مسیر چند سالت مشخص شود
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-loose text-ink-muted">
            نتیجه را همان لحظه می‌بینی و بعد با هم درباره‌ی برنامه‌ات حرف می‌زنیم.
          </p>
          <Link
            href="/level-test"
            className="mt-9 inline-block rounded-full bg-brand-500 px-9 py-4 text-lg font-medium text-white shadow-[0_20px_45px_-20px_var(--color-brand-500)] transition-colors hover:bg-brand-600"
          >
            تعیین سطح رایگان
          </Link>
          <p className="mt-5 text-sm text-ink-faint">
            یا مستقیم تماس بگیر: <a href={site.phoneHref} className="text-ink">{site.phone}</a>
          </p>
        </section>

        <SampleReport />

        <Testimonials />
      </main>

      <SiteFooter />
    </>
  );
}
