"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

// ☀ in dark mode / ☾ in light mode (the icon of the theme you'd switch to).
// Renders a stable icon until mounted to avoid an SSR/client mismatch.
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${next} theme` : "Toggle theme"}
      onClick={() => setTheme(next)}
      className={cn(
        "inline-flex h-[38px] w-[38px] items-center justify-center rounded-btn border-[1.5px] border-line2 text-[15px] text-ink transition-colors hover:border-accent hover:text-accent",
        className
      )}
    >
      <span suppressHydrationWarning>{mounted ? (isDark ? "☀" : "☾") : "☀"}</span>
    </button>
  );
}
