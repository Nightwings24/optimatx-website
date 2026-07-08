"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ramp } from "@/lib/artcolor";
import { Slider } from "@/components/ui/Slider";
import { cn } from "@/lib/cn";

// Gray-Scott reaction-diffusion: two chemicals diffuse and react, and Turing
// patterns - coral, spots, mazes, self-replicating mitosis - grow and breathe.
// This is the gallery's one animated piece: it runs a requestAnimationFrame loop
// that respects prefers-reduced-motion (starts paused) and pauses when scrolled
// offscreen (IntersectionObserver), the template for any future animated piece.
const N = 200;
const DU = 1.0;
const DV = 0.5;

const presets: { name: string; F: number; k: number }[] = [
  { name: "Coral", F: 0.0545, k: 0.062 },
  { name: "Mitosis", F: 0.0367, k: 0.0649 },
  { name: "Worms", F: 0.058, k: 0.065 },
  { name: "Spots", F: 0.03, k: 0.062 },
  { name: "Maze", F: 0.029, k: 0.057 },
];

interface Buffers {
  u: Float32Array;
  v: Float32Array;
  un: Float32Array;
  vn: Float32Array;
}

export function GrayScott() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const bufRef = useRef<Buffers | null>(null);
  const fRef = useRef(0.0545);
  const kRef = useRef(0.062);
  const speedRef = useRef(8);

  const [preset, setPreset] = useState("Coral");
  const [F, setF] = useState(0.0545);
  const [k, setK] = useState(0.062);
  const [speed, setSpeed] = useState(8);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);

  fRef.current = F;
  kRef.current = k;
  speedRef.current = speed;

  const step = useCallback(() => {
    const b = bufRef.current;
    if (!b) return;
    const { u, v, un, vn } = b;
    const f = fRef.current;
    const kk = kRef.current;
    for (let y = 0; y < N; y++) {
      const ym = (y - 1 + N) % N;
      const yp = (y + 1) % N;
      const row = y * N;
      const rowM = ym * N;
      const rowP = yp * N;
      for (let x = 0; x < N; x++) {
        const xm = (x - 1 + N) % N;
        const xp = (x + 1) % N;
        const i = row + x;
        const cu = u[i];
        const cv = v[i];
        const lapU =
          -cu +
          0.2 * (u[row + xm] + u[row + xp] + u[rowM + x] + u[rowP + x]) +
          0.05 * (u[rowM + xm] + u[rowM + xp] + u[rowP + xm] + u[rowP + xp]);
        const lapV =
          -cv +
          0.2 * (v[row + xm] + v[row + xp] + v[rowM + x] + v[rowP + x]) +
          0.05 * (v[rowM + xm] + v[rowM + xp] + v[rowP + xm] + v[rowP + xp]);
        const uvv = cu * cv * cv;
        un[i] = cu + (DU * lapU - uvv + f * (1 - cu));
        vn[i] = cv + (DV * lapV + uvv - (f + kk) * cv);
      }
    }
    b.u = un;
    b.un = u;
    b.v = vn;
    b.vn = v;
  }, []);

  const render = useCallback(() => {
    const ctx = ctxRef.current;
    const b = bufRef.current;
    if (!ctx || !b) return;
    const img = ctx.createImageData(N, N);
    const data = img.data;
    const v = b.v;
    for (let i = 0; i < v.length; i++) {
      const [r, g, bl] = ramp(Math.min(1, v[i] * 4.5));
      const o = i * 4;
      data[o] = r;
      data[o + 1] = g;
      data[o + 2] = bl;
      data[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }, []);

  const seed = useCallback(() => {
    if (!bufRef.current) {
      bufRef.current = {
        u: new Float32Array(N * N),
        v: new Float32Array(N * N),
        un: new Float32Array(N * N),
        vn: new Float32Array(N * N),
      };
    }
    const { u, v } = bufRef.current;
    u.fill(1);
    v.fill(0);
    // scatter a handful of seed blobs to break symmetry
    for (let s = 0; s < 24; s++) {
      const cx = 12 + Math.floor(Math.random() * (N - 24));
      const cy = 12 + Math.floor(Math.random() * (N - 24));
      const r = 3 + Math.floor(Math.random() * 4);
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (dx * dx + dy * dy <= r * r) v[(cy + dy) * N + (cx + dx)] = 0.5;
        }
      }
    }
    // warm up so a pattern is visible immediately (matters when paused)
    for (let i = 0; i < 200; i++) step();
    render();
  }, [step, render]);

  // set up the canvas + initial seed once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d");
    seed();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  }, [seed]);

  // pause when scrolled offscreen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(canvas);
    return () => io.disconnect();
  }, []);

  // the animation loop - only runs while playing AND on screen
  useEffect(() => {
    if (!playing || !visible) return;
    let raf = 0;
    const frame = () => {
      const steps = speedRef.current;
      for (let s = 0; s < steps; s++) step();
      render();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [playing, visible, step, render]);

  function applyPreset(p: { name: string; F: number; k: number }) {
    setPreset(p.name);
    setF(p.F);
    setK(p.k);
    fRef.current = p.F;
    kRef.current = p.k;
    seed();
  }

  function paint(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const b = bufRef.current;
    if (!canvas || !b) return;
    const rect = canvas.getBoundingClientRect();
    const gx = Math.floor(((e.clientX - rect.left) / rect.width) * N);
    const gy = Math.floor(((e.clientY - rect.top) / rect.height) * N);
    for (let dy = -6; dy <= 6; dy++) {
      for (let dx = -6; dx <= 6; dx++) {
        const x = gx + dx;
        const y = gy + dy;
        if (x >= 0 && x < N && y >= 0 && y < N && dx * dx + dy * dy <= 36) {
          b.v[y * N + x] = 0.6;
        }
      }
    }
    render();
  }

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={canvasRef}
        width={N}
        height={N}
        onClick={paint}
        className="aspect-square w-full cursor-crosshair rounded-btn border border-line2"
        role="img"
        aria-label="Gray-Scott reaction-diffusion simulation"
      />
      <p className="font-mono text-[11px] text-ink3">click to seed more · {playing ? "running" : "paused"}</p>
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="rounded-full border border-accent px-2.5 py-1 font-mono text-[11px] text-accent transition-colors hover:bg-accent hover:text-white"
        >
          {playing ? "pause" : "play"}
        </button>
        {presets.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => applyPreset(p)}
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors",
              preset === p.name
                ? "border-accent text-accent"
                : "border-line2 text-ink2 hover:border-accent hover:text-accent"
            )}
          >
            {p.name}
          </button>
        ))}
        <button
          type="button"
          onClick={seed}
          className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
        >
          reseed
        </button>
      </div>
      <Slider label="feed (F)" min={0.01} max={0.08} step={0.0005} value={F} onChange={setF} display={F.toFixed(4)} />
      <Slider label="kill (k)" min={0.045} max={0.07} step={0.0005} value={k} onChange={setK} display={k.toFixed(4)} />
      <Slider label="speed" min={1} max={16} step={1} value={speed} onChange={setSpeed} display={`${speed}×`} />
    </div>
  );
}
