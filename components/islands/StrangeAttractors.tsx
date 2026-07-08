"use client";

import { useEffect, useRef, useState } from "react";
import { ramp } from "@/lib/artcolor";
import { Slider } from "@/components/ui/Slider";
import { cn } from "@/lib/cn";

// Strange attractors (De Jong + Clifford). Iterate a 2D trig map ~1M times and
// accumulate a density histogram - the number of hits per pixel - then map
// density through the colour ramp with a log/gamma curve. That histogram trick
// (Paul Bourke's) is what gives the smooth glow; naive point plotting is grainy.
const SIZE = 360;
const ITER = 1_200_000;

type MapName = "clifford" | "dejong";
type Params = [number, number, number, number];

function stepMap(map: MapName, x: number, y: number, p: Params): [number, number] {
  const [a, b, c, d] = p;
  if (map === "dejong") {
    return [Math.sin(a * y) - Math.cos(b * x), Math.sin(c * x) - Math.cos(d * y)];
  }
  return [Math.sin(a * y) + c * Math.cos(a * x), Math.sin(b * x) + d * Math.cos(b * y)];
}

const presets: Record<MapName, { name: string; v: Params }[]> = {
  clifford: [
    { name: "Dream", v: [-1.4, 1.6, 1.0, 0.7] },
    { name: "Rings", v: [1.7, 1.7, 0.6, 1.2] },
    { name: "Ribbon", v: [1.6, -0.6, -1.2, 1.6] },
    { name: "Veil", v: [-1.7, 1.3, -0.1, -1.2] },
  ],
  dejong: [
    { name: "Dust", v: [1.641, 1.902, 0.316, 1.525] },
    { name: "Web", v: [0.97, -1.899, 1.381, -1.506] },
    { name: "Legs", v: [2.01, -2.53, 1.61, -0.33] },
    { name: "Swirl", v: [-2.7, -0.09, -0.86, -2.2] },
  ],
};

export function StrangeAttractors() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [map, setMap] = useState<MapName>("clifford");
  const [p, setP] = useState<Params>([-1.4, 1.6, 1.0, 0.7]);
  const [gamma, setGamma] = useState(0.45);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    const raf = requestAnimationFrame(() => {
      // 1) sample the attractor's bounding box
      let x = 0.1;
      let y = 0.1;
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (let i = 0; i < 12000; i++) {
        [x, y] = stepMap(map, x, y, p);
        if (i > 1000) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
      const spanX = maxX - minX || 1;
      const spanY = maxY - minY || 1;
      minX -= spanX * 0.06;
      minY -= spanY * 0.06;
      const scale = (SIZE - 1) / Math.max(spanX * 1.12, spanY * 1.12);
      const offX = (SIZE - scale * spanX * 1.12) / 2;
      const offY = (SIZE - scale * spanY * 1.12) / 2;

      // 2) accumulate the density histogram
      const grid = new Float32Array(SIZE * SIZE);
      x = 0.1;
      y = 0.1;
      let maxD = 0;
      for (let i = 0; i < ITER; i++) {
        [x, y] = stepMap(map, x, y, p);
        if (i < 20) continue;
        const px = Math.floor(offX + (x - minX) * scale);
        const py = Math.floor(offY + (y - minY) * scale);
        if (px >= 0 && px < SIZE && py >= 0 && py < SIZE) {
          const v = ++grid[py * SIZE + px];
          if (v > maxD) maxD = v;
        }
      }

      // 3) density -> colour
      const img = context.createImageData(SIZE, SIZE);
      const data = img.data;
      const logMax = Math.log(1 + maxD) || 1;
      for (let i = 0; i < grid.length; i++) {
        const hits = grid[i];
        const t = hits === 0 ? 0 : Math.pow(Math.log(1 + hits) / logMax, gamma);
        const [r, g, b] = ramp(t);
        const o = i * 4;
        data[o] = r;
        data[o + 1] = g;
        data[o + 2] = b;
        data[o + 3] = 255;
      }
      context.putImageData(img, 0, 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [map, p, gamma]);

  const setOne = (i: number, val: number) =>
    setP((prev) => {
      const next = [...prev] as Params;
      next[i] = val;
      return next;
    });

  const labels = ["a", "b", "c", "d"];

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={ref}
        width={SIZE}
        height={SIZE}
        className="aspect-square w-full rounded-btn border border-line2"
        role="img"
        aria-label={`${map} strange attractor`}
      />
      <div className="flex flex-wrap gap-1.5">
        {(["clifford", "dejong"] as MapName[]).map((mn) => (
          <button
            key={mn}
            type="button"
            onClick={() => {
              setMap(mn);
              setP(presets[mn][0].v);
            }}
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors",
              map === mn
                ? "border-accent text-accent"
                : "border-line2 text-ink2 hover:border-accent hover:text-accent"
            )}
          >
            {mn === "clifford" ? "Clifford" : "De Jong"}
          </button>
        ))}
        <span aria-hidden className="mx-1 self-center text-line2">
          |
        </span>
        {presets[map].map((pr) => (
          <button
            key={pr.name}
            type="button"
            onClick={() => setP(pr.v)}
            className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
          >
            {pr.name}
          </button>
        ))}
      </div>
      {labels.map((lab, i) => (
        <Slider
          key={lab}
          label={lab}
          min={-3}
          max={3}
          step={0.001}
          value={p[i]}
          onChange={(v) => setOne(i, v)}
          display={p[i].toFixed(3)}
        />
      ))}
      <Slider label="glow" min={0.2} max={1} step={0.01} value={gamma} onChange={setGamma} display={gamma.toFixed(2)} />
    </div>
  );
}
