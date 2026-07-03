"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase, SUPABASE_ENABLED, type LeaderRow } from "@/lib/supabase";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

// Live Problem-of-the-Week leaderboard. Reads the public potw_leaderboard view,
// refreshes on the local "potw-solved" event (the person who just solved), and
// subscribes to realtime inserts so every open board updates when anyone solves.
// Renders nothing until Supabase is configured.
export function POTWLeaderboard() {
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchBoard = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("potw_leaderboard")
      .select("roll,name,points")
      .limit(20);
    if (data) setRows(data as LeaderRow[]);
    setLoaded(true);
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    fetchBoard();
    const onSolved = () => fetchBoard();
    window.addEventListener("potw-solved", onSolved);
    const channel = client
      .channel("potw-solves")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "potw_solves" },
        () => fetchBoard()
      )
      .subscribe();
    return () => {
      window.removeEventListener("potw-solved", onSolved);
      client.removeChannel(channel);
    };
  }, [fetchBoard]);

  if (!SUPABASE_ENABLED) return null;

  return (
    <section className="container-site pb-16">
      <SectionEyebrow color="magenta" dot>
        Leaderboard
      </SectionEyebrow>
      <h2 className="mb-1 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
        This week&apos;s solvers
      </h2>
      <p className="mb-6 text-[15px] text-ink2">
        Solve the problem above with your name and roll number to appear here.
        Updates live.
      </p>

      <div className="overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface">
        {loaded && rows.length === 0 ? (
          <p className="p-6 text-[15px] text-ink2">
            No solvers yet - be the first.
          </p>
        ) : (
          <ol>
            {rows.map((r, i) => (
              <li
                key={`${r.roll}-${i}`}
                className="flex items-center gap-4 border-b border-line px-5 py-3 last:border-0"
              >
                <span
                  className="w-7 shrink-0 text-center font-mono text-[15px] font-bold"
                  style={{
                    color: i < 3 ? "var(--accent-ink)" : "var(--ink3)",
                  }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-ink">
                    {r.name}
                  </p>
                  <p className="truncate font-mono text-[11px] uppercase tracking-[0.1em] text-ink3">
                    {r.roll}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[14px] font-bold text-accent">
                  {r.points} pt{r.points === 1 ? "" : "s"}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
