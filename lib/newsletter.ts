// Newsletter ("The Dispatch") content engine - same MDX pipeline as the blog.
// Issues are `.mdx` files in content/newsletter/ with frontmatter. To publish
// an issue: drop a new .mdx file there - it appears on /publications
// automatically, newest first.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const NEWSLETTER_DIR = path.join(process.cwd(), "content", "newsletter");

export interface IssueMeta {
  slug: string;
  title: string;
  issue: number; // issue number, e.g. 1
  date: string; // ISO, e.g. "2026-07-04"
  description: string;
}

export interface Issue {
  meta: IssueMeta;
  content: string; // MDX body (frontmatter stripped)
}

export function getIssueSlugs(): string[] {
  if (!fs.existsSync(NEWSLETTER_DIR)) return [];
  return fs
    .readdirSync(NEWSLETTER_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getIssue(slug: string): Issue {
  const raw = fs.readFileSync(path.join(NEWSLETTER_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      issue: typeof data.issue === "number" ? data.issue : 0,
      date: data.date ?? "",
      description: data.description ?? "",
    },
    content,
  };
}

export function getAllIssues(): IssueMeta[] {
  return getIssueSlugs()
    .map((slug) => getIssue(slug).meta)
    .sort((a, b) => b.issue - a.issue); // newest issue first
}
