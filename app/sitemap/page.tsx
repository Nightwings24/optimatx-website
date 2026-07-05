import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { IconChip } from "@/components/ui/IconChip";
import { catVar, type CategoryColor } from "@/lib/categories";
import { getAllPosts } from "@/lib/blog";
import { getAllNotes } from "@/lib/notes";
import { getAllIssues } from "@/lib/newsletter";
import { problems } from "@/content/problems";
import { events } from "@/content/events";
import { albums, videos } from "@/content/media";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Every page on the OptimatX site, grouped by what you came to do - solve, learn, watch, or join.",
};

interface MapLink {
  href: string;
  label: string;
  desc: string;
  glyph: string;
  count?: number; // live content count, computed at build
}

interface MapGroup {
  title: string;
  color: CategoryColor;
  links: MapLink[];
}

export default function SitemapPage() {
  const groups: MapGroup[] = [
    {
      title: "Solve & compete",
      color: "magenta",
      links: [
        {
          href: "/problems",
          label: "Problem of the Week",
          desc: "A fresh problem weekly - answer checker, live leaderboard, and the archive with solutions.",
          glyph: "∫",
          count: problems.length,
        },
        {
          href: "/competitions",
          label: "Competitions & Prep",
          desc: "SRMC, Simon Marais, IMC, Madhava - our record and four prep tracks.",
          glyph: "∮",
        },
        {
          href: "/optimization-corner",
          label: "Optimization Corner",
          desc: "The signature piece: drag an objective and watch the optimum jump between corners.",
          glyph: "∇",
        },
      ],
    },
    {
      title: "Learn",
      color: "lime",
      links: [
        {
          href: "/resources",
          label: "Resources & Roadmaps",
          desc: "Where to start and what to read next, topic by topic - plus member-written course notes.",
          glyph: "Σ",
          count: getAllNotes().length,
        },
        {
          href: "/blog",
          label: "Blog & Articles",
          desc: "Expository math from members - proofs, deep dives, and series.",
          glyph: "∂",
          count: getAllPosts().length,
        },
        {
          href: "/publications",
          label: "Publications",
          desc: "The Dispatch newsletter archive, and the magazine when it lands.",
          glyph: "✉",
          count: getAllIssues().length,
        },
      ],
    },
    {
      title: "Watch & play",
      color: "violet",
      links: [
        {
          href: "/gallery",
          label: "Gallery",
          desc: "Interactive generative math art - Julia sets, Maurer roses, automata. Drag the controls.",
          glyph: "✦",
        },
        {
          href: "/media",
          label: "Media",
          desc: "Photos from events and recordings of talks and explainers.",
          glyph: "▶",
          count: albums.length + videos.length,
        },
      ],
    },
    {
      title: "Community",
      color: "accent",
      links: [
        {
          href: "/events",
          label: "Events",
          desc: "The Integration Bee, Friday talks, prep circles - upcoming and past, each with its own page.",
          glyph: "π",
          count: events.length,
        },
        {
          href: "/discuss",
          label: "Discussion board",
          desc: "Ask, argue, share - every problem and post has its own thread too.",
          glyph: "«",
        },
        {
          href: "/join",
          label: "Join OptimatX",
          desc: "Rolling recruitment - solvers, writers, and organizers all welcome.",
          glyph: "+",
        },
        {
          href: "/merch",
          label: "Merch",
          desc: "The first drop is in the works - tell us what you'd wear.",
          glyph: "⊙",
        },
      ],
    },
    {
      title: "The club",
      color: "amber",
      links: [
        {
          href: "/about",
          label: "About",
          desc: "Mission, history, reading groups, and collaborations.",
          glyph: "φ",
        },
        {
          href: "/team",
          label: "Team",
          desc: "The council and our faculty advisor.",
          glyph: "★",
        },
        {
          href: "/alumni",
          label: "Alumni & Achievements",
          desc: "Where members went, and what the club has won.",
          glyph: "∞",
        },
        {
          href: "/faq",
          label: "FAQ",
          desc: "Freshers' questions, answered straight.",
          glyph: "?",
        },
        {
          href: "/contact",
          label: "Contact",
          desc: "Write to us, or find us on campus.",
          glyph: "@",
        },
      ],
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Sitemap"
        title="Everything, one map."
        lead="The whole site at a glance, grouped by what you came to do. Counts update as content lands. (Tip: press Ctrl+K anywhere to search instead.)"
      />

      <section className="container-site pb-20">
        <div className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => {
            const c = catVar(g.color);
            return (
              <div
                key={g.title}
                className="rounded-card border-[1.5px] border-line2 bg-surface p-6"
              >
                <h2
                  className="mb-4 font-mono text-[12px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: c }}
                >
                  {g.title}
                </h2>
                <ul className="space-y-4">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group flex items-start gap-3">
                        <IconChip glyph={l.glyph} color={g.color} size={34} />
                        <div className="min-w-0">
                          <span className="flex items-baseline gap-2">
                            <span className="text-[15px] font-bold text-ink transition-colors group-hover:text-accent">
                              {l.label}
                            </span>
                            {typeof l.count === "number" && l.count > 0 && (
                              <span
                                className="font-mono text-[11px]"
                                style={{ color: c }}
                              >
                                ×{l.count}
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-ink2">
                            {l.desc}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Home card, for completeness */}
          <div className="rounded-card border-[1.5px] border-dashed border-line2 p-6">
            <h2 className="mb-4 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-ink3">
              Start
            </h2>
            <Link href="/" className="group flex items-start gap-3">
              <IconChip glyph="⌘" color="accent2" size={34} />
              <div>
                <span className="text-[15px] font-bold text-ink transition-colors group-hover:text-accent">
                  Home
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-ink2">
                  The front page - hero, current problem, what&apos;s on, and the
                  newsletter.
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
