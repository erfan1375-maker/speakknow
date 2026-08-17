"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "نتایج آزمون" },
  { href: "/admin/chat", label: "پیام‌های چت" },
  { href: "/admin/contact", label: "درخواست‌های تماس" },
] as const;

export function AdminNav({ chatUnreadCount }: { chatUnreadCount: number }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1" aria-label="ناوبری پنل مدیریت">
      {TABS.map((tab) => {
        const active =
          tab.href === "/admin" ? pathname === "/admin" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active ? "bg-brand-500 text-white" : "text-ink-muted hover:bg-brand-50 hover:text-ink"
            }`}
          >
            {tab.label}
            {tab.href === "/admin/chat" && chatUnreadCount > 0 && (
              <span
                className={`en flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                  active ? "bg-white text-brand-600" : "bg-brand-500 text-white"
                }`}
              >
                {chatUnreadCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
