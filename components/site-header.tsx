"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { nav } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline/70 bg-white/85 backdrop-blur-md">
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="/level-test"
            className="hidden rounded-full bg-brand-500 px-5 py-2.5 text-[0.95rem] font-medium text-white shadow-[0_8px_24px_-8px_var(--color-brand-500)] transition-colors hover:bg-brand-600 sm:inline-block"
          >
            تعیین سطح رایگان
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink lg:hidden"
          >
            <span className="sr-only">{open ? "بستن منو" : "باز کردن منو"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-[0.95rem] transition-colors ${
                  active
                    ? "text-brand-600"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <Logo />
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-hairline bg-white lg:hidden"
          aria-label="ناوبری موبایل"
        >
          <div className="shell flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-3 text-ink-muted hover:bg-brand-50 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/level-test"
              className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-center font-medium text-white"
            >
              تعیین سطح رایگان
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
