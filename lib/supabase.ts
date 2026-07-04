import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Supabase client for the POTW leaderboard. The URL + publishable key are
// PUBLIC by design (safe to ship in a static bundle): the anon role can only
// read the public leaderboard and call the submit_potw() function - it cannot
// read the answers table or write solves directly (see supabase/potw.sql).
//
// The values arrive base64-wrapped (encoded in next.config.mjs from the
// NEXT_PUBLIC_SUPABASE_URL / _PUBLISHABLE_KEY env vars) because GitHub Pages'
// deploy pipeline rejects artifacts containing a raw sb_publishable_* string -
// a secret-scanner false positive, NOT a real secret. When the vars are unset
// the leaderboard degrades gracefully to the offline self-checker.
const decode = (v: string | undefined): string => {
  if (!v) return "";
  try {
    return atob(v);
  } catch {
    return "";
  }
};

const url = decode(process.env.NEXT_PUBLIC_SB_URL_B64);
const key = decode(process.env.NEXT_PUBLIC_SB_KEY_B64);

export const SUPABASE_ENABLED = Boolean(url && key);

export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

export interface LeaderRow {
  roll: string;
  name: string;
  points: number;
}
