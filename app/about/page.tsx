import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { HighlightCard } from "@/components/sections/HighlightCard";
import { StatBand } from "@/components/sections/StatBand";
import { CtaBand } from "@/components/sections/CtaBand";
import { PlotDivider } from "@/components/ui/PlotDivider";
import { whatsInsideCards } from "@/content/cards";
import { homeStats } from "@/content/stats";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who we are: OptimatX is the Mathematics Society of IIT Patna, under the Science & Technology Council.",
};

const whatWeDo = whatsInsideCards.filter((c) =>
  ["potw", "events", "optimization"].includes(c.id)
);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About · OptimatX"
        title="Conjecture, prove, repeat."
        lead="OptimatX is the mathematics society of IIT Patna. We exist to make mathematics a shared, living thing on campus - problems solved together, ideas argued out loud, and a community that outlasts any one batch."
      />

      <section className="container-site grid gap-10 pb-8 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-8">
          <div>
            <h2 className="text-[22px] font-bold tracking-tight text-ink">
              Our mission
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink2">
              We want every student who likes a good problem to have somewhere
              to bring it. That means a weekly problem to chew on, expository
              writing that demystifies hard ideas, reading circles that meet
              whether or not there&apos;s an exam, and competitions to point all
              that energy at. Not a brochure - a workshop.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-bold tracking-tight text-ink">
              History &amp; founding
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink2">
              OptimatX grew out of the informal problem-solving groups that have
              always existed among the Mathematics &amp; Computing and allied
              students at IIT Patna. The name leans into what we care about -{" "}
              <em>optima</em>, the argmax, the best answer under constraints -
              and the &ldquo;X&rdquo; for the unknown we&apos;re always chasing.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-bold tracking-tight text-ink">
              Where we sit
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink2">
              OptimatX is a society under the {SITE.council}. We work alongside
              the other technical clubs on campus and welcome collaborations -
              from cryptography talks to quant-finance puzzle nights.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-bold tracking-tight text-ink">
              Study &amp; reading groups
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink2">
              Alongside the weekly{" "}
              <Link href="/events/srmc-prep" className="text-accent hover:underline">
                SRMC Prep Circle
              </Link>
              , we run semester-long reading groups: a small circle picks one
              text - an analysis book, a paper, a problem collection - and meets
              weekly to work through it out loud. Groups form at the start of
              each semester; to propose or join one, raise it on the{" "}
              <Link href="/discuss" className="text-accent hover:underline">
                discussion board
              </Link>{" "}
              or mention it when you join.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-bold tracking-tight text-ink">
              Collaborations
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink2">
              We co-host events with other clubs and institutes - joint guest
              lectures, crypto-night crossovers, and inter-college contests. If
              you run a club (here or at another campus) and want to build
              something together,{" "}
              <Link href="/contact" className="text-accent hover:underline">
                write to us
              </Link>
              .
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-card border-[1.5px] border-line2 bg-surface p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">
            At a glance
          </h2>
          <dl className="mt-4 space-y-3 text-[14px]">
            <div className="flex justify-between gap-4">
              <dt className="text-ink3">Institute</dt>
              <dd className="text-right font-medium text-ink">IIT Patna</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink3">Council</dt>
              <dd className="text-right font-medium text-ink">
                Science &amp; Technology
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink3">Focus</dt>
              <dd className="text-right font-medium text-ink">
                Problems · proofs · optimization
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink3">Tagline</dt>
              <dd className="text-right font-medium text-accent">
                {SITE.tagline}
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <div className="container-site py-8">
        <PlotDivider />
      </div>

      <section className="container-site pb-16 md:pb-20">
        <h2 className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          What we do
        </h2>
        <div className="mt-8 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.map((card) => (
            <HighlightCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className="container-site pb-16 md:pb-20">
        <StatBand stats={homeStats} />
      </section>

      <section className="container-site pb-8">
        <CtaBand
          title="Come build this with us."
          subtitle="However far along you are with maths, there's a place for you here - as a solver, a writer, or an organizer."
          primary={{ label: "Join OptimatX →", href: "/join" }}
          secondary={{ label: "Meet the team", href: "/team" }}
        />
      </section>
    </>
  );
}
