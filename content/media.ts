// Media page content: photo albums + video recordings (build list Cat 2/3).
//
// PHOTOS: drop images in public/assets/media/<album-id>/ and list them in the
// album's `photos` array as { src: "/assets/media/<album-id>/01.jpg", alt: "..." }.
// The page prefixes the deploy basePath automatically (lib/assets.ts) - write
// plain "/assets/..." paths here. An album with no photos shows "coming soon".
//
// VIDEOS: paste ordinary YouTube / Vimeo links; they are embedded automatically.
// The entry below is a SAMPLE so the embed is visible - replace it with the
// club's own recordings (talks, Manim explainers, aftermovies).

import type { CategoryColor } from "@/lib/categories";

export interface Photo {
  src: string; // "/assets/media/<album-id>/<file>" - no basePath prefix
  alt: string;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  dateChip: string; // "MAR 14 · 2026"
  glyph: string;
  color: CategoryColor;
  description: string;
  photos: Photo[];
}

export interface Video {
  id: string;
  title: string;
  url: string; // ordinary YouTube / Vimeo link
  caption?: string;
}

export const albums: PhotoAlbum[] = [
  {
    id: "pi-day-hunt-2026",
    title: "Pi Day Puzzle Hunt",
    dateChip: "MAR 14 · 2026",
    glyph: "π",
    color: "amber",
    description:
      "Fourteen teams, three hours, one campus-wide trail of pi-themed puzzles - with actual pie at the finish line.",
    photos: [],
  },
  {
    id: "nmd-talk-2025",
    title: "National Mathematics Day Talk",
    dateChip: "DEC 22 · 2025",
    glyph: "φ",
    color: "violet",
    description:
      "A full room for Ramanujan's birthday - partitions, the circle method, and a lot of questions.",
    photos: [],
  },
];

export const videos: Video[] = [
  // SAMPLE - replace with the club's own recordings.
  {
    id: "sample-linear-algebra",
    title: "Vectors - Essence of Linear Algebra",
    url: "https://www.youtube.com/watch?v=fNk_zzaMoSs",
    caption:
      "Sample embed (3Blue1Brown) - swap in recordings of our talks and explainers.",
  },
];
