"use client";

import { useEffect, useRef, useState } from "react";
import { ramp } from "@/lib/artcolor";
import { Slider } from "@/components/ui/Slider";

// Modular multiplication circle (Mathologer's "times tables"): put N points on a
// circle and draw a chord from k to (m*k mod N). m = 2 traces the Mandelbrot
// cardioid, m = 3 a nephroid; larger m reveals layered caustic envelopes.
const SIZE = 360;

const presets = [
  { name: "Cardioid", n: 200, m: 2 },
  { name: "Nephroid", n: 300, m: 3 },
  { name: "Caustic", n: 400, m: 51 },
  { name: "Lace", n: 511, m: 2 },
];

export function TimesTables() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [n, setN] = useState(200);
  const [m, setM] = useState(2);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    const raf = requestAnimationFrame(() => {
      context.clearRect(0, 0, SIZE, SIZE);
      const cx = SIZE / 2;
      const cy = SIZE / 2;
      const R = SIZE / 2 - 10;
      const at = (idx: number): [number, number] => {
        const ang = (2 * Math.PI * idx) / n - Math.PI / 2;
        return [cx + R * Math.cos(ang), cy + R * Math.sin(ang)];
      };
      context.lineWidth = n > 400 ? 0.4 : 0.7;
      for (let k = 0; k < n; k++) {
        const [x1, y1] = at(k);
        const [x2, y2] = at((m * k) % n);
        const [r, g, b] = ramp(k / n);
        context.strokeStyle = `rgba(${r},${g},${b},0.55)`;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [n, m]);

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={ref}
        width={SIZE}
        height={SIZE}
        className="aspect-square w-full rounded-btn border border-line2"
        role="img"
        aria-label={`Times-table circle with ${n} points and multiplier ${m}`}
      />
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => {
              setN(p.n);
              setM(p.m);
            }}
            className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
          >
            {p.name}
          </button>
        ))}
      </div>
      <Slider label="points (N)" min={10} max={800} step={1} value={n} onChange={setN} display={String(n)} />
      <Slider label="multiplier (×)" min={2} max={200} step={0.1} value={m} onChange={setM} display={m.toFixed(1)} />
    </div>
  );
}
