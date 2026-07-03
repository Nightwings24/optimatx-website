"use client";

import { ThemeProvider as NextThemes } from "next-themes";

// Drives the whole token swap via a `data-theme` attribute on <html>.
// next-themes injects a blocking <head> script at build time, so there is no
// flash of the wrong theme even under static export (design.md §9, §2).
// Dark is the hero mood; enableSystem is off so first-time visitors land dark.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemes>
  );
}
