"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/Slider";

// Harmonograph: two decaying sinusoids trace a curve as a pair of pendulums wind
// down. x(t) = sin(a·t + φ)·e^(-k t), y(t) = sin(b·t)·e^(-k t). Near-integer
// frequency ratios give the classic looping figures.
const C = 200;
const R = 178;

function curve(a: number, b: number, phase: number, damp: number): string {
  const T = 120;
  const steps = 4000;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * T;
    const e = Math.exp(-damp * t);
    const x = C + R * Math.sin(a * t + phase) * e;
    const y = C + R * Math.sin(b * t) * e;
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

export function Harmonograph() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [phase, setPhase] = useState(1.57);
  const [damp, setDamp] = useState(0.012);

  return (
    <div className="flex flex-col gap-4">
      <svg
        viewBox="0 0 400 400"
        className="aspect-square w-full rounded-btn border border-line2"
        role="img"
        aria-label="Harmonograph curve"
      >
        <polyline
          points={curve(a, b, phase, damp)}
          fill="none"
          stroke="var(--accent2)"
          strokeWidth="0.8"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>
      <Slider label="frequency x" min={1} max={6} step={0.01} value={a} onChange={setA} display={a.toFixed(2)} />
      <Slider label="frequency y" min={1} max={6} step={0.01} value={b} onChange={setB} display={b.toFixed(2)} />
      <Slider label="phase" min={0} max={3.14} step={0.01} value={phase} onChange={setPhase} display={phase.toFixed(2)} />
      <Slider label="damping" min={0} max={0.05} step={0.001} value={damp} onChange={setDamp} display={damp.toFixed(3)} />
    </div>
  );
}
