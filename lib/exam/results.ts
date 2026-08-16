import { db } from "@/lib/db";
import type { Category } from "./session";
import type { ExamReport } from "./scoring";

export interface StoredExamResult {
  fullName: string;
  email: string;
  phone: string;
  vocabularyScore: number;
  grammarScore: number;
  readingScore: number;
  listeningScore: number;
  totalPercentage: number;
  level: string;
  strengths: Category[];
  weaknesses: Category[];
  createdAt: string;
}

function percentOf(report: ExamReport, category: Category): number {
  return report.categories.find((c) => c.category === category)?.percentage ?? 0;
}

export function saveExamResult(
  sessionId: string,
  report: ExamReport,
  fullName: string,
  email: string,
  phone: string,
) {
  db.prepare(
    `INSERT INTO exam_results
       (session_id, full_name, email, phone, vocabulary_score, grammar_score, reading_score, listening_score, total_percentage, level, strengths, weaknesses)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT (session_id) DO NOTHING`,
  ).run(
    sessionId,
    fullName,
    email,
    phone,
    percentOf(report, "vocabulary"),
    percentOf(report, "grammar"),
    percentOf(report, "reading"),
    percentOf(report, "listening"),
    report.totalPercentage,
    report.level,
    JSON.stringify(report.strengths),
    JSON.stringify(report.weaknesses),
  );
}

export function getExamResult(sessionId: string): StoredExamResult | null {
  const row = db
    .prepare("SELECT * FROM exam_results WHERE session_id = ?")
    .get(sessionId) as
    | {
        full_name: string;
        email: string;
        phone: string;
        vocabulary_score: number;
        grammar_score: number;
        reading_score: number;
        listening_score: number;
        total_percentage: number;
        level: string;
        strengths: string;
        weaknesses: string;
        created_at: string;
      }
    | undefined;
  if (!row) return null;

  return {
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    vocabularyScore: row.vocabulary_score,
    grammarScore: row.grammar_score,
    readingScore: row.reading_score,
    listeningScore: row.listening_score,
    totalPercentage: row.total_percentage,
    level: row.level,
    strengths: JSON.parse(row.strengths),
    weaknesses: JSON.parse(row.weaknesses),
    createdAt: row.created_at,
  };
}
