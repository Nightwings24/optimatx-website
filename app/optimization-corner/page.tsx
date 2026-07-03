import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { LPVisualizer } from "@/components/islands/LPVisualizer";
import { Katex } from "@/components/ui/Katex";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { scenarios } from "@/content/lp";

export const metadata: Metadata = {
  title: "Optimization Corner",
  description:
    "Our signature: real-world optimization case studies and an interactive linear-programming visualizer.",
};

export default function OptimizationCornerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Optimization Corner"
        title="Optimization Corner."
        lead="The club's name leans into it, so this is where we take it seriously: finding the best answer under constraints. We start where optimization is most visual - two-variable linear programming."
        color="violet"
        dot
      />

      <section className="container-site max-w-3xl pb-12">
        <div className="space-y-4 text-[16px] leading-relaxed text-ink2">
          <p>
            A <strong className="text-ink">linear program</strong> asks for the
            best value of a linear objective, subject to linear inequality
            constraints. In two variables you can draw the whole thing: each
            constraint is a half-plane, their intersection is the{" "}
            <strong className="text-ink">feasible region</strong> (a convex
            polygon), and the objective is a family of parallel lines sweeping
            across it.
          </p>
          <p>
            The key fact - the <em>corner-point theorem</em> - is that an optimal
            solution always sits at a <strong className="text-ink">vertex</strong>{" "}
            of that polygon. So optimizing is really just checking the corners.
            Drag the objective below and watch the optimum jump from corner to
            corner.
          </p>
        </div>
      </section>

      <section className="container-site pb-16">
        <SectionEyebrow color="violet">Interactive</SectionEyebrow>
        <h2 className="mb-6 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          The LP visualizer
        </h2>
        <LPVisualizer scenarios={scenarios} />
      </section>

      <section className="container-site pb-16">
        <SectionEyebrow color="lime">Case studies</SectionEyebrow>
        <h2 className="mb-6 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          Two problems, worked
        </h2>
        <div className="grid gap-[18px] md:grid-cols-2">
          {scenarios.map((s) => (
            <div
              key={s.id}
              className="flex flex-col rounded-card border-[1.5px] border-line2 bg-surface p-6"
            >
              <h3 className="text-[19px] font-bold tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink2">
                {s.story}
              </p>
              <div className="my-5 overflow-x-auto rounded-btn border border-line bg-bg2 p-4 text-ink">
                <Katex display tex={s.formulaTeX} ariaLabel={`${s.title} formulation`} />
              </div>
              <p className="mt-auto text-[14px] leading-relaxed text-ink2">
                {s.optimumNote}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site pb-8">
        <CtaBand
          title="Optimization is everywhere."
          subtitle="Scheduling, portfolios, routing, machine learning - all optimization under the hood. Come work on the real ones with us."
          primary={{ label: "Join OptimatX →", href: "/join" }}
          secondary={{ label: "Read the blog", href: "/blog" }}
        />
      </section>
    </>
  );
}
