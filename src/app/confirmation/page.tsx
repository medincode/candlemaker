"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { generateOrderNumber } from "@/lib/utils";

function AnimatedCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
      className="relative w-24 h-24 mx-auto mb-8"
    >
      {/* Outer ring */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-24 h-24 rounded-full bg-[#F0F7EF] border-2 border-[#8FAF8A] flex items-center justify-center"
      >
        {/* Check SVG */}
        <svg viewBox="0 0 40 40" className="w-12 h-12" fill="none">
          <motion.path
            d="M10 20 L17 27 L30 13"
            stroke="#8FAF8A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      {/* Floating particles */}
      {[
        { x: -30, y: -20, delay: 0.6, emoji: "✨" },
        { x: 30, y: -25, delay: 0.7, emoji: "🌸" },
        { x: -25, y: 25, delay: 0.8, emoji: "🕯️" },
        { x: 32, y: 20, delay: 0.65, emoji: "✦" },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute text-sm pointer-events-none"
          style={{ left: "50%", top: "50%" }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function ConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    setOrderNumber(generateOrderNumber());
  }, []);

  const details = [
    { label: "Handcrafted", value: "2–3 business days" },
    { label: "Shipping", value: "3–5 business days" },
    { label: "Packaging", value: "Eco gift box" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <AnimatedCheckmark />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-3 font-medium">
          Order Confirmed
        </p>
        <h1
          className="text-4xl sm:text-5xl font-light text-[#6B5E52] mb-4"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Thank You
        </h1>
        <p className="text-lg font-light text-[#6B5E52] mb-2">
          Your candle is on its way to being crafted.
        </p>
        <p className="text-[#9B8E84] font-light leading-relaxed max-w-sm mx-auto mb-8">
          We&apos;ll send a confirmation to your email with tracking details once
          your bespoke candle has been lovingly crafted.
        </p>

        {/* Order number */}
        {orderNumber && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block mb-8"
          >
            <div className="bg-white rounded-2xl border border-[#E8DDD4] px-8 py-5 shadow-sm">
              <p className="text-[10px] text-[#9B8E84] uppercase tracking-widest mb-1.5 font-medium">
                Order Reference
              </p>
              <p
                className="text-2xl text-[#C9A96E] font-light tracking-wider"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {orderNumber}
              </p>
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {details.map((detail, idx) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + idx * 0.1 }}
              className="bg-white rounded-2xl border border-[#E8DDD4] p-4 shadow-sm"
            >
              <p className="text-[9px] text-[#9B8E84] uppercase tracking-widest mb-1.5 font-medium">
                {detail.label}
              </p>
              <p className="text-sm text-[#6B5E52] font-medium">{detail.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-10"
        >
          <blockquote className="border-l-2 border-[#C9A96E] pl-4 text-left max-w-xs mx-auto">
            <p
              className="text-lg text-[#9B8E84] font-light italic"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              &ldquo;A candle loses nothing by lighting another candle.&rdquo;
            </p>
          </blockquote>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/design">
            <Button size="lg">
              Design Another Candle 🕯️
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
