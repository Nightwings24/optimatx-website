// Single source of truth for navigation. Feeds the top nav, the mobile drawer,
// the ⌘K command palette, AND the sitemap. Add a page here once and it appears
// everywhere. `status: "planned"` routes render a lightweight "coming soon"
// page so the nav is never a dead link (the #1 flaw of the old site).

export type RouteStatus = "live" | "planned";

export interface NavLink {
  label: string;
  href: string;
  status: RouteStatus;
}

export interface Route extends NavLink {
  /** include in the generated sitemap.xml */
  sitemap: boolean;
}

/** Center nav links, in the mockup's order. */
export const navLinks: NavLink[] = [
  { label: "Problems", href: "/problems", status: "live" },
  { label: "Blog", href: "/blog", status: "live" },
  { label: "Resources", href: "/resources", status: "live" },
  { label: "Events", href: "/events", status: "live" },
  { label: "Team", href: "/team", status: "live" },
];

/** Every route, for the sitemap and drawer. */
export const allRoutes: Route[] = [
  { label: "Home", href: "/", status: "live", sitemap: true },
  { label: "About", href: "/about", status: "live", sitemap: true },
  { label: "Team", href: "/team", status: "live", sitemap: true },
  { label: "Events", href: "/events", status: "live", sitemap: true },
  { label: "Join", href: "/join", status: "live", sitemap: true },
  { label: "Contact", href: "/contact", status: "live", sitemap: true },
  { label: "Problems", href: "/problems", status: "live", sitemap: true },
  { label: "Blog", href: "/blog", status: "live", sitemap: true },
  { label: "Resources", href: "/resources", status: "live", sitemap: true },
  {
    label: "Optimization Corner",
    href: "/optimization-corner",
    status: "live",
    sitemap: true,
  },
  { label: "Gallery", href: "/gallery", status: "live", sitemap: true },
];

// -------------------------------------------------------------------------
// ⌘K command palette (design.md §6.10)
// -------------------------------------------------------------------------
export interface CommandItem {
  id: string;
  glyph: string;
  label: string;
  type: "route" | "action";
  href?: string;
  action?: "toggle-theme";
  keywords?: string[];
}

export const paletteCommands: CommandItem[] = [
  { id: "home", glyph: "⌘", label: "Home", type: "route", href: "/" },
  {
    id: "potw",
    glyph: "∫",
    label: "Problem of the Week",
    type: "route",
    href: "/problems",
    keywords: ["problem", "potw", "integral", "solve"],
  },
  {
    id: "blog",
    glyph: "∂",
    label: "Blog & Articles",
    type: "route",
    href: "/blog",
    keywords: ["writing", "posts", "articles"],
  },
  {
    id: "resources",
    glyph: "Σ",
    label: "Resources & Roadmaps",
    type: "route",
    href: "/resources",
    keywords: ["notes", "reading", "roadmap"],
  },
  {
    id: "events",
    glyph: "π",
    label: "Events & Competitions",
    type: "route",
    href: "/events",
    keywords: ["calendar", "integration bee", "srmc", "talks"],
  },
  {
    id: "optimization",
    glyph: "∇",
    label: "Optimization Corner",
    type: "route",
    href: "/optimization-corner",
    keywords: ["lp", "linear programming", "signature"],
  },
  {
    id: "team",
    glyph: "φ",
    label: "Our Team",
    type: "route",
    href: "/team",
    keywords: ["people", "members", "council"],
  },
  {
    id: "gallery",
    glyph: "✦",
    label: "Gallery",
    type: "route",
    href: "/gallery",
    keywords: ["art", "fractal", "julia", "visual", "generative"],
  },
  {
    id: "join",
    glyph: "+",
    label: "Join OptimatX",
    type: "route",
    href: "/join",
    keywords: ["recruitment", "apply", "sign up"],
  },
  {
    id: "toggle-theme",
    glyph: "◐",
    label: "Toggle theme",
    type: "action",
    action: "toggle-theme",
    keywords: ["dark", "light", "mode"],
  },
];
