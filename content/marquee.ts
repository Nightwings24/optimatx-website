// The scrolling marquee band (design.md §6.5). Verbs render in --onbox; glyphs
// rotate through the accents (the component assigns the rotating color).

export interface MarqueeToken {
  text: string;
  kind: "verb" | "glyph";
}

export const marqueeTokens: MarqueeToken[] = [
  { text: "OPTIMIZE", kind: "verb" },
  { text: "∫", kind: "glyph" },
  { text: "ITERATE", kind: "verb" },
  { text: "∑", kind: "glyph" },
  { text: "PROVE", kind: "verb" },
  { text: "π", kind: "glyph" },
  { text: "CONJECTURE", kind: "verb" },
  { text: "φ", kind: "glyph" },
  { text: "Q.E.D.", kind: "verb" },
  { text: "∞", kind: "glyph" },
];
