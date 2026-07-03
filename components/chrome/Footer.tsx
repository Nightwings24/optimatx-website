import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { GlyphWatermark } from "@/components/ui/GlyphWatermark";
import { SITE, footerColumns } from "@/lib/site";

// Site footer (design.md §6.9): faint giant φ, brand blurb, 3 link columns,
// bottom bar. Always on the dark indigo box (in both themes).
export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-boxline bg-box text-onbox">
      <GlyphWatermark
        glyph="φ"
        color="#ffffff"
        opacity={0.04}
        size={320}
        className="left-1/2 top-auto bottom-[-90px] right-auto -translate-x-1/2"
      />
      <div className="container-site relative py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo onBox />
            <p className="mt-4 text-[14px] leading-relaxed text-onbox/70">
              {SITE.description}
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-onbox/50">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[14px] text-onbox/75 transition-colors hover:text-onbox"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-[14px] text-onbox/75 transition-colors hover:text-onbox"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-boxline pt-6 font-mono text-[12px] text-onbox/55 sm:flex-row">
          <span>© 2026 OptimatX · IIT Patna</span>
          <span>Made with ∫ and ☕</span>
        </div>
      </div>
    </footer>
  );
}
