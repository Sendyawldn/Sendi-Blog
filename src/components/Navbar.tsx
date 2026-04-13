"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full backdrop-blur-lg bg-[#1A1714]/70 border-b border-[#3A3428]"
    >
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl tracking-tight text-[#E8E0D4] hover:opacity-80 transition-opacity">
          sendi<span className="text-[#D4A870]">.blog</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/blog" className="text-[#C0B090] hover:text-[#E8E0D4] transition-colors">
            Blog
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
