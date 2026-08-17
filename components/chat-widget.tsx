"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, SendIcon } from "@/components/icons";
import { LinkifiedText } from "@/components/chat-message-text";
import { QUICK_REPLIES } from "@/lib/chat/quick-replies";

interface ChatMessage {
  id: number;
  userName: string | null;
  message: string;
  sender: "user" | "admin";
  createdAt: string;
}

/** Flat-style avatar face, used as a fallback if the real photo fails to load. */
function PersonAvatar({
  variant,
  bg,
  hair,
  skin,
}: {
  variant: "girl" | "boy";
  bg: string;
  hair: string;
  skin: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <circle cx="32" cy="32" r="32" fill={bg} />
      {variant === "girl" ? (
        <>
          <ellipse cx="32" cy="26" rx="18" ry="16" fill={hair} />
          <rect x="13" y="26" width="9" height="24" rx="4.5" fill={hair} />
          <rect x="42" y="26" width="9" height="24" rx="4.5" fill={hair} />
        </>
      ) : (
        <path d="M14 28c0-11 8-19 18-19s18 8 18 19v-4c0-8-8-13-18-13s-18 5-18 13z" fill={hair} />
      )}
      <circle cx="32" cy="35" r="13" fill={skin} />
      <circle cx="27" cy="34" r="1.6" fill="#0D0D0D" />
      <circle cx="37" cy="34" r="1.6" fill="#0D0D0D" />
      <path d="M26 40c2 2.5 10 2.5 12 0" stroke="#0D0D0D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Real photo when it loads; falls back to the drawn avatar if the image host is unreachable. */
function AvatarThumb({ avatar }: { avatar: (typeof AVATARS)[number] }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <PersonAvatar variant={avatar.variant} bg={avatar.bg} hair={avatar.hair} skin={avatar.skin} />
  ) : (
    <img
      src={avatar.photo}
      alt=""
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

// A mix of real girl/boy portrait photos, per the design brief.
const AVATARS = [
  {
    key: "sara",
    variant: "girl",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    bg: "#FFE4EE",
    hair: "#8A5A2B",
    skin: "#F6C9A0",
  },
  {
    key: "ali",
    variant: "boy",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    bg: "#DCEFFA",
    hair: "#2B2118",
    skin: "#EBB68A",
  },
  {
    key: "niki",
    variant: "girl",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    bg: "#FFF3D6",
    hair: "#3A2A1E",
    skin: "#F9D8B4",
  },
  {
    key: "reza",
    variant: "boy",
    photo: "https://randomuser.me/api/portraits/men/78.jpg",
    bg: "#E3F7EA",
    hair: "#54331F",
    skin: "#E7B48C",
  },
] as const;

const NAME_STORAGE_KEY = "speakknow_chat_name";
const POLL_INTERVAL_MS = 4000;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [quickReplyKeyPending, setQuickReplyKeyPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const confirmationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(NAME_STORAGE_KEY);
    if (saved) setName(saved);
  }, []);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    async function fetchMessages() {
      try {
        const res = await fetch("/api/chat/messages");
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (!cancelled) setMessages(data.messages ?? []);
      } catch {
        // silent — this is a background poll, transient network errors aren't worth surfacing
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }

    fetchMessages();
    const interval = setInterval(fetchMessages, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  async function submitMessage() {
    const trimmed = text.trim();
    if (!trimmed) return;

    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "ارسال پیام ناموفق بود");
        return;
      }
      setMessages(data.messages ?? []);
      setText("");
      if (name.trim()) window.localStorage.setItem(NAME_STORAGE_KEY, name.trim());

      setConfirmation(true);
      if (confirmationTimer.current) clearTimeout(confirmationTimer.current);
      confirmationTimer.current = setTimeout(() => setConfirmation(false), 4000);
    } catch {
      setError("مشکلی در ارتباط با سرور پیش اومد.");
    } finally {
      setSending(false);
    }
  }

  async function handleQuickReply(key: string) {
    setError(null);
    setQuickReplyKeyPending(key);
    try {
      const res = await fetch("/api/chat/quick-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "مشکلی پیش اومد");
        return;
      }
      setMessages(data.messages ?? []);
      if (key === "support") textareaRef.current?.focus();
    } catch {
      setError("مشکلی در ارتباط با سرور پیش اومد.");
    } finally {
      setQuickReplyKeyPending(null);
    }
  }

  return (
    <div
      ref={rootRef}
      className="fixed z-40 flex flex-col items-end gap-3"
      style={{ right: "1.25rem", bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
    >
      {open && (
        <div className="animate-fade-up flex h-[31rem] w-[23rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-card border border-hairline bg-white shadow-[0_24px_60px_-20px_rgba(13,13,13,0.35)]">
          <div className="shrink-0 bg-gradient-to-br from-brand-500 to-brand-600 px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">چت با ما</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="بستن چت"
                className="text-white/80 transition-colors hover:text-white"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="flex -space-x-2.5 space-x-reverse">
                {AVATARS.map((a) => (
                  <span key={a.key} className="relative block h-8 w-8 overflow-hidden rounded-full border-2 border-white">
                    <AvatarThumb avatar={a} />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
                  </span>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-white/90">
                کارشناسان ما آماده پاسخگویی هستند
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            {loaded && messages.length === 0 && (
              <p className="mt-4 text-center text-sm leading-loose text-ink-faint">
                سلام! یکی از سؤال‌های پرتکرار رو انتخاب کنید یا سؤال خودتون رو بنویسید.
              </p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "admin" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.sender === "admin"
                      ? "rounded-bl-sm bg-brand-50 text-ink"
                      : "rounded-br-sm bg-brand-500 text-white"
                  }`}
                >
                  <LinkifiedText text={m.message} />
                </div>
              </div>
            ))}
          </div>

          <div className="shrink-0 overflow-x-auto border-t border-hairline px-3 py-2.5">
            <div className="flex w-max gap-2">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q.key}
                  type="button"
                  onClick={() => handleQuickReply(q.key)}
                  disabled={quickReplyKeyPending !== null}
                  className="shrink-0 whitespace-nowrap rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {quickReplyKeyPending === q.key ? "…" : q.label}
                </button>
              ))}
            </div>
          </div>

          {confirmation && (
            <p className="mx-4 mb-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
              پیامتون دریافت شد، به‌زودی پاسخ می‌دیم.
            </p>
          )}
          {error && <p className="mx-4 mb-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitMessage();
            }}
            className="shrink-0 border-t border-hairline p-3"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسمت (اختیاری)"
              className="mb-2 w-full rounded-xl border border-hairline px-3 py-2 text-xs outline-none focus:border-brand-400"
            />
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitMessage();
                  }
                }}
                rows={1}
                placeholder="پیامت رو بنویس…"
                className="flex-1 resize-none rounded-xl border border-hairline px-3 py-2 text-sm outline-none focus:border-brand-400"
              />
              <button
                type="submit"
                disabled={sending || !text.trim()}
                aria-label="ارسال پیام"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <SendIcon className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "بستن چت" : "چت با ما"}
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-100 bg-white text-brand-500 shadow-[0_14px_32px_-12px_rgba(236,72,153,0.55)] transition-transform duration-300 hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
      >
        {open ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <span className="en text-2xl font-extrabold">S</span>
        )}
      </button>
    </div>
  );
}
