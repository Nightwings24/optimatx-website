import { GlyphWatermark } from "@/components/ui/GlyphWatermark";
import { cn } from "@/lib/cn";

// The dark slab used by Problem of the Week and Contact (design.md §6.4/§6.8):
// --box background, --onbox text, a giant faint operator watermark.
export function DarkFeatureBox({
  glyph,
  glyphOpacity = 0.05,
  glyphSize = 240,
  children,
  className,
}: {
  glyph?: string;
  glyphOpacity?: number;
  glyphSize?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card border border-boxline bg-box p-8 text-onbox md:p-10",
        className
      )}
    >
      {glyph && (
        <GlyphWatermark
          glyph={glyph}
          color="#ffffff"
          opacity={glyphOpacity}
          size={glyphSize}
          className="-right-6 -top-16"
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
