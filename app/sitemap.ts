import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/nav";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

// Static sitemap.xml, generated at build from the single route list.
export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes
    .filter((r) => r.sitemap)
    .map((r) => ({
      url: `${SITE.url}${r.href === "/" ? "/" : `${r.href}/`}`,
      changeFrequency: "monthly",
      priority: r.href === "/" ? 1 : 0.7,
    }));
}
