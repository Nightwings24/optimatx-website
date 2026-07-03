import { Button } from "@/components/ui/Button";
import { catVar, type CategoryColor } from "@/lib/categories";

// Placeholder for routes that the nav/palette already point at but that aren't
// built yet (Problems, Blog, Resources, Optimization Corner). Keeps navigation
// honest and functional instead of dead-linking.
export function ComingSoon({
  glyph,
  title,
  blurb,
  color = "accent",
}: {
  glyph: string;
  title: string;
  blurb: string;
  color?: CategoryColor;
}) {
  const c = catVar(color);
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span
        aria-hidden
        style={{ color: c, background: `color-mix(in srgb, ${c} 14%, transparent)` }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] text-4xl font-bold"
      >
        {glyph}
      </span>
      <p
        className="font-mono text-[12px] uppercase tracking-[0.16em]"
        style={{ color: c }}
      >
        Coming soon
      </p>
      <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-extrabold tracking-tight text-ink">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink2">{blurb}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">← Back home</Button>
        <Button href="/join" variant="ghost">
          Join OptimatX
        </Button>
      </div>
    </section>
  );
}
