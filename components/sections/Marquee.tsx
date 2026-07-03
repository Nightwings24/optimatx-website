import { marqueeTokens } from "@/content/marquee";
import { catVar, type CategoryColor } from "@/lib/categories";

// Full-bleed scrolling marquee band (design.md §6.5). The track holds two
// identical copies of the sequence and animates translateX 0 → -50% for a
// seamless loop; the second copy is aria-hidden.
const glyphColors: CategoryColor[] = [
  "accent",
  "amber",
  "magenta",
  "lime",
  "violet",
];

function Sequence({ hidden }: { hidden?: boolean }) {
  let glyphIndex = 0;
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {marqueeTokens.map((t, i) => {
        if (t.kind === "glyph") {
          const color = glyphColors[glyphIndex % glyphColors.length];
          glyphIndex++;
          return (
            <span
              key={i}
              className="px-6 text-[20px]"
              style={{ color: catVar(color) }}
            >
              {t.text}
            </span>
          );
        }
        return (
          <span
            key={i}
            className="px-6 text-[18px] font-bold uppercase tracking-[0.1em] text-onbox"
          >
            {t.text}
          </span>
        );
      })}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-boxline bg-box py-3.5">
      <div className="animate-marquee flex w-max">
        <Sequence />
        <Sequence hidden />
      </div>
    </div>
  );
}
