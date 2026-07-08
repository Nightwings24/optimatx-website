"use client";

import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/Slider";
import { cn } from "@/lib/cn";

// L-systems (turtle graphics): one rewrite engine drives many classic fractals.
// An axiom string is rewritten by production rules n times, then read by a
// turtle (F = forward, +/- = turn, [ ] = branch). This generalizes the gallery's
// fractal tree into a whole preset family from a single interpreter.
const VB = 400;

interface Rule {
  name: string;
  axiom: string;
  rules: Record<string, string>;
  draw: string; // characters that move the pen forward
  angle: number; // degrees
  start: number; // initial heading, degrees (0 = right, -90 = up)
  depth: number; // sensible default depth
}

const PRESETS: Rule[] = [
  { name: "Koch", axiom: "F", rules: { F: "F+F--F+F" }, draw: "F", angle: 60, start: 0, depth: 4 },
  { name: "Arrowhead", axiom: "A", rules: { A: "B-A-B", B: "A+B+A" }, draw: "AB", angle: 60, start: 0, depth: 6 },
  { name: "Dragon", axiom: "FX", rules: { X: "X+YF+", Y: "-FX-Y" }, draw: "F", angle: 90, start: 0, depth: 11 },
  { name: "Plant", axiom: "X", rules: { X: "F+[[X]-X]-F[-FX]+X", F: "FF" }, draw: "F", angle: 25, start: -90, depth: 5 },
];

function expand(preset: Rule, depth: number): string {
  let s = preset.axiom;
  for (let i = 0; i < depth; i++) {
    let out = "";
    for (const ch of s) out += preset.rules[ch] ?? ch;
    s = out;
    if (s.length > 120000) break; // keep the SVG path bounded
  }
  return s;
}

function toPath(preset: Rule, depth: number, angleDeg: number): string {
  const s = expand(preset, depth);
  const turn = (angleDeg * Math.PI) / 180;
  let x = 0;
  let y = 0;
  let h = (preset.start * Math.PI) / 180;
  const stack: { x: number; y: number; h: number }[] = [];
  const subs: string[] = [];
  let cur = `M0 0`;
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;

  for (const ch of s) {
    if (preset.draw.includes(ch)) {
      x += Math.cos(h);
      y += Math.sin(h);
      cur += `L${x.toFixed(2)} ${y.toFixed(2)}`;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    } else if (ch === "+") {
      h += turn;
    } else if (ch === "-") {
      h -= turn;
    } else if (ch === "[") {
      stack.push({ x, y, h });
    } else if (ch === "]") {
      const st = stack.pop();
      if (st) {
        x = st.x;
        y = st.y;
        h = st.h;
        subs.push(cur);
        cur = `M${x.toFixed(2)} ${y.toFixed(2)}`;
      }
    }
  }
  subs.push(cur);

  // fit the drawing into the viewBox with padding
  const w = maxX - minX || 1;
  const hgt = maxY - minY || 1;
  const pad = 16;
  const scale = Math.min((VB - 2 * pad) / w, (VB - 2 * pad) / hgt);
  const tx = pad + (VB - 2 * pad - scale * w) / 2 - minX * scale;
  const ty = pad + (VB - 2 * pad - scale * hgt) / 2 - minY * scale;

  return subs
    .join("")
    .replace(/M(-?[\d.]+) (-?[\d.]+)/g, (_, a, b) => `M${(+a * scale + tx).toFixed(2)} ${(+b * scale + ty).toFixed(2)}`)
    .replace(/L(-?[\d.]+) (-?[\d.]+)/g, (_, a, b) => `L${(+a * scale + tx).toFixed(2)} ${(+b * scale + ty).toFixed(2)}`);
}

export function LSystem() {
  const [idx, setIdx] = useState(0);
  const preset = PRESETS[idx];
  const [depth, setDepth] = useState(PRESETS[0].depth);
  const [angle, setAngle] = useState(PRESETS[0].angle);

  const d = useMemo(() => toPath(preset, depth, angle), [preset, depth, angle]);

  function select(i: number) {
    setIdx(i);
    setDepth(PRESETS[i].depth);
    setAngle(PRESETS[i].angle);
  }

  return (
    <div className="flex flex-col gap-4">
      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="aspect-square w-full rounded-btn border border-line2"
        role="img"
        aria-label={`${preset.name} L-system at depth ${depth}`}
      >
        <path d={d} fill="none" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => select(i)}
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors",
              i === idx
                ? "border-accent text-accent"
                : "border-line2 text-ink2 hover:border-accent hover:text-accent"
            )}
          >
            {p.name}
          </button>
        ))}
      </div>
      <Slider label="depth" min={1} max={13} step={1} value={depth} onChange={setDepth} display={String(depth)} />
      <Slider label="angle" min={5} max={90} step={1} value={angle} onChange={setAngle} display={`${angle}°`} />
    </div>
  );
}
