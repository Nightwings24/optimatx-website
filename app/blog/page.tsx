import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { catStyle } from "@/lib/categories";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog & Articles",
  description:
    "Member-written expository math - write-ups, proofs, and deep dives.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        eyebrow="Blog & Articles"
        title="Writing."
        lead="Expository math from OptimatX members - proofs, deep dives, and things worth thinking about twice."
      />

      <section className="container-site pb-20">
        {posts.length === 0 ? (
          <p className="text-[15px] text-ink2">No posts yet - check back soon.</p>
        ) : (
          <div className="grid gap-[18px]">
            {posts.map((p) => (
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
      </section>
    </>
  );
}
