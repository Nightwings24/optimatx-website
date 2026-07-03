import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { catVar } from "@/lib/categories";
import { events, getEvent } from "@/content/events";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  return { title: e.title, description: e.summary ?? e.blurb };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();

  const c = catVar(e.color);
  const registerLabel = e.status === "past" ? undefined : e.affordance;

  return (
    <article className="container-site max-w-4xl pb-24 pt-16">
      <Link
        href="/events"
        className="font-mono text-[13px] text-ink3 transition-colors hover:text-accent"
      >
        ← Events
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em]">
        <span style={{ color: c }}>{e.dateChip}</span>
        <span aria-hidden className="text-ink3">
          ·
        </span>
        <span className="text-ink3">{e.tag}</span>
        {e.status === "past" && (
          <>
            <span aria-hidden className="text-ink3">
              ·
            </span>
            <span className="text-ink3">Past event</span>
          </>
        )}
      </div>

      <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-[-0.02em] text-ink">
        {e.title}
      </h1>
      {e.summary && (
        <p className="mt-4 max-w-2xl text-[18px] leading-relaxed text-ink2">
          {e.summary}
        </p>
      )}

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_260px]">
        {/* body */}
        <div className="space-y-8">
          {(e.sections ?? [{ heading: "About", body: e.blurb }]).map((s) => (
            <section key={s.heading}>
              <h2 className="text-[19px] font-bold tracking-tight text-ink">
                {s.heading}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink2">
                {s.body}
              </p>
            </section>
          ))}
        </div>

        {/* facts sidebar */}
        <aside className="space-y-6">
          {e.facts && e.facts.length > 0 && (
            <div className="rounded-card border-[1.5px] border-line2 bg-surface p-5">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">
                Details
              </h2>
              <dl className="mt-4 space-y-3">
                {e.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink3">
                      {f.label}
                    </dt>
                    <dd className="mt-0.5 text-[14px] font-medium text-ink">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          {e.registerUrl && registerLabel && (
            <Button href={e.registerUrl} className="w-full">
              {registerLabel}
            </Button>
          )}
        </aside>
      </div>

      <div className="mt-16">
        <CtaBand
          title={
            e.status === "past"
              ? "Don't miss the next one."
              : "See you there?"
          }
          subtitle="Join OptimatX and we'll make sure you never miss a problem set, a talk, or a bracket."
          primary={{ label: "Join OptimatX →", href: "/join" }}
          secondary={{ label: "All events", href: "/events" }}
        />
      </div>
    </article>
  );
}
