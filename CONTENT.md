# OptimatX - Content Guide for the Team

This is the one document for **everyone who adds content to the website** - no coding background needed. The site is built so that almost everything you'll write lives in a plain data file or a Markdown file. You edit the file, save it, and the site rebuilds and goes live on its own in about a minute.

- **Live site:** https://nightwings24.github.io/optimatx-website/
- **Code + content:** https://github.com/Nightwings24/optimatx-website

---

## How publishing works (read this once)

Every page on the site is generated from files in the repository. To change what people see, you change a file and save it to GitHub. There are two ways to do that:

**A. On GitHub.com (easiest - no software to install)**
1. Go to the repo, click into the file you want (paths are given in each section below).
2. Click the **pencil ✏️ icon** ("Edit this file"). To make a *new* file, use **Add file -> Create new file** and type the path (e.g. `content/blog/my-post.mdx`).
3. Make your change, scroll down, and click **Commit changes**.
4. That's it. GitHub rebuilds and redeploys the site automatically (watch the green check on the **Actions** tab; ~1 minute).

To upload images, use **Add file -> Upload files** and drag them into the right folder.

**B. On your computer (if you know Git)** - edit files locally, then `git add -A && git commit -m "..." && git push`.

> **If a deploy ever shows a red X with "Deployment failed, try again later"** and the *build* step was green: it's a harmless GitHub hiccup. Open the failed run on the **Actions** tab and click **Re-run failed jobs**. It'll go through.

---

## The golden rules (they apply everywhere)

1. **Use plain hyphens `-`, never "fancy" dashes** (`—` or `–`). If you paste from Word/Google Docs, retype the dashes. This is a hard project convention.
2. **Math is written in LaTeX/KaTeX.** Inline math goes between single dollar signs: `$e^{i\pi} + 1 = 0$`. A centered equation goes between double dollar signs: `$$\int_0^\pi \sin x\,dx = 2$$`. This works in blog posts, notes, newsletters, and event text.
   - **Inside `.ts` data files only** (like problems.ts), every backslash must be **doubled**: write `"\\sum_{k=1}^{5} k^3"`. Inside `.mdx` files, write it normally: `$\sum_{k=1}^{5} k^3$`.
