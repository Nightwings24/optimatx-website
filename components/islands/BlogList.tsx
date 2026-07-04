"use client";

import { useState } from "react";
import Link from "next/link";
import { catStyle } from "@/lib/categories";
import { formatDate } from "@/lib/dates";
import type { PostMeta } from "@/lib/blog";
import { cn } from "@/lib/cn";

// Blog index with tag-filter chips, so series (spotlights, comics,
// proof-of-the-month) are one click away. Client-side filter over the
// build-time post list - no routes, no data fetching.
export function BlogList({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<string | null>(null);
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
  const shown = active ? posts.filter((p) => p.tags.includes(active)) : posts;

  return (
    <>
      {tags.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-1.5" role="group" aria-label="Filter posts by tag">
          {[null, ...tags].map((t) => (
            <button
              key={t ?? "all"}
              type="button"
              onClick={() => setActive(t)}
              aria-pressed={active === t}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-[12px] transition-colors",
                active === t
                  ? "border-transparent bg-accent-fill text-white"
                  : "border-line2 text-ink2 hover:border-accent hover:text-accent"
              )}
            >
              {t ?? "all"}
            </button>
          ))}
        </div>
      )}

      {shown.length === 0 ? (
        <p className="text-[15px] text-ink2">No posts with this tag yet.</p>
      ) : (
        <div className="grid gap-[18px]">
          {shown.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              style={catStyle("accent")}
              className="group rounded-card border-[1.5px] border-line2 bg-surface p-6 transition-[transform,box-shadow] duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_var(--cat)]"
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink3">
                <span>{formatDate(p.date)}</span>
                <span aria-hidden>·</span>
                <span>{p.author}</span>
              </div>
              <h2 className="mt-2 text-[20px] font-bold tracking-tight text-ink">
                {p.title}
              </h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink2">
                {p.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-tag bg-bg2 px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wide text-ink3"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[13px] font-bold text-accent">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
