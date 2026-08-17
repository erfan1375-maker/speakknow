import { NextResponse } from "next/server";
import { getOrCreateChatSessionId } from "@/lib/chat/cookie";
import { listMessagesForSession } from "@/lib/chat/messages";

export async function GET() {
  const sessionId = await getOrCreateChatSessionId();
  const messages = listMessagesForSession(sessionId);
  return NextResponse.json({ messages });
}
