"use client";

import { useEffect, useRef, useState } from "react";
import { ramp } from "@/lib/artcolor";
import { Slider } from "@/components/ui/Slider";

// Julia set: iterate z -> z^2 + c and colour each pixel by how fast it escapes.
// Recomputes on the client whenever c changes. (design.md §9 distinctive widget)
const SIZE = 340;
const MAXIT = 60;

const presets: { name: string; re: number; im: number }[] = [
  { name: "Dendrite", re: -0.8, im: 0.156 },
  { name: "Spiral", re: -0.4, im: 0.6 },
  { name: "Rabbit", re: -0.123, im: 0.745 },
  { name: "Galaxy", re: 0.285, im: 0.01 },
  { name: "Coast", re: -0.75, im: 0.09 },
];

export function JuliaSet() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [re, setRe] = useState(-0.8);
  const [im, setIm] = useState(0.156);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    // Coalesce rapid slider changes into one render per animation frame, so
    // dragging skips stale intermediate computes and stays smooth on low-end
    // devices.
    const raf = requestAnimationFrame(() => {
      const img = context.createImageData(SIZE, SIZE);
      const data = img.data;
    const scale = 3.2 / SIZE;
    const log2 = Math.log(2);

    for (let py = 0; py < SIZE; py++) {
      const y0 = (py - SIZE / 2) * scale;
      for (let px = 0; px < SIZE; px++) {
        const x0 = (px - SIZE / 2) * scale;
        let zx = x0;
        let zy = y0;
        let it = 0;
        while (zx * zx + zy * zy <= 16 && it < MAXIT) {
          const xt = zx * zx - zy * zy + re;
          zy = 2 * zx * zy + im;
          zx = xt;
          it++;
        }
        const idx = (py * SIZE + px) * 4;
        if (it >= MAXIT) {
          data[idx] = 11;
          data[idx + 1] = 13;
          data[idx + 2] = 20;
        } else {
          const mag = Math.sqrt(zx * zx + zy * zy);
          const smooth = it + 1 - Math.log(Math.log(mag)) / log2;
          const [r, g, b] = ramp(smooth / MAXIT);
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
        }
        data[idx + 3] = 255;
      }
    }
      context.putImageData(img, 0, 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [re, im]);

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={ref}
        width={SIZE}
        height={SIZE}
        className="aspect-square w-full rounded-btn border border-line2"
        aria-label={`Julia set for c = ${re.toFixed(3)} + ${im.toFixed(3)}i`}
        role="img"
      />
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => {
              setRe(p.re);
              setIm(p.im);
            }}
            className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
          >
            {p.name}
          </button>
        ))}
      </div>
      <Slider label="c (real)" min={-1} max={1} step={0.001} value={re} onChange={setRe} display={re.toFixed(3)} />
      <Slider label="c (imaginary)" min={-1} max={1} step={0.001} value={im} onChange={setIm} display={im.toFixed(3)} />
    </div>
  );
}
