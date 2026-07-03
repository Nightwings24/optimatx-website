import { catVar, type CategoryColor } from "@/lib/categories";
import { cn } from "@/lib/cn";

// Mono category tag (design.md §6.3): "static" / "flagship" / "signature".
export function Tag({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color: CategoryColor;
  className?: string;
}) {
  const c = catVar(color);
  return (
    <span
      style={{
        color: c,
        borderColor: `color-mix(in srgb, ${c} 35%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${c} 10%, transparent)`,
      }}
      className={cn(
        "inline-flex items-center rounded-tag border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em]",
        className
      )}
    >
      {children}
    </span>
  );
}
