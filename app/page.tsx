import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MathChip } from "@/components/ui/MathChip";
import { Katex } from "@/components/ui/Katex";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { PascalTriangle } from "@/components/islands/PascalTriangle";
import { Marquee } from "@/components/sections/Marquee";
import { HighlightCard } from "@/components/sections/HighlightCard";
import { EventCard } from "@/components/sections/EventCard";
import { StatBand } from "@/components/sections/StatBand";
import { POTWCard } from "@/components/sections/POTWCard";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { CtaBand } from "@/components/sections/CtaBand";
import { Phyllotaxis } from "@/components/islands/Phyllotaxis";
import { MaurerRose } from "@/components/islands/MaurerRose";
import { catVar } from "@/lib/categories";
import { whatsInsideCards } from "@/content/cards";
import { upcomingEvents } from "@/content/events";
import { homeStats } from "@/content/stats";
import { currentPOTW } from "@/content/potw";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-site grid items-center gap-10 py-14 md:py-20 min-[840px]:grid-cols-2 min-[840px]:gap-16">
        <div>
          <SectionEyebrow dot>IIT Patna · Mathematics Society</SectionEyebrow>
          <h1 className="mt-5 text-balance text-[clamp(2.625rem,6.4vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink">
            <MathChip>Math</MathChip>, at its
            <br />
            maximum.
          </h1>
          <p className="mt-6 max-w-md text-[18.5px] leading-relaxed text-ink2">
            OptimatX is the mathematics society of IIT Patna - a home for
            problems, proofs, talks, and the people who can&apos;t stop solving
            them. Find your optimum.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/about">Explore the club →</Button>
            <Button href="/problems" variant="ghost">
              ∫ Problem of the Week
            </Button>
          </div>
        </div>

        {/* Pascal's-triangle centerpiece - sits on the graph paper */}
        <div className="flex flex-col items-center">
          <div className="mb-5 text-[1.05rem] text-ink">
            <Katex
              display
              tex={String.raw`\dbinom{n}{k}=\dbinom{n-1}{k-1}+\dbinom{n-1}{k}`}
              ariaLabel="Binomial recurrence"
            />
          </div>
          <PascalTriangle />
        </div>
      </section>

      {/* Marquee band (full-bleed) */}
      <Marquee />

      {/* (1) What's inside */}
      <section className="container-site py-16 md:py-20">
        <SectionEyebrow num="(1)" />
        <h2 className="mt-2 text-[clamp(1.75rem,3.6vw,2.4rem)] font-extrabold tracking-tight text-ink">
          What&apos;s inside
        </h2>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink2">
          Six kinds of content, one hub, color-coded so you always know where
          you are.
        </p>
        <div className="mt-8 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {whatsInsideCards.map((card) => (
            <HighlightCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      {/* Problem of the Week */}
      <section className="container-site pb-16 md:pb-20">
        <POTWCard potw={currentPOTW} />
      </section>

      {/* Stat band */}
      <section className="container-site pb-16 md:pb-20">
        <StatBand stats={homeStats} />
      </section>

      {/* (2) What's on */}
      <section className="container-site pb-16 md:pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionEyebrow num="(2)" />
            <h2 className="mt-2 text-[clamp(1.75rem,3.6vw,2.4rem)] font-extrabold tracking-tight text-ink">
              What&apos;s on
            </h2>
          </div>
          <Link
            href="/events"
            className="whitespace-nowrap font-mono text-[13px] font-bold text-accent hover:underline"
          >
            Full calendar →
          </Link>
        </div>
        <div className="mt-8 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        {upcomingEvents.length === 0 && (
          <p className="mt-4 text-[15px] text-ink2">
            Nothing scheduled right now. Check back soon.
          </p>
        )}
      </section>

      {/* (3) From the gallery */}
      <section className="container-site pb-16 md:pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionEyebrow num="(3)" />
            <h2 className="mt-2 text-[clamp(1.75rem,3.6vw,2.4rem)] font-extrabold tracking-tight text-ink">
              From the gallery
            </h2>
          </div>
          <Link
            href="/gallery"
            className="whitespace-nowrap font-mono text-[13px] font-bold text-accent hover:underline"
          >
            Explore all →
          </Link>
        </div>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink2">
          Every piece is a few lines of math you can play with. Drag the
          controls and watch the structure move.
        </p>
        <div className="mt-8 grid gap-[18px] lg:grid-cols-2">
          <div className="rounded-card border-[1.5px] border-line2 bg-surface p-6">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.14em]"
              style={{ color: catVar("lime") }}
            >
              Golden angle
            </div>
            <h3 className="mt-1 text-[19px] font-bold tracking-tight text-ink">
              Phyllotaxis
            </h3>
            <p className="mb-5 mt-1.5 text-[14px] leading-relaxed text-ink2">
              Place each seed at angle i·137.5° - the golden angle from φ, the
              ratio in our logo - and sunflower spirals fall out.
            </p>
            <Phyllotaxis />
          </div>

          <div className="rounded-card border-[1.5px] border-line2 bg-surface p-6">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.14em]"
              style={{ color: catVar("amber") }}
            >
              Polar curve
            </div>
            <h3 className="mt-1 text-[19px] font-bold tracking-tight text-ink">
              Maurer rose
            </h3>
            <p className="mb-5 mt-1.5 text-[14px] leading-relaxed text-ink2">
              Walk around the rose r = sin(nθ) in steps of d degrees, connecting
              the dots. Tiny changes unravel completely different lace.
            </p>
            <MaurerRose />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-site pb-16 md:pb-24">
        <NewsletterSignup />
      </section>

      {/* CTA */}
      <section className="container-site pb-8">
        <CtaBand
          title="Ready to optimize your semester?"
          subtitle="Recruitment is rolling. Whether you live for olympiad problems or just like a good puzzle, there's a seat at the table."
          primary={{ label: "Join OptimatX →", href: "/join" }}
          secondary={{ label: "Say hello", href: "/contact" }}
        />
      </section>
    </>
  );
}
