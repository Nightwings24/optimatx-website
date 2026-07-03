import { cn } from "@/lib/cn";

// Mono keycap for ⌘K / esc / ↵ (design.md §6.1, §6.10).
export function Kbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-[5px] border border-line2 bg-bg2 px-1.5 py-0.5 font-mono text-[11px] leading-none text-ink2",
        className
      )}
    >
      {children}
    </kbd>
  );
}
