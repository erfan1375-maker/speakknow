import type { DatabaseSync } from "node:sqlite";
import {
  grammarQuestions,
  listeningClips,
  readingPassages,
  vocabularyQuestions,
  type RawQuestion,
} from "./seed-data";

const OPTION_LETTERS = ["a", "b", "c", "d"] as const;

function shuffledOptions(q: RawQuestion) {
  const options = [q.correct, ...q.distractors];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  const correctIndex = options.indexOf(q.correct);
  return { options, correctLetter: OPTION_LETTERS[correctIndex] };
}

export function seedIfEmpty(db: DatabaseSync) {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM questions").get() as {
    count: number;
  };
  if (count > 0) return;

  const insertQuestion = db.prepare(`
    INSERT INTO questions
      (category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, passage_id, audio_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertPassage = db.prepare(
    "INSERT INTO reading_passages (title, body) VALUES (?, ?)",
  );
  const insertClip = db.prepare(
    "INSERT INTO listening_clips (title, audio_url, transcript) VALUES (?, ?, ?)",
  );

  db.exec("BEGIN");
  try {
    for (const q of vocabularyQuestions) {
      const { options, correctLetter } = shuffledOptions(q);
      insertQuestion.run(
        "vocabulary",
        q.difficulty,
        q.q,
        options[0],
        options[1],
        options[2],
        options[3],
        correctLetter,
        null,
        null,
      );
    }

    for (const q of grammarQuestions) {
      const { options, correctLetter } = shuffledOptions(q);
      insertQuestion.run(
        "grammar",
        q.difficulty,
        q.q,
        options[0],
        options[1],
        options[2],
        options[3],
        correctLetter,
        null,
        null,
      );
    }

    for (const passage of readingPassages) {
      const result = insertPassage.run(passage.title, passage.body);
      const passageId = Number(result.lastInsertRowid);
      for (const q of passage.questions) {
        const { options, correctLetter } = shuffledOptions(q);
        insertQuestion.run(
          "reading",
          q.difficulty,
          q.q,
          options[0],
          options[1],
          options[2],
          options[3],
          correctLetter,
          passageId,
          null,
        );
      }
    }

    for (const clip of listeningClips) {
      const result = insertClip.run(clip.title, clip.audioUrl, clip.transcript);
      const audioId = Number(result.lastInsertRowid);
      for (const q of clip.questions) {
        const { options, correctLetter } = shuffledOptions(q);
        insertQuestion.run(
          "listening",
          q.difficulty,
          q.q,
          options[0],
          options[1],
          options[2],
          options[3],
          correctLetter,
          null,
          audioId,
        );
      }
    }

    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }
}
