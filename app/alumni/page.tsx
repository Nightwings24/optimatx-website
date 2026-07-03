import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { StatBand } from "@/components/sections/StatBand";
import { CtaBand } from "@/components/sections/CtaBand";
import { catStyle, catVar, type CategoryColor } from "@/lib/categories";
import type { Stat } from "@/content/stats";
import { achievements, alumni, type Alum } from "@/content/alumni";

export const metadata: Metadata = {
  title: "Alumni & Achievements",
  description:
    "Where OptimatX members went - grad schools and quant firms - and the club's recent competition results.",
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const trackColor: Record<Alum["track"], CategoryColor> = {
  Industry: "amber",
  "Grad school": "lime",
};

export default function AlumniPage() {
  const industry = alumni.filter((a) => a.track === "Industry").length;
  const grad = alumni.filter((a) => a.track === "Grad school").length;
  const stats: Stat[] = [
    { value: String(alumni.length), caption: "on the wall", color: "accent" },
    { value: String(industry), caption: "in industry", color: "amber" },
    { value: String(grad), caption: "in grad school", color: "lime" },
    { value: "∞", caption: "pride", color: "magenta" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Alumni & Achievements"
        title="Where they went."
        lead="The people who came through OptimatX end up in strong places - and the club keeps racking up results. (This wall is placeholder data for now; the real record is on its way.)"
        color="violet"
        dot
      />

      {/* Achievements */}
      <section className="container-site pb-16">
        <SectionEyebrow color="magenta">Achievements</SectionEyebrow>
        <h2 className="mb-6 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          Recent wins
        </h2>
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <div
              key={a.title}
              style={catStyle(a.color)}
              className="rounded-card border-[1.5px] border-line2 bg-surface p-6"
            >
              <h3
                className="text-[17px] font-bold tracking-tight"
                style={{ color: catVar(a.color) }}
              >
                {a.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink2">
                {a.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Alumni wall */}
      <section className="container-site pb-16">
        <SectionEyebrow color="lime">Alumni</SectionEyebrow>
        <h2 className="mb-6 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          The wall
        </h2>
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {alumni.map((a) => {
            const c = catVar(trackColor[a.track]);
            return (
              <div
                key={a.name}
                className="flex flex-col rounded-card border-[1.5px] border-line2 bg-surface p-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    style={{
                      color: c,
                      background: `color-mix(in srgb, ${c} 15%, transparent)`,
                    }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line2 font-mono text-[13px] font-bold"
                  >
                    {initials(a.name)}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[15px] font-bold text-ink">
                      {a.name}{" "}
                      <span className="font-mono text-[12px] text-ink3">
                        {a.batch}
                      </span>
                    </div>
                    <div className="truncate text-[13px] text-ink2">{a.now}</div>
                  </div>
                </div>
                <span
                  className="mt-3 inline-block w-fit font-mono text-[10.5px] uppercase tracking-[0.12em]"
                  style={{ color: c }}
                >
                  {a.track}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-site pb-16">
        <StatBand stats={stats} />
      </section>

      <section className="container-site pb-8">
        <CtaBand
          title="Want to be on this wall?"
          subtitle="It starts with a weekly problem and a reading circle. Where you take it is up to you."
          primary={{ label: "Join OptimatX →", href: "/join" }}
          secondary={{ label: "Meet the team", href: "/team" }}
        />
      </section>
    </>
  );
}
