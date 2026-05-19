"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export function CartIcon() {
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative flex items-center gap-2 text-[#1d3830] hover:text-[#1d645c] transition-colors group p-2">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      <span className="hidden sm:inline text-sm font-medium tracking-wide">
        Panier
      </span>
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 bg-[#1d645c] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
