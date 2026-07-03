"use client";

import { cn } from "@/lib/cn";

// Labelled range control used by the interactive art pieces.
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
  className,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  display?: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">
          {label}
        </span>
        <span className="font-mono text-[13px] text-ink">{display ?? value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </label>
  );
}
