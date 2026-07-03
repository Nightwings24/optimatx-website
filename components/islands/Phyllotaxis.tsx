"use client";

import { useEffect, useRef, useState } from "react";
import { ramp } from "@/lib/artcolor";
import { Slider } from "@/components/ui/Slider";

// Phyllotaxis (Vogel's model): place seed i at angle i·φ and radius √i. At the
// golden angle 137.507° the seeds pack with no gaps - the way a sunflower does.
// Nudge the angle a fraction of a degree and the spirals reorganise completely.
const SIZE = 360;
const GOLDEN = 137.5;

export function Phyllotaxis() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState(GOLDEN);
  const [count, setCount] = useState(900);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, SIZE, SIZE);
    const scale = (SIZE / 2 - 12) / Math.sqrt(count);
    const a = (angle * Math.PI) / 180;
    for (let i = 0; i < count; i++) {
      const r = scale * Math.sqrt(i);
      const th = i * a;
      const x = SIZE / 2 + r * Math.cos(th);
      const y = SIZE / 2 + r * Math.sin(th);
      const [rr, gg, bb] = ramp(i / count);
      ctx.fillStyle = `rgb(${rr},${gg},${bb})`;
      ctx.beginPath();
      ctx.arc(x, y, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [angle, count]);

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={ref}
        width={SIZE}
        height={SIZE}
        className="aspect-square w-full rounded-btn border border-line2"
        role="img"
        aria-label={`Phyllotaxis at ${angle} degrees`}
      />
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setAngle(GOLDEN)}
          className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
        >
          golden angle
        </button>
      </div>
      <Slider
        label="divergence angle"
        min={130}
        max={145}
        step={0.1}
        value={angle}
        onChange={setAngle}
        display={`${angle.toFixed(1)}°`}
      />
      <Slider
        label="seeds"
        min={200}
        max={1600}
        step={50}
        value={count}
        onChange={setCount}
        display={String(count)}
      />
    </div>
  );
}
