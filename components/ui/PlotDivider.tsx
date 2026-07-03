import { cn } from "@/lib/cn";

// A small on-brand function-plot divider (design.md §7): a single luminous sine
// curve on a faint axis, with key points. Decorative → aria-hidden. Avoids
// orbital/field figures (those read as physics, not math).
export function PlotDivider({ className }: { className?: string }) {
  const w = 1200;
  const h = 120;
  const mid = h / 2;
  const amp = 34;
  // y = mid - amp * sin(x), sampled across the width
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const x = (i / 120) * w;
    const y = mid - amp * Math.sin((i / 120) * Math.PI * 4);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn("h-16 w-full", className)}
    >
      <defs>
        <filter id="plot-glow" x="-5%" y="-40%" width="110%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* axis */}
      <line
        x1="0"
        y1={mid}
        x2={w}
        y2={mid}
        stroke="var(--line2)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      {/* curve */}
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#plot-glow)"
      />
      {/* key points where the curve meets the axis */}
      {[0, 30, 60, 90, 120].map((i) => (
        <circle
          key={i}
          cx={(i / 120) * w}
          cy={mid}
          r="3.5"
          fill="var(--magenta)"
        />
      ))}
    </svg>
  );
}
