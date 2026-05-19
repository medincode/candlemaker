"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export function CartIcon() {
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative flex items-center gap-2 text-[#6B5E52] hover:text-[#C9A96E] transition-colors group">
      <span className="text-xl">🕯️</span>
      <span className="hidden sm:inline text-sm font-medium tracking-wide group-hover:text-[#C9A96E] transition-colors">
        Cart
      </span>
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-2 -right-2 sm:-top-1 sm:-right-5 bg-[#C9A96E] text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
