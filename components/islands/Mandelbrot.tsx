"use client";

import { useEffect, useRef, useState } from "react";
import { ramp } from "@/lib/artcolor";
import { Slider } from "@/components/ui/Slider";

// Mandelbrot set: iterate z -> z^2 + c with z0 = 0 and c = the pixel's complex
// coordinate; colour by how fast it escapes. (The Julia set in this gallery
// fixes c and varies z0 - here it's the mirror image.) Uses the normalized,
// continuous escape count for smooth, band-free colour.
const SIZE = 340;
const LOG2 = Math.log(2);
const BAIL = 256;

const presets = [
  { name: "Home", cx: -0.5, cy: 0, zoom: 1 },
  { name: "Seahorse", cx: -0.745, cy: 0.113, zoom: 30 },
  { name: "Elephant", cx: 0.275, cy: 0.007, zoom: 30 },
  { name: "Spiral", cx: -0.088, cy: 0.654, zoom: 60 },
];

export function Mandelbrot() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [cx, setCx] = useState(-0.5);
  const [cy, setCy] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [maxIter, setMaxIter] = useState(160);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    const raf = requestAnimationFrame(() => {
      const img = context.createImageData(SIZE, SIZE);
      const data = img.data;
      const halfW = 1.5 / zoom;
      for (let py = 0; py < SIZE; py++) {
        const y0 = cy + ((py - SIZE / 2) / (SIZE / 2)) * halfW;
        for (let px = 0; px < SIZE; px++) {
          const x0 = cx + ((px - SIZE / 2) / (SIZE / 2)) * halfW;
          let zx = 0;
          let zy = 0;
          let it = 0;
          while (zx * zx + zy * zy <= BAIL * BAIL && it < maxIter) {
            const xt = zx * zx - zy * zy + x0;
            zy = 2 * zx * zy + y0;
            zx = xt;
            it++;
          }
          const o = (py * SIZE + px) * 4;
          if (it >= maxIter) {
            data[o] = 11;
            data[o + 1] = 13;
            data[o + 2] = 20;
          } else {
            const mag = Math.sqrt(zx * zx + zy * zy);
            const nu = it + 1 - Math.log(Math.log(mag)) / LOG2;
            let t = 0.06 * nu + offset;
            t -= Math.floor(t);
            const [r, g, b] = ramp(t);
            data[o] = r;
            data[o + 1] = g;
            data[o + 2] = b;
          }
          data[o + 3] = 255;
        }
      }
      context.putImageData(img, 0, 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [cx, cy, zoom, maxIter, offset]);

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={ref}
        width={SIZE}
        height={SIZE}
        className="aspect-square w-full rounded-btn border border-line2"
        role="img"
        aria-label="Mandelbrot set"
      />
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => {
              setCx(p.cx);
              setCy(p.cy);
              setZoom(p.zoom);
            }}
            className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
          >
            {p.name}
          </button>
        ))}
      </div>
      <Slider label="zoom" min={1} max={200} step={1} value={zoom} onChange={setZoom} display={`${zoom}×`} />
      <Slider label="center x" min={-2} max={1} step={0.001} value={cx} onChange={setCx} display={cx.toFixed(3)} />
      <Slider label="center y" min={-1.5} max={1.5} step={0.001} value={cy} onChange={setCy} display={cy.toFixed(3)} />
      <Slider label="iterations" min={50} max={400} step={10} value={maxIter} onChange={setMaxIter} display={String(maxIter)} />
      <Slider label="palette" min={0} max={1} step={0.01} value={offset} onChange={setOffset} display={offset.toFixed(2)} />
    </div>
  );
}
