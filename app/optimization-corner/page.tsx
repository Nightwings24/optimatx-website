import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Optimization Corner",
  description:
    "Our signature: real-world optimization case studies and an interactive LP visualizer.",
};

export default function OptimizationCornerPage() {
  return (
    <ComingSoon
      glyph="∇"
      color="violet"
      title="Optimization Corner"
      blurb="Our signature section - real-world optimization case studies and an interactive linear-programming visualizer. Under construction."
    />
  );
}
