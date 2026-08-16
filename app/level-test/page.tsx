import type { Metadata } from "next";
import { Exam } from "@/components/level-test/exam";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "تعیین سطح رایگان انگلیسی",
  description: "آزمون تعیین سطح رایگان انگلیسی بر اساس استاندارد CEFR.",
  robots: { index: false, follow: false },
};

export default function LevelTestPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100vh-4.5rem)] flex-1 bg-gradient-to-b from-brand-50 to-white">
        <Exam />
      </main>
    </>
  );
}
