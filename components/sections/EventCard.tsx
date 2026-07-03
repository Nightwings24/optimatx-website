import Link from "next/link";
import { catStyle, catVar } from "@/lib/categories";
import { detailHref, type ClubEvent } from "@/content/events";
import { cn } from "@/lib/cn";

// Event card (design.md §6.7): a soft two-accent gradient media header with a
// big glyph + a dark date pill, then the body. The whole card links to its
// details / registration target.
export function EventCard({ event }: { event: ClubEvent }) {
  const c = catVar(event.color);
  const target = detailHref(event);
  const external = target.startsWith("http");

  const inner = (
    <>
      <div
        className="relative flex h-32 items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${c} 30%, transparent), color-mix(in srgb, ${c} 8%, transparent))`,
        }}
      >
        <span
          aria-hidden
          className="select-none font-extrabold leading-none"
          style={{ color: c, opacity: 0.55, fontSize: 84 }}
        >
          {event.glyph}
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-white backdrop-blur-sm">
          {event.dateChip}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.14em]"
          style={{ color: c }}
        >
          {event.tag}
        </span>
        <h3 className="text-[18px] font-bold tracking-tight text-ink">
          {event.title}
        </h3>
        <p className="text-[14px] leading-relaxed text-ink2">{event.blurb}</p>
        <span
          className="mt-auto pt-2 font-mono text-[13px] font-bold"
          style={{ color: c }}
        >
          {event.affordance}
        </span>
      </div>
    </>
  );

  const className = cn(
    "group relative flex flex-col overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface transition-[transform,box-shadow] duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[8px_8px_0_var(--cat)]"
  );

  return external ? (
    <a
      href={target}
      target="_blank"
      rel="noreferrer noopener"
      style={catStyle(event.color)}
      className={className}
    >
      {inner}
    </a>
  ) : (
    <Link href={target} style={catStyle(event.color)} className={className}>
      {inner}
    </Link>
  );
}
