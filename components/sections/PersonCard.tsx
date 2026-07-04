import Image from "next/image";
import { catStyle, catVar } from "@/lib/categories";
import { asset } from "@/lib/assets";
import { GlyphWatermark } from "@/components/ui/GlyphWatermark";
import type { Member } from "@/content/team";

// Team person card (design.md §6.3 person variant). Falls back to an initials
// monogram when a photo is missing so nothing ever renders broken.
function initials(name: string): string {
  return name
    .replace(/^(Prof\.|Dr\.)\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const socialLabel: Record<Member["socials"][number]["platform"], string> = {
  instagram: "Instagram",
  github: "GitHub",
  linkedin: "LinkedIn",
  email: "Email",
  website: "Website",
};

export function PersonCard({ member }: { member: Member }) {
  const c = catVar(member.color);
  return (
    <div
      style={catStyle(member.color)}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface p-6 transition-[transform,box-shadow] duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[8px_8px_0_var(--cat)]"
    >
      <GlyphWatermark glyph="φ" color={c} opacity={0.1} />
      <div className="relative flex items-center gap-4">
        {member.photo ? (
          <Image
            src={asset(member.photo)}
            alt={member.name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border-[1.5px] border-line2 object-cover"
          />
        ) : (
          <span
            aria-hidden
            style={{
              color: c,
              background: `color-mix(in srgb, ${c} 15%, transparent)`,
            }}
            className="flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-line2 font-mono text-lg font-bold"
          >
            {initials(member.name)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-[17px] font-bold tracking-tight text-ink">
            {member.name}
          </h3>
          <p className="text-[13px] font-medium" style={{ color: c }}>
            {member.role}
          </p>
          <p className="text-[12px] text-ink3">{member.year}</p>
        </div>
      </div>

      <p className="relative border-l-2 border-line2 pl-3 text-[13.5px] italic leading-relaxed text-ink2">
        {member.quote}
      </p>

      {member.socials.length > 0 && (
        <div className="relative mt-auto flex flex-wrap gap-3 pt-1 font-mono text-[11px] uppercase tracking-wide">
          {member.socials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-ink3 transition-colors hover:text-accent"
            >
              {socialLabel[s.platform]}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
