import type { Metadata } from "next";
import Link from "next/link";
import { listChatConversations } from "@/lib/chat/messages";
import { parseSqliteDatetime } from "@/lib/exam/otp";

export const metadata: Metadata = {
  title: "پیام‌های چت",
  robots: { index: false, follow: false },
};

function formatDate(sqlDate: string) {
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(
    parseSqliteDatetime(sqlDate),
  );
}

export default function AdminChatListPage() {
  const conversations = listChatConversations();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">پیام‌های چت</h1>
      <p className="mt-1 text-sm text-ink-muted">{conversations.length} مکالمه</p>

      <div className="mt-6 divide-y divide-hairline overflow-hidden rounded-card border border-hairline bg-white">
        {conversations.map((c) => (
          <Link
            key={c.sessionId}
            href={`/admin/chat/${c.sessionId}`}
            className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-brand-50/40"
          >
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${c.unreadCount > 0 ? "bg-brand-500" : "bg-transparent"}`}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={`truncate ${c.unreadCount > 0 ? "font-bold text-ink" : "font-medium text-ink"}`}>
                  {c.userName || "بازدیدکننده ناشناس"}
                </span>
                {c.unreadCount > 0 && (
                  <span className="en shrink-0 rounded-full bg-brand-500 px-2 py-0.5 text-xs font-semibold text-white">
                    {c.unreadCount}
                  </span>
                )}
              </div>
              <p className={`mt-0.5 truncate text-sm ${c.unreadCount > 0 ? "text-ink" : "text-ink-muted"}`}>
                {c.lastMessage}
              </p>
            </div>
            <span className="en shrink-0 text-xs text-ink-faint">{formatDate(c.lastMessageAt)}</span>
          </Link>
        ))}
        {conversations.length === 0 && (
          <p className="px-5 py-10 text-center text-ink-faint">هنوز پیامی دریافت نشده</p>
        )}
      </div>
    </div>
  );
}
