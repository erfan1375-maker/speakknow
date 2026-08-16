import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";

export type Category = "vocabulary" | "grammar" | "reading" | "listening";
export type Difficulty = "easy" | "medium" | "hard";

export interface QuestionPublic {
  id: number;
  index: number; // 1-based position among the session's 30 questions
  category: Category;
  difficulty: Difficulty;
  text: string;
  options: { a: string; b: string; c: string; d: string };
  passage?: { title: string; body: string };
  audio?: { url: string };
}

export interface SessionState {
  sessionId: string;
  status: string;
  currentIndex: number;
  questions: QuestionPublic[];
  answers: Record<number, "a" | "b" | "c" | "d">;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  otpExpiresAt: string | null;
}

interface QuestionRow {
  id: number;
  category: Category;
  difficulty: Difficulty;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  passage_id: number | null;
  audio_id: number | null;
}

function pickIds(category: Category, difficulty: Difficulty, count: number): number[] {
  const rows = db
    .prepare(
      "SELECT id FROM questions WHERE category = ? AND difficulty = ? ORDER BY RANDOM() LIMIT ?",
    )
    .all(category, difficulty, count) as { id: number }[];
  return rows.map((r) => r.id);
}

/** Builds a fresh 30-question order: 10 vocab + 10 grammar (each 4 easy/4 medium/2 hard,
 * ordered easy→hard), one random reading passage's 5 questions, one listening clip's 5 questions. */
function buildQuestionOrder(): number[] {
  const vocab = [
    ...pickIds("vocabulary", "easy", 4),
    ...pickIds("vocabulary", "medium", 4),
    ...pickIds("vocabulary", "hard", 2),
  ];
  const grammar = [
    ...pickIds("grammar", "easy", 4),
    ...pickIds("grammar", "medium", 4),
    ...pickIds("grammar", "hard", 2),
  ];

  const passageRow = db
    .prepare("SELECT id FROM reading_passages ORDER BY RANDOM() LIMIT 1")
    .get() as { id: number } | undefined;
  const readingIds = passageRow
    ? (
        db
          .prepare("SELECT id FROM questions WHERE passage_id = ? ORDER BY id")
          .all(passageRow.id) as { id: number }[]
      ).map((r) => r.id)
    : [];

  const clipRow = db
    .prepare("SELECT id FROM listening_clips ORDER BY RANDOM() LIMIT 1")
    .get() as { id: number } | undefined;
  const listeningIds = clipRow
    ? (
        db
          .prepare("SELECT id FROM questions WHERE audio_id = ? ORDER BY id")
          .all(clipRow.id) as { id: number }[]
      ).map((r) => r.id)
    : [];

  return [...vocab, ...grammar, ...readingIds, ...listeningIds];
}

function toPublicQuestions(ids: number[]): QuestionPublic[] {
  const passageCache = new Map<number, { title: string; body: string }>();
  const clipCache = new Map<number, { url: string }>();

  return ids.map((id, i) => {
    const row = db
      .prepare(
        "SELECT id, category, difficulty, question_text, option_a, option_b, option_c, option_d, passage_id, audio_id FROM questions WHERE id = ?",
      )
      .get(id) as unknown as QuestionRow;

    const q: QuestionPublic = {
      id: row.id,
      index: i + 1,
      category: row.category,
      difficulty: row.difficulty,
      text: row.question_text,
      options: { a: row.option_a, b: row.option_b, c: row.option_c, d: row.option_d },
    };

    if (row.passage_id != null) {
      if (!passageCache.has(row.passage_id)) {
        const p = db
          .prepare("SELECT title, body FROM reading_passages WHERE id = ?")
          .get(row.passage_id) as { title: string; body: string };
        passageCache.set(row.passage_id, p);
      }
      q.passage = passageCache.get(row.passage_id);
    }

    if (row.audio_id != null) {
      if (!clipCache.has(row.audio_id)) {
        const c = db
          .prepare("SELECT audio_url FROM listening_clips WHERE id = ?")
          .get(row.audio_id) as { audio_url: string };
        clipCache.set(row.audio_id, { url: c.audio_url });
      }
      q.audio = clipCache.get(row.audio_id);
    }

    return q;
  });
}

export function createSession(): SessionState {
  const sessionId = randomUUID();
  const order = buildQuestionOrder();

  db.prepare(
    "INSERT INTO exam_sessions (id, status, question_order, current_index) VALUES (?, 'in_progress', ?, 0)",
  ).run(sessionId, JSON.stringify(order));

  return {
    sessionId,
    status: "in_progress",
    currentIndex: 0,
    questions: toPublicQuestions(order),
    answers: {},
    fullName: null,
    email: null,
    phone: null,
    otpExpiresAt: null,
  };
}

