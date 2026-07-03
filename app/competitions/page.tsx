import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { IconChip } from "@/components/ui/IconChip";
import { CtaBand } from "@/components/sections/CtaBand";
import { catStyle, catVar } from "@/lib/categories";
import {
  competitions,
  results,
  prepTracks,
} from "@/content/competitions";

export const metadata: Metadata = {
  title: "Competitions & Prep",
  description:
    "The contests OptimatX trains for - SRMC, Simon Marais, IMC, Madhava - plus prep tracks for olympiad, quant, cryptography, and research.",
};

export default function CompetitionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Competitions & Prep"
        title="Compete, and train for it."
        lead="The contests we sit, the record we're building, and the tracks that get you ready - from olympiad proofs to quant brainteasers."
        color="amber"
      />

      {/* Contests */}
      <section className="container-site pb-16">
        <SectionEyebrow color="amber">Contests</SectionEyebrow>
        <h2 className="mb-6 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          What we sit
        </h2>
        <div className="grid gap-[18px] md:grid-cols-2">
          {competitions.map((comp) => (
            <div
              key={comp.id}
              style={catStyle(comp.color)}
              className="flex flex-col gap-3 rounded-card border-[1.5px] border-line2 bg-surface p-6"
            >
              <div className="flex items-start gap-4">
                <IconChip glyph={comp.glyph} color={comp.color} />
                <div className="min-w-0">
                  <h3 className="text-[17px] font-bold leading-snug tracking-tight text-ink">
                    {comp.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink3">
                    {comp.cadence} · {comp.scope}
                  </p>
                </div>
              </div>
              <p className="text-[14px] leading-relaxed text-ink2">
                {comp.blurb}
              </p>
              <p className="mt-auto pt-1 text-[13px] text-ink3">
                <span className="font-mono uppercase tracking-[0.1em]">
                  Eligibility:
                </span>{" "}
                {comp.eligibility}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="container-site pb-16">
        <SectionEyebrow color="lime">Record</SectionEyebrow>
        <h2 className="mb-2 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          Recent results
        </h2>
        <p className="mb-6 max-w-2xl text-[15px] text-ink2">
          A sample of how members have placed. This grows every season.
        </p>
        <div className="overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-line font-mono text-[11px] uppercase tracking-[0.1em] text-ink3">
                <th className="p-4 font-medium">Year</th>
                <th className="p-4 font-medium">Competition</th>
                <th className="p-4 font-medium">Achievement</th>
                <th className="p-4 font-medium">Who</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr
                  key={i}
                  className="border-b border-line last:border-0 text-ink2"
                >
                  <td className="p-4 font-mono text-ink">{r.year}</td>
                  <td className="p-4 font-medium text-ink">{r.competition}</td>
                  <td className="p-4">{r.achievement}</td>
                  <td className="p-4">{r.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Prep tracks */}
      <section className="container-site pb-16">
        <SectionEyebrow color="violet">Prep tracks</SectionEyebrow>
        <h2 className="mb-2 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          Pick your track
        </h2>
        <p className="mb-6 max-w-2xl text-[15px] text-ink2">
          Four ways to point your practice. Each pairs with a roadmap in
          Resources.
        </p>
        <div className="grid gap-[18px] sm:grid-cols-2">
          {prepTracks.map((t) => (
            <a
              key={t.id}
              href={t.resourceHref ?? "/resources"}
              style={catStyle(t.color)}
              className="group flex flex-col gap-3 rounded-card border-[1.5px] border-line2 bg-surface p-6 transition-[transform,box-shadow] duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_var(--cat)]"
            >
              <div className="flex items-center gap-3">
                <IconChip glyph={t.glyph} color={t.color} size={34} />
                <h3 className="text-[16px] font-bold tracking-tight text-ink">
                  {t.title}
                </h3>
              </div>
              <p className="text-[14px] leading-relaxed text-ink2">{t.blurb}</p>
              <ul className="space-y-1.5">
                {t.covers.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-[13.5px] text-ink2"
                  >
                    <span aria-hidden style={{ color: catVar(t.color) }}>
                      ▸
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <span
                className="mt-auto pt-1 font-mono text-[13px] font-bold"
                style={{ color: catVar(t.color) }}
              >
                Open the roadmap →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="container-site pb-8">
        <CtaBand
          title="Train with the circle."
          subtitle="The SRMC Prep Circle meets weekly - past papers, clean write-ups, and people who'll push you. Bring your level, whatever it is."
          primary={{ label: "Join OptimatX →", href: "/join" }}
          secondary={{ label: "See events", href: "/events" }}
        />
      </section>
    </>
  );
}
