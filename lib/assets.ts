// Prefix a public/ asset path with the deploy basePath. next/image and plain
// <img> do NOT add basePath to string srcs (only static imports get it), so
// every content-supplied path ("/assets/...") must go through this helper.
// NEXT_PUBLIC_BASE_PATH is set in next.config.mjs and inlined at build time.
export const asset = (src: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
