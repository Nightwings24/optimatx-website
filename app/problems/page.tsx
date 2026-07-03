import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { POTWCard } from "@/components/sections/POTWCard";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FormspreeForm } from "@/components/islands/FormspreeForm";
import { currentPOTW } from "@/content/potw";
import { pastProblems, type Difficulty } from "@/content/problems";
import { catStyle, catVar, type CategoryColor } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Problem of the Week",
  description:
    "A fresh problem every week, an answer checker, and a full archive with solutions.",
};

const difficultyColor: Record<Difficulty, CategoryColor> = {
  "warm-up": "accent",
  medium: "amber",
  hard: "magenta",
};

export default function ProblemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Problem of the Week"
        title="Problem of the Week."
        lead="A fresh problem every week. Check your answer instantly, submit a full solution, and browse the archive."
        color="magenta"
        dot
      />

      <section className="container-site pb-16">
        <POTWCard potw={currentPOTW} />
      </section>

      {/* Leaderboard temporarily unplugged - see the note in POTWCard.tsx */}

      <section className="container-site pb-16">
        <SectionEyebrow color="lime">Archive</SectionEyebrow>
        <h2 className="sr-only">Problem archive</h2>
        <div className="mt-6 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {pastProblems.map((p) => {
            const color = difficultyColor[p.difficulty];
            return (
              <Link
                key={p.slug}
                href={`/problems/${p.slug}`}
                style={catStyle(color)}
                className="group flex flex-col rounded-card border-[1.5px] border-line2 bg-surface p-6 transition-[transform,box-shadow] duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_var(--cat)]"
              >
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-ink3">
                  <span>#{p.number}</span>
                  <span style={{ color: catVar(color) }}>{p.difficulty}</span>
                </div>
                <h3 className="mt-2 text-[18px] font-bold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-ink2">
                  {p.prompt}
                </p>
                <span
                  className="mt-4 font-mono text-[13px] font-bold"
                  style={{ color: catVar(color) }}
                >
                  View solution →
                </span>
              </Link>
            );
          })}
        </div>
        {pastProblems.length === 0 && (
          <p className="mt-4 text-[15px] text-ink2">
            No past problems archived yet.
          </p>
        )}
      </section>

      <section id="submit" className="container-site scroll-mt-24 pb-20">
        <div className="mx-auto max-w-xl rounded-card border-[1.5px] border-line2 bg-surface p-6 md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">
            Submit a full solution
          </h2>
          <p className="mb-6 mt-2 text-[15px] text-ink2">
            Cracked this week&apos;s problem? Send us your working - the best
            write-ups get featured.
          </p>
          <FormspreeForm
            subject={`OptimatX - POTW #${currentPOTW.number} solution`}
            submitLabel="Submit solution →"
            successMessage="Got it - thanks for solving. We'll take a look."
            fields={[
              {
                name: "name",
                label: "Your name",
                required: true,
                autoComplete: "name",
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                required: true,
                autoComplete: "email",
              },
              {
                name: "solution",
                label: "Your solution",
                type: "textarea",
                required: true,
                placeholder: "Explain your reasoning…",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
