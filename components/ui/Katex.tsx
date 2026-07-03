import katex from "katex";
import { cn } from "@/lib/cn";

/**
 * Renders a KaTeX formula at BUILD time (this is a Server Component, so
 * `renderToString` runs during static export - no client KaTeX JS ships).
 * Only `katex.min.css` is loaded (in globals.css). design.md §7.
 */
export function Katex({
  tex,
  display = false,
  className,
  ariaLabel,
}: {
  tex: string;
  display?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const html = katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    output: "html",
  });
  return (
    <span
      className={cn(display && "block", className)}
      role="math"
      aria-label={ariaLabel}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