3. **Colors come from a fixed set of six "slots"**, never free hex colors. When a field asks for a `color`, use exactly one of:
   `accent` (green) · `accent2` (mint) · `magenta` (rose) · `amber` (blue) · `lime` (gold) · `violet` (orange).
   (The names are slots, not literal colors - in dark mode amber shows as blue, lime as gold, violet as orange. Pick by feel; don't invent a seventh.)
4. **In `.ts` data files, punctuation matters.** Every entry is wrapped in `{ }`, every field ends with a comma, and text goes in `"double quotes"`. One missing comma or brace breaks the build. When in doubt, copy an existing entry and change the words.
5. **For Markdown files (`.mdx`), the filename becomes the web address.** `sierpinski-from-pascal.mdx` becomes `/blog/sierpinski-from-pascal`. Use lowercase letters, numbers, and hyphens only - no spaces or capitals. Renaming later breaks existing links.
6. **Images live in `public/assets/...`** and you reference them with a plain path like `/assets/media/photo.jpg` - **never** add the `/optimatx-website` prefix yourself; the site adds it automatically.

---

## What to work on, and how often

| Rhythm | Task |
|---|---|
| **Weekly** | Post a new **Problem of the Week** (2 steps - file + one line of SQL) |
| **Fortnightly** | Send a **Dispatch** newsletter issue |
| **After each event** | Add a **recap + photos**, flip the event to "past" |
| **Ongoing** | **Blog posts**, **course notes**, **competition results**, resource links |
| **Once, soon** | Replace the **sample/placeholder** content flagged in each section below |

---

# The content types

Ordered from most frequent to least. Each section tells you **where it lives, how to add one, the fields, a copy-paste template, and what sample content to replace.**

---

## 1. Problem of the Week  ⭐ (weekly, TWO steps)

This is the only piece with two parts, because the **answer is kept secret** so nobody can cheat the leaderboard: the visible question lives in the code, but the accepted answer lives privately in our Supabase database.

**Where:** `content/problems.ts` (the question) **+** the Supabase SQL Editor (the answer).
**Shows on:** the home page box, `/problems`, each problem's own page, and feeds the live leaderboard.

### How to post a new problem

**Part 1 - the question (`content/problems.ts`):**
1. Find the current open problem (the top entry, the one with `status: "open"`). Change it to `status: "closed"`, delete its `deadline:` line, and make sure its `solution` is filled in with the real worked answer.
2. Add your **new** problem as a new object at the **top** of the `problems` array. Give it `number:` one higher than the last.

```ts
  {
    number: 15,
    slug: "15-sum-of-cubes",
    title: "A sum of cubes",
    date: "2026-07-06",
    difficulty: "medium",
    status: "open",
    deadline: "Fri 23:59",
    prompt: "Evaluate the sum:",
    formula: "\\sum_{k=1}^{5} k^3",
    placeholder: "a number",
    accepted: ["225"],
    correctMessage: "✓ Correct - the first n cubes sum to a perfect square.",
    wrongMessage: "≠ Not quite - try (n(n+1)/2)^2.",
    solution:
      "The sum of the first n cubes equals the square of the nth triangular number: (1+2+3+4+5)^2 = 15^2 = 225.",
    solutionFormula: "\\sum_{k=1}^{n} k^3 = \\left(\\frac{n(n+1)}{2}\\right)^2 = 15^2 = 225",
  },
```

**Part 2 - the secret answer (Supabase -> SQL Editor -> New query):**

```sql
update public.potw_problems set active = false where active = true;

insert into public.potw_problems (id, title, accepted, active) values
  ('15', 'A sum of cubes', array['225'], true);
```

Click **Run**. The `'15'` **must match** the `number: 15` from Part 1.

**Fields (problems.ts):** `number` (int, +1 each week), `slug` (`<number>-short-title`), `title`, `date` (`YYYY-MM-DD`), `difficulty` (`warm-up` / `medium` / `hard`), `status` (`open` / `closed` - only ONE open at a time), `deadline` (open problem only), `prompt`, `formula` (KaTeX, backslashes doubled), `placeholder`, `accepted` (list of answers for the offline fallback), `correctMessage`, `wrongMessage`, `solution`, `solutionFormula` (optional).

**Checklist:** exactly one problem has `status: "open"`, exactly one Supabase row has `active = true`, and their `number`/`id` match. Answer matching is case-insensitive and number-tolerant (`1` = `1.0`).

> Full details, including how to wipe the leaderboard, are in [`supabase/README.md`](supabase/README.md).

---

## 2. Events (weekly/as needed)

Each event automatically gets its own page at `/events/<id>` built from its fields.

**Where:** `content/events.ts`
**Shows on:** home ("What's on"), `/events` (Upcoming + Past), and `/events/<id>`.

### How to add an event
Copy this into the `events` array (in the Upcoming or Past block), and fill it in:

```ts
  {
    id: "integration-bee-2027",
    title: "Integration Bee",
    glyph: "∫",
    color: "magenta",
    dateChip: "MAR 14 · π DAY",
    dateISO: "2027-03-14",
    tag: "Flagship",
    blurb: "Bracket-style integral speed-solving. Last solver standing takes the wizard hat.",
    affordance: "Learn more →",
    registerUrl: "https://forms.gle/your-real-form",
    summary: "A longer intro paragraph shown at the top of the detail page.",
    facts: [
      { label: "When", value: "March 14 (Pi Day)" },
      { label: "Format", value: "Single-elimination bracket" },
      { label: "Eligibility", value: "All IIT Patna students" },
    ],
    sections: [
      { heading: "How it works", body: "Two solvers face off at the board..." },
      { heading: "How to prepare", body: "Drill the standard forms until they are reflex." },
    ],
    status: "upcoming",
  },
```

**Key fields:** `status` (`upcoming` / `past` - this alone sorts it), `registerUrl` (paste a **real Google Form link** for sign-ups, or delete the line), `color` (a category slot). `summary`, `facts`, and `sections` are optional but they **are** the detail page - fill them in or it'll be sparse.

**Sample to replace:** the two Past events (Pi Day Puzzle Hunt, National Mathematics Day Talk) are invented recaps; Integration Bee's `registerUrl` is a placeholder `/join`, its date is a guess, and all the summaries/facts are plausible-but-invented. Verify against reality.

---

## 3. Blog posts & series (ongoing)

**Where:** a new `.mdx` file in `content/blog/`
**Shows on:** `/blog` (with tag filters) and `/blog/<filename>`, plus a comment thread at the bottom.

### How to add a post
Create `content/blog/your-title.mdx`:

```mdx
---
title: "How Pascal's Triangle Hides Sierpinski"
date: "2026-07-10"
author: "OptimatX"
description: "One sentence shown on the blog list and in search results."
tags: ["number-theory", "fractals"]
---

Write the body in Markdown. Use `##` for section headings, `**bold**`,
bullet lists, and [links to other pages](/problems).

Inline math like $\binom{n}{k}$ works, and centered math too:

$$\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$$
```

**Tags double as series.** Give related posts a shared tag (`"spotlight"`, `"comic"`, `"proof-of-the-month"`) and readers can filter to just that series on `/blog`. This is how you run **"this day in math history" spotlights, comics/memes, podcasts, proof-of-the-month** - all just tagged blog posts, no new pages needed.

---

## 4. Course notes (ongoing)

Like blog posts, but they attach to a course card on the Resources page.

**Where:** a new `.mdx` file in `content/notes/`
**Shows on:** `/resources` (listed on the matching course card) and `/resources/notes/<filename>`.

```mdx
---
title: "Linear Algebra - Vector Spaces"
course: "Linear Algebra"
author: "Your Name"
date: "2026-07-10"
description: "One-sentence summary of what these notes cover."
---

Full notes in Markdown, with $matrix$ math and $$displayed$$ equations.
```

> ⚠️ **`course:` must exactly match** one of the course names in `content/resources.ts` (`"Calculus"`, `"Linear Algebra"`, `"Differential Equations"`, `"Probability & Statistics"`, `"Complex Analysis"`, `"Numerical Methods"`). If it doesn't match, the note won't appear on any card. To add a new course, first add it to `courses` in `resources.ts` (see section 10).

**Sample to replace / example to keep:** one finished sample note ships (`calculus-limits-and-continuity.mdx`) so you can see the format - keep it or replace it with your own.

---

## 5. Newsletter - "The Dispatch" (fortnightly)

**Where:** a new `.mdx` file in `content/newsletter/`
**Shows on:** `/publications` (archive, newest first) and `/publications/<filename>`.

```mdx
---
title: "The Dispatch #2 - Standard forms and a bee"
issue: 2
date: "2026-07-18"
description: "Issue two: drilling standard integrals, Pi Day plans, and a problem about primes."
---

Write the issue in Markdown - the current problem, the next events,
one thing worth thinking about. Keep it short; link out to the site.
```

> The `issue:` number must be a **plain number** (no quotes) and **one higher** than the last - it controls both the sort order and the "Issue #N" label.

**Sample to replace:** issue #1 (`dispatch-001.mdx`) references "Problem #14" and specific events - keep it, but make sure future issues use the real current problem number and event details.

### The magazine (same page, when you have one)
`/publications` also hosts the annual long-form magazine. Until there's an issue it shows an "in the works" note. To publish one: upload the PDF to `public/assets/publications/`, then add an entry to the `magazineIssues` list in `content/publications.ts`:

```ts
{ id: "spring-2027", title: "Spring 2027 Issue", dateChip: "SPRING 2027", blurb: "Our first print issue: essays, the year's best problems, and a puzzle spread.", pdf: "/assets/publications/spring-2027.pdf" },
```

---

## 6. Media - photos & videos (after events)

**Where:** `content/media.ts` (+ image files in `public/assets/media/`)
**Shows on:** `/media`.

**Photo album** - upload images to `public/assets/media/<album-id>/`, then add:

```ts
  {
    id: "integration-bee-2027",
    title: "Integration Bee 2027",
    dateChip: "MAR 14 · 2027",
    glyph: "∫",
    color: "magenta",
    description: "Fourteen teams, three hours, one very smug winner.",
    photos: [
      { src: "/assets/media/integration-bee-2027/01.jpg", alt: "Two finalists at the board" },
      { src: "/assets/media/integration-bee-2027/02.jpg", alt: "The winning team with the wizard hat" },
    ],
  },
```
(An album with an empty `photos: []` shows a tidy "Photos coming soon".)

**Video** - just paste a YouTube or Vimeo link into the `videos` array:

```ts
  { id: "friday-talk-partitions", title: "Partitions and the circle method", url: "https://youtu.be/XXXXXXXX", caption: "Friday Evening Talk, Dec 2026." },
```

**Sample to replace:** one demo video (a 3Blue1Brown link) ships so the embed is visible - **replace it** with the club's own recordings.

---

## 7. Competitions & prep (each season)

**Where:** `content/competitions.ts` (three lists).
**Shows on:** `/competitions`.

- **`competitions`** (contests we sit): `id`, `name`, `glyph`, `color`, `cadence`, `scope`, `blurb`, `eligibility`, optional `href` (official site).
- **`results`** (the record): `year`, `competition`, `achievement`, `who`.
- **`prepTracks`** (study tracks): `id`, `title`, `glyph`, `color`, `blurb`, `covers` (a list of strings), optional `resourceHref`.

```ts
// a results row:
{ year: "2026", competition: "Simon Marais", achievement: "Top 10%, Asia-Pacific", who: "A. Sharma" },
```

**Sample to replace:** the entire `results` list is **SAMPLE rows** ("OptimatX member", generic placings). Replace with the club's real record before sharing widely.

---

## 8. Team roster (each recruitment cycle)

**Where:** `content/team.ts`
**Shows on:** `/team`.

```ts
  {
    id: "asha",
    name: "Asha Kumar",
    role: "Problem Setting",
    year: "2nd year · Mathematics & Computing",
    group: "core",
    quote: "The only way to learn mathematics is to do mathematics. - Halmos",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/in/..." },
    ],
    color: "magenta",
  },
