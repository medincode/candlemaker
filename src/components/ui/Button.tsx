"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] tracking-wide";

  const variants = {
    primary:
      "bg-[#C9A96E] text-white hover:bg-[#b8955a] shadow-sm hover:shadow-md active:scale-[0.98]",
    secondary:
      "bg-[#8FAF8A] text-white hover:bg-[#7a9875] shadow-sm hover:shadow-md active:scale-[0.98]",
    ghost:
      "text-[#6B5E52] hover:bg-[#FDF8F3] hover:text-[#C9A96E] active:scale-[0.98]",
    outline:
      "border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-white active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
  };

  const disabledStyles = "opacity-40 cursor-not-allowed pointer-events-none";

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={cn(base, variants[variant], sizes[size], disabled && disabledStyles, className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}
