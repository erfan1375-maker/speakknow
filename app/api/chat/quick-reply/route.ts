import { NextRequest, NextResponse } from "next/server";
import { getOrCreateChatSessionId } from "@/lib/chat/cookie";
import { insertChatMessage, listMessagesForSession } from "@/lib/chat/messages";
import { notifyAdminOfChatMessage } from "@/lib/chat/notify";
import { getQuickReply } from "@/lib/chat/quick-replies";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const key = typeof body?.key === "string" ? body.key : "";

  // The answer text always comes from the server-side whitelist, never from the
  // client — otherwise a visitor could get arbitrary text stored as an "admin" message.
  const quickReply = getQuickReply(key);
  if (!quickReply) {
    return NextResponse.json({ error: "گزینه نامعتبره" }, { status: 400 });
  }

  const sessionId = await getOrCreateChatSessionId();
  insertChatMessage(sessionId, "user", quickReply.label);
  insertChatMessage(sessionId, "admin", quickReply.answer);

  notifyAdminOfChatMessage(sessionId, null, quickReply.label).catch((err) =>
    console.error("notifyAdminOfChatMessage failed:", err),
  );

  const messages = listMessagesForSession(sessionId);
  return NextResponse.json({ ok: true, messages });
}
