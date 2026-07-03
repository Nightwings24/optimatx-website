// Events shown on the Home page ("What's on"), the Events page, and each event's
// own detail page at /events/<id>. To add or archive an event, edit this array.
// `status: "past"` moves it to the Past section. Keep `color` to one of the 5
// category slots. `summary`, `facts`, and `sections` populate the detail page;
// the SAMPLE copy below is plausible placeholder - swap it for real specifics.

import type { CategoryColor } from "@/lib/categories";

export type EventStatus = "upcoming" | "past";

export interface EventFact {
  label: string; // "When" | "Format" | "Eligibility" | ...
  value: string;
}

export interface EventSection {
  heading: string;
  body: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  glyph: string;
  color: CategoryColor;
  dateChip: string; // "MAR 14 · π DAY"
  dateISO?: string; // optional sort/label key
  tag: string; // "Flagship" | "Talk series" | "Training"
  blurb: string; // one-line, used on cards
  affordance: string; // card call-to-action, e.g. "Learn more →"
  href?: string; // details page (defaults to /events/<id> via detailHref)
  registerUrl?: string; // external / form registration (optional)
  // ---- detail page ----
  summary?: string; // longer lead paragraph
  facts?: EventFact[]; // quick-facts sidebar
  sections?: EventSection[]; // body sections
  status: EventStatus;
}

export const events: ClubEvent[] = [
  // ---- Upcoming ----
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
    summary:
      "OptimatX's flagship contest: a single-elimination bracket where solvers race to crack definite integrals on the whiteboard. Fast hands, sharp substitutions, and nerve under the clock - the last solver standing takes the wizard hat.",
    facts: [
      { label: "When", value: "March 14 (Pi Day)" },
      { label: "Format", value: "Single-elimination bracket" },
      { label: "Eligibility", value: "All IIT Patna students" },
      { label: "Prize", value: "The wizard hat + cash prize" },
    ],
    sections: [
      {
        heading: "How it works",
        body: "Two solvers face off at the board on the same integral. First to the correct closed form advances. Rounds get harder as the bracket narrows - expect trig substitutions, partial fractions, and the occasional Feynman trick.",
      },
      {
        heading: "How to prepare",
        body: "Drill the standard forms until they are reflex. The SRMC Prep Circle and the Resources roadmaps cover everything you need, and the weekly Problem of the Week is good speed practice.",
      },
      {
        heading: "What to bring",
        body: "Just yourself and a marker hand you trust. We provide the boards, the brackets, and the pie.",
      },
    ],
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
    summary:
      "Every Friday, one student or faculty member talks for 30 minutes on something they can't stop thinking about - no slides allowed. Chalk, questions, and a lot of tangents.",
    facts: [
      { label: "When", value: "Every Friday, 6 PM" },
      { label: "Format", value: "30-minute chalk talk" },
      { label: "Where", value: "Seminar room (see calendar)" },
      { label: "Eligibility", value: "Everyone welcome" },
    ],
    sections: [
      {
        heading: "The format",
        body: "No slides, no laptops - just a board and an idea. Talks range from a slick proof to an open problem the speaker is stuck on. Newcomers are encouraged to just show up and listen.",
      },
      {
        heading: "Want to speak?",
        body: "If you have 30 minutes of math you love, we want to hear it. Pitch a topic when you join and we'll find you a Friday.",
      },
    ],
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
    summary:
      "A weekly training circle for the Srinivasa Ramanujan Mathematics Competition and the Simon Marais Mathematics Competition. We solve past papers together, share tricks, and build the stamina these contests demand.",
    facts: [
      { label: "When", value: "Weekly" },
      { label: "Format", value: "Group problem session" },
      { label: "Focus", value: "SRMC, Simon Marais" },
      { label: "Eligibility", value: "All levels" },
    ],
    sections: [
      {
        heading: "What we do",
        body: "Each session picks a theme - inequalities, number theory, combinatorics - and works through graded problems from past papers. You'll learn to write clean solutions, not just find answers.",
      },
      {
        heading: "Do I need to be an olympiad veteran?",
        body: "No. The circle runs at every level; the only requirement is showing up and trying the problems.",
      },
    ],
    status: "upcoming",
  },

  // ---- Past (SAMPLE archives - replace with real recaps) ----
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
    summary:
      "A campus-wide trail of π-themed puzzles - with actual pie at the finish line. Teams raced across departments cracking ciphers, geometry riddles, and a few red herrings.",
    facts: [
      { label: "When", value: "March 14, 2026" },
      { label: "Format", value: "Team puzzle hunt" },
      { label: "Result", value: "Won by Team Ramanujan" },
    ],
    sections: [
      {
        heading: "Recap",
        body: "Fourteen teams, three hours, one very smug winning team. The final puzzle hid a Buffon's-needle estimate of π in a floor of tiles. We'll run it again next Pi Day - bigger, with more pie.",
      },
    ],
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
    summary:
      "Celebrating Ramanujan's birthday with a guest lecture on partitions and the circle method - the machinery behind his most startling asymptotic formulas.",
    facts: [
      { label: "When", value: "December 22, 2025" },
      { label: "Format", value: "Guest lecture" },
      { label: "Speaker", value: "Invited faculty" },
    ],
    sections: [
      {
        heading: "Recap",
        body: "A full room for an hour on how Hardy and Ramanujan turned a generating function into an exact count of partitions. Slides and a reading list went out to members afterward.",
      },
    ],
    status: "past",
  },
];

export const upcomingEvents = events.filter((e) => e.status === "upcoming");
export const pastEvents = events.filter((e) => e.status === "past");

/** Canonical link for an event card / nav: its own detail page. */
export const detailHref = (e: ClubEvent): string => e.href ?? `/events/${e.id}`;

export function getEvent(id: string): ClubEvent | undefined {
  return events.find((e) => e.id === id);
}