```

**Fields:** `group` is `faculty`, `coordinator`, or `core` (this sorts them into sections). `socials` can be empty `[]` (the links row just hides). `platform` is one of `instagram` / `github` / `linkedin` / `email` / `website`.

**Photos:** drop a square headshot at `public/assets/team/<id>.jpg` (matching the member's `id`). Until then a nice initials circle shows automatically - nothing breaks. Current ids that could use photos: `advisor`, `anish`, `baibhaw`, `maanya`, `goutham`, `prabhudutta`, `adarsh`, `anvesh`, `aradhya`, `ayush`, `onik`, `yashvardhan`.

> If you add or remove members, bump the count in `teamStats` (see section 12) so "11 on the council" stays accurate.

---

## 9. Alumni & achievements

**Where:** `content/alumni.ts`
**Shows on:** `/alumni`.

- **`achievements`**: `title`, `detail`, `color`.
- **`alumni`**: `name`, `batch` (e.g. `"'23"`), `now` (where they are), `track` (`"Industry"` or `"Grad school"`).

```ts
{ name: "Ishaan Gupta", batch: "'23", now: "Quant Researcher, Optiver", track: "Industry" },
```

**Sample to replace:** **all of it** is placeholder - the eight alumni (Optiver, MIT, Jane Street, etc.) and the six achievements are invented. Swap in the club's real people and wins.

---

## 10. Resources - roadmaps, links, courses

**Where:** `content/resources.ts` (three lists).
**Shows on:** `/resources`.

- **`roadmaps`** (ordered reading paths): `id`, `topic`, `glyph`, `color`, `blurb`, and `steps` - each step has `title`, `detail`, and an optional `href` (link).
- **`resourceGroups`** (curated external links): `heading`, `glyph`, `color`, and `items` - each item has `label`, `desc`, `href`.
- **`courses`** (the cards that hold your notes from section 4): `name`, `note`. Add a course here first if you want to publish notes for a subject that isn't listed.

```ts
// a curated link:
{ label: "3Blue1Brown", desc: "Visual intuition for calculus and linear algebra.", href: "https://www.3blue1brown.com/" },
```

The curated links are real and good; the roadmaps and courses are a solid starting set - grow them.

---

## 11. FAQ

**Where:** `content/faq.ts`
**Shows on:** `/faq`.

Questions are grouped into categories. Add a `{ q, a }` pair to any category's `items`, or add a whole new category:

```ts
{
  heading: "Joining",
  items: [
    { q: "Do I need to be a math major to join?", a: "Not at all - every branch and year is welcome." },
  ],
},
```

The current answers are written and accurate to how the club works - review and tweak to match reality (recruitment timing, meeting spots, etc.).

---

## 12. Home-page copy & stats (occasional)

- **`content/stats.ts`** - the number bands. `homeStats` (site metrics) and `teamStats` (roster metrics). Each is `{ value, caption, color }`. **Keep `teamStats` "on the council" count in sync with the roster.**
- **`content/marquee.ts`** - the scrolling strip of words/symbols. Each token is `{ text, kind }` where `kind` is `"verb"` or `"glyph"`.
- **`content/cards.ts`** - the six "What's inside" cards on the home page. These are structural; change the wording if you like, but leave the set of six as-is (they map to the site's main sections).

---

## 13. Optimization Corner (advanced, optional)

**Where:** `content/lp.ts`
**Shows on:** `/optimization-corner`.

This drives the interactive linear-programming visualizer. Adding a scenario means defining `constraints` (lines like `{ a: 3, b: 2, op: "<=", c: 18, label: "Machine 3" }`), an `objective` (`{ p, q }`), `view` bounds, axis labels, a `formulaTeX` statement, and an `optimumNote`. **This one needs a bit of math care** - the two shipped scenarios (product mix, cheapest diet) are correct and complete, so grab one as a template or ask a developer. Not needed for launch.

---

## 14. Club identity & socials (rarely)

**Where:** `lib/site.ts` - one file for club name, tagline, description, **email**, location, and the **socials** list (Instagram, LinkedIn, GitHub, email). The footer's "Connect" column builds itself from the socials list, so you only edit in one place. These are already set to the real values; update here if a handle changes.

---

# Config the club owns (accounts & secrets)

These aren't "content" - they're one-time setup done in the GitHub **Settings -> Secrets and variables -> Actions** page (and Supabase / Google). Once set, they apply on the next deploy.

| Thing | What to do | Status |
|---|---|---|
| **Forms** (contact, join, merch, newsletter) | Web3Forms key in secret `NEXT_PUBLIC_WEB3FORMS_KEY` | ✅ done |
| **Events calendar** | Google Calendar embed URL in secret `NEXT_PUBLIC_GCAL_SRC` | ✅ done |
| **Leaderboard** | Supabase keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) | ✅ done |
| **Contact map** | Google Maps -> Share -> Embed -> copy the `src` URL -> secret `NEXT_PUBLIC_MAP_SRC` | ⬜ to do |
| **Analytics** | Free account at goatcounter.com, put the site code in secret `NEXT_PUBLIC_GOATCOUNTER_CODE` | ⬜ to do |

Before announcing the site, **clear the leaderboard test data**: Supabase SQL Editor -> `truncate public.potw_solves;`

---

# Quick file map

| You want to change... | Edit this |
|---|---|
| Problem of the Week | `content/problems.ts` + Supabase SQL |
| Events | `content/events.ts` |
| Blog post | new file in `content/blog/` |
| Course notes | new file in `content/notes/` |
| Newsletter issue | new file in `content/newsletter/` |
| Photos / videos | `content/media.ts` + `public/assets/media/` |
| Competition results & prep | `content/competitions.ts` |
| Team | `content/team.ts` + `public/assets/team/` |
| Alumni & achievements | `content/alumni.ts` |
| Resources & course list | `content/resources.ts` |
| FAQ | `content/faq.ts` |
| Magazine PDFs | `content/publications.ts` + `public/assets/publications/` |
| Home stats / marquee / cards | `content/stats.ts`, `content/marquee.ts`, `content/cards.ts` |
| Club email / socials | `lib/site.ts` |

**When in doubt: copy an existing entry, change the words, keep the punctuation.** If something breaks the build, GitHub emails whoever committed - just revert that commit and ask.

Happy writing. Conjecture, prove, repeat.
