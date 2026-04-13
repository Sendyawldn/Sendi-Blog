import { getAllPostsMeta } from "@/lib/mdx";
import Link from "next/link";

export const metadata = {
  title: "Blog - Sendi's Digital Garden",
  description: "Read my latest articles and thoughts.",
};

export default async function BlogIndex() {
  const posts = await getAllPostsMeta();

  return (
    <div className="py-12">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-[#E8E0D4]">All Posts</h1>
      
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="group flex flex-col gap-2">
            <time className="text-sm font-mono text-[#6A5A48]">{post.date}</time>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-bold text-[#E8E0D4] group-hover:text-[#D4A870] transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-[#907860] leading-relaxed max-w-2xl mt-2">
              {post.excerpt}
            </p>
            <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-[#D4A870] mt-2 hover:underline">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
