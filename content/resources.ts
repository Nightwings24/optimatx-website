// Resources & Roadmaps content. Roadmaps are ordered reading paths per topic;
// resourceGroups are curated external links; courses are placeholders for
// IIT Patna course notes the club will add. Edit freely to grow the library.

import type { CategoryColor } from "@/lib/categories";

export interface RoadmapStep {
  title: string;
  detail: string;
  href?: string; // a canonical resource (internal path or external URL)
}

export interface Roadmap {
  id: string;
  topic: string;
  glyph: string;
  color: CategoryColor;
  blurb: string;
  steps: RoadmapStep[];
}

export const roadmaps: Roadmap[] = [
  {
    id: "analysis",
    topic: "Real Analysis",
    glyph: "∫",
    color: "accent",
    blurb: "From calculus to rigour: limits, continuity, and the real line done properly.",
    steps: [
      {
        title: "Single-variable calculus",
        detail: "Limits, derivatives, integrals - the computational base.",
        href: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
      },
      {
        title: "Sequences & series",
        detail: "Convergence, Cauchy sequences, and when infinite sums behave.",
      },
      {
        title: "Continuity & differentiation",
        detail: "The epsilon-delta definitions, done carefully.",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      { title: "Riemann integration", detail: "Building the integral from scratch." },
      {
        title: "Metric spaces",
        detail: "Generalising distance - the gateway to topology.",
      },
    ],
  },
  {
    id: "algebra",
    topic: "Linear & Abstract Algebra",
    glyph: "∂",
    color: "violet",
    blurb: "Structure everywhere: vector spaces, symmetry, and the objects algebra studies.",
    steps: [
      {
        title: "Matrices & vector spaces",
        detail: "Start with visual intuition before the abstraction.",
        href: "https://www.3blue1brown.com/topics/linear-algebra",
      },
      {
        title: "Linear maps & eigenvalues",
        detail: "The heart of the subject.",
        href: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
      { title: "Groups", detail: "Symmetry, and the first algebraic structure." },
      { title: "Rings & fields", detail: "Where number systems come from." },
    ],
  },
  {
    id: "probability",
    topic: "Probability & Statistics",
    glyph: "π",
    color: "amber",
    blurb: "Reasoning under uncertainty - from counting to the central limit theorem.",
    steps: [
      { title: "Counting", detail: "Combinatorics: counting without listing." },
      {
        title: "Probability spaces",
        detail: "Axioms, conditioning, and Bayes' rule.",
        href: "https://projects.iq.harvard.edu/stat110/home",
      },
      { title: "Random variables", detail: "Distributions, expectation, variance." },
      { title: "Limit theorems", detail: "The law of large numbers and the CLT." },
      { title: "Markov chains", detail: "Randomness with memory." },
    ],
  },
  {
    id: "optimization",
    topic: "Optimization",
    glyph: "∇",
    color: "lime",
    blurb: "Our namesake: finding the best answer under constraints.",
    steps: [
      {
        title: "Convex sets & functions",
        detail: "Why convexity makes optimization tractable.",
        href: "https://web.stanford.edu/~boyd/cvxbook/",
      },
      {
        title: "Linear programming",
        detail: "Play with the interactive visualizer first.",
        href: "/optimization-corner",
      },
      { title: "Duality", detail: "Every problem has a shadow problem." },
      { title: "Gradient methods", detail: "How modern machine learning actually optimizes." },
    ],
  },
  {
    id: "competition",
    topic: "Competition Math",
    glyph: "∞",
    color: "magenta",
    blurb: "Training for SRMC, Simon Marais, Putnam, and the Integration Bee.",
    steps: [
      {
        title: "Number theory",
        detail: "Divisibility, modular arithmetic, and Diophantine equations.",
        href: "https://artofproblemsolving.com/",
      },
      { title: "Inequalities", detail: "AM-GM, Cauchy-Schwarz, and rearrangement." },
      { title: "Olympiad combinatorics", detail: "Pigeonhole, invariants, extremal arguments." },
      {
        title: "Putnam & Simon Marais prep",
        detail: "Past papers with full solutions.",
        href: "https://kskedlaya.org/putnam-archive/",
      },
    ],
  },
];

export interface ResourceItem {
  label: string;
  desc: string;
  href: string;
}

export interface ResourceGroup {
  heading: string;
  glyph: string;
  color: CategoryColor;
  items: ResourceItem[];
}

export const resourceGroups: ResourceGroup[] = [
  {
    heading: "Watch",
    glyph: "π",
    color: "amber",
    items: [
      {
        label: "3Blue1Brown",
        desc: "Visual intuition for calculus, linear algebra, and more.",
        href: "https://www.3blue1brown.com/",
      },
      {
        label: "MIT OpenCourseWare",
        desc: "Full course videos and problem sets, free.",
        href: "https://ocw.mit.edu/",
      },
      {
        label: "Mathologer",
        desc: "Deep, beautiful explainers of hard ideas.",
        href: "https://www.youtube.com/@Mathologer",
      },
    ],
  },
  {
    heading: "Read",
    glyph: "∂",
    color: "accent",
    items: [
      {
        label: "Napkin (Evan Chen)",
        desc: "A friendly tour of higher math for the curious.",
        href: "https://web.evanchen.cc/napkin.html",
      },
      {
        label: "Terence Tao's blog",
        desc: "A working Fields medalist, thinking out loud.",
        href: "https://terrytao.wordpress.com/",
      },
      {
        label: "ProofWiki",
        desc: "A searchable compendium of proofs.",
        href: "https://proofwiki.org/",
      },
    ],
  },
  {
    heading: "Practice",
    glyph: "∑",
    color: "lime",
    items: [
      {
        label: "Art of Problem Solving",
        desc: "The hub for olympiad and competition math.",
        href: "https://artofproblemsolving.com/",
      },
      {
        label: "Project Euler",
        desc: "Math meets programming, one problem at a time.",
        href: "https://projecteuler.net/",
      },
      {
        label: "Putnam Archive",
        desc: "Every Putnam problem, with solutions.",
        href: "https://kskedlaya.org/putnam-archive/",
      },
    ],
  },
];

export interface Course {
  name: string;
  note: string;
}

// PLACEHOLDER - swap for real IIT Patna course notes as members contribute them.
export const courses: Course[] = [
  { name: "Calculus", note: "Limits, derivatives, integrals, series" },
  { name: "Linear Algebra", note: "Vector spaces, matrices, eigen-theory" },
  { name: "Differential Equations", note: "ODEs, PDEs, and solution methods" },
  { name: "Probability & Statistics", note: "Distributions and inference" },
  { name: "Complex Analysis", note: "Holomorphic functions and contours" },
  { name: "Numerical Methods", note: "Approximation and computation" },
];
