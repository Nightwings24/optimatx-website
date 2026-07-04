// Served at the GitHub Pages project sub-path
// https://nightwings24.github.io/optimatx-website/ for now, so everything
// must be prefixed with the repo name.
//
// WHEN MOVING TO THE optimatx.in ROOT DOMAIN: set this to "" (empty string),
// restore public/CNAME (containing "optimatx.in"), and set the custom
// domain in the repo's Pages settings.
const basePath = "/optimatx-website";

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
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
