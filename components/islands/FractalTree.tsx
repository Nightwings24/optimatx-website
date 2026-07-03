"use client";

import { useState } from "react";
import { ramp } from "@/lib/artcolor";
import { Slider } from "@/components/ui/Slider";

// Recursive binary tree: each branch splits into two at +/- the branch angle,
// each shorter than its parent. One rule, applied all the way down. Grouped into
// one path per depth (a dozen elements) so slider drags stay smooth.
const W = 800;
const H = 440;
const RATIO = 0.72;

function build(angleDeg: number, maxDepth: number): string[] {
  const paths: string[] = Array.from({ length: maxDepth + 1 }, () => "");
  const branch = (angleDeg * Math.PI) / 180;
  function rec(x: number, y: number, dir: number, len: number, depth: number) {
    const x2 = x + len * Math.cos(dir);
    const y2 = y + len * Math.sin(dir);
    paths[depth] += `M${x.toFixed(1)} ${y.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
    if (depth < maxDepth) {
      const nl = len * RATIO;
      rec(x2, y2, dir - branch, nl, depth + 1);
      rec(x2, y2, dir + branch, nl, depth + 1);
    }
  }
  rec(W / 2, H - 8, -Math.PI / 2, 120, 0);
  return paths;
}

export function FractalTree() {
  const [angle, setAngle] = useState(26);
  const [depth, setDepth] = useState(9);
  const paths = build(angle, depth);

  return (
    <div className="flex flex-col gap-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full rounded-btn border border-line2"
        role="img"
        aria-label={`Fractal tree, branch angle ${angle} degrees, depth ${depth}`}
      >
        {paths.map((d, i) => {
          const [r, g, b] = ramp(0.15 + 0.8 * (i / depth));
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={`rgb(${r},${g},${b})`}
              strokeWidth={Math.max(0.5, 4 - i * 0.4)}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <Slider label="branch angle" min={8} max={45} step={0.5} value={angle} onChange={setAngle} display={`${angle}°`} />
      <Slider label="depth" min={4} max={11} step={1} value={depth} onChange={setDepth} display={String(depth)} />
    </div>
  );
}
