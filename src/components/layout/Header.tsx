"use client";

import Link from "next/link";
import Image from "next/image";
import { CartIcon } from "./CartIcon";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[#f2dcce]/90 backdrop-blur-md border-b border-[#e8c4ad]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logologo.png"
            alt="Logo"
            width={120}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
        <CartIcon />
      </div>
    </motion.header>
  );
}
