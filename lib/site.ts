// Single source of truth for site-wide constants: identity, contact, socials,
// and the footer link columns. Non-coders can edit these safely.

export interface SocialLink {
  platform: "instagram" | "github" | "email" | "linkedin";
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}

// Base URL for canonical / OG / sitemap links. Override via NEXT_PUBLIC_SITE_URL
// for the eventual optimatx.in cutover; defaults to the current GitHub Pages
// sub-path deploy. At the cutover this becomes "https://optimatx.in" and (with
// basePath removed) origin === url, so everything collapses correctly.
const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://nightwings24.github.io/optimatx-website";

export const SITE = {
  name: "OptimatX",
  fullName: "OptimatX - Mathematics Society, IIT Patna",
  short: "OptimatX",
  url: BASE, // canonical base, includes any sub-path
  origin: new URL(BASE).origin, // scheme + host only (for metadataBase)
  tagline: "Conjecture, prove, repeat.",
  description:
    "OptimatX is the Mathematics Society of IIT Patna - a home for problems, proofs, talks, and the people who can't stop solving them.",
  email: "optimatx@iitp.ac.in",
  location: "IIT Patna · Bihta, Patna 801106, Bihar, India",
  council: "Science & Technology Council, IIT Patna",
} as const;

export const socials: SocialLink[] = [
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/optimatx.iitp/",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/optimatx-iit-patna/",
  },
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/Nightwings24/optimatx-website",
  },
  { platform: "email", label: "Email", href: `mailto:${SITE.email}` },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: "Content",
    links: [
      { label: "Problem of the Week", href: "/problems" },
      { label: "Blog", href: "/blog" },
      { label: "Resources", href: "/resources" },
      { label: "Optimization Corner", href: "/optimization-corner" },
      { label: "Gallery", href: "/gallery" },
      { label: "Media", href: "/media" },
      { label: "Publications", href: "/publications" },
      { label: "Discuss", href: "/discuss" },
    ],
  },
  {
    heading: "Club",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Alumni", href: "/alumni" },
      { label: "Events", href: "/events" },
      { label: "Competitions", href: "/competitions" },
      { label: "Merch", href: "/merch" },
      { label: "Join", href: "/join" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Connect",
    // derived from `socials` above - edit there, not here
    links: socials.map((s) => ({ label: s.label, href: s.href, external: true })),
  },
];

/** Formspree / Web3Forms endpoint, read from the environment (client-side). */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
