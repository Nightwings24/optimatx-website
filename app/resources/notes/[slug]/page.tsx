import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { getNote, getNoteSlugs } from "@/lib/notes";
import { formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getNoteSlugs().includes(slug)) return {};
  const { meta } = getNote(slug);
  return { title: `${meta.title} · ${meta.course} notes`, description: meta.description };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getNoteSlugs().includes(slug)) notFound();

  const { meta, content: source } = getNote(slug);
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex, rehypeHighlight],
      },
    },
  });

  return (
    <article className="container-site max-w-3xl pb-24 pt-16">
      <Link
        href="/resources"
        className="font-mono text-[13px] text-ink3 transition-colors hover:text-accent"
      >
        ← Resources
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ink3">
          <span className="text-accent">{meta.course} · Course notes</span>
          {meta.date && (
            <>
              <span aria-hidden>·</span>
              <span>{formatDate(meta.date)}</span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{meta.author}</span>
        </div>
        <h1 className="mt-3 text-balance text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink">
          {meta.title}
        </h1>
      </header>

      <div className="prose prose-lg mt-10 max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:font-medium prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        {content}
      </div>
    </article>
  );
}
