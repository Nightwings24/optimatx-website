// Color ramp for the generative-art pieces. Stops are the brand palette as raw
// RGB (canvas can't read CSS vars cheaply, and vivid art reads well in both
// themes). ramp(t) maps t in [0,1] through deep → green → blue → gold → rose.

type RGB = [number, number, number];

const STOPS: RGB[] = [
  [11, 13, 20], // --bg deep base
  [0, 136, 75], // --accent green
  [88, 166, 255], // sky blue
  [245, 192, 74], // gold
  [251, 113, 133], // rose
];

export function ramp(t: number): RGB {
  const x = Math.max(0, Math.min(1, t)) * (STOPS.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = STOPS[i];
  const b = STOPS[Math.min(i + 1, STOPS.length - 1)];
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}
