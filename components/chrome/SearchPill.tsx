"use client";

import { useCommandPalette } from "./CommandPalette";
import { Kbd } from "@/components/ui/Kbd";
import { cn } from "@/lib/cn";

// The ⌘K search pill in the nav (design.md §6.1). Opens the command palette.
// Collapses to a single ⌕ icon on narrow screens.
export function SearchPill({
  compact,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const { open } = useCommandPalette();

  if (compact) {
    return (
      <button
        type="button"
        onClick={open}
        aria-label="Search"
        className={cn(
          "inline-flex h-[38px] w-[38px] items-center justify-center rounded-btn border-[1.5px] border-line2 text-ink2 transition-colors hover:border-accent hover:text-accent",
          className
        )}
      >
        ⌕
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-[1.5px] border-line2 bg-bg2/60 px-3.5 py-2 text-[13px] text-ink3 transition-colors hover:border-accent/60 hover:text-ink2",
        className
      )}
    >
      <span aria-hidden>⌕</span>
      <span>Search theorems…</span>
      <Kbd className="ml-1">⌘K</Kbd>
    </button>
  );
}
