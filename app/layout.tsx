import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const enDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-en-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | تعیین سطح رایگان انگلیسی بر اساس CEFR`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "تعیین سطح انگلیسی",
    "آزمون CEFR",
    "کلاس زبان انگلیسی",
    "مسیر یادگیری زبان",
    "Business English",
  ],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: site.name,
    title: `${site.name} | تعیین سطح رایگان انگلیسی`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${enDisplay.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
