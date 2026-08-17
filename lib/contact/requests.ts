import { db } from "@/lib/db";

export interface ContactRequest {
  id: number;
  fullName: string;
  phone: string;
  email: string | null;
  goal: string;
  createdAt: string;
}

interface ContactRequestRow {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  goal: string;
  created_at: string;
}

function toContactRequest(row: ContactRequestRow): ContactRequest {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    goal: row.goal,
    createdAt: row.created_at,
  };
}

export function insertContactRequest(
  fullName: string,
  phone: string,
  email: string | null,
  goal: string,
): ContactRequest {
  const result = db
    .prepare(
      `INSERT INTO contact_requests (full_name, phone, email, goal) VALUES (?, ?, ?, ?)`,
    )
    .run(fullName, phone, email, goal);

  const row = db
    .prepare("SELECT * FROM contact_requests WHERE id = ?")
    .get(result.lastInsertRowid) as unknown as ContactRequestRow;
  return toContactRequest(row);
}

export function listContactRequests(): ContactRequest[] {
  const rows = db
    .prepare("SELECT * FROM contact_requests ORDER BY created_at DESC, id DESC")
    .all() as unknown as ContactRequestRow[];
  return rows.map(toContactRequest);
}
