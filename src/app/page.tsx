"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const features = [
  {
    emoji: "🫙",
    title: "Four Vessels",
    description: "Classic jar, concrete pot, ceramic bowl, or travel tin — each beautifully crafted.",
  },
  {
    emoji: "🌿",
    title: "Artisan Waxes",
    description: "Soy, coconut, beeswax, or paraffin — selected for burn quality and soul.",
  },
  {
    emoji: "🌸",
    title: "Curated Scents",
    description: "16 signature fragrances across floral, woody, fresh, and spicy families.",
  },
  {
    emoji: "✨",
    title: "Fully Personalised",
    description: "Custom label, wax color, wick choice, and dried botanicals — endlessly yours.",
  },
];

const steps = [
  { number: "01", label: "Choose your vessel" },
  { number: "02", label: "Select your wax" },
  { number: "03", label: "Pick your scent" },
  { number: "04", label: "Personalise" },
  { number: "05", label: "Add to cart" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(143,175,138,0.1) 0%, transparent 50%), #FDF8F3",
          }}
        />

        {/* Decorative circles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-64 h-64 rounded-full border border-[#E8DDD4]/60 pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-48 h-48 rounded-full border border-[#C9A96E]/20 pointer-events-none"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Pre-heading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-6 font-medium"
          >
            Bespoke Candle Studio
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 font-light leading-tight text-[#6B5E52]"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
            }}
          >
            Design Your
            <br />
            <span className="text-[#C9A96E] italic">Perfect Candle</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#9B8E84] font-light leading-relaxed max-w-xl mx-auto mb-10"
          >
            Handcrafted with intention, infused with soul. Create a candle that&apos;s as
            unique as your energy — from vessel to wick to botanical flourish.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/design">
              <Button size="lg" className="px-12">
                Begin Your Design ✦
              </Button>
            </Link>
            <Link href="/design">
              <Button variant="ghost" size="lg">
                See How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Candle emoji hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            className="mt-16 flex justify-center gap-6"
          >
            {["🕯️", "🌸", "✨", "🌿", "🕯️"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-3xl sm:text-4xl"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto w-full px-4">
        <hr className="divider" />
      </div>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-4 font-medium">
            The Process
          </p>
          <h2
            className="text-4xl sm:text-5xl font-light text-[#6B5E52]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Five Steps to Sacred
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-0 items-center">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-row sm:flex-col items-center gap-3 sm:gap-0 w-full sm:w-auto"
            >
              <div className="flex sm:flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#FDF0E0] border border-[#C9A96E]/30 flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-[#C9A96E] font-semibold text-xs"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    {step.number}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden sm:block w-16 h-px bg-gradient-to-r from-[#C9A96E]/40 to-[#C9A96E]/10 mx-2" />
                )}
              </div>
              <p className="text-xs sm:text-[11px] text-[#9B8E84] sm:text-center font-medium tracking-wide sm:mt-3 sm:max-w-[80px]">
                {step.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto w-full px-4">
        <hr className="divider" />
      </div>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-4 font-medium">
            What We Offer
          </p>
          <h2
            className="text-4xl sm:text-5xl font-light text-[#6B5E52]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Crafted with Intention
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-[#E8DDD4] p-6 text-center hover:shadow-md hover:border-[#C9A96E]/40 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <h3
                className="text-xl font-light text-[#6B5E52] mb-2"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {feature.title}
              </h3>
              <p className="text-xs text-[#9B8E84] leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto w-full px-4">
        <hr className="divider" />
      </div>

      {/* Final CTA */}
      <section className="py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-4 font-medium">
            Begin Now
          </p>
          <h2
            className="text-4xl sm:text-5xl font-light text-[#6B5E52] mb-6"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Light Your Intention
          </h2>
          <p className="text-[#9B8E84] font-light mb-8 max-w-md mx-auto">
            Your perfect candle awaits. Ready to design something beautiful?
          </p>
          <Link href="/design">
            <Button size="lg" className="px-12">
              Start Designing 🕯️
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
