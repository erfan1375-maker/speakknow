import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ContactInfo } from "@/components/contact-info";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "سؤالت رو بپرس یا مشاوره‌ی رایگان بگیر — فرم تماس اسپیک‌نو.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-gradient-to-b from-brand-50 to-white">
        <div className="shell py-12 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand-600">تماس با ما</p>
            <h1 className="mt-3 text-3xl font-bold leading-relaxed sm:text-4xl">
              سؤالی داری؟ بگو تا کمکت کنیم
            </h1>
            <p className="mt-4 leading-loose text-ink-muted">
              فرم زیر رو پر کن یا مستقیم از راه‌های ارتباطی کنارش باهامون در تماس باش — همیشه یک نفر پاسخگوی سؤالات شماست.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
