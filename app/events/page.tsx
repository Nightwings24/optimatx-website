import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { EventCard } from "@/components/sections/EventCard";
import { CalendarEmbed } from "@/components/sections/Embeds";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { upcomingEvents, pastEvents } from "@/content/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past OptimatX events - the Integration Bee, Friday Evening Talks, competition prep, and more.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events & Competitions"
        title="What's on."
        lead="Flagship contests, weekly talks, and training circles. Register for what's coming up, or browse what we've run before."
      />

      <section className="container-site pb-16">
        <SectionEyebrow color="amber">Upcoming</SectionEyebrow>
        <h2 className="sr-only">Upcoming events</h2>
        <div className="mt-6 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
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

      {pastEvents.length > 0 && (
        <section className="container-site pb-16">
          <SectionEyebrow color="lime">Past</SectionEyebrow>
          <h2 className="sr-only">Past events</h2>
          <div className="mt-6 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      <section className="container-site pb-16 md:pb-20">
        <SectionEyebrow color="accent">Calendar</SectionEyebrow>
        <p className="mb-6 mt-2 max-w-2xl text-[15px] text-ink2">
          Meetings, talks, and deadlines in one place.
        </p>
        <CalendarEmbed />
      </section>

      <section className="container-site pb-8">
        <CtaBand
          title="Want these in your calendar?"
          subtitle="Join OptimatX and we'll make sure you never miss a problem set or a talk."
          primary={{ label: "Join OptimatX →", href: "/join" }}
          secondary={{ label: "Contact us", href: "/contact" }}
        />
      </section>
    </>
  );
}
