import type { Category, Difficulty } from "./session";

export type OptionKey = "a" | "b" | "c" | "d";

/** Points awarded per question, by difficulty. Harder questions count for more. */
export const DIFFICULTY_WEIGHTS: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

/**
 * Maps an overall percentage (0-100) to a CEFR level. Edit these ranges freely —
 * nothing else in the scoring logic depends on their exact values.
 */
export const LEVEL_THRESHOLDS: { maxPercentage: number; level: string }[] = [
  { maxPercentage: 19, level: "A1" },
  { maxPercentage: 34, level: "A2" },
  { maxPercentage: 54, level: "B1" },
  { maxPercentage: 74, level: "B2" },
  { maxPercentage: 89, level: "C1" },
  { maxPercentage: 100, level: "C2" },
];

export function levelForPercentage(percentage: number): string {
  const match = LEVEL_THRESHOLDS.find((t) => percentage <= t.maxPercentage);
  return match?.level ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1].level;
}

const CATEGORY_ORDER: Category[] = ["vocabulary", "grammar", "reading", "listening"];

export interface ScoredQuestion {
  id: number;
  category: Category;
  difficulty: Difficulty;
  correctOption: OptionKey;
}

export interface CategoryScore {
  category: Category;
  earned: number;
  max: number;
  percentage: number; // 0-100, rounded
}

export interface ExamReport {
  categories: CategoryScore[];
  totalPercentage: number;
  level: string;
  strengths: Category[];
  weaknesses: Category[];
}

export function computeReport(
  questions: ScoredQuestion[],
  answers: Record<number, OptionKey>,
): ExamReport {
  const totals = new Map<Category, { earned: number; max: number }>();
  for (const category of CATEGORY_ORDER) totals.set(category, { earned: 0, max: 0 });

  for (const q of questions) {
    const weight = DIFFICULTY_WEIGHTS[q.difficulty];
    const bucket = totals.get(q.category)!;
    bucket.max += weight;
    if (answers[q.id] === q.correctOption) bucket.earned += weight;
  }

  const categories: CategoryScore[] = CATEGORY_ORDER.map((category) => {
    const { earned, max } = totals.get(category)!;
    return {
      category,
      earned,
      max,
      percentage: max > 0 ? Math.round((earned / max) * 100) : 0,
    };
  });

  const overallEarned = categories.reduce((sum, c) => sum + c.earned, 0);
  const overallMax = categories.reduce((sum, c) => sum + c.max, 0);
  const totalPercentage = overallMax > 0 ? Math.round((overallEarned / overallMax) * 100) : 0;

  const byPercentage = [...categories].sort((a, b) => b.percentage - a.percentage);
  const strengths = byPercentage.slice(0, 2).map((c) => c.category);
  const weaknesses = byPercentage
    .slice(-2)
    .map((c) => c.category)
    .reverse();

  return {
    categories,
    totalPercentage,
    level: levelForPercentage(totalPercentage),
    strengths,
    weaknesses,
  };
}
