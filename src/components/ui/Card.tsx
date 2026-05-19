"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({
  children,
  className,
  selected,
  onClick,
  hoverable = false,
}: CardProps) {
  const base =
    "bg-white rounded-2xl border transition-all duration-200";
  const interactiveStyles = onClick
    ? "cursor-pointer"
    : "";
  const selectedStyles = selected
    ? "border-[#C9A96E] shadow-md ring-1 ring-[#C9A96E]/30"
    : "border-[#E8DDD4] hover:border-[#C9A96E]/50 hover:shadow-sm";
  const hoverStyles = hoverable ? "hover:shadow-md" : "";

  return (
    <motion.div
      onClick={onClick}
      whileHover={onClick ? { y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      className={cn(base, interactiveStyles, selectedStyles, hoverStyles, className)}
    >
      {children}
    </motion.div>
  );
}
