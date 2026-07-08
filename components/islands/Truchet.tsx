"use client";

import { useEffect, useRef, useState } from "react";
import { ramp } from "@/lib/artcolor";
import { mulberry32 } from "@/lib/prng";
import { Slider } from "@/components/ui/Slider";

// Truchet tiles: a grid of square tiles, each drawn in one of two orientations
// (two quarter-circle arcs, the Smith variant). Random orientation yields
// flowing, mostly-closed loops of near-constant width - complexity from the
// simplest possible rule.
const SIZE = 360;
const HALF = Math.PI / 2;

export function Truchet() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [tiles, setTiles] = useState(10);
  const [weight, setWeight] = useState(2.5);
  const [seed, setSeed] = useState(1);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    const raf = requestAnimationFrame(() => {
      context.clearRect(0, 0, SIZE, SIZE);
      const s = SIZE / tiles;
      const r = s / 2;
      const rand = mulberry32(seed * 2654435761);
      context.lineWidth = weight;
      context.lineCap = "round";

      const arc = (cx: number, cy: number, from: number, to: number) => {
        context.beginPath();
        context.arc(cx, cy, r, from, to);
        context.stroke();
      };

      for (let gy = 0; gy < tiles; gy++) {
        for (let gx = 0; gx < tiles; gx++) {
          const ox = gx * s;
          const oy = gy * s;
          const [cr, cg, cb] = ramp(0.3 + 0.5 * ((gx + gy) / (2 * tiles - 2 || 1)));
          context.strokeStyle = `rgb(${cr},${cg},${cb})`;
          if (rand() < 0.5) {
            arc(ox, oy, 0, HALF); // top-left corner
            arc(ox + s, oy + s, Math.PI, Math.PI + HALF); // bottom-right corner
          } else {
            arc(ox + s, oy, HALF, Math.PI); // top-right corner
            arc(ox, oy + s, Math.PI + HALF, 2 * Math.PI); // bottom-left corner
          }
        }
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [tiles, weight, seed]);

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={ref}
        width={SIZE}
        height={SIZE}
        className="aspect-square w-full rounded-btn border border-line2"
        role="img"
        aria-label={`Truchet tiling, ${tiles} by ${tiles}`}
      />
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setSeed((v) => v + 1)}
          className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
        >
          shuffle
        </button>
      </div>
      <Slider label="grid" min={4} max={24} step={1} value={tiles} onChange={setTiles} display={`${tiles}×${tiles}`} />
      <Slider label="line weight" min={1} max={6} step={0.5} value={weight} onChange={setWeight} display={weight.toFixed(1)} />
    </div>
  );
}
