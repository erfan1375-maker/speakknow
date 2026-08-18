"use client";

import { usePathname } from "next/navigation";
import { ChatWidget } from "@/components/chat-widget";
import { FloatingContactButton } from "@/components/floating-contact-button";

export function GlobalWidgets() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <FloatingContactButton />
      <ChatWidget />
    </>
  );
}
