import { NextRequest, NextResponse } from "next/server";
import { getOrCreateChatSessionId } from "@/lib/chat/cookie";
import { insertChatMessage, listMessagesForSession } from "@/lib/chat/messages";
import { notifyAdminOfChatMessage } from "@/lib/chat/notify";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "متن پیام خالیه" }, { status: 400 });
  }
  if (message.length > 2000) {
    return NextResponse.json({ error: "پیام خیلی طولانیه" }, { status: 400 });
  }

  const sessionId = await getOrCreateChatSessionId();
  insertChatMessage(sessionId, "user", message, name || null);

  notifyAdminOfChatMessage(sessionId, name || null, message).catch((err) =>
    console.error("notifyAdminOfChatMessage failed:", err),
  );

  const messages = listMessagesForSession(sessionId);
  return NextResponse.json({ ok: true, messages });
}
