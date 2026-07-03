// The team roster (design.md §6.3 person cards; build list "Team / Our People").
// PLACEHOLDER ROSTER - replace names, roles, years, quotes and photos with the
// real team. Drop square headshots in public/assets/team/<id>.jpg; if a photo
// is missing the card falls back to an initials monogram, so nothing breaks.

import type { CategoryColor } from "@/lib/categories";

export type TeamGroup = "faculty" | "coordinator" | "core";

export interface Social {
  platform: "instagram" | "github" | "linkedin" | "email" | "website";
  url: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  year: string; // "3rd year · Mathematics & Computing"
  group: TeamGroup;
  quote: string; // one mathematical quote per member
  photo?: string; // /assets/team/<id>.jpg - optional
  socials: Social[];
  color: CategoryColor;
}

export const facultyAdvisor: Member = {
  id: "advisor",
  name: "Prof. A. N. Placeholder",
  role: "Faculty Advisor",
  year: "Department of Mathematics",
  group: "faculty",
  quote:
    "Mathematics is the art of giving the same name to different things. - Henri Poincaré",
  socials: [{ platform: "email", url: "mailto:hello@optimatx.in" }],
  color: "accent2",
};

export const members: Member[] = [
  {
    id: "aarav",
    name: "Aarav Sharma",
    role: "Coordinator",
    year: "3rd year · Mathematics & Computing",
    group: "coordinator",
    quote: "Pure mathematics is the poetry of logical ideas. - Einstein",
    socials: [
      { platform: "github", url: "https://github.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
    ],
    color: "accent",
  },
  {
    id: "diya",
    name: "Diya Verma",
    role: "Deputy Coordinator",
    year: "3rd year · Mathematics & Computing",
    group: "coordinator",
    quote: "It is not knowledge, but the act of learning… that grants joy. - Gauss",
    socials: [
      { platform: "instagram", url: "https://instagram.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
    ],
    color: "magenta",
  },
  {
    id: "kabir",
    name: "Kabir Nair",
    role: "Problems Head",
    year: "3rd year · Mathematics & Computing",
    group: "core",
    quote: "A problem worthy of attack proves its worth by fighting back. - Piet Hein",
    socials: [{ platform: "github", url: "https://github.com/" }],
    color: "amber",
  },
  {
    id: "rohan",
    name: "Rohan Iyer",
    role: "Events Head",
    year: "2nd year · AI & Data Science",
    group: "core",
    quote: "In mathematics you don't understand things, you get used to them. - von Neumann",
    socials: [{ platform: "instagram", url: "https://instagram.com/" }],
    color: "lime",
  },
  {
    id: "sara",
    name: "Sara Khan",
    role: "Content Head",
    year: "2nd year · Mathematics & Computing",
    group: "core",
    quote: "The only way to learn mathematics is to do mathematics. - Halmos",
    socials: [
      { platform: "github", url: "https://github.com/" },
      { platform: "website", url: "https://example.com/" },
    ],
    color: "violet",
  },
  {
    id: "ananya",
    name: "Ananya Rao",
    role: "Design & Web",
    year: "2nd year · Electronics & Comm.",
    group: "core",
    quote: "Beauty is the first test: there is no permanent place for ugly mathematics. - Hardy",
    socials: [{ platform: "github", url: "https://github.com/" }],
    color: "accent",
  },
  {
    id: "vikram",
    name: "Vikram Singh",
    role: "Outreach",
    year: "2nd year · Mathematics & Computing",
    group: "core",
    quote: "Do not worry about your difficulties in mathematics… mine are greater. - Einstein",
    socials: [{ platform: "instagram", url: "https://instagram.com/" }],
    color: "amber",
  },
  {
    id: "meera",
    name: "Meera Joshi",
    role: "Treasurer",
    year: "3rd year · Mathematics & Computing",
    group: "core",
    quote: "God made the integers; all else is the work of man. - Kronecker",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/" }],
    color: "magenta",
  },
];

export const coordinators = members.filter((m) => m.group === "coordinator");
export const coreTeam = members.filter((m) => m.group === "core");
