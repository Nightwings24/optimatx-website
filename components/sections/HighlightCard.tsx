import Link from "next/link";
import { catStyle, catVar } from "@/lib/categories";
import { IconChip } from "@/components/ui/IconChip";
import { Tag } from "@/components/ui/Tag";
import { GlyphWatermark } from "@/components/ui/GlyphWatermark";
import type { HighlightCardData } from "@/content/cards";

// The highlighted content box (design.md §6.3): flat at rest, on hover it lifts
// and snaps a colored hard-offset shadow in its own category color. The whole
// card is the click target.
export function HighlightCard({ card }: { card: HighlightCardData }) {
  return (
    <Link
      href={card.href}
      style={catStyle(card.color)}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface p-6 transition-[transform,box-shadow] duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[8px_8px_0_var(--cat)]"
    >
      <GlyphWatermark glyph={card.glyph} color={catVar(card.color)} opacity={0.14} />
      <div className="relative flex items-center justify-between">
        <IconChip glyph={card.glyph} color={card.color} />
        <Tag color={card.color}>{card.tag}</Tag>
      </div>
      <div className="relative">
        <h3 className="text-[18px] font-bold tracking-tight text-ink">
          {card.title}
        </h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink2">
          {card.description}
        </p>
      </div>
      <span
        className="relative mt-auto font-mono text-[13px] font-bold"
        style={{ color: catVar(card.color) }}
      >
        {card.affordance}
      </span>
    </Link>
  );
}
