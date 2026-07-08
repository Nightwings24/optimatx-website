"use client";

import { useEffect, useRef, useState } from "react";
import { ramp } from "@/lib/artcolor";
import { mulberry32 } from "@/lib/prng";
import { Slider } from "@/components/ui/Slider";
import { cn } from "@/lib/cn";

// Iterated function systems by random iteration ("the chaos game"). The Barnsley
// fern picks one of four affine maps by probability and plots each point; the
// polygon variant jumps a fixed fraction toward a random vertex - a triangle at
// 1/2 gives the Sierpinski gasket, the same shape as our Rule-90 hero.
const SIZE = 360;

// Barnsley fern: [a, b, c, d, e, f, cumulativeProbability]
const FERN: [number, number, number, number, number, number, number][] = [
  [0, 0, 0, 0.16, 0, 0, 0.01],
  [0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.86],
  [0.2, -0.26, 0.23, 0.22, 0, 1.6, 0.93],
  [-0.15, 0.28, 0.26, 0.24, 0, 0.44, 1.0],
];

type Mode = "fern" | "polygon";

export function ChaosGame() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("fern");
  const [points, setPoints] = useState(120000);
  const [vertices, setVertices] = useState(3);
  const [jump, setJump] = useState(0.5);
  const [seed, setSeed] = useState(1);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    const raf = requestAnimationFrame(() => {
      context.clearRect(0, 0, SIZE, SIZE);
      const img = context.createImageData(SIZE, SIZE);
      const data = img.data;
      const rand = mulberry32(seed * 2654435761);
      const plot = (px: number, py: number, t: number) => {
        if (px < 0 || px >= SIZE || py < 0 || py >= SIZE) return;
        const o = (py * SIZE + px) * 4;
        const [r, g, b] = ramp(t);
        data[o] = r;
        data[o + 1] = g;
        data[o + 2] = b;
        data[o + 3] = 255;
      };

      if (mode === "fern") {
        let x = 0;
        let y = 0;
        for (let i = 0; i < points; i++) {
          const rr = rand();
          const m = FERN.find((f) => rr <= f[6]) ?? FERN[3];
          const nx = m[0] * x + m[1] * y + m[4];
          const ny = m[2] * x + m[3] * y + m[5];
          x = nx;
          y = ny;
          const px = Math.floor(((x + 2.2) / 4.9) * SIZE);
          const py = Math.floor(SIZE - (y / 10) * (SIZE - 4) - 2);
          plot(px, py, 0.35 + 0.5 * (y / 10));
        }
      } else {
        const R = SIZE / 2 - 8;
        const verts: [number, number][] = [];
        for (let k = 0; k < vertices; k++) {
          const ang = (2 * Math.PI * k) / vertices - Math.PI / 2;
          verts.push([SIZE / 2 + R * Math.cos(ang), SIZE / 2 + R * Math.sin(ang)]);
        }
        let x = SIZE / 2;
        let y = SIZE / 2;
        for (let i = 0; i < points; i++) {
          const k = Math.min(vertices - 1, Math.floor(rand() * vertices));
          const v = verts[k];
          x += (v[0] - x) * jump;
          y += (v[1] - y) * jump;
          if (i > 10) plot(Math.round(x), Math.round(y), k / Math.max(1, vertices - 1));
        }
      }
      context.putImageData(img, 0, 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [mode, points, vertices, jump, seed]);

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={ref}
        width={SIZE}
        height={SIZE}
        className="aspect-square w-full rounded-btn border border-line2"
        role="img"
        aria-label={mode === "fern" ? "Barnsley fern" : "Chaos game polygon fractal"}
      />
      <div className="flex flex-wrap gap-1.5">
        {(["fern", "polygon"] as Mode[]).map((mn) => (
          <button
            key={mn}
            type="button"
            onClick={() => setMode(mn)}
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors",
              mode === mn
                ? "border-accent text-accent"
                : "border-line2 text-ink2 hover:border-accent hover:text-accent"
            )}
          >
            {mn === "fern" ? "Barnsley fern" : "Chaos game"}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
        >
          shuffle
        </button>
      </div>
      <Slider
        label="points"
        min={20000}
        max={220000}
        step={10000}
        value={points}
        onChange={setPoints}
        display={`${Math.round(points / 1000)}k`}
      />
      {mode === "polygon" && (
        <>
          <Slider label="vertices" min={3} max={8} step={1} value={vertices} onChange={setVertices} display={String(vertices)} />
          <Slider label="jump fraction" min={0.3} max={0.7} step={0.01} value={jump} onChange={setJump} display={jump.toFixed(2)} />
        </>
      )}
    </div>
  );
}
