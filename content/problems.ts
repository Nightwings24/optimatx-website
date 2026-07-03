// Problem of the Week + archive. The `open` problem is the current one (shown
// on the home page and at the top of /problems); the rest are the archive.
// To post a new problem: add an entry with status "open", flip the previous
// one to "closed", and fill in its solution.

export type Difficulty = "warm-up" | "medium" | "hard";

export interface Problem {
  number: number;
  slug: string; // used in the URL: /problems/<slug>
  title: string;
  date: string; // ISO
  difficulty: Difficulty;
  status: "open" | "closed";
  deadline?: string; // for the open problem, e.g. "Fri 23:59"
  prompt: string;
  formula?: string; // KaTeX
  placeholder?: string;
  accepted: string[];
  correctMessage: string;
  wrongMessage: string;
  solution: string; // plain prose
  solutionFormula?: string; // optional KaTeX for the key step
}

export const problems: Problem[] = [
  {
    number: 14,
    slug: "14-definite-integral",
    title: "A definite integral",
    date: "2026-06-29",
    difficulty: "warm-up",
    status: "open",
    deadline: "Fri 23:59",
    prompt: "Evaluate the definite integral:",
    formula: "\\int_{0}^{\\pi/2}\\sin x\\,dx",
    placeholder: "e.g. 1",
    accepted: ["1"],
    correctMessage: "✓ Correct - the area under one hump of sine is exactly 1.",
    wrongMessage: "≠ Not quite - antiderivative of sin is −cos. Try again.",
    solution:
      "An antiderivative of sin x is −cos x. Evaluating from 0 to π/2 gives −cos(π/2) + cos(0) = 0 + 1 = 1.",
    solutionFormula:
      "\\int_{0}^{\\pi/2}\\sin x\\,dx = \\big[-\\cos x\\big]_{0}^{\\pi/2} = 0 + 1 = 1",
  },
  {
    number: 13,
    slug: "13-first-hundred",
    title: "The first hundred",
    date: "2026-06-22",
    difficulty: "warm-up",
    status: "closed",
    prompt: "What is the sum of the first 100 positive integers?",
    formula: "\\sum_{k=1}^{100} k",
    placeholder: "a number",
    accepted: ["5050"],
    correctMessage: "✓ Correct - Gauss would approve.",
    wrongMessage: "≠ Not yet - try pairing terms from both ends.",
    solution:
      "Pair 1 with 100, 2 with 99, and so on: 50 pairs, each summing to 101. The total is 50 × 101 = 5050.",
    solutionFormula:
      "\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2} = \\frac{100\\cdot 101}{2} = 5050",
  },
  {
    number: 12,
    slug: "12-decagon-diagonals",
    title: "Diagonals of a decagon",
    date: "2026-06-15",
    difficulty: "warm-up",
    status: "closed",
    prompt: "How many diagonals does a convex decagon (10 sides) have?",
    formula: "\\binom{10}{2} - 10",
    placeholder: "a number",
    accepted: ["35"],
    correctMessage: "✓ Correct.",
    wrongMessage: "≠ Count all vertex-pairs, then subtract the sides.",
    solution:
      "There are C(10,2) = 45 segments joining pairs of vertices. Ten of them are the sides, leaving 45 − 10 = 35 diagonals.",
    solutionFormula: "\\binom{10}{2} - 10 = 45 - 10 = 35",
  },
  {
    number: 11,
    slug: "11-a-famous-limit",
    title: "A famous limit",
    date: "2026-06-08",
    difficulty: "medium",
    status: "closed",
    prompt: "Evaluate the limit:",
    formula: "\\lim_{x \\to 0} \\frac{\\sin x}{x}",
    placeholder: "e.g. 1",
    accepted: ["1"],
    correctMessage: "✓ Correct - the squeeze theorem does it.",
    wrongMessage: "≠ Not quite - try the squeeze theorem or a Taylor series.",
    solution:
      "By the squeeze theorem (or the expansion sin x = x − x³/6 + …), the ratio approaches 1 as x → 0.",
    solutionFormula: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1",
  },
];

export const currentProblem =
  problems.find((p) => p.status === "open") ?? problems[0];

export const pastProblems = problems
  .filter((p) => p.slug !== currentProblem.slug)
  .sort((a, b) => b.number - a.number);

export function getProblem(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}
