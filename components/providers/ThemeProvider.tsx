"use client";

import { ThemeProvider as NextThemes } from "next-themes";

// Drives the whole token swap via a `data-theme` attribute on <html>.
// next-themes injects a blocking <head> script at build time, so there is no
// flash of the wrong theme even under static export (design.md §9, §2).
// enableSystem is off; first-time visitors land in light mode, and the toggle
// persists their choice for return visits.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemes>
  );
}
