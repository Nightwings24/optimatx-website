# Problem-of-the-Week leaderboard (Supabase)

The POTW answer box and live leaderboard are powered by [Supabase](https://supabase.com)
(free tier). Until it's configured the site falls back to the offline self-checker,
so nothing breaks before setup.

## One-time setup (~5 min)

1. **Create an account + project** at [supabase.com](https://supabase.com) (free).
   Pick a project name and a database password (save it somewhere).
2. **Create the schema.** In the dashboard: **SQL Editor -> New query**, paste the
   whole of [`potw.sql`](potw.sql), and click **Run**. This creates the tables,
   the security rules, the leaderboard, the answer-checking function, and seeds
   one example problem.
3. **Grab your URL + key** (shortcut: the **Connect** button at the top of the
   dashboard shows both at once):
   - **Project URL** -> Project Settings -> **Data API** -> "Project URL"
     (looks like `https://xxxxxxxx.supabase.co`). This is `NEXT_PUBLIC_SUPABASE_URL`.
   - **API key** -> Project Settings -> **API Keys** -> copy the **Publishable key**
     (`sb_publishable_...`; the "anon public" key on the Legacy tab also works).
     This is `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Do **not** use the Secret key
     (`sb_secret_...`) - it bypasses the security rules and must never ship in the
     browser.

   (The publishable / anon key is safe to expose publicly - the security rules in
   `potw.sql` are what protect the answers, not the key.)
4. **Add them to the site:**
   - **Local preview:** add both lines to `.env.local`, then `npm run dev`.
   - **Production:** GitHub -> repo **Settings -> Secrets and variables -> Actions**
     -> add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
     as repository secrets, then re-run the deploy.

That's it - the leaderboard appears on `/problems` and updates live as people solve.

## Posting a new problem each week

The **answer** lives in Supabase (never in the site code), so update it there.
In the SQL Editor:

```sql
-- close the old one, open the new one
update public.potw_problems set active = false where active = true;

insert into public.potw_problems (id, title, accepted, active) values
  ('15', 'Your new problem title', array['42', 'forty-two'], true);
```

- `id` must match the POTW **number** shown on the site (edit the problem text in
  [`../content/problems.ts`](../content/problems.ts) as usual; keep the number in sync).
- `accepted` is an array - list every answer you'll accept. Matching is
  case-insensitive and numeric-tolerant (`1` matches `1.0`).
- Keep exactly **one** row `active = true`.

## Notes

- **Identity is honor-system** (name + roll). Points de-dupe by roll, so one
  person can't score twice on the same problem, but nothing stops someone typing
  a different name. That's the tradeoff for no login.
- **Answers stay hidden:** the browser can never read `potw_problems`; it can only
  call `submit_potw()`, which checks the answer on the server.
- To wipe the board (e.g. new semester): `truncate public.potw_solves;`
