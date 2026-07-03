import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CommandPaletteProvider } from "@/components/chrome/CommandPalette";
import { AmbientGlow } from "@/components/chrome/AmbientGlow";
import { SkipLink } from "@/components/chrome/SkipLink";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { SITE } from "@/lib/site";
import type { CommandItem } from "@/lib/nav";
import { getAllPosts } from "@/lib/blog";
import { problems } from "@/content/problems";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // origin only - Next appends the basePath to the relative OG-image route, so
  // using the full sub-path base here would double it.
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.name} - Mathematics Society, IIT Patna`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "OptimatX",
    "IIT Patna",
    "Mathematics Society",
    "math club",
    "Problem of the Week",
    "Integration Bee",
    "optimization",
  ],
  openGraph: {
    type: "website",
    url: `${SITE.url}/`,
    siteName: SITE.name,
    title: `${SITE.name} - Mathematics Society, IIT Patna`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - Mathematics Society, IIT Patna`,
    description: SITE.description,
  },
  // No site-wide canonical: a static "/" would canonicalize every page to the
  // home URL. Pages self-canonicalize by their own URL instead.
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0D14" },
    { media: "(prefers-color-scheme: light)", color: "#F4F6FB" },
  ],
};

// Index problems + blog posts so the ⌘K palette searches real content, not just
// top-level routes. Built once at build time (static export).
// `fold` strips diacritics so an ASCII search ("sierpinski") still matches a
// title carrying accents ("Sierpiński"); it's added as a keyword.
const fold = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const contentCommands: CommandItem[] = [
  ...problems.map((p) => ({
    id: `problem-${p.slug}`,
    glyph: "∫",
    label: `#${p.number} · ${p.title}`,
    type: "route" as const,
    href: `/problems/${p.slug}`,
    keywords: ["problem", "potw", p.difficulty, fold(p.title)],
  })),
  ...getAllPosts().map((p) => ({
    id: `post-${p.slug}`,
    glyph: "∂",
    label: p.title,
    type: "route" as const,
    href: `/blog/${p.slug}`,
    keywords: ["blog", "article", ...p.tags, fold(p.title)],
  })),
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${mono.variable}`}
    >
      <body className="grid-bg min-h-dvh">
        <ThemeProvider>
          <CommandPaletteProvider extraCommands={contentCommands}>
            <AmbientGlow />
            <SkipLink />
            <Nav />
            <main id="main">{children}</main>
            <Footer />
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
