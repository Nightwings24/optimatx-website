import { catVar } from "@/lib/categories";
import type { Stat } from "@/content/stats";

// The "A quick sum" stat band (design.md §6.6): one bordered rounded surface
// split into cells by hairline dividers, each a big numeral + mono caption.
export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface sm:flex-row">
      {stats.map((s, i) => (
        <div
          key={s.caption}
          className={
            "flex flex-1 flex-col items-center gap-1 px-6 py-8 text-center " +
            (i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : "")
          }
        >
          <span
            className="text-[42px] font-extrabold leading-none tracking-tight"
            style={{ color: catVar(s.color) }}
          >
            {s.value}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink3">
            {s.caption}
          </span>
        </div>
      ))}
    </div>
  );
}
