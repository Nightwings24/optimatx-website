"use client";

import { useState } from "react";
import { supabase, SUPABASE_ENABLED } from "@/lib/supabase";
import { AnswerChecker } from "./AnswerChecker";

// The Problem-of-the-Week answer box. When Supabase is configured AND a
// problemId is given, it checks the answer server-side (so the answer stays
// hidden) and records a solve to the leaderboard against name + roll. Otherwise
// it falls back to the offline self-checker - identical to before setup.
export function POTWAnswer({
  problemId,
  accepted,
  placeholder,
  correctMessage,
  wrongMessage,
}: {
  problemId?: string;
  accepted: string[];
  placeholder?: string;
  correctMessage: string;
  wrongMessage: string;
}) {
  if (!problemId || !SUPABASE_ENABLED) {
    return (
      <AnswerChecker
        accepted={accepted}
        placeholder={placeholder}
        correctMessage={correctMessage}
        wrongMessage={wrongMessage}
      />
    );
  }
  return (
    <TrackedForm
      problemId={problemId}
      placeholder={placeholder}
      correctMessage={correctMessage}
      wrongMessage={wrongMessage}
    />
  );
}

type Status =
  | "idle"
  | "submitting"
  | "correct"
  | "already"
  | "incorrect"
  | "closed"
  | "error";

const inputClass =
  "min-w-0 flex-1 rounded-btn border border-white/15 bg-white/5 px-3.5 py-2.5 text-[15px] text-onbox outline-none placeholder:text-onbox/40 focus:border-accent disabled:opacity-60";

function TrackedForm({
  problemId,
  placeholder,
  correctMessage,
  wrongMessage,
}: {
  problemId: string;
  placeholder?: string;
  correctMessage: string;
  wrongMessage: string;
}) {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [points, setPoints] = useState<number | null>(null);
  const submitting = status === "submitting";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !roll.trim() || !answer.trim()) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    const { data, error } = await supabase!.rpc("submit_potw", {
      p_problem_id: problemId,
      p_answer: answer,
      p_name: name,
      p_roll: roll,
    });
    if (error) {
      setStatus("error");
      return;
    }
    const res = data as { status: string; already?: boolean; points?: number };
    if (res.status === "correct") {
      setPoints(res.points ?? null);
      setStatus(res.already ? "already" : "correct");
      // tell the leaderboard to refresh immediately
      window.dispatchEvent(new Event("potw-solved"));
    } else if (res.status === "incorrect") {
      setStatus("incorrect");
    } else if (res.status === "closed") {
      setStatus("closed");
    } else {
      setStatus("error");
    }
  }

  const solved = status === "correct" || status === "already";

  const message =
    status === "correct"
      ? `${correctMessage}${points !== null ? ` You're on the board - ${points} pt${points === 1 ? "" : "s"}.` : ""}`
      : status === "already"
        ? `Correct - you'd already solved this one${points !== null ? ` (${points} pt${points === 1 ? "" : "s"}).` : "."}`
        : status === "incorrect"
          ? wrongMessage
          : status === "closed"
            ? "This problem is closed - check back for the next one."
            : status === "error"
              ? "Enter your name, roll number, and an answer."
              : "";

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-2">
          <input
            aria-label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            autoComplete="name"
            disabled={submitting || solved}
            className={inputClass}
          />
          <input
            aria-label="Roll number"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            placeholder="Roll no."
            disabled={submitting || solved}
            className={inputClass}
          />
        </div>
        <div className="flex gap-2">
          <input
            aria-label="Your answer"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              if (status === "incorrect" || status === "error") setStatus("idle");
            }}
            placeholder={placeholder ?? "Your answer"}
            disabled={submitting || solved}
            className={inputClass}
          />
          <button
            type="submit"
            disabled={submitting || solved}
            className="shrink-0 rounded-btn bg-accent-fill px-5 py-2.5 font-bold text-white shadow-[0_8px_22px_color-mix(in_srgb,var(--accent)_32%,transparent)] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
          >
            {submitting ? "…" : solved ? "✓" : "Submit"}
          </button>
        </div>
      </div>
      {message && (
        <p
          role="status"
          aria-live="polite"
          className="mt-3 text-[14px]"
          style={{
            color: solved
              ? "var(--accent2)"
              : status === "incorrect"
                ? "var(--magenta)"
                : "rgba(233,236,244,0.7)",
          }}
        >
          {message}
        </p>
      )}
      <p className="mt-2 font-mono text-[11px] text-onbox/70">
        Solving records your name on the weekly leaderboard.
      </p>
    </form>
  );
}
