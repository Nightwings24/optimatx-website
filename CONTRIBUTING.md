# Contributing to the OptimatX website

Thanks for helping keep this alive across student generations. Most contributions are small and don't need you to be a web developer - a lot of it is editing data files.

## Setup

Requires **Node.js 20+**.

```bash
npm install
npm run dev        # http://localhost:3000  (see note below about the base path)
```

> **Base path:** the site currently deploys to a GitHub Pages sub-path, so locally it lives at **http://localhost:3000/optimatx-website/** - not the bare root. When it moves to `optimatx.in`, that goes away.

## The easy stuff (no coding)

Almost all content lives in typed data files under [`content/`](content/):

| To… | Edit |
|---|---|
| Add / update a team member | `content/team.ts` (+ a square photo in `public/assets/team/`) |
| Post or archive an event | `content/events.ts` |
| Change the Problem of the Week | `content/problems.ts` |
| Add a blog post | drop an `.mdx` file in `content/blog/` |
| Add a resource or roadmap step | `content/resources.ts` |
| Add an FAQ / alumnus / achievement | `content/faq.ts` / `content/alumni.ts` |
| Add a whole new page to the nav | register it once in `lib/nav.ts` |

## House rules (please keep)

- **Use the theme utilities, never hard-coded hex.** `bg-surface`, `text-ink`, `text-accent`, `border-line2`, … so light/dark mode keeps working.
- **Stick to the five category colors.** Don't invent a sixth or recolor a category from page to page.
- **Copy uses plain hyphens** (a single `-`), not the longer em or en dashes.
- **Body text stays ≥ 14px.**
- **Default new features to static.** Only add a backend when a static + form version has proven demand.

## Before you open a pull request

```bash
npm run typecheck   # must pass
npm run build       # must succeed
```

CI runs both on every PR, and a broken build can't be merged. Open a PR against `main`; once it's approved and merged, the site redeploys automatically.

## Questions?

Open an issue, or reach us from the [Contact page](https://nightwings24.github.io/optimatx-website/contact/). Welcome aboard.
