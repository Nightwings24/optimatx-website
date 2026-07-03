import { catVar, type CategoryColor } from "@/lib/categories";
import { cn } from "@/lib/cn";

// Tinted glyph chip (design.md §6.3) - a 42px rounded square, category-tinted
// background, glyph in the category color.
export function IconChip({
  glyph,
  color,
  size = 42,
  className,
}: {
  glyph: string;
  color: CategoryColor;
  size?: number;
  className?: string;
}) {
  const c = catVar(color);
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        color: c,
        background: `color-mix(in srgb, ${c} 15%, transparent)`,
      }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-icon font-bold",
        className
      )}
    >
      <span style={{ fontSize: size * 0.5 }}>{glyph}</span>
    </span>
  );
}
