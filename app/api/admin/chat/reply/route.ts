import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { insertChatMessage, listMessagesForSession } from "@/lib/chat/messages";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const sessionId = typeof body?.sessionId === "string" ? body.sessionId.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!sessionId || !message) {
    return NextResponse.json({ error: "اطلاعات ناقصه" }, { status: 400 });
  }

  insertChatMessage(sessionId, "admin", message);
  const messages = listMessagesForSession(sessionId);
  return NextResponse.json({ ok: true, messages });
}
