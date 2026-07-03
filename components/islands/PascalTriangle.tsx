"use client";

import { useState } from "react";
import {
  buildPascal,
  captionFor,
  depthColor,
  isEdge,
  DEFAULT_PASCAL_CAPTION,
} from "@/lib/pascal";
import { catVar } from "@/lib/categories";

// The signature hero widget (design.md §7): Pascal's triangle where odd values
// are lit (tracing Sierpiński) and hovering a cell highlights it + its two
// parents with the live binomial-recurrence caption. Data-driven per-cell
// styles - NOT a CSS @keyframes reveal (which resets on re-render).

const tri = buildPascal(); // computed once at module load

interface Cell {
  n: number;
  k: number;
}

export function PascalTriangle() {
  const [active, setActive] = useState<Cell | null>(null);

  const parents: Cell[] =
    active && !isEdge(active.n, active.k)
      ? [
          { n: active.n - 1, k: active.k - 1 },
          { n: active.n - 1, k: active.k },
        ]
      : [];

  const isActive = (n: number, k: number) => active?.n === n && active?.k === k;
  const isParent = (n: number, k: number) =>
    parents.some((p) => p.n === n && p.k === k);

  const caption = active
    ? captionFor(tri, active.n, active.k)
    : DEFAULT_PASCAL_CAPTION;

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex flex-col items-center gap-1"
        onMouseLeave={() => setActive(null)}
      >
        {tri.map((row, n) => (
          <div key={n} className="flex justify-center gap-1">
            {row.map((v, k) => {
              const odd = v % 2 === 1;
              const c = catVar(depthColor(n));
              const activeCell = isActive(n, k);
              const parentCell = isParent(n, k);
              return (
                <button
                  key={k}
                  type="button"
                  aria-label={`C(${n},${k}) = ${v}`}
                  onMouseEnter={() => setActive({ n, k })}
                  onFocus={() => setActive({ n, k })}
                  onClick={() => setActive({ n, k })}
                  style={{
                    width: "clamp(22px, 3vw, 30px)",
                    height: "clamp(22px, 3vw, 30px)",
                    fontSize: "clamp(9px, 1.3vw, 11px)",
                    fontWeight: odd ? 700 : 400,
                    color: odd ? c : "var(--ink3)",
                    background: odd
                      ? `color-mix(in srgb, ${c} 20%, transparent)`
                      : "transparent",
                    borderColor: odd
                      ? `color-mix(in srgb, ${c} 45%, transparent)`
                      : "var(--line2)",
                    ...(activeCell
                      ? {
                          boxShadow: "0 0 0 2px var(--ink)",
                          transform: "scale(1.14)",
                          zIndex: 2,
                        }
                      : {}),
                    ...(parentCell
                      ? { outline: "2px dashed var(--accent2)", outlineOffset: "1px" }
                      : {}),
                  }}
                  className="flex items-center justify-center rounded-[6px] border font-mono tabular-nums transition-transform"
                >
                  {v}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <p
        aria-live="polite"
        className="mt-4 max-w-[22rem] text-center font-mono text-[12px] leading-relaxed text-ink2"
      >
        {caption}
      </p>
    </div>
  );
}
