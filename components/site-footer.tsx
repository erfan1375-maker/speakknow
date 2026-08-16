import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { nav, site } from "@/lib/site";

const channels = [
  { label: "اینستاگرام", href: site.instagram, handle: "@speakknow" },
  { label: "تلگرام", href: site.telegram, handle: "@speakknow" },
  { label: "واتس‌اپ", href: site.whatsapp, handle: site.phone },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hairline bg-brand-50">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-10 w-10 rounded-xl" />
            <span className="en text-2xl font-semibold tracking-tight">
              <span className="text-ink">speak</span>
              <span className="text-brand-500">Know</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-[0.95rem] leading-loose text-ink-muted">
            تعیین سطح بر اساس استاندارد CEFR و طراحی مسیر یادگیری اختصاصی، با
            {" "}۷ سال سابقه تدریس زبان انگلیسی.
          </p>
          <Link
            href="/level-test"
            className="mt-6 inline-block rounded-full bg-brand-500 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-600"
          >
            شروع تعیین سطح رایگان
          </Link>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">صفحه‌ها</h2>
          <ul className="mt-4 space-y-3 text-[0.95rem] text-ink-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-brand-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">راه‌های ارتباطی</h2>
          <ul className="mt-4 space-y-3 text-[0.95rem] text-ink-muted">
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-brand-600">
                تلفن: <span className="font-medium text-ink">{site.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand-600">
                ایمیل: <span className="en font-medium text-ink">{site.email}</span>
              </a>
            </li>
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-600"
                >
                  {c.label}: <span className="en font-medium text-ink">{c.handle}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-loose text-ink-faint">
            پاسخگویی هر روز هفته، شامل تعطیلات.
          </p>
        </div>
      </div>

      <div className="border-t border-brand-100">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().toLocaleDateString("fa-IR", { year: "numeric" })} speakKnow — همه حقوق محفوظ است.</p>
          <p>ساخته‌شده برای زبان‌آموزهایی که می‌خواهند مسیرشان را بدانند.</p>
        </div>
      </div>
    </footer>
  );
}
