"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminChatReplyForm({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitReply() {
    const trimmed = message.trim();
    if (!trimmed) return;

    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/admin/chat/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "ارسال جواب ناموفق بود");
        return;
      }
      setMessage("");
      router.refresh();
    } catch {
      setError("مشکلی در ارتباط با سرور پیش اومد.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitReply();
      }}
      className="border-t border-hairline p-4"
    >
      {error && <p className="mb-2 rounded-xl bg-red-50 p-2 text-sm text-red-600">{error}</p>}
      <div className="flex items-end gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitReply();
            }
          }}
          rows={2}
          placeholder="پاسخت رو بنویس…"
          className="flex-1 resize-none rounded-2xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-brand-400"
        />
        <button
          type="submit"
          disabled={sending || !message.trim()}
          className="shrink-0 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "…" : "ارسال"}
        </button>
      </div>
    </form>
  );
}
