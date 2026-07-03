import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { PersonCard } from "@/components/sections/PersonCard";
import { StatBand } from "@/components/sections/StatBand";
import { CtaBand } from "@/components/sections/CtaBand";
import { facultyAdvisor, coordinators, coreTeam } from "@/content/team";
import { teamStats } from "@/content/stats";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind OptimatX - coordinators, the core team, and our faculty advisor.",
};

function GroupHeading({ label }: { label: string }) {
  return (
    <h2 className="mb-6 font-mono text-[13px] font-bold uppercase tracking-[0.16em] text-accent">
      {label}
    </h2>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="The people"
        title="The people behind the proofs."
        lead="A rotating cast of students who run the problems, the events, and the design - with a faculty advisor keeping us honest."
      />

      <section className="container-site pb-14">
        <GroupHeading label="Faculty advisor" />
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          <PersonCard member={facultyAdvisor} />
        </div>
      </section>

      <section className="container-site pb-14">
        <GroupHeading label="Overall Coordinator" />
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {coordinators.map((m) => (
            <PersonCard key={m.id} member={m} />
          ))}
        </div>
      </section>

      <section className="container-site pb-16">
        <GroupHeading label="Core team" />
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {coreTeam.map((m) => (
            <PersonCard key={m.id} member={m} />
          ))}
        </div>
      </section>

      <section className="container-site pb-16 md:pb-20">
        <StatBand stats={teamStats} />
      </section>

      <section className="container-site pb-8">
        <CtaBand
          title="Want to be on this page next year?"
          subtitle="We run a mentorship program pairing seniors with juniors, plus open roles every recruitment cycle."
          primary={{ label: "Join OptimatX →", href: "/join" }}
          secondary={{ label: "Say hello", href: "/contact" }}
        />
      </section>
    </>
  );
}
