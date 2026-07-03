// The team roster (design.md §6.3 person cards; build list "Team / Our People").
// Drop square headshots in public/assets/team/<id>.jpg; if a photo is missing
// the card falls back to an initials monogram, so nothing breaks. Add socials
// (github/linkedin/instagram/email) per member as they share them.

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
  year: string; // sub-line under the role, e.g. department or programme
  group: TeamGroup;
  quote: string; // one mathematical quote per member
  photo?: string; // /assets/team/<id>.jpg - optional
  socials: Social[];
  color: CategoryColor;
}

export const facultyAdvisor: Member = {
  id: "advisor",
  name: "Dr. Prashant Kumar Srivastava",
  role: "Faculty Advisor & POC",
  year: "Department of Mathematics",
  group: "faculty",
  quote: "Mathematics is the queen of the sciences. - Carl Friedrich Gauss",
  socials: [],
  color: "accent2",
};

export const members: Member[] = [
  // ---- Overall Coordinator ----
  {
    id: "anish",
    name: "Anish Kumar",
    role: "Overall Coordinator",
    year: "IIT Patna",
    group: "coordinator",
    quote: "Pure mathematics is, in its way, the poetry of logical ideas. - Einstein",
    socials: [],
    color: "accent",
  },

  // ---- Design & PR ----
  {
    id: "baibhaw",
    name: "Baibhaw Kumar",
    role: "Design & PR",
    year: "2nd year · Computer Science & Engineering",
    group: "core",
    quote: "Beauty is the first test: there is no permanent place for ugly mathematics. - Hardy",
    socials: [],
    color: "magenta",
  },
  {
    id: "maanya",
    name: "Maanya Agrawal",
    role: "Design & PR",
    year: "2nd year · Chemical Science & Technology",
    group: "core",
    quote: "Mathematics is the art of giving the same name to different things. - Poincaré",
    socials: [],
    color: "violet",
  },
  {
    id: "goutham",
    name: "Goutham Pendyala",
    role: "Design & PR",
    year: "2nd year · Artificial Intelligence & Data Science",
    group: "core",
    quote: "Geometry is the art of correct reasoning from incorrectly drawn figures. - Pólya",
    socials: [],
    color: "amber",
  },

  // ---- Problem Setting ----
  {
    id: "prabhudutta",
    name: "Prabhudutta Prusti",
    role: "Problem Setting",
    year: "2nd year · Mathematics & Computing",
    group: "core",
    quote: "A problem worthy of attack proves its worth by fighting back. - Piet Hein",
    socials: [],
    color: "accent",
  },
  {
    id: "adarsh",
    name: "Adarsh Choudhary",
    role: "Problem Setting",
    year: "2nd year · Chemical & Biotechnology",
    group: "core",
    quote: "The only way to learn mathematics is to do mathematics. - Halmos",
    socials: [],
    color: "lime",
  },
  {
    id: "anvesh",
    name: "Anvesh Shekhar",
    role: "Problem Setting",
    year: "2nd year · Electronics & Communication Engineering",
    group: "core",
    quote: "In mathematics you don't understand things. You just get used to them. - von Neumann",
    socials: [],
    color: "magenta",
  },
  {
    id: "aradhya",
    name: "Aradhya",
    role: "Problem Setting",
    year: "2nd year · Civil Engineering",
    group: "core",
    quote: "God made the integers; all else is the work of man. - Kronecker",
    socials: [],
    color: "amber",
  },

  // ---- Events & Logistics ----
  {
    id: "ayush",
    name: "Ayush Pathak",
    role: "Events & Logistics",
    year: "2nd year · Civil Engineering",
    group: "core",
    quote: "It is not knowledge, but the act of learning, that grants the greatest enjoyment. - Gauss",
    socials: [],
    color: "violet",
  },
  {
    id: "onik",
    name: "Onik Chouhan",
    role: "Events & Logistics",
    year: "2nd year · Mathematics & Computing",
    group: "core",
    quote: "Mathematics knows no races or geographic boundaries. - Hilbert",
    socials: [],
    color: "accent",
  },
  {
    id: "yashvardhan",
    name: "Yashvardhan Shaktawat",
    role: "Events & Logistics",
    year: "2nd year · Economics",
    group: "core",
    quote: "Obvious is the most dangerous word in mathematics. - E. T. Bell",
    socials: [],
    color: "lime",
  },
];

export const coordinators = members.filter((m) => m.group === "coordinator");
export const coreTeam = members.filter((m) => m.group === "core");
