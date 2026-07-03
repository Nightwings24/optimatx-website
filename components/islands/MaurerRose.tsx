"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/Slider";

// Maurer rose: walk 361 points around the rose r = sin(n·θ), stepping the angle
// by d degrees each time, and connect them with straight lines. Small changes in
// n and d produce wildly different lace-like patterns.
const C = 200;
const R = 185;
const DEG = Math.PI / 180;

const presets = [
  { n: 6, d: 71 },
  { n: 2, d: 39 },
  { n: 5, d: 97 },
  { n: 3, d: 47 },
  { n: 7, d: 19 },
];

function points(n: number, d: number, steps: number, stepDeg: number): string {
  const out: string[] = [];
  for (let k = 0; k <= steps; k++) {
    const theta = k * stepDeg * DEG;
    const r = R * Math.sin(n * theta);
    out.push(
      `${(C + r * Math.cos(theta)).toFixed(2)},${(C + r * Math.sin(theta)).toFixed(2)}`
    );
  }
  return out.join(" ");
}

export function MaurerRose() {
  const [n, setN] = useState(6);
  const [d, setD] = useState(71);

  const walk = points(n, d, 360, d); // the Maurer walk (361 points, step d°)
  const rose = points(n, 1, 1440, 0.25); // the smooth underlying rose

  return (
    <div className="flex flex-col gap-4">
      <svg
        viewBox="0 0 400 400"
        className="aspect-square w-full rounded-btn border border-line2"
        role="img"
        aria-label={`Maurer rose with n = ${n}, d = ${d}`}
      >
        <polyline
          points={rose}
          fill="none"
          stroke="var(--accent2)"
          strokeWidth="1"
          opacity="0.35"
        />
        <polyline
          points={walk}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.7"
          opacity="0.9"
        />
      </svg>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={`${p.n}-${p.d}`}
            type="button"
            onClick={() => {
              setN(p.n);
              setD(p.d);
            }}
            className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
          >
            {p.n}·{p.d}
          </button>
        ))}
      </div>
      <Slider label="n (petals)" min={1} max={12} step={1} value={n} onChange={setN} />
      <Slider label="d (angle step)" min={1} max={180} step={1} value={d} onChange={setD} />
    </div>
  );
}
