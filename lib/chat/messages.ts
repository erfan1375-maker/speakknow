import { db } from "@/lib/db";

export type ChatSender = "user" | "admin";

export interface ChatMessage {
  id: number;
  sessionId: string;
  userName: string | null;
  message: string;
  sender: ChatSender;
  isRead: boolean;
  createdAt: string;
}

interface ChatMessageRow {
  id: number;
  session_id: string;
  user_name: string | null;
  message: string;
  sender: ChatSender;
  is_read: number;
  created_at: string;
}

function toChatMessage(row: ChatMessageRow): ChatMessage {
  return {
    id: row.id,
    sessionId: row.session_id,
    userName: row.user_name,
    message: row.message,
    sender: row.sender,
    isRead: row.is_read === 1,
    createdAt: row.created_at,
  };
}

export function insertChatMessage(
  sessionId: string,
  sender: ChatSender,
  message: string,
  userName?: string | null,
): ChatMessage {
  // Admin replies are authored by the reader, so they're never "unread" from the admin's own perspective.
  const result = db
    .prepare(
      `INSERT INTO chat_messages (session_id, user_name, message, sender, is_read)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(sessionId, userName || null, message, sender, sender === "admin" ? 1 : 0);

  const row = db
    .prepare("SELECT * FROM chat_messages WHERE id = ?")
    .get(result.lastInsertRowid) as unknown as ChatMessageRow;
  return toChatMessage(row);
}

export function listMessagesForSession(sessionId: string): ChatMessage[] {
  const rows = db
    .prepare("SELECT * FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC, id ASC")
    .all(sessionId) as unknown as ChatMessageRow[];
  return rows.map(toChatMessage);
}

export function markUserMessagesRead(sessionId: string) {
  db.prepare(
    "UPDATE chat_messages SET is_read = 1 WHERE session_id = ? AND sender = 'user' AND is_read = 0",
  ).run(sessionId);
}

export interface ChatConversation {
  sessionId: string;
  userName: string | null;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messageCount: number;
}

interface ConversationRow {
  session_id: string;
  user_name: string | null;
  last_message: string;
  last_message_at: string;
  unread_count: number;
  message_count: number;
}

export function listChatConversations(): ChatConversation[] {
  const rows = db
    .prepare(
      `SELECT
         session_id,
         (SELECT user_name FROM chat_messages n
            WHERE n.session_id = m.session_id AND n.user_name IS NOT NULL
            ORDER BY n.created_at DESC, n.id DESC LIMIT 1) AS user_name,
         (SELECT message FROM chat_messages l
            WHERE l.session_id = m.session_id
            ORDER BY l.created_at DESC, l.id DESC LIMIT 1) AS last_message,
         MAX(created_at) AS last_message_at,
         SUM(CASE WHEN sender = 'user' AND is_read = 0 THEN 1 ELSE 0 END) AS unread_count,
         COUNT(*) AS message_count
       FROM chat_messages m
       GROUP BY session_id
       ORDER BY last_message_at DESC`,
    )
    .all() as unknown as ConversationRow[];

  return rows.map((r) => ({
    sessionId: r.session_id,
    userName: r.user_name,
    lastMessage: r.last_message,
    lastMessageAt: r.last_message_at,
    unreadCount: r.unread_count,
    messageCount: r.message_count,
  }));
}

export function countUnreadChatMessages(): number {
  const row = db
    .prepare("SELECT COUNT(*) AS n FROM chat_messages WHERE sender = 'user' AND is_read = 0")
    .get() as unknown as { n: number };
  return row.n;
}
