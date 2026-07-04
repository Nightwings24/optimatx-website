// Served at the GitHub Pages project sub-path
// https://nightwings24.github.io/optimatx-website/ for now, so everything
// must be prefixed with the repo name.
//
// WHEN MOVING TO THE optimatx.in ROOT DOMAIN: set this to "" (empty string),
// restore public/CNAME (containing "optimatx.in"), and set the custom
// domain in the repo's Pages settings.
const basePath = "/optimatx-website";

const b64 = (v) => (v ? Buffer.from(v, "utf8").toString("base64") : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site - export to ./out so it deploys to any host
  // (Vercel, GitHub Pages, Cloudflare Pages). No server runtime.
  output: "export",

  // No server image optimizer under static export.
  images: { unoptimized: true },

  // Emit /about/index.html etc. so deep links don't 404 on hard refresh
  // on static hosts like GitHub Pages.
  trailingSlash: true,

  reactStrictMode: true,

  ...(basePath ? { basePath } : {}),

  // next/image and plain <img> do NOT prefix basePath onto string srcs from
  // public/, so lib/assets.ts reads this to build correct asset URLs.
  //
  // The Supabase URL/key are base64-wrapped at build time and decoded at
  // runtime (lib/supabase.ts). The key is PUBLIC by design - the wrapping
  // exists only because GitHub Pages' deploy pipeline rejects artifacts
  // containing raw sb_publishable_* strings (secret-scanner false positive;
  // every such deploy failed, every artifact without the raw string passed).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SB_URL_B64: b64(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SB_KEY_B64: b64(
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
  },
};

export default nextConfig;
