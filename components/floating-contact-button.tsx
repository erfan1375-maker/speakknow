"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { ChatBubbleIcon, CloseIcon } from "@/components/icons";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.12-2.9-6.99A9.82 9.82 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.11.11-1.79-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.74-4.12-4.88-4.31-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.89 1.05.93 1.93 1.22 2.21 1.36.28.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M21.05 3.16 2.63 10.4c-1.24.5-1.23 1.19-.22 1.5l4.72 1.47 1.82 5.6c.22.6.38.85.78.85.32 0 .47-.15.65-.33l1.86-1.8 4.86 3.59c.65.42 1.13.2 1.3-.47l3.53-16.62c.24-.98-.36-1.42-1.68-.83z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 7.4 5.6a1 1 0 0 0 1.2 0L20 7" />
    </svg>
  );
}

function BaleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </svg>
  );
}

const CHANNELS = [
  {
    key: "whatsapp",
    label: "واتساپ",
    href: site.whatsapp,
    external: true,
    bg: "bg-[#25D366]",
    Icon: WhatsAppIcon,
  },
  {
    key: "telegram",
    label: "تلگرام",
    href: site.telegram,
    external: true,
    bg: "bg-[#229ED9]",
    Icon: TelegramIcon,
  },
  {
    key: "bale",
    label: "بله",
    href: site.bale,
    external: true,
    bg: "bg-[#00B2A5]",
    Icon: BaleIcon,
  },
  {
    key: "email",
    label: "ایمیل",
    href: `mailto:${site.email}`,
    external: false,
    bg: "bg-brand-500",
    Icon: EmailIcon,
  },
] as const;

export function FloatingContactButton() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
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

  return (
    <div
      ref={rootRef}
      className="fixed z-40 flex flex-col-reverse items-end gap-3"
      style={{ left: "1.25rem", bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "بستن راه‌های ارتباطی" : "راه‌های ارتباطی با ما"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_14px_32px_-12px_var(--color-brand-500)] transition-transform duration-300 hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
      >
        <ChatBubbleIcon className={`h-6 w-6 transition-all duration-200 ${open ? "hidden" : "block"}`} />
        <CloseIcon className={`h-6 w-6 transition-all duration-200 ${open ? "block" : "hidden"}`} />
      </button>

      {CHANNELS.map(({ key, label, href, external, bg, Icon }, i) => (
        <a
          key={key}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          onClick={() => setOpen(false)}
          aria-label={label}
          tabIndex={open ? 0 : -1}
          className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_10px_24px_-10px_rgba(13,13,13,0.5)] transition-all duration-300 ease-out sm:h-12 sm:w-12 ${bg} ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
