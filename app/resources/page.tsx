import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Resources & Roadmaps",
  description:
    "Curated notes, reading lists, and topic roadmaps tuned to the IIT Patna curriculum.",
};

export default function ResourcesPage() {
  return (
    <ComingSoon
      glyph="Σ"
      color="lime"
      title="Resources & Roadmaps"
      blurb="Curated notes, reading lists, and topic roadmaps tuned to the IIT Patna curriculum - being assembled now."
    />
  );
}
