// Events shown on the Home page ("What's on") and the Events page.
// To add or archive an event, edit this array. `status: "past"` moves it to
// the Past section. Keep `color` to one of the 5 category slots.

import type { CategoryColor } from "@/lib/categories";

export type EventStatus = "upcoming" | "past";

export interface ClubEvent {
  id: string;
  title: string;
  glyph: string;
  color: CategoryColor;
  dateChip: string; // "MAR 14 · π DAY"
  dateISO?: string; // optional sort/label key
  tag: string; // "Flagship" | "Talk series" | "Training"
  blurb: string;
  href?: string; // details page (optional)
  registerUrl?: string; // external / form registration (optional)
  affordance: string; // "Register →"
  status: EventStatus;
}

export const events: ClubEvent[] = [
  // ---- Upcoming (from the reference mockup) ----
  {
    id: "integration-bee",
    title: "Integration Bee",
    glyph: "∫",
    color: "magenta",
    dateChip: "MAR 14 · π DAY",
    dateISO: "2027-03-14",
    tag: "Flagship",
    blurb:
      "Bracket-style integral speed-solving. Last solver standing takes the wizard hat.",
    affordance: "Learn more →",
    registerUrl: "/join",
    status: "upcoming",
  },
  {
    id: "friday-talks",
    title: "Friday Evening Talks",
    glyph: "∂",
    color: "accent",
    dateChip: "EVERY FRI",
    tag: "Talk series",
    blurb:
      "Students and faculty on whatever they can't stop thinking about. 30 minutes, no slides allowed.",
    affordance: "Details →",
    href: "/events",
    status: "upcoming",
  },
  {
    id: "srmc-prep",
    title: "SRMC Prep Circle",
    glyph: "Σ",
    color: "lime",
    dateChip: "WEEKLY",
    tag: "Training",
    blurb:
      "Train together for the Srinivasa Ramanujan Mathematics Competition & Simon Marais.",
    affordance: "Join the circle →",
    href: "/join",
    status: "upcoming",
  },

  // ---- Past (placeholders - replace with real archives) ----
  {
    id: "pi-day-hunt-2026",
    title: "Pi Day Puzzle Hunt",
    glyph: "π",
    color: "amber",
    dateChip: "MAR 14 · 2026",
    dateISO: "2026-03-14",
    tag: "Social",
    blurb:
      "A campus-wide trail of π-themed puzzles - with actual pie at the finish line.",
    affordance: "Recap →",
    href: "/events",
    status: "past",
  },
  {
    id: "nmd-talk-2025",
    title: "National Mathematics Day Talk",
    glyph: "φ",
    color: "violet",
    dateChip: "DEC 22 · 2025",
    dateISO: "2025-12-22",
    tag: "Lecture",
    blurb:
      "Celebrating Ramanujan's birthday with a guest lecture on partitions and the circle method.",
    affordance: "Recap →",
    href: "/events",
    status: "past",
  },
];

export const upcomingEvents = events.filter((e) => e.status === "upcoming");
export const pastEvents = events.filter((e) => e.status === "past");
