// The "A quick sum" stat band on the Home page (design.md §6.6).
// Placeholders - swap for real club metrics (members, events/yr, problems).

import type { CategoryColor } from "@/lib/categories";

export interface Stat {
  value: string;
  caption: string;
  color: CategoryColor;
}

export const homeStats: Stat[] = [
  { value: "9", caption: "categories of content", color: "accent" },
  { value: "∞", caption: "problems to chew on", color: "amber" },
  { value: "52", caption: "problems a year", color: "lime" },
  { value: "1", caption: "optimum, always", color: "magenta" },
];

export const teamStats: Stat[] = [
  { value: "8", caption: "on the council", color: "accent" },
  { value: "1", caption: "faculty advisor", color: "amber" },
  { value: "3", caption: "year groups", color: "lime" },
  { value: "∞", caption: "cups of chai", color: "magenta" },
];
