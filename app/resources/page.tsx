import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { IconChip } from "@/components/ui/IconChip";
import { CurriculumMap } from "@/components/sections/CurriculumMap";
import { CtaBand } from "@/components/sections/CtaBand";
import { catStyle, catVar } from "@/lib/categories";
import { roadmaps, resourceGroups, courses, type RoadmapStep } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources & Roadmaps",
  description:
    "Curated notes, reading lists, and topic roadmaps for analysis, algebra, probability, optimization, and competition math.",
};

function StepLink({ step }: { step: RoadmapStep }) {
  if (!step.href) {
    return <span className="font-medium text-ink">{step.title}</span>;
  }
  if (step.href.startsWith("/")) {
    return (
      <Link href={step.href} className="font-medium text-accent hover:underline">
        {step.title} →
      </Link>
    );
  }
  return (
    <a
      href={step.href}
      target="_blank"
      rel="noreferrer noopener"
      className="font-medium text-accent hover:underline"
    >
      {step.title} ↗
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources & Roadmaps"
        title="Learn anything."
        lead="Where to start, what to read next, and the best of the free internet - curated by topic. Pick a roadmap and follow the path."
        color="lime"
      />

      {/* Roadmaps */}
      <section className="container-site pb-16">
        <SectionEyebrow color="lime">Roadmaps</SectionEyebrow>
        <h2 className="mb-6 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          Follow the path
        </h2>
        <div className="space-y-3">
          {roadmaps.map((r) => (
            <details
              key={r.id}
              style={catStyle(r.color)}
              className="group overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
                <IconChip glyph={r.glyph} color={r.color} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[17px] font-bold tracking-tight text-ink">
                    {r.topic}
                  </h3>
                  <p className="text-[13.5px] leading-snug text-ink2">{r.blurb}</p>
                </div>
                <span
                  aria-hidden
                  className="font-mono transition-transform group-open:rotate-90"
                  style={{ color: catVar(r.color) }}
                >
                  ▸
                </span>
              </summary>
              <ol className="space-y-3 border-t border-line px-5 py-4">
                {r.steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line2 font-mono text-[11px] font-bold"
                      style={{ color: catVar(r.color) }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-[14px]">
                        <StepLink step={s} />
                      </div>
                      <div className="text-[13px] leading-relaxed text-ink2">
                        {s.detail}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </details>
          ))}
        </div>
      </section>

      {/* Curriculum map */}
      <section className="container-site pb-16">
        <SectionEyebrow color="amber">Curriculum</SectionEyebrow>
        <h2 className="mb-2 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          How it fits together
        </h2>
        <p className="mb-6 max-w-2xl text-[15px] text-ink2">
          A rough prerequisite map - arrows point from what you need first to
          what it unlocks.
        </p>
        <CurriculumMap />
      </section>

      {/* Curated links */}
      <section className="container-site pb-16">
        <SectionEyebrow color="accent">Library</SectionEyebrow>
        <h2 className="mb-6 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          Curated links
        </h2>
        <div className="grid gap-[18px] md:grid-cols-3">
          {resourceGroups.map((g) => (
            <div
              key={g.heading}
              className="rounded-card border-[1.5px] border-line2 bg-surface p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <IconChip glyph={g.glyph} color={g.color} size={34} />
                <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
                  {g.heading}
                </h3>
              </div>
              <ul className="space-y-4">
                {g.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[15px] font-semibold text-ink transition-colors hover:text-accent"
                    >
                      {item.label} ↗
                    </a>
                    <p className="text-[13px] leading-relaxed text-ink2">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Course notes */}
      <section className="container-site pb-16">
        <SectionEyebrow color="violet">Notes</SectionEyebrow>
        <h2 className="mb-2 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          Course notes
        </h2>
        <p className="mb-6 max-w-2xl text-[15px] text-ink2">
          Notes for the core courses, written by members. Want to contribute a
          set?{" "}
          <Link href="/join" className="text-accent hover:underline">
            Join us
          </Link>{" "}
          and add yours.
        </p>
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div
              key={c.name}
              className="rounded-card border-[1.5px] border-line2 bg-surface p-5"
            >
              <h3 className="text-[16px] font-bold text-ink">{c.name}</h3>
              <p className="mt-1 text-[13px] text-ink2">{c.note}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink3">
                Notes coming soon
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site pb-8">
        <CtaBand
          title="Found something great?"
          subtitle="This library grows when members add to it. Share the resource that made a topic finally click."
          primary={{ label: "Join OptimatX →", href: "/join" }}
          secondary={{ label: "Read the blog", href: "/blog" }}
        />
      </section>
    </>
  );
}
