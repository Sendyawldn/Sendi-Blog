import { getPostBySlug, getAllPostsMeta } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.meta.title} - Sendi's Blog`,
    description: post.meta.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12">
      <div className="mb-12">
        <Link href="/blog" className="text-sm font-medium text-[#C0B090] hover:text-[#E8E0D4] transition-colors mb-8 inline-block">
          ← Back to posts
        </Link>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-[#E8E0D4]">
          {post.meta.title}
        </h1>
        <time className="text-[#6A5A48] font-mono text-sm block">
          {post.meta.date}
        </time>
      </div>

      <div className="prose max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
