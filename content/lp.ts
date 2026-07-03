// Linear-programming case studies for the Optimization Corner. Each scenario
// feeds the interactive visualiser: the numeric constraints/objective drive the
// solver and the plot; `formulaTeX` is the canonical statement shown alongside.

import type { Constraint, Objective, Sense, View } from "@/lib/lp";

export interface LPScenario {
  id: string;
  title: string;
  story: string;
  view: View;
  constraints: Constraint[];
  objective: Objective; // initial objective (the user can then drag it)
  sense: Sense;
  xLabel: string;
  yLabel: string;
  unit: string; // objective unit, e.g. "profit"
  formulaTeX: string;
  optimumNote: string; // the known optimum, in words
}

export const scenarios: LPScenario[] = [
  {
    id: "workshop",
    title: "A workshop's product mix",
    story:
      "A workshop makes two products. Each hour of the three machines is shared, so producing more of one leaves less capacity for the other. Given the profit per unit, how many of each should it make?",
    view: { xMax: 7, yMax: 9 },
    constraints: [
      { a: 1, b: 0, op: "<=", c: 4, label: "Machine 1" },
      { a: 0, b: 2, op: "<=", c: 12, label: "Machine 2" },
      { a: 3, b: 2, op: "<=", c: 18, label: "Machine 3" },
    ],
    objective: { p: 3, q: 5 },
    sense: "max",
    xLabel: "Product A",
    yLabel: "Product B",
    unit: "profit",
    formulaTeX: String.raw`\begin{aligned}\text{maximize}\quad & 3x + 5y \\ \text{subject to}\quad & x \le 4 \\ & 2y \le 12 \\ & 3x + 2y \le 18 \\ & x,\, y \ge 0\end{aligned}`,
    optimumNote:
      "The optimum is at (2, 6) with profit 36 - a corner of the feasible region, not an interior point.",
  },
  {
    id: "diet",
    title: "The cheapest diet",
    story:
      "Two foods each supply two nutrients. You must meet a minimum of each nutrient. Which mix of servings meets the requirements at the lowest cost? Because the constraints are lower bounds, the feasible region opens upward - the minimum sits at its lowest corner.",
    view: { xMax: 7, yMax: 6 },
    constraints: [
      { a: 1, b: 1, op: ">=", c: 4, label: "Nutrient A" },
      { a: 1, b: 3, op: ">=", c: 6, label: "Nutrient B" },
    ],
    objective: { p: 2, q: 3 },
    sense: "min",
    xLabel: "Food X",
    yLabel: "Food Y",
    unit: "cost",
    formulaTeX: String.raw`\begin{aligned}\text{minimize}\quad & 2x + 3y \\ \text{subject to}\quad & x + y \ge 4 \\ & x + 3y \ge 6 \\ & x,\, y \ge 0\end{aligned}`,
    optimumNote:
      "The optimum is at (3, 1) with cost 9, where both nutrient constraints are exactly met.",
  },
];
