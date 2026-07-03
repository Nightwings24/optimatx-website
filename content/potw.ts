// The current Problem of the Week (design.md §6.4).
// To post a new problem: bump `number`, set `formula` (a KaTeX string), and set
// `accepted` to the accepted answer(s). The checker compares the trimmed input
// against `accepted` (numeric-aware).

export interface POTW {
  number: number;
  prompt: string;
  formula: string; // KaTeX
  difficulty: string; // "warm-up"
  deadline: string; // "Fri 23:59"
  placeholder: string; // input placeholder
  accepted: string[]; // accepted answer(s)
  correctMessage: string;
  wrongMessage: string;
  submitUrl?: string; // "Submit a full solution" (form)
  archiveUrl?: string; // "Past problems"
}

export const currentPOTW: POTW = {
  number: 14,
  prompt: "Evaluate the definite integral:",
  formula: "\\int_{0}^{\\pi/2}\\sin x\\,dx",
  difficulty: "warm-up",
  deadline: "Fri 23:59",
  placeholder: "e.g. 1",
  accepted: ["1"],
  correctMessage: "✓ Correct - the area under one hump of sine is exactly 1.",
  wrongMessage: "≠ Not quite - antiderivative of sin is −cos. Try again.",
  submitUrl: "/join",
  archiveUrl: "/problems",
};
