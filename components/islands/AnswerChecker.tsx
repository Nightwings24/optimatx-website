"use client";

import { useState } from "react";

// The Problem-of-the-Week answer checker (design.md §6.4). Numeric-aware compare
// against the accepted answer(s); inline ✓ (green) / ≠ (rose) feedback. Styled
// for the dark feature box it sits inside.
export function AnswerChecker({
  accepted,
  placeholder,
  correctMessage,
  wrongMessage,
  buttonLabel = "Check",
}: {
  accepted: string[];
  placeholder?: string;
  correctMessage: string;
  wrongMessage: string;
  buttonLabel?: string;
}) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<"ok" | "no" | null>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    const num = Number.parseFloat(v);
    const ok = accepted.some(
      (a) => a === v || (!Number.isNaN(num) && Number.parseFloat(a) === num)
    );
    setResult(ok ? "ok" : "no");
  }

  return (
    <form onSubmit={check} className="w-full">
      <label
        htmlFor="potw-answer"
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-onbox/60"
      >
        Your answer
      </label>
      <div className="flex gap-2">
        <input
          id="potw-answer"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setResult(null);
          }}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-btn border border-white/15 bg-white/5 px-3.5 py-2.5 text-[15px] text-onbox outline-none placeholder:text-onbox/40 focus:border-accent"
        />
        <button
          type="submit"
          className="shrink-0 rounded-btn bg-accent px-5 py-2.5 font-bold text-white shadow-[0_8px_22px_color-mix(in_srgb,var(--accent)_32%,transparent)] transition-transform hover:-translate-y-0.5"
        >
          {buttonLabel}
        </button>
      </div>
      {result && (
        <p
          role="status"
          className="mt-3 text-[14px]"
          style={{ color: result === "ok" ? "var(--accent2)" : "var(--magenta)" }}
        >
          {result === "ok" ? correctMessage : wrongMessage}
        </p>
      )}
    </form>
  );
}
