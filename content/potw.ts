// The current Problem of the Week, shaped for the home-page POTW box (§6.4).
// Sourced from content/problems.ts so there is a single source of truth - edit
// the problem there, not here.

import { currentProblem } from "./problems";

export interface POTW {
  number: number;
  prompt: string;
  formula: string;
  difficulty: string;
  deadline: string;
  placeholder: string;
  accepted: string[];
  correctMessage: string;
  wrongMessage: string;
  submitUrl?: string;
  archiveUrl?: string;
}

export const currentPOTW: POTW = {
  number: currentProblem.number,
  prompt: currentProblem.prompt,
  formula: currentProblem.formula ?? "",
  difficulty: currentProblem.difficulty,
  deadline: currentProblem.deadline ?? "",
  placeholder: currentProblem.placeholder ?? "e.g. 1",
  accepted: currentProblem.accepted,
  correctMessage: currentProblem.correctMessage,
  wrongMessage: currentProblem.wrongMessage,
  submitUrl: "/problems#submit",
  archiveUrl: "/problems",
};
