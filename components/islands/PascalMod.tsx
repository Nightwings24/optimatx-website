"use client";

import { useEffect, useRef, useState } from "react";
import { ramp } from "@/lib/artcolor";
import { Slider } from "@/components/ui/Slider";

// Pascal's triangle coloured by residue mod p. Building the triangle with the
// additive recurrence taken mod p (no big integers) and colouring each nonzero
// cell reveals nested self-similar patterns: mod 2 is the Sierpinski triangle -
// the very same shape as our Rule-90 cellular automaton and the chaos game.
const SIZE = 360;

const presets = [
  { name: "mod 2 · Sierpinski", p: 2 },
  { name: "mod 3", p: 3 },
  { name: "mod 5", p: 5 },
  { name: "mod 7", p: 7 },
];

export function PascalMod() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [modulus, setModulus] = useState(2);
  const [rows, setRows] = useState(128);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;
    const p = modulus;

    const raf = requestAnimationFrame(() => {
      context.clearRect(0, 0, SIZE, SIZE);
      const cell = SIZE / rows;
      const dot = Math.max(1, Math.ceil(cell));
      let row: number[] = [1];

      for (let i = 0; i < rows; i++) {
        const y = i * cell;
        for (let j = 0; j <= i; j++) {
          const val = row[j];
          if (val !== 0) {
            const x = SIZE / 2 + (j - i / 2) * cell;
            const [r, g, b] = ramp(val / Math.max(1, p - 1));
            context.fillStyle = `rgb(${r},${g},${b})`;
            context.fillRect(Math.floor(x), Math.floor(y), dot, dot);
          }
        }
        const next = new Array<number>(i + 2);
        next[0] = 1;
        next[i + 1] = 1;
        for (let j = 1; j <= i; j++) next[j] = (row[j - 1] + row[j]) % p;
        row = next;
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [modulus, rows]);

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={ref}
        width={SIZE}
        height={SIZE}
        className="aspect-square w-full rounded-btn border border-line2"
        role="img"
        aria-label={`Pascal's triangle mod ${modulus}, ${rows} rows`}
      />
      <div className="flex flex-wrap gap-1.5">
        {presets.map((pr) => (
          <button
            key={pr.name}
            type="button"
            onClick={() => setModulus(pr.p)}
            className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
          >
            {pr.name}
          </button>
        ))}
      </div>
      <Slider label="modulus" min={2} max={16} step={1} value={modulus} onChange={setModulus} display={String(modulus)} />
      <Slider label="rows" min={32} max={300} step={1} value={rows} onChange={setRows} display={String(rows)} />
    </div>
  );
}
