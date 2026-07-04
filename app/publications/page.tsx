import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { catStyle } from "@/lib/categories";
import { asset } from "@/lib/assets";
import { formatDate } from "@/lib/blog";
import { getAllIssues } from "@/lib/newsletter";
import { magazineIssues } from "@/content/publications";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "The Dispatch - OptimatX's fortnightly newsletter archive - and the club magazine.",
};

export default function PublicationsPage() {
  const issues = getAllIssues();
  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="What we write, on schedule."
        lead="The Dispatch is our fortnightly newsletter - every issue is archived here. The magazine is the long-form annual, in the works."
      />

      {/* Newsletter archive */}
      <section className="container-site pb-16">
        <SectionEyebrow color="accent" dot>
          The Dispatch
        </SectionEyebrow>
        <h2 className="sr-only">Newsletter archive</h2>
        {issues.length === 0 ? (
          <p className="mt-6 text-[15px] text-ink2">
            No issues yet - subscribe below and you&apos;ll get the first one.
          </p>
        ) : (
          <div className="mt-6 grid gap-[18px]">
            {issues.map((i) => (
              <Link
                key={i.slug}
                href={`/publications/${i.slug}`}
                style={catStyle("accent")}
                className="group rounded-card border-[1.5px] border-line2 bg-surface p-6 transition-[transform,box-shadow] duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_var(--cat)]"
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink3">
                  <span className="text-accent">Issue #{i.issue}</span>
                  <span aria-hidden>·</span>
                  <span>{formatDate(i.date)}</span>
                </div>
                <h3 className="mt-2 text-[20px] font-bold tracking-tight text-ink">
                  {i.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink2">
                  {i.description}
                </p>
                <span className="mt-3 inline-block font-mono text-[13px] font-bold text-accent">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Magazine */}
      <section className="container-site pb-16">
        <SectionEyebrow color="violet">Magazine</SectionEyebrow>
        <h2 className="mb-2 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          The annual, long-form
        </h2>
        {magazineIssues.length === 0 ? (
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink2">
            The first issue is in the works: member-written articles, the
            year&apos;s best problems with solutions, and the club in photos.
            Want to write for it?{" "}
            <Link href="/join" className="text-accent hover:underline">
              Join us
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {magazineIssues.map((m) => (
              <a
                key={m.id}
                href={asset(m.pdf)}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-card border-[1.5px] border-line2 bg-surface p-6 transition-colors hover:border-accent"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink3">
                  {m.dateChip}
                </p>
                <h3 className="mt-2 text-[18px] font-bold tracking-tight text-ink">
                  {m.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink2">
                  {m.blurb}
                </p>
                <span className="mt-3 inline-block font-mono text-[13px] font-bold text-accent">
                  Read the PDF ↗
                </span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Subscribe */}
      <section className="container-site pb-8">
        <NewsletterSignup />
      </section>
    </>
  );
}
