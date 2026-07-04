import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DarkFeatureBox } from "@/components/sections/DarkFeatureBox";
import { Katex } from "@/components/ui/Katex";
import { AnswerChecker } from "@/components/islands/AnswerChecker";
import { Giscus } from "@/components/islands/Giscus";
import { problems, getProblem } from "@/content/problems";

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProblem(slug);
  if (!p) return {};
  return {
    title: `#${p.number} · ${p.title}`,
    description: p.prompt,
  };
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProblem(slug);
  if (!p) notFound();

  return (
    <article className="container-site max-w-3xl pb-24 pt-16">
      <Link
        href="/problems"
        className="font-mono text-[13px] text-ink3 transition-colors hover:text-accent"
      >
        ← Problem of the Week
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ink3">
        <span>Problem #{p.number}</span>
        <span aria-hidden>·</span>
        <span>{p.difficulty}</span>
        <span aria-hidden>·</span>
        <span>{p.status === "open" ? `closes ${p.deadline}` : "closed"}</span>
      </div>
      <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-[-0.02em] text-ink">
        {p.title}
      </h1>

      <div className="mt-8">
        <DarkFeatureBox glyph="∫">
          <p className="text-[15px] text-onbox/80">{p.prompt}</p>
          {p.formula && (
            <div className="my-5 text-[1.35rem] text-onbox">
              <Katex display tex={p.formula} ariaLabel="Problem statement" />
            </div>
          )}
          <div className="mt-6 max-w-md">
            <AnswerChecker
              accepted={p.accepted}
              placeholder={p.placeholder}
              correctMessage={p.correctMessage}
              wrongMessage={p.wrongMessage}
            />
          </div>
        </DarkFeatureBox>
      </div>

      <details className="group mt-8 rounded-card border-[1.5px] border-line2 bg-surface p-6">
        <summary className="flex cursor-pointer list-none items-center gap-2 font-bold text-ink [&::-webkit-details-marker]:hidden">
          <span
            aria-hidden
            className="font-mono text-accent transition-transform group-open:rotate-90"
          >
            ▸
          </span>
          Show solution
        </summary>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink2">
          <p>{p.solution}</p>
          {p.solutionFormula && (
            <div className="text-[1.1rem] text-ink">
              <Katex display tex={p.solutionFormula} ariaLabel="Solution" />
            </div>
          )}
        </div>
      </details>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="mb-2 text-xl font-bold tracking-tight text-ink">
          Discussion
        </h2>
        <p className="mb-6 text-[13.5px] text-ink3">
          {p.status === "open"
            ? "Hints and approaches welcome - keep full solutions out until the problem closes."
            : "Alternative solutions and generalizations welcome."}
        </p>
        <Giscus term={`problem/${p.slug}`} />
      </section>
    </article>
  );
}
