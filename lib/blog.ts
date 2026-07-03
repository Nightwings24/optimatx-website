// Blog content engine. Posts are `.mdx` files in content/blog/ with frontmatter.
// To add a post: drop a new .mdx file in content/blog/ - it appears on /blog
// automatically. This runs at build time (static export), so node:fs is fine.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO, e.g. "2026-06-15"
  author: string;
  description: string;
  tags: string[];
}

export interface Post {
  meta: PostMeta;
  content: string; // MDX body (frontmatter stripped)
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      author: data.author ?? "OptimatX",
      description: data.description ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
    },
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPost(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

/** "June 15, 2026" from an ISO date, build-time safe (no locale surprises). */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (!y || !m || !d) return iso;
  return `${months[m - 1]} ${d}, ${y}`;
}
