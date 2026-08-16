import { cookies } from "next/headers";

export const SESSION_COOKIE = "exam_session";
const MAX_AGE_SECONDS = 60 * 60 * 6; // 6 hours — long enough to finish the test in one sitting, even with breaks

export async function readSessionId(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

export async function writeSessionCookie(sessionId: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}
