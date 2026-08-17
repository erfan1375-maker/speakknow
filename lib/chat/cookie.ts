import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";

export const CHAT_SESSION_COOKIE = "chat_session";
// Long-lived — a returning visitor should still see their full conversation history.
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export async function getOrCreateChatSessionId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(CHAT_SESSION_COOKIE)?.value;
  if (existing) return existing;

  const id = randomUUID();
  store.set(CHAT_SESSION_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  return id;
}
