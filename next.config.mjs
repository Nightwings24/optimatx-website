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

  // Served at the GitHub Pages project sub-path
  // https://nightwings24.github.io/optimatx-website/ for now, so everything
  // must be prefixed with the repo name.
  //
  // WHEN MOVING TO THE optimatx.in ROOT DOMAIN: delete `basePath` below,
  // restore public/CNAME (containing "optimatx.in"), and set the custom
  // domain in the repo's Pages settings.
  basePath: "/optimatx-website",
};

export default nextConfig;
