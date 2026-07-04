import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { BlogList } from "@/components/islands/BlogList";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog & Articles",
  description:
    "Member-written expository math - write-ups, proofs, and deep dives.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        eyebrow="Blog & Articles"
        title="Writing."
        lead="Expository math from OptimatX members - proofs, deep dives, and things worth thinking about twice."
      />

      <section className="container-site pb-20">
        {posts.length === 0 ? (
          <p className="text-[15px] text-ink2">No posts yet - check back soon.</p>
        ) : (
          <BlogList posts={posts} />
        )}
      </section>
    </>
  );
}
