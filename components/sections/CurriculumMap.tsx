import { catVar, type CategoryColor } from "@/lib/categories";

// A schematic prerequisite map of the core math areas (design.md §8 "math-map").
// Static SVG: columns are foundations → core → advanced, arrows are prerequisites.

const NW = 152;
const NH = 44;

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: CategoryColor;
}

const nodes: Node[] = [
  { id: "calc", label: "Calculus", x: 20, y: 78, color: "accent" },
  { id: "linalg", label: "Linear Algebra", x: 20, y: 232, color: "accent" },
  { id: "analysis", label: "Real Analysis", x: 384, y: 28, color: "amber" },
  { id: "prob", label: "Probability", x: 384, y: 154, color: "amber" },
  { id: "absalg", label: "Abstract Algebra", x: 384, y: 280, color: "amber" },
  { id: "complex", label: "Complex Analysis", x: 748, y: 28, color: "lime" },
  { id: "opt", label: "Optimization", x: 748, y: 154, color: "lime" },
  { id: "measure", label: "Measure Theory", x: 748, y: 280, color: "lime" },
];

const edges: [string, string][] = [
  ["calc", "analysis"],
  ["calc", "prob"],
  ["linalg", "absalg"],
  ["linalg", "opt"],
  ["analysis", "complex"],
  ["analysis", "measure"],
  ["analysis", "opt"],
  ["prob", "opt"],
];

const byId = (id: string) => nodes.find((n) => n.id === id)!;

export function CurriculumMap() {
  return (
    <div className="overflow-x-auto rounded-card border-[1.5px] border-line2 bg-surface p-4">
      <svg
        viewBox="0 0 920 348"
        className="h-auto w-full min-w-[680px]"
        role="img"
        aria-label="Prerequisite map of core mathematics areas"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="var(--ink3)" />
          </marker>
        </defs>

        {/* edges (drawn first, so nodes sit on top) */}
        {edges.map(([from, to]) => {
          const s = byId(from);
          const t = byId(to);
          return (
            <line
              key={`${from}-${to}`}
              x1={s.x + NW}
              y1={s.y + NH / 2}
              x2={t.x - 4}
              y2={t.y + NH / 2}
              stroke="var(--ink3)"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
            />
          );
        })}

        {/* nodes */}
        {nodes.map((n) => {
          const c = catVar(n.color);
          return (
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={NW}
                height={NH}
                rx={10}
                fill="color-mix(in srgb, var(--surface) 100%, transparent)"
                stroke={c}
                strokeWidth="1.5"
              />
              <rect
                x={n.x}
                y={n.y}
                width={NW}
                height={NH}
                rx={10}
                fill={`color-mix(in srgb, ${c} 10%, transparent)`}
              />
              <text
                x={n.x + NW / 2}
                y={n.y + NH / 2 + 4}
                textAnchor="middle"
                fill="var(--ink)"
                fontSize="13"
                fontWeight="600"
                fontFamily="var(--font-sans)"
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* column captions */}
        {[
          { x: 96, label: "Foundations" },
          { x: 460, label: "Core" },
          { x: 824, label: "Advanced" },
        ].map((col) => (
          <text
            key={col.label}
            x={col.x}
            y={340}
            textAnchor="middle"
            fill="var(--ink3)"
            fontSize="11"
            fontFamily="var(--font-mono)"
            style={{ textTransform: "uppercase", letterSpacing: "0.14em" }}
          >
            {col.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
