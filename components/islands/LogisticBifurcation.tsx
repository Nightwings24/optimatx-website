"use client";

import { useEffect, useRef, useState } from "react";
import { ramp } from "@/lib/artcolor";
import { Slider } from "@/components/ui/Slider";

// Logistic-map bifurcation diagram: for each growth rate r across the width,
// iterate x -> r*x*(1-x), discard the transient, and plot the values it settles
// into. A single fixed point splits to 2, 4, 8... and cascades into chaos near
// r = 3.5699, with a striking period-3 window around r = 3.83.
const W = 480;
const H = 300;

const presets = [
  { name: "Full cascade", min: 2.5, max: 4 },
  { name: "Onset of chaos", min: 3.4, max: 3.6 },
  { name: "Period-3 window", min: 3.82, max: 3.858 },
];

export function LogisticBifurcation() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [rMin, setRMin] = useState(2.5);
  const [rMax, setRMax] = useState(4);
  const [samples, setSamples] = useState(400);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;
    const lo = Math.min(rMin, rMax);
    const hi = Math.max(rMin, rMax) === lo ? lo + 0.01 : Math.max(rMin, rMax);

    const raf = requestAnimationFrame(() => {
      const grid = new Float32Array(W * H);
      let maxD = 0;
      for (let col = 0; col < W; col++) {
        const r = lo + (col / (W - 1)) * (hi - lo);
        let x = 0.5;
        for (let i = 0; i < 400; i++) x = r * x * (1 - x); // burn in transient
        for (let i = 0; i < samples; i++) {
          x = r * x * (1 - x);
          const py = Math.floor((1 - x) * (H - 1));
          if (py >= 0 && py < H) {
            const v = ++grid[py * W + col];
            if (v > maxD) maxD = v;
          }
        }
      }
      const img = context.createImageData(W, H);
      const data = img.data;
      const logMax = Math.log(1 + maxD) || 1;
      for (let i = 0; i < grid.length; i++) {
        const hits = grid[i];
        const [r, g, b] = ramp(hits === 0 ? 0 : 0.25 + 0.7 * (Math.log(1 + hits) / logMax));
        const o = i * 4;
        data[o] = r;
        data[o + 1] = g;
        data[o + 2] = b;
        data[o + 3] = 255;
      }
      context.putImageData(img, 0, 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [rMin, rMax, samples]);

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={ref}
        width={W}
        height={H}
        className="w-full rounded-btn border border-line2"
        role="img"
        aria-label={`Logistic bifurcation diagram, r from ${rMin} to ${rMax}`}
      />
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => {
              setRMin(p.min);
              setRMax(p.max);
            }}
            className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
          >
            {p.name}
          </button>
        ))}
      </div>
      <Slider label="r min" min={2.4} max={4} step={0.001} value={rMin} onChange={setRMin} display={rMin.toFixed(3)} />
      <Slider label="r max" min={2.4} max={4} step={0.001} value={rMax} onChange={setRMax} display={rMax.toFixed(3)} />
      <Slider label="detail" min={100} max={800} step={50} value={samples} onChange={setSamples} display={String(samples)} />
    </div>
  );
}
