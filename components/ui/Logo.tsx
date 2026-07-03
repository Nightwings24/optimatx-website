import Image from "next/image";
import { cn } from "@/lib/cn";
// Static import (not a "/public" string src) so the URL is basePath-aware -
// next/image does not prefix basePath onto plain public-folder string srcs.
import mark from "@/public/assets/optimatx-mark.png";

// The brand lockup: the real emblem (extracted from the reference bundle) in a
// bordered rounded square + the "OptimatX" wordmark with the X in the accent
// (design.md §6.1). The full-lockup PNG isn't in the bundle, so we build the
// wordmark in markup - crisper and it recolors with the theme.
export function Logo({
  size = 38,
  showWordmark = true,
  onBox = false,
  className,
}: {
  size?: number;
  showWordmark?: boolean;
  /** when true, the wordmark uses --onbox (for the always-dark footer). */
  onBox?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={mark}
        alt="OptimatX logo"
        width={size}
        height={size}
        priority
        className="rounded-[10px] border-[1.5px] border-line2"
      />
      {showWordmark && (
        <span
          className={cn(
            "font-extrabold text-[1.15rem] tracking-tight",
            onBox ? "text-onbox" : "text-ink"
          )}
        >
          Optimat<span className="text-accent">X</span>
        </span>
      )}
    </span>
  );
}
