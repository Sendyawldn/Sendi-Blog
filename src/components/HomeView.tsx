"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { type PostMetadata } from "@/lib/mdx";

export default function HomeView({ posts }: { posts: PostMetadata[] }) {
  return (
    <div className="flex flex-col gap-16">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-12 flex flex-col sm:flex-row items-center sm:items-start gap-8 text-center sm:text-left"
      >
        <div className="shrink-0 relative">
          <Image
            src="/profile.jpg"
            alt="Sendi Awaludin"
            width={120}
            height={120}
            className="rounded-full object-cover shadow-xl border-4 border-[#3A3428]"
            priority
          />
          {/* Status Dot */}
          <div
            className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#4CAF70] border-[3px] border-[#1A1714] shadow-[0_0_12px_rgba(76,175,112,0.8)]"
            title="Available"
          />
        </div>
        <div className="flex flex-col justify-center sm:pt-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#E8E0D4]">
            Hi, Saya <span className="text-[#D4A870]">Sendi Awaludin</span>.
          </h1>
          <p className="text-lg text-[#907860] max-w-2xl leading-relaxed">
            Mahasiswa Fakultas Teknik Informatika, Program Studi Teknologi
            Informasi. Saya memiliki minat di bidang web development dan senang
            berbagi pemikiran seputar teknologi dan dunia digital.
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#E8E0D4]">
            Tulisan Terbaru
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-[#C0B090] hover:text-[#D4A870] transition-colors"
          >
            Lihat semua →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {posts.slice(0, 4).map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className="group p-6 rounded-2xl bg-[#2C2820] border border-[#3A3428] hover:border-[#D4A870]/40 transition-colors h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#E8E0D4] group-hover:text-[#D4A870] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#907860] text-sm line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <time className="text-xs text-[#6A5A48] font-mono">
                  {post.date}
                </time>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
