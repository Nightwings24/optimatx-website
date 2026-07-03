"use client";

import { useMemo, useState } from "react";
import { solveLP, type Constraint, type Point } from "@/lib/lp";
import type { LPScenario } from "@/content/lp";
import { catVar, type CategoryColor } from "@/lib/categories";
import { cn } from "@/lib/cn";

// Interactive linear-programming visualiser (design.md §9 signature widget).
// Drag the objective sliders and the optimum jumps between the corners of the
// feasible region - the whole point of the "corner-point" theorem, made visible.

const W = 520;
const H = 440;
const PAD_L = 44;
const PAD_B = 40;
const PAD_T = 24;
const PAD_R = 24;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

const constraintColors: CategoryColor[] = ["amber", "violet", "lime", "magenta"];

function fmt(n: number): string {
  const v = Math.round(n * 100) / 100;
  return Object.is(v, -0) ? "0" : String(v);
}

/** Clip the line a*x + b*y = c to the box [0,xMax]x[0,yMax]; return two points. */
function lineBoxSegment(
  a: number,
  b: number,
  c: number,
  xMax: number,
  yMax: number
): [Point, Point] | null {
  const pts: Point[] = [];
  const push = (x: number, y: number) => {
    if (x >= -1e-9 && x <= xMax + 1e-9 && y >= -1e-9 && y <= yMax + 1e-9) {
      if (!pts.some((p) => Math.abs(p.x - x) < 1e-6 && Math.abs(p.y - y) < 1e-6))
        pts.push({ x, y });
    }
  };
  if (Math.abs(b) > 1e-12) {
    push(0, c / b);
    push(xMax, (c - a * xMax) / b);
  }
  if (Math.abs(a) > 1e-12) {
    push(c / a, 0);
    push((c - b * yMax) / a, yMax);
  }
  if (pts.length < 2) return null;
  return [pts[0], pts[1]];
}

