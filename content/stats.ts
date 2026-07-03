// The "A quick sum" stat band on the Home page (design.md §6.6).
// homeStats are content metrics; teamStats reflect the real council roster
// (content/team.ts) - keep them in sync when the team changes.

import type { CategoryColor } from "@/lib/categories";

export interface Stat {
  value: string;
  caption: string;
  color: CategoryColor;
}

export const homeStats: Stat[] = [
  { value: "6", caption: "kinds of content", color: "accent" },
  { value: "∞", caption: "problems to chew on", color: "amber" },
  { value: "52", caption: "problems a year", color: "lime" },
  { value: "1", caption: "optimum, always", color: "magenta" },
];

export const teamStats: Stat[] = [
  { value: "11", caption: "on the council", color: "accent" },
  { value: "1", caption: "faculty advisor", color: "amber" },
  { value: "3", caption: "teams, one club", color: "lime" },
  { value: "∞", caption: "cups of chai", color: "magenta" },
];
