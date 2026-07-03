import { Button } from "@/components/ui/Button";
import { GlyphWatermark } from "@/components/ui/GlyphWatermark";

// The full-bleed CTA band (design.md §6.8): indigo panel, light text, two faint
// operator watermarks, a green primary + a translucent light secondary button.
export function CtaBand({
  title,
  subtitle,
  primary,
  secondary,
}: {
  title: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-boxline bg-box px-6 py-14 text-center text-onbox shadow-[0_24px_60px_rgba(8,15,40,0.35)] md:py-16">
      <GlyphWatermark
        glyph="∑"
        color="#ffffff"
        opacity={0.05}
        size={200}
        className="left-6 top-2 right-auto"
      />
      <GlyphWatermark
        glyph="∫"
        color="#ffffff"
        opacity={0.05}
        size={200}
        className="-right-2 bottom-2 top-auto"
      />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="text-balance text-[clamp(1.8rem,3.4vw,2.5rem)] font-extrabold leading-tight tracking-tight">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-onbox/75">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={primary.href} variant="primary">
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="cta-secondary">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