export function LPVisualizer({ scenarios }: { scenarios: LPScenario[] }) {
  const [idx, setIdx] = useState(0);
  const scenario = scenarios[idx];
  const [obj, setObj] = useState({ p: scenario.objective.p, q: scenario.objective.q });
  const [sense, setSense] = useState(scenario.sense);

  function selectScenario(i: number) {
    setIdx(i);
    setObj({ p: scenarios[i].objective.p, q: scenarios[i].objective.q });
    setSense(scenarios[i].sense);
  }
  function reset() {
    setObj({ p: scenario.objective.p, q: scenario.objective.q });
    setSense(scenario.sense);
  }

  const { xMax, yMax } = scenario.view;
  const sx = (x: number) => PAD_L + (x / xMax) * PLOT_W;
  const sy = (y: number) => PAD_T + PLOT_H - (y / yMax) * PLOT_H;

  const result = useMemo(
    () => solveLP(scenario.constraints, obj, sense, scenario.view),
    [scenario, obj, sense]
  );

  const xticks = Array.from({ length: Math.floor(xMax) + 1 }, (_, i) => i);
  const yticks = Array.from({ length: Math.floor(yMax) + 1 }, (_, i) => i);

  const polyPath =
    result.feasible.length > 0
      ? result.feasible.map((p) => `${sx(p.x)},${sy(p.y)}`).join(" ")
      : "";

  // objective iso-line through the optimum: p*x + q*y = value
  const isoSeg =
    result.optimum && (obj.p !== 0 || obj.q !== 0) && result.value !== null
      ? lineBoxSegment(obj.p, obj.q, result.value, xMax, yMax)
      : null;

  return (
    <div className="overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface">
      {/* scenario tabs */}
      <div className="flex flex-wrap gap-1 border-b border-line p-3">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => selectScenario(i)}
            className={cn(
              "rounded-full px-3 py-1.5 font-mono text-[12px] transition-colors",
              i === idx
                ? "bg-accent-fill text-white"
                : "text-ink2 hover:bg-bg2 hover:text-ink"
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-[1.4fr_1fr]">
        {/* plot */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Feasible region for ${scenario.title}`}
        >
          {/* grid */}
          {xticks.map((t) => (
            <line
              key={`gx${t}`}
              x1={sx(t)}
              y1={sy(0)}
              x2={sx(t)}
              y2={sy(yMax)}
              stroke="var(--line)"
              strokeWidth="1"
            />
          ))}
          {yticks.map((t) => (
            <line
              key={`gy${t}`}
              x1={sx(0)}
              y1={sy(t)}
              x2={sx(xMax)}
              y2={sy(t)}
              stroke="var(--line)"
              strokeWidth="1"
            />
          ))}

          {/* feasible region */}
          {polyPath && (
            <polygon
              points={polyPath}
              fill="color-mix(in srgb, var(--accent) 18%, transparent)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
          )}

          {/* constraint lines */}
          {scenario.constraints.map((con: Constraint, i) => {
            const seg = lineBoxSegment(con.a, con.b, con.c, xMax, yMax);
            if (!seg) return null;
            const color = catVar(constraintColors[i % constraintColors.length]);
            const mx = (seg[0].x + seg[1].x) / 2;
            const my = (seg[0].y + seg[1].y) / 2;
            return (
              <g key={`con${i}`}>
                <line
                  x1={sx(seg[0].x)}
                  y1={sy(seg[0].y)}
                  x2={sx(seg[1].x)}
                  y2={sy(seg[1].y)}
                  stroke={color}
                  strokeWidth="2"
                />
                {con.label && (
                  <text
                    x={sx(mx) + 6}
                    y={sy(my) - 6}
                    fill={color}
                    fontSize="11"
                    fontFamily="var(--font-mono)"
                  >
                    {con.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* objective iso-line through the optimum */}
          {isoSeg && (
            <line
              x1={sx(isoSeg[0].x)}
              y1={sy(isoSeg[0].y)}
              x2={sx(isoSeg[1].x)}
              y2={sy(isoSeg[1].y)}
              stroke="var(--accent2)"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
          )}

          {/* vertices */}
          {result.feasible.map((p, i) => (
            <circle key={`v${i}`} cx={sx(p.x)} cy={sy(p.y)} r="3" fill="var(--ink3)" />
          ))}

          {/* optimum */}
          {result.optimum && (
            <>
              <circle
                cx={sx(result.optimum.x)}
                cy={sy(result.optimum.y)}
                r="6"
                fill="var(--magenta)"
                stroke="var(--surface)"
                strokeWidth="2"
              />
              <text
                x={sx(result.optimum.x) + 10}
                y={sy(result.optimum.y) - 8}
                fill="var(--magenta)"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-mono)"
              >
                ({fmt(result.optimum.x)}, {fmt(result.optimum.y)})
              </text>
            </>
          )}

          {/* axes */}
          <line x1={sx(0)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke="var(--ink3)" strokeWidth="1.5" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(yMax)} stroke="var(--ink3)" strokeWidth="1.5" />
          {xticks.map((t) => (
            <text key={`tx${t}`} x={sx(t)} y={sy(0) + 16} fill="var(--ink3)" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">
              {t}
            </text>
          ))}
          {yticks.filter((t) => t > 0).map((t) => (
            <text key={`ty${t}`} x={sx(0) - 8} y={sy(t) + 3} fill="var(--ink3)" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">
              {t}
            </text>
          ))}
          <text x={sx(xMax)} y={sy(0) + 30} fill="var(--ink2)" fontSize="11" textAnchor="end" fontFamily="var(--font-mono)">
            {scenario.xLabel} →
          </text>
          <text x={sx(0) - 8} y={sy(yMax) - 8} fill="var(--ink2)" fontSize="11" textAnchor="start" fontFamily="var(--font-mono)">
            ↑ {scenario.yLabel}
          </text>
        </svg>

        {/* controls */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">
                Objective
              </span>
              <div className="flex rounded-full border border-line2 p-0.5">
                {(["max", "min"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSense(s)}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase transition-colors",
                      sense === s ? "bg-accent-fill text-white" : "text-ink3 hover:text-ink"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <p className="font-mono text-[15px] text-ink">
              {sense === "max" ? "maximize" : "minimize"}{" "}
              <span className="text-accent">
                {fmt(obj.p)}x + {fmt(obj.q)}y
              </span>
            </p>
          </div>

          <Slider label="x-coefficient" value={obj.p} onChange={(p) => setObj((o) => ({ ...o, p }))} />
          <Slider label="y-coefficient" value={obj.q} onChange={(q) => setObj((o) => ({ ...o, q }))} />

          <div className="rounded-btn border border-line bg-bg2 p-4">
            {result.status === "optimal" && result.optimum ? (
              <>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink3">
                    Optimum
                  </span>
                  <span className="font-mono text-[15px] text-ink">
                    ({fmt(result.optimum.x)}, {fmt(result.optimum.y)})
                  </span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink3">
                    {scenario.unit}
                  </span>
                  <span className="text-2xl font-extrabold text-accent">
                    {fmt(result.value ?? 0)}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-[14px] text-magenta">No feasible region.</p>
            )}
          </div>

          <button
            type="button"
            onClick={reset}
            className="self-start font-mono text-[12px] text-ink3 underline-offset-2 hover:text-accent hover:underline"
          >
            reset objective
          </button>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">
          {label}
        </span>
        <span className="font-mono text-[13px] text-ink">{fmt(value)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={8}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </label>
  );
}
