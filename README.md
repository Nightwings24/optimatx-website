# OptimatX website

The website for **OptimatX**, the Mathematics Society of IIT Patna (under the Science & Technology Council).

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**, exported as a fully **static site** (`output: 'export'`) so it can be hosted for free on Vercel, GitHub Pages, or Cloudflare Pages. Math is typeset with **KaTeX** at build time; the ⌘K command palette, dark/light theme, the interactive Pascal's-triangle hero, and the Problem-of-the-Week checker are small client-side "islands".

> **The most important thing about this repo is that the next team can run it.** Content lives in plain data files - you almost never need to touch a component to update the site.

---

## Run it locally

Requires **Node.js 20+**.

```bash
npm install        # first time only
npm run dev        # start the dev server → http://localhost:3000
```

To preview the exact static build that gets deployed:

```bash
npm run build      # outputs the static site to ./out
npm run preview    # serve ./out locally
```

Other scripts: `npm run typecheck` (TypeScript), `npm run lint` (ESLint), `npm run extract:logo` (re-extract the emblem from the reference bundle).

---

## Project structure

```
app/            # pages (one folder per route) + layout, sitemap, robots, favicon, OG image
components/
  ui/           # small presentational primitives (Button, Tag, Katex, Logo…)
  sections/     # page building blocks (cards, bands, feature boxes)
  islands/      # interactive client widgets (Pascal triangle, answer checker, forms)
  chrome/       # site-wide shell (nav, footer, command palette, theme toggle)
  providers/    # the theme provider
content/        # ← EDIT THESE: team, events, cards, stats, POTW, marquee
lib/            # nav/palette config, site constants, helpers
public/assets/  # the logo, and team photos
```

---

## How do I…

### …add or update a team member?
Edit [`content/team.ts`](content/team.ts). Add an object to `members` (or `facultyAdvisor`). Drop a **square** headshot in `public/assets/team/<id>.jpg` and set `photo: "/assets/team/<id>.jpg"`. If you skip the photo, the card shows an initials monogram - nothing breaks. Give each member one mathematical `quote`.

### …post a new event / archive an old one?
Edit [`content/events.ts`](content/events.ts). Add an object to `events`. Set `status: "upcoming"` or `"past"`. Pick a `color` from the five category slots (see house rules). It shows up on both the Home page and `/events` automatically.

### …change this week's problem?
Edit [`content/potw.ts`](content/potw.ts): bump `number`, set `formula` (a KaTeX string), and set `accepted` to the accepted answer(s).

### …add a brand-new page?
1. Copy an existing page, e.g. `app/about/page.tsx`, into `app/<your-route>/page.tsx`.
2. Register the route in [`lib/nav.ts`](lib/nav.ts). Adding it there wires it into the nav, the mobile drawer, the ⌘K palette, **and** the sitemap in one edit.

All routes are live pages (there are no "coming soon" placeholders).

### …connect the forms (Join / Contact)?
The forms POST to a free form provider. Create a form at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com), then set the endpoint as an environment variable (see below). Until it's set, the forms validate and then ask visitors to email instead.

### …add a formula anywhere?
```tsx
import { Katex } from "@/components/ui/Katex";
<Katex tex={String.raw`\int_0^1 x^2\,dx`} display />
```

### …change colors, fonts, or spacing?
Every design token is defined once in [`app/globals.css`](app/globals.css). Use the semantic utilities (`bg-surface`, `text-ink`, `text-accent`, `border-line2`, …) so light/dark theming keeps working - **never hard-code a hex in a component.**

---

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in what you need. All are `NEXT_PUBLIC_` because this is a static site (the browser reads them; there is no server).

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | Formspree/Web3Forms endpoint for the Join & Contact forms |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key (only if using Web3Forms) |
| `NEXT_PUBLIC_GCAL_SRC` | Embeddable Google Calendar URL for `/events` |
| `NEXT_PUBLIC_MAP_SRC` | Google Maps embed URL for `/contact` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for the POTW leaderboard (see [`supabase/README.md`](supabase/README.md)) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key for the POTW leaderboard |
| `NEXT_PUBLIC_GOATCOUNTER_CODE` | GoatCounter analytics site code (free at [goatcounter.com](https://www.goatcounter.com); unset = analytics off) |

On the host, set the same variables in the project's environment / secrets. The
POTW leaderboard is optional - unset, the answer box falls back to an offline
self-check. Setup steps: [`supabase/README.md`](supabase/README.md).

---

## Deploy

The build output (`./out`) is pure static files, so any of these work with the custom domain **optimatx.in**:

- **Vercel (recommended):** import the repo - it auto-detects Next.js and serves the export. Add `optimatx.in` under Settings → Domains, add the env vars, done.
- **GitHub Pages:** a workflow is included at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Enable Pages → Source: **GitHub Actions**, add the env vars as repository **secrets**, and push to `main`. `public/CNAME` (`optimatx.in`) and `public/.nojekyll` are already in place; point your domain's DNS at GitHub Pages.
- **Cloudflare Pages:** framework preset "Next.js (Static HTML Export)", build command `npm run build`, output dir `out`.

---

## House rules (please keep)

- **Don't invent a 6th accent color**, and don't recolor a category page-to-page. The 5 slots (green / rose / blue / gold / orange) are load-bearing.
- **Don't hard-code hex values** in components - use the theme utilities so both themes keep working.
- Don't let the graph-paper grid show *through* cards (cards are opaque `--surface`).
- Don't shrink body text below 14px.
- **Default every new feature to static.** Only add a backend when a static + form version has proven demand.

---

## License

MIT - see [`LICENSE`](LICENSE). Open-sourced so future OptimatX teams can maintain and extend it.
