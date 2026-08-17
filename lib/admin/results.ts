import { db } from "@/lib/db";
import type { Category } from "@/lib/exam/session";

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type Level = (typeof LEVELS)[number];

export interface ExamResultListItem {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  level: string;
  totalPercentage: number;
  createdAt: string;
}

export interface ExamResultDetail extends ExamResultListItem {
  vocabularyScore: number;
  grammarScore: number;
  readingScore: number;
  listeningScore: number;
  strengths: Category[];
  weaknesses: Category[];
}

export type SortOrder = "newest" | "oldest";

export interface ListFilters {
  search?: string;
  level?: string;
  sort?: SortOrder;
}

interface ListRow {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  level: string;
  total_percentage: number;
  created_at: string;
}

export function listExamResults(filters: ListFilters): ExamResultListItem[] {
  const clauses: string[] = [];
  const params: string[] = [];

  const search = filters.search?.trim();
  if (search) {
    clauses.push("(full_name LIKE ? OR email LIKE ? OR phone LIKE ?)");
    const like = `%${search}%`;
    params.push(like, like, like);
  }

  if (filters.level && (LEVELS as readonly string[]).includes(filters.level)) {
    clauses.push("level = ?");
    params.push(filters.level);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const order = filters.sort === "oldest" ? "ASC" : "DESC";

  const rows = db
    .prepare(
      `SELECT id, full_name, email, phone, level, total_percentage, created_at
       FROM exam_results
       ${where}
       ORDER BY created_at ${order}, id ${order}
       LIMIT 500`,
    )
    .all(...params) as unknown as ListRow[];

  return rows.map((r) => ({
    id: r.id,
    fullName: r.full_name,
    email: r.email,
    phone: r.phone,
    level: r.level,
    totalPercentage: r.total_percentage,
    createdAt: r.created_at,
  }));
}

interface DetailRow extends ListRow {
  vocabulary_score: number;
  grammar_score: number;
  reading_score: number;
  listening_score: number;
  strengths: string;
  weaknesses: string;
}

export function getExamResultById(id: number): ExamResultDetail | null {
  const row = db
    .prepare("SELECT * FROM exam_results WHERE id = ?")
    .get(id) as DetailRow | undefined;
  if (!row) return null;

  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    level: row.level,
    totalPercentage: row.total_percentage,
    createdAt: row.created_at,
    vocabularyScore: row.vocabulary_score,
    grammarScore: row.grammar_score,
    readingScore: row.reading_score,
    listeningScore: row.listening_score,
    strengths: JSON.parse(row.strengths),
    weaknesses: JSON.parse(row.weaknesses),
  };
}
