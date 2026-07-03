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
  metadataBase: new URL(SITE.url),
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
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} - Mathematics Society, IIT Patna`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - Mathematics Society, IIT Patna`,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0D14" },
    { media: "(prefers-color-scheme: light)", color: "#F4F6FB" },
  ],
};

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
          <CommandPaletteProvider>
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
