import type { Metadata } from "next";
import Link from "next/link";
import { CourseExplorer } from "@/components/courses/course-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "دوره‌ها",
  description: "مسیر یادگیری مناسب خودت رو پیدا کن — آمادگی IELTS، انگلیسی عمومی یا مکالمه.",
};

export default function CoursesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-brand-50 to-white py-14 md:py-20">
          <div className="shell text-center">
            <p className="text-sm font-medium text-brand-600">دوره‌های اسپیک‌نو</p>
            <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-bold leading-relaxed sm:text-4xl">
              مسیر مناسب تو
            </h1>
            <p className="mx-auto mt-4 max-w-xl leading-loose text-ink-muted">
              هر زبان‌آموز، مسیر منحصربه‌فرد خودش رو داره — هدف، سطح فعلی و زمانی که در
              اختیار داره با هم فرق می‌کنه. کمک می‌کنیم دقیقاً همون مسیری رو پیدا کنی
              که به‌جای تو ساخته شده.
            </p>
          </div>
        </section>

        <section className="shell pb-20 md:pb-28">
          <CourseExplorer />
        </section>

        <section className="shell pb-20">
          <div className="overflow-hidden rounded-slab bg-brand-500 px-8 py-12 text-white md:px-14">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold leading-relaxed sm:text-4xl">
                  هنوز مطمئن نیستی؟
                </h2>
                <p className="mt-4 text-lg leading-loose text-white/85">
                  می‌تونی اول باهامون صحبت کنی یا با یه آزمون کوتاه رایگان، سطح واقعی‌ات
                  رو ببینی — هر کدوم راحت‌تری.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-full border border-white/40 px-7 py-4 text-lg font-medium text-white transition-colors hover:bg-white/10"
                >
                  تماس با ما
                </Link>
                <Link
                  href="/level-test"
                  className="rounded-full bg-white px-7 py-4 text-lg font-medium text-brand-600 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  تعیین سطح رایگان
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