export function getSession(sessionId: string): SessionState | null {
  const row = db
    .prepare(
      "SELECT id, status, question_order, current_index, full_name, email, phone FROM exam_sessions WHERE id = ?",
    )
    .get(sessionId) as
    | {
        id: string;
        status: string;
        question_order: string;
        current_index: number;
        full_name: string | null;
        email: string | null;
        phone: string | null;
      }
    | undefined;
  if (!row) return null;

  const order: number[] = JSON.parse(row.question_order);
  const answerRows = db
    .prepare("SELECT question_id, selected_option FROM exam_answers WHERE session_id = ?")
    .all(sessionId) as { question_id: number; selected_option: "a" | "b" | "c" | "d" }[];

  const answers: Record<number, "a" | "b" | "c" | "d"> = {};
  for (const a of answerRows) answers[a.question_id] = a.selected_option;

  let otpExpiresAt: string | null = null;
  if (row.status === "awaiting_otp") {
    const otpRow = db
      .prepare(
        "SELECT expires_at FROM otp_codes WHERE session_id = ? ORDER BY created_at DESC, id DESC LIMIT 1",
      )
      .get(sessionId) as { expires_at: string } | undefined;
    otpExpiresAt = otpRow?.expires_at ?? null;
  }

  return {
    sessionId: row.id,
    status: row.status,
    currentIndex: row.current_index,
    questions: toPublicQuestions(order),
    answers,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    otpExpiresAt,
  };
}

/** True if this phone already completed an exam within the anti-abuse window. */
export function wasPhoneRecentlyCompleted(phone: string, windowMs: number): boolean {
  const row = db
    .prepare(
      `SELECT 1 FROM exam_sessions
       WHERE phone = ? AND status = 'completed' AND updated_at > datetime('now', ?)
       LIMIT 1`,
    )
    .get(phone, `-${Math.floor(windowMs / 1000)} seconds`);
  return Boolean(row);
}

export function setContactInfo(
  sessionId: string,
  fullName: string,
  email: string,
  phone: string,
) {
  db.prepare(
    `UPDATE exam_sessions
     SET full_name = ?, email = ?, phone = ?, status = 'awaiting_otp', updated_at = datetime('now')
     WHERE id = ?`,
  ).run(fullName, email, phone, sessionId);
}

export function markSessionCompleted(sessionId: string) {
  db.prepare(
    "UPDATE exam_sessions SET status = 'completed', updated_at = datetime('now') WHERE id = ?",
  ).run(sessionId);
}

export interface ScoredQuestionRow {
  id: number;
  category: Category;
  difficulty: Difficulty;
  correctOption: "a" | "b" | "c" | "d";
}

/**
 * Server-only: the session's questions WITH their correct answers, for scoring.
 * Never route this straight into an API response — pass it through computeReport()
 * (or similar) so only the aggregate result reaches the client.
 */
export function getScoredQuestions(sessionId: string): ScoredQuestionRow[] {
  const row = db
    .prepare("SELECT question_order FROM exam_sessions WHERE id = ?")
    .get(sessionId) as { question_order: string } | undefined;
  if (!row) return [];

  const order: number[] = JSON.parse(row.question_order);
  const placeholders = order.map(() => "?").join(",");
  const rows = db
    .prepare(
      `SELECT id, category, difficulty, correct_option FROM questions WHERE id IN (${placeholders})`,
    )
    .all(...order) as { id: number; category: Category; difficulty: Difficulty; correct_option: "a" | "b" | "c" | "d" }[];

  const byId = new Map(rows.map((r) => [r.id, r]));
  return order.map((id) => {
    const r = byId.get(id)!;
    return { id: r.id, category: r.category, difficulty: r.difficulty, correctOption: r.correct_option };
  });
}

export function saveAnswer(
  sessionId: string,
  questionId: number,
  selectedOption: "a" | "b" | "c" | "d",
  currentIndex: number,
) {
  db.prepare(
    `INSERT INTO exam_answers (session_id, question_id, selected_option)
     VALUES (?, ?, ?)
     ON CONFLICT (session_id, question_id) DO UPDATE SET selected_option = excluded.selected_option, answered_at = datetime('now')`,
  ).run(sessionId, questionId, selectedOption);

  db.prepare(
    "UPDATE exam_sessions SET current_index = ?, updated_at = datetime('now') WHERE id = ?",
  ).run(currentIndex, sessionId);
}
