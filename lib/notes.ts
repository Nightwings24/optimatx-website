// Course-notes content engine - the same MDX pipeline as the blog (lib/blog.ts).
// Notes are `.mdx` files in content/notes/ with frontmatter. To publish a note:
// drop a new .mdx file there with `course` set to a course name from
// content/resources.ts - it appears on that course's card automatically.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export interface NoteMeta {
  slug: string;
  title: string;
  course: string; // must match a Course.name in content/resources.ts
  author: string;
  date: string; // ISO, e.g. "2026-07-04"
  description: string;
}

export interface Note {
  meta: NoteMeta;
  content: string; // MDX body (frontmatter stripped)
}

export function getNoteSlugs(): string[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getNote(slug: string): Note {
  const raw = fs.readFileSync(path.join(NOTES_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      course: data.course ?? "",
      author: data.author ?? "OptimatX",
      date: data.date ?? "",
      description: data.description ?? "",
    },
    content,
  };
}

export function getAllNotes(): NoteMeta[] {
  return getNoteSlugs()
    .map((slug) => getNote(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

/** Notes for one course card, e.g. notesForCourse("Calculus"). */
export function notesForCourse(courseName: string): NoteMeta[] {
  return getAllNotes().filter((n) => n.course === courseName);
}
