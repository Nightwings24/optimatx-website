import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { JuliaSet } from "@/components/islands/JuliaSet";
import { CellularAutomaton } from "@/components/islands/CellularAutomaton";
import { MaurerRose } from "@/components/islands/MaurerRose";
import { catVar, type CategoryColor } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Interactive generative math art - a Julia-set fractal, a cellular automaton, and a Maurer rose. Drag the controls and watch the math move.",
};

function Piece({
  tag,
  color,
  title,
  desc,
  children,
  className = "",
}: {
  tag: string;
  color: CategoryColor;
  title: string;
  desc: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border-[1.5px] border-line2 bg-surface p-6 ${className}`}
    >
      <div
        className="font-mono text-[11px] uppercase tracking-[0.14em]"
        style={{ color: catVar(color) }}
      >
        {tag}
      </div>
      <h2 className="mt-1 text-[19px] font-bold tracking-tight text-ink">
        {title}
      </h2>
      <p className="mb-5 mt-1.5 text-[14px] leading-relaxed text-ink2">{desc}</p>
      {children}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Math, made visible."
        lead="Generative art you can play with. Every piece here is a few lines of mathematics - drag the controls and watch the structure change."
        color="violet"
        dot
      />

      <section className="container-site pb-16">
        <div className="grid gap-[18px] lg:grid-cols-2">
          <Piece
            tag="Escape-time fractal"
            color="magenta"
            title="Julia set"
            desc="Iterate z → z² + c. Points that stay bounded form the dark interior; the colors show how fast the rest escape to infinity. Nudge c and the whole shape transforms."
          >
            <JuliaSet />
          </Piece>

          <Piece
            tag="Polar curve"
            color="amber"
            title="Maurer rose"
            desc="Walk around the rose r = sin(nθ) in steps of d degrees, connecting the dots. Tiny changes in n and d unravel completely different lace."
          >
            <MaurerRose />
          </Piece>

          <Piece
            tag="Cellular automaton"
            color="accent"
            title="One rule, many worlds"
            desc="Apply a single rule to a row of cells, over and over. Rule 90 draws the Sierpiński triangle (our hero); Rule 30 makes chaos; Rule 110 is Turing-complete."
            className="lg:col-span-2"
          >
            <CellularAutomaton />
          </Piece>
        </div>
      </section>

      <section className="container-site pb-8">
        <CtaBand
          title="Made something beautiful?"
          subtitle="Screenshot your favorite and tag us, or bring your own generative idea to a session - the best go in the gallery."
          primary={{ label: "Join OptimatX →", href: "/join" }}
          secondary={{ label: "Read the blog", href: "/blog" }}
        />
      </section>
    </>
  );
}
