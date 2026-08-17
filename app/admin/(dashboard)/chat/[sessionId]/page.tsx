import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listMessagesForSession, markUserMessagesRead } from "@/lib/chat/messages";
import { parseSqliteDatetime } from "@/lib/exam/otp";
import { AdminChatReplyForm } from "@/components/admin/chat-reply-form";
import { LinkifiedText } from "@/components/chat-message-text";

export const metadata: Metadata = {
  title: "مکالمه چت",
  robots: { index: false, follow: false },
};

function formatTime(sqlDate: string) {
  return new Intl.DateTimeFormat("fa-IR", { timeStyle: "short" }).format(parseSqliteDatetime(sqlDate));
}

export default async function AdminChatDetailPage(props: PageProps<"/admin/chat/[sessionId]">) {
  const { sessionId } = await props.params;
  const messages = listMessagesForSession(sessionId);
  if (messages.length === 0) notFound();

  markUserMessagesRead(sessionId);

  const userName = [...messages].reverse().find((m) => m.userName)?.userName ?? null;

  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      <Link href="/admin/chat" className="text-sm text-ink-muted hover:text-brand-600">
        ← بازگشت به لیست
      </Link>

      <div className="mt-4 flex flex-col overflow-hidden rounded-card border border-hairline bg-white">
        <div className="border-b border-hairline px-5 py-4">
          <h1 className="font-bold text-ink">{userName || "بازدیدکننده ناشناس"}</h1>
        </div>

        <div className="flex max-h-[55vh] min-h-[20rem] flex-col gap-3 overflow-y-auto px-5 py-6">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "admin" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.sender === "admin"
                    ? "rounded-bl-sm bg-brand-50 text-ink"
                    : "rounded-br-sm bg-brand-500 text-white"
                }`}
              >
                <LinkifiedText text={m.message} />
                <p className={`en mt-1 text-[0.7rem] ${m.sender === "admin" ? "text-ink-faint" : "text-white/70"}`}>
                  {formatTime(m.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <AdminChatReplyForm sessionId={sessionId} />
      </div>
    </div>
  );
}
