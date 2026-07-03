// Competition hub content (build list Cat 6). Lists the contests OptimatX trains
// for, a results record, and the prep tracks. The results below are SAMPLE rows -
// replace `results` with the club's real record, and add official `href`s to the
// competitions once confirmed.

import type { CategoryColor } from "@/lib/categories";

export interface Competition {
  id: string;
  name: string;
  glyph: string;
  color: CategoryColor;
  cadence: string; // "Annual · October"
  scope: string; // "National" | "International"
  blurb: string;
  eligibility: string;
  href?: string; // official site, when confirmed
}

export interface CompResult {
  year: string;
  competition: string;
  achievement: string;
  who: string;
}

export interface PrepTrack {
  id: string;
  title: string;
  glyph: string;
  color: CategoryColor;
  blurb: string;
  covers: string[];
  resourceHref?: string;
}

export const competitions: Competition[] = [
  {
    id: "srmc",
    name: "Srinivasa Ramanujan Mathematics Competition",
    glyph: "Σ",
    color: "amber",
    cadence: "Annual",
    scope: "National",
    blurb:
      "A national undergraduate competition with olympiad-flavored problems across algebra, analysis, and number theory.",
    eligibility: "Undergraduate students",
  },
  {
    id: "simon-marais",
    name: "Simon Marais Mathematics Competition",
    glyph: "∮",
    color: "amber",
    cadence: "Annual · October",
    scope: "International (Asia-Pacific)",
    blurb:
      "An individual-and-pairs contest across the Asia-Pacific, known for elegant problems that reward a clean idea over heavy machinery.",
    eligibility: "Undergraduate students",
  },
  {
    id: "imc",
    name: "International Mathematics Competition for University Students",
    glyph: "∫",
    color: "amber",
    cadence: "Annual · Summer",
    scope: "International",
    blurb:
      "A team-based international olympiad for university students, with two days of demanding proof-based problems.",
    eligibility: "Undergraduate students",
  },
  {
    id: "madhava",
    name: "Madhava Mathematics Competition",
    glyph: "π",
    color: "amber",
    cadence: "Annual · January",
    scope: "National",
    blurb:
      "A national contest for undergraduates that blends objective and subjective problems across the core syllabus.",
    eligibility: "First- and second-year undergraduates",
  },
];

// SAMPLE results - replace with the club's real record.
export const results: CompResult[] = [
  {
    year: "2025",
    competition: "Simon Marais",
    achievement: "Top 25%, Asia-Pacific",
    who: "OptimatX member",
  },
  {
    year: "2025",
    competition: "Madhava",
    achievement: "Merit certificate",
    who: "OptimatX member",
  },
  {
    year: "2024",
    competition: "SRMC",
    achievement: "Regional finalist",
    who: "OptimatX team",
  },
];

export const prepTracks: PrepTrack[] = [
  {
    id: "olympiad-putnam",
    title: "Olympiad & Putnam",
    glyph: "∇",
    color: "magenta",
    blurb:
      "The classic proof-contest toolkit, built up from problems and worked in the SRMC Prep Circle.",
    covers: [
      "Inequalities & functional equations",
      "Number theory & combinatorics",
      "Putnam papers as self-study benchmarks",
    ],
    resourceHref: "/resources",
  },
  {
    id: "quant-finance",
    title: "Quant & Finance",
    glyph: "∂",
    color: "lime",
    blurb:
      "Probability, mental math, and the brainteaser style that quant interviews live on.",
    covers: [
      "Probability & expected value",
      "Stochastic processes, martingales",
      "Market-making brainteasers",
    ],
    resourceHref: "/resources",
  },
  {
    id: "crypto-ctf",
    title: "Cryptography & CTF",
    glyph: "⊕",
    color: "violet",
    blurb:
      "Where number theory meets security - the math behind the crypto category of CTFs.",
    covers: [
      "Modular arithmetic & RSA",
      "Elliptic curves, discrete log",
      "Lattice basics & CTF crypto challenges",
    ],
    resourceHref: "/resources",
  },
  {
    id: "careers-research",
    title: "Careers & Research",
    glyph: "φ",
    color: "accent",
    blurb:
      "Beyond contests: how to find summer research, reading programs, and the path to grad school.",
    covers: [
      "REUs, summer schools & internships",
      "Directed reading & mentorship",
      "Grad-school and fellowship prep",
    ],
    resourceHref: "/resources",
  },
];
