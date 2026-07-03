import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Supabase client for the POTW leaderboard. The URL + anon key are PUBLIC by
// design (safe to ship in a static bundle): the anon role can only read the
// public leaderboard and call the submit_potw() function - it cannot read the
// answers table or write solves directly (see supabase/potw.sql).
//
// Both vars are build-time NEXT_PUBLIC_*, so when they are unset the whole
// leaderboard degrades gracefully to the offline self-checker.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Newer Supabase dashboards call this the "publishable" key; older ones the
// "anon" key. Accept either name so the env matches whatever your dashboard
// shows. `||` (not `??`) so an empty-string var - what an unset GitHub Actions
// secret expands to - falls through to the other name instead of winning.
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const SUPABASE_ENABLED = Boolean(url && key);

export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

export interface LeaderRow {
  roll: string;
  name: string;
  points: number;
}
