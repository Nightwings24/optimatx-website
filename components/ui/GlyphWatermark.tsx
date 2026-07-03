import { cn } from "@/lib/cn";

// Oversized operator-glyph watermark (design.md §7). Decorative, so aria-hidden.
// `color` is any CSS color string (a category `var(--…)` or e.g. white on a
// dark box); keep opacity faint (8-16%).
export function GlyphWatermark({
  glyph,
  color = "var(--accent)",
  opacity = 0.12,
  size = 104,
  className,
}: {
  glyph: string;
  color?: string;
  opacity?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      style={{ color, opacity, fontSize: size }}
      className={cn(
        "pointer-events-none absolute -right-2 -top-5 select-none font-extrabold leading-none",
        className
      )}
    >
      {glyph}
    </span>
  );
}
