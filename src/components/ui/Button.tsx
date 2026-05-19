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
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d645c] tracking-wide";

  const variants = {
    primary:
      "bg-[#1d645c] text-white hover:bg-[#155047] shadow-sm hover:shadow-md active:scale-[0.98]",
    secondary:
      "bg-[#f2dcce] text-[#1d645c] border border-[#1d645c] hover:bg-[#1d645c] hover:text-white active:scale-[0.98]",
    ghost:
      "text-[#1d3830] hover:bg-[#e8f5f3] hover:text-[#1d645c] active:scale-[0.98]",
    outline:
      "border border-[#1d645c] text-[#1d645c] hover:bg-[#1d645c] hover:text-white active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2.5 text-sm rounded-xl",
    md: "px-6 py-3.5 text-base rounded-xl",
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
