"use client";

import Link from "next/link";
import { CartIcon } from "./CartIcon";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[#FDF8F3]/90 backdrop-blur-md border-b border-[#E8DDD4]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🕯️</span>
          <span
            className="font-display text-2xl font-light tracking-[0.2em] text-[#6B5E52] group-hover:text-[#C9A96E] transition-colors"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Lumière
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium tracking-widest uppercase text-[#9B8E84] hover:text-[#C9A96E] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/design"
            className="text-sm font-medium tracking-widest uppercase text-[#9B8E84] hover:text-[#C9A96E] transition-colors"
          >
            Design
          </Link>
        </nav>

        {/* Cart */}
        <CartIcon />
      </div>
    </motion.header>
  );
}
