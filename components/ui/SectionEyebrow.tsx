import { catVar, type CategoryColor } from "@/lib/categories";
import { cn } from "@/lib/cn";

// Mono eyebrow (design.md §4, §7): an optional equation-ref number "(1)" and/or
// a pulsing status dot, then the label. Used above every H2 and as the hero
// eyebrow.
export function SectionEyebrow({
  num,
  dot,
  color = "accent",
  children,
  className,
}: {
  num?: string;
  dot?: boolean;
  color?: CategoryColor;
  children?: React.ReactNode;
  className?: string;
}) {
  const c = catVar(color);
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em]",
        className
      )}
    >
      {num && (
        <span style={{ color: c }} className="font-bold">
          {num}
        </span>
      )}
      {dot && (
        <span
          aria-hidden
          style={{ background: c }}
          className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
        />
      )}
      {children && <span className="text-ink2">{children}</span>}
    </p>
  );
}
