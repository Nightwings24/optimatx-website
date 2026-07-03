// Achievements (recent member/club wins) and the alumni wall (where graduates
// went). PLACEHOLDER data - replace with the real record as it grows.

import type { CategoryColor } from "@/lib/categories";

export interface Achievement {
  title: string;
  detail: string;
  color: CategoryColor;
}

export interface Alum {
  name: string;
  batch: string; // e.g. "'23"
  now: string; // current place
  track: "Industry" | "Grad school";
}

export const achievements: Achievement[] = [
  {
    title: "SRMC 2025",
    detail: "Two members reached the offline finals of the Srinivasa Ramanujan Mathematics Competition.",
    color: "magenta",
  },
  {
    title: "Simon Marais 2024",
    detail: "An honourable mention in the pairs division of the Asia-Pacific contest.",
    color: "amber",
  },
  {
    title: "Inter-IIT Quant 2025",
    detail: "Third place in the quant-finance event at the Inter-IIT Tech Meet.",
    color: "lime",
  },
  {
    title: "Integration Bee",
    detail: "200+ participants at our first campus edition - a new Grand Integrator crowned.",
    color: "accent",
  },
  {
    title: "Madhava 2024",
    detail: "One member invited to the week-long Madhava Nurture Camp.",
    color: "violet",
  },
  {
    title: "Putnam training",
    detail: "A weekly problem circle that ran the full semester, cover to cover.",
    color: "accent2",
  },
];

export const alumni: Alum[] = [
  { name: "Ishaan Gupta", batch: "'23", now: "Quant Researcher, Optiver", track: "Industry" },
  { name: "Nandini Rao", batch: "'22", now: "PhD, Mathematics, MIT", track: "Grad school" },
  { name: "Arjun Mehta", batch: "'23", now: "Part III Maths, Cambridge", track: "Grad school" },
  { name: "Priya Nair", batch: "'22", now: "Software Engineer, Google", track: "Industry" },
  { name: "Rahul Verma", batch: "'21", now: "PhD, Statistics, Stanford", track: "Grad school" },
  { name: "Sneha Iyer", batch: "'23", now: "Trader, Jane Street", track: "Industry" },
  { name: "Karan Singh", batch: "'22", now: "MS, CS, ETH Zürich", track: "Grad school" },
  { name: "Ananya Bose", batch: "'21", now: "Data Scientist, Optiver", track: "Industry" },
];
