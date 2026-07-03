import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Blog & Articles",
  description:
    "Member-written expository math - write-ups, proofs, and deep dives.",
};

export default function BlogPage() {
  return (
    <ComingSoon
      glyph="∂"
      color="accent"
      title="Blog & Articles"
      blurb="Member-written expository math - write-ups, proofs, and deep dives in Markdown. The first posts are on the way."
    />
  );
}
