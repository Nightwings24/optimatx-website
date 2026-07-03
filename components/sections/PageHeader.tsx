import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { CategoryColor } from "@/lib/categories";

// The lead-in for every interior page (design.md §8): a mono eyebrow + a big
// Plus Jakarta 800 H1 + an optional lead paragraph.
export function PageHeader({
  eyebrow,
  title,
  lead,
  color = "accent",
  dot,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  color?: CategoryColor;
  dot?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <header className="container-site pb-10 pt-16 md:pt-20">
      <SectionEyebrow dot={dot} color={color}>
        {eyebrow}
      </SectionEyebrow>
      <h1 className="mt-4 max-w-3xl text-balance text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink">
        {title}
      </h1>
      {lead && (
        <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-ink2">
          {lead}
        </p>
      )}
      {children}
    </header>
  );
}
