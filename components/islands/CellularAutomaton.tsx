"use client";

import { useEffect, useRef, useState } from "react";
import { ramp } from "@/lib/artcolor";
import { Slider } from "@/components/ui/Slider";

// Elementary (1D) cellular automaton. Each cell's next state is a lookup in the
// 8-bit rule number over its (left, self, right) neighbourhood. Rule 90 draws
// the Sierpinski triangle - the same pattern as the home-page hero.
const COLS = 201; // odd, single seed in the middle
const ROWS = 110;
const CELL = 3;

const presets = [
  { rule: 90, name: "90 · Sierpinski" },
  { rule: 30, name: "30 · chaos" },
  { rule: 110, name: "110 · complex" },
  { rule: 150, name: "150 · XOR" },
  { rule: 182, name: "182 · pyramid" },
];

export function CellularAutomaton() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [rule, setRule] = useState(90);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let row = new Uint8Array(COLS);
    row[Math.floor(COLS / 2)] = 1;

    for (let r = 0; r < ROWS; r++) {
      const [rr, gg, bb] = ramp(0.18 + 0.72 * (r / ROWS));
      ctx.fillStyle = `rgb(${rr},${gg},${bb})`;
      for (let c = 0; c < COLS; c++) {
        if (row[c]) ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
      }
      const next = new Uint8Array(COLS);
      for (let c = 0; c < COLS; c++) {
        const l = row[(c - 1 + COLS) % COLS];
        const m = row[c];
        const rt = row[(c + 1) % COLS];
        const pattern = (l << 2) | (m << 1) | rt;
        next[c] = (rule >> pattern) & 1;
      }
      row = next;
    }
  }, [rule]);

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={ref}
        width={COLS * CELL}
        height={ROWS * CELL}
        className="w-full rounded-btn border border-line2"
        role="img"
        aria-label={`Elementary cellular automaton, rule ${rule}`}
      />
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p.rule}
            type="button"
            onClick={() => setRule(p.rule)}
            className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
          >
            {p.name}
          </button>
        ))}
      </div>
      <Slider
        label="rule number"
        min={0}
        max={255}
        step={1}
        value={rule}
        onChange={setRule}
        display={String(rule)}
      />
    </div>
  );
}
