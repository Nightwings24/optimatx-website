import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Giscus } from "@/components/islands/Giscus";

export const metadata: Metadata = {
  title: "Discuss",
  description:
    "The OptimatX discussion board - ask questions, share problems, and argue about math. Every blog post and problem also has its own thread.",
};

const DISCUSSIONS_URL =
  "https://github.com/Nightwings24/optimatx-website/discussions";

export default function DiscussPage() {
  return (
    <>
      <PageHeader
        eyebrow="Discussion board"
        title="Argue about math."
        lead="Ask questions, share a problem you're stuck on, or start something. Sign in with GitHub to post - every blog post and problem page also has its own thread."
      />

      <section className="container-site pb-16">
        <SectionEyebrow color="accent" dot>
          General thread
        </SectionEyebrow>
        <div className="mt-6 max-w-3xl">
          <Giscus term="general" />
        </div>
      </section>

      <section className="container-site pb-20">
        <div className="flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-card border-[1.5px] border-line2 bg-surface p-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">
              Want the full board?
            </p>
            <p className="mt-1 text-[15px] font-bold text-ink">
              Browse every thread on GitHub Discussions.
            </p>
          </div>
          <a
            href={DISCUSSIONS_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-[14px] font-bold text-accent hover:underline"
          >
            Open Discussions ↗
          </a>
        </div>
      </section>
    </>
  );
}
