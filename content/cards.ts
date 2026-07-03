// The six "What's inside" cards on the Home page (design.md §6.3).
// Copy is reproduced from the reference mockup. Each card owns ONE category
// color - don't invent a 6th or recolor between pages (design.md §13).

import type { CategoryColor } from "@/lib/categories";

export interface HighlightCardData {
  id: string;
  glyph: string;
  tag: string; // "static" | "flagship" | "+ forms" | "signature"
  title: string;
  description: string;
  affordance: string; // "Read →"
  href: string;
  color: CategoryColor;
}

export const whatsInsideCards: HighlightCardData[] = [
  {
    id: "blog",
    glyph: "∂",
    tag: "static",
    title: "Blog & Articles",
    description:
      "Member-written expository math - write-ups, proofs, and deep dives in Markdown.",
    affordance: "Read →",
    href: "/blog",
    color: "accent",
  },
  {
    id: "potw",
    glyph: "∫",
    tag: "flagship",
    title: "Problem of the Week",
    description:
      "A fresh problem every week, an answer checker, a submission form, and a full archive.",
    affordance: "Solve →",
    href: "/problems",
    color: "magenta",
  },
  {
    id: "resources",
    glyph: "Σ",
    tag: "static",
    title: "Resources & Roadmaps",
    description:
      "Curated notes, reading lists, and topic roadmaps tuned to the IIT Patna curriculum.",
    affordance: "Browse →",
    href: "/resources",
    color: "lime",
  },
  {
    id: "events",
    glyph: "π",
    tag: "+ forms",
    title: "Events & Competitions",
    description:
      "Integration Bee, guest talks, SRMC & Simon Marais prep - with a live calendar.",
    affordance: "See what's on →",
    href: "/events",
    color: "amber",
  },
  {
    id: "optimization",
    glyph: "∇",
    tag: "signature",
    title: "Optimization Corner",
    description:
      "Our signature: real-world optimization case studies and an interactive LP visualizer.",
    affordance: "Dig in →",
    href: "/optimization-corner",
    color: "violet",
  },
  {
    id: "team",
    glyph: "φ",
    tag: "static",
    title: "Team & Community",
    description:
      "The people, a mentorship program, study circles, and an alumni wall worth aspiring to.",
    affordance: "Meet us →",
    href: "/team",
    color: "accent",
  },
];
