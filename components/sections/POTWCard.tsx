import Link from "next/link";
import { DarkFeatureBox } from "./DarkFeatureBox";
import { Katex } from "@/components/ui/Katex";
import { AnswerChecker } from "@/components/islands/AnswerChecker";
import type { POTW } from "@/content/potw";

// Problem of the Week feature box (design.md §6.4). Keeps a resting rose offset
// shadow. Left = statement + KaTeX + meta; right = the answer checker + links.
function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-onbox/70">
      {children}
    </span>
  );
}

export function POTWCard({ potw }: { potw: POTW }) {
  return (
    <DarkFeatureBox glyph="∫" className="shadow-[8px_8px_0_var(--magenta)]">
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <div className="mb-4 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-onbox/70">
            <span
              aria-hidden
              className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--magenta)" }}
            />
            Problem of the Week · #{potw.number}
          </div>
          <p className="text-[15px] text-onbox/80">{potw.prompt}</p>
          <div className="my-5 text-[1.35rem] text-onbox">
            <Katex
              display
              tex={potw.formula}
              ariaLabel="Problem of the week formula"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <MetaChip>Difficulty · {potw.difficulty}</MetaChip>
            <MetaChip>Closes&nbsp;{potw.deadline}</MetaChip>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <AnswerChecker
            accepted={potw.accepted}
            placeholder={potw.placeholder}
            correctMessage={potw.correctMessage}
            wrongMessage={potw.wrongMessage}
          />
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
            {potw.submitUrl && (
              <Link
                href={potw.submitUrl}
                className="font-mono text-accent-onbox hover:underline"
              >
                Submit a full solution →
              </Link>
            )}
            {potw.archiveUrl && (
              <Link
                href={potw.archiveUrl}
                className="font-mono text-onbox/60 hover:text-onbox"
              >
                Past problems
              </Link>
            )}
          </div>
        </div>
      </div>
    </DarkFeatureBox>
  );
}
