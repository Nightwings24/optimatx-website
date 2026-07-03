// The category → color system (design.md §2, §13).
// These names are SLOTS, not literal colors: in dark mode `--amber` is blue,
// `--lime` is gold, `--violet` is orange. The mapping is load-bearing - each
// content area owns exactly one, and you must NOT invent a 6th or recolor a
// category page-to-page.

export type CategoryColor =
  | "accent" // green  - primary, Blog, Team, success
  | "accent2" // mint/deep-green - eyebrows, hover outlines
  | "magenta" // rose   - Problem of the Week / flagship, errors
  | "amber" // blue   - Events & Competitions
  | "lime" // gold   - Resources, stats
  | "violet"; // orange - Optimization Corner (signature)

/** CSS `var()` reference for a category color, e.g. catVar("amber") → "var(--amber)".
 *  The green "accent" resolves to its lighter text-safe variant (--accent-ink) so
 *  category-green text meets AA contrast; solid fills use `bg-accent-fill`. */
export const catVar = (c: CategoryColor): string =>
  c === "accent" ? "var(--accent-ink)" : `var(--${c})`;

/** Style object that scopes a local `--cat` to a category - cards read this so
 *  their hover offset shadow and tints all follow the one category color. */
export const catStyle = (c: CategoryColor): React.CSSProperties =>
  ({ ["--cat"]: catVar(c) }) as React.CSSProperties;
