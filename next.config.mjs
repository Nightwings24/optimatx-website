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

  // No basePath / assetPrefix: the site lives at the root of a custom
  // domain (optimatx.in), so there is no base-path complication.
};

export default nextConfig;
