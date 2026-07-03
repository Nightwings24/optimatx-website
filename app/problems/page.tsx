import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Problem of the Week",
  description:
    "A fresh problem every week, an answer checker, a submission form, and a full archive.",
};

export default function ProblemsPage() {
  return (
    <ComingSoon
      glyph="∫"
      color="magenta"
      title="Problem of the Week"
      blurb="A fresh problem every week, an answer checker, and a full archive - landing here soon. For now, try this week's teaser on the home page."
    />
  );
}
