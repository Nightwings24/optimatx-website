import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { getAllNotes } from "@/lib/notes";
import { getAllIssues } from "@/lib/newsletter";
import { problems } from "@/content/problems";
import { events } from "@/content/events";

export const dynamic = "force-static";

// Static sitemap.xml, generated at build from the route list plus the blog
// posts and problems (so new content is discoverable).
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = allRoutes
    .filter((r) => r.sitemap)
    .map((r) => ({
      url: `${SITE.url}${r.href === "/" ? "/" : `${r.href}/`}`,
      changeFrequency: "monthly" as const,
      priority: r.href === "/" ? 1 : 0.7,
    }));

  const posts = getAllPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const probs = problems.map((p) => ({
    url: `${SITE.url}/problems/${p.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const evs = events.map((e) => ({
    url: `${SITE.url}/events/${e.id}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const notes = getAllNotes().map((n) => ({
    url: `${SITE.url}/resources/notes/${n.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const issues = getAllIssues().map((i) => ({
    url: `${SITE.url}/publications/${i.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...pages, ...posts, ...probs, ...evs, ...notes, ...issues];
}
