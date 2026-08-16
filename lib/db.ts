import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { seedIfEmpty } from "./exam/seed";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, "app.db");

// Cached on globalThis so Next's dev-mode module reloads don't reopen the file repeatedly.
const globalForDb = globalThis as unknown as { __examDb?: DatabaseSync };

export const db = globalForDb.__examDb ?? new DatabaseSync(dbPath);
if (process.env.NODE_ENV !== "production") globalForDb.__examDb = db;

db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA foreign_keys = ON;");

db.exec(`
  CREATE TABLE IF NOT EXISTS reading_passages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS listening_clips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    transcript TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL CHECK (category IN ('vocabulary','grammar','reading','listening')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy','medium','hard')),
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option TEXT NOT NULL CHECK (correct_option IN ('a','b','c','d')),
    passage_id INTEGER REFERENCES reading_passages(id),
    audio_id INTEGER REFERENCES listening_clips(id),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS exam_sessions (
    id TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','awaiting_otp','completed','expired')),
    question_order TEXT NOT NULL,
    current_index INTEGER NOT NULL DEFAULT 0,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    vocabulary_score REAL,
    grammar_score REAL,
    reading_score REAL,
    listening_score REAL,
    total_percentage REAL,
    level TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS exam_answers (
    session_id TEXT NOT NULL REFERENCES exam_sessions(id),
    question_id INTEGER NOT NULL REFERENCES questions(id),
    selected_option TEXT NOT NULL CHECK (selected_option IN ('a','b','c','d')),
    answered_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (session_id, question_id)
  );

  CREATE TABLE IF NOT EXISTS otp_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL REFERENCES exam_sessions(id),
    phone TEXT NOT NULL,
    code_hash TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    expires_at TEXT NOT NULL,
    verified_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS exam_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL UNIQUE REFERENCES exam_sessions(id),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    vocabulary_score REAL NOT NULL,
    grammar_score REAL NOT NULL,
    reading_score REAL NOT NULL,
    listening_score REAL NOT NULL,
    total_percentage REAL NOT NULL,
    level TEXT NOT NULL,
    strengths TEXT NOT NULL,
    weaknesses TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS phone_seen_questions (
    phone TEXT NOT NULL,
    question_id INTEGER NOT NULL,
    seen_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (phone, question_id)
  );

  CREATE INDEX IF NOT EXISTS idx_otp_codes_phone ON otp_codes(phone);
  CREATE INDEX IF NOT EXISTS idx_exam_sessions_phone ON exam_sessions(phone);
`);

seedIfEmpty(db);
