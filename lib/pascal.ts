// Pascal's triangle - the data behind the interactive hero widget (design.md §7).
// Everything here is pure and computed once; the island renders per-cell styles
// from this data (NOT a CSS @keyframes reveal, which resets on re-render).

import type { CategoryColor } from "@/lib/categories";

export const PASCAL_ROWS = 8; // rows n = 0..7

/** Build Pascal's triangle by the additive binomial recurrence. */
export function buildPascal(rows: number = PASCAL_ROWS): number[][] {
  const tri: number[][] = [];
  for (let n = 0; n < rows; n++) {
    const row: number[] = [];
    for (let k = 0; k <= n; k++) {
      if (k === 0 || k === n) {
        row.push(1);
      } else {
        row.push(tri[n - 1][k - 1] + tri[n - 1][k]);
      }
    }
    tri.push(row);
  }
  return tri;
}

/** A cell is on the outer edge when it has no two parents. */
export const isEdge = (n: number, k: number): boolean =>
  n === 0 || k === 0 || k === n;

/** Depth-banded color so the lit (odd) cells cascade green → blue → gold. */
export function depthColor(n: number): CategoryColor {
  if (n <= 2) return "accent"; // green
  if (n <= 4) return "amber"; // blue (in dark)
  return "lime"; // gold
}

/** The live mono caption for the hovered/active cell (design.md §7). */
export function captionFor(tri: number[][], n: number, k: number): string {
  const v = tri[n][k];
  if (isEdge(n, k)) {
    return `C(${n},${k}) = ${v}   ·   edge of the triangle`;
  }
  const a = tri[n - 1][k - 1];
  const b = tri[n - 1][k];
  return `C(${n},${k}) = C(${n - 1},${k - 1}) + C(${n - 1},${k}) = ${a} + ${b} = ${v}`;
}

export const DEFAULT_PASCAL_CAPTION =
  "Hover a cell - odd values trace Sierpiński's triangle";
