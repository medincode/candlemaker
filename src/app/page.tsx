"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const steps = [
  { number: "01", label: "Contenant" },
  { number: "02", label: "Cire" },
  { number: "03", label: "Parfum" },
  { number: "04", label: "Finitions" },
  { number: "05", label: "Panier" },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo centré */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logologo.png"
          alt="Light Of Mizaj"
          className="h-24 w-auto object-contain mx-auto"
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-xs tracking-[0.5em] uppercase text-[#1d645c] font-medium mb-3"
      >
        Bougies Artisanales Sur Mesure
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-center font-light leading-tight text-[#1d3830] mb-4"
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(2.4rem, 7vw, 4.5rem)",
        }}
      >
        Créez votre bougie
        <br />
        <span className="text-[#1d645c] italic">unique</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="text-[#5a7a76] font-light text-base leading-relaxed max-w-sm text-center mb-10"
      >
        Choisissez chaque détail — contenant, cire, parfum, couleur — et recevez votre création à domicile.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mb-14"
      >
        <Link href="/design">
          <Button size="lg" className="px-14 text-base">
            Créer ma bougie ✦
          </Button>
        </Link>
      </motion.div>

      {/* Étapes */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="w-full max-w-md"
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#9dbfbb] text-center mb-5 font-medium">
          5 étapes simples
        </p>
        <div className="flex justify-between items-center">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white border border-[#1d645c]/20 flex items-center justify-center shadow-sm">
                <span
                  className="text-[#1d645c] font-semibold text-xs"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  {step.number}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden" />
              )}
              <p className="text-[10px] text-[#5a7a76] text-center font-medium tracking-wide max-w-[56px] leading-tight">
                {step.label}
              </p>
            </div>
          ))}
        </div>

        {/* Connecting line */}
        <div className="relative -mt-10 mb-4 flex justify-between items-center px-4 pointer-events-none">
          {steps.slice(0, -1).map((_, idx) => (
            <div key={idx} className="flex-1 h-px bg-[#1d645c]/15 mx-1 mt-5" />
          ))}
        </div>
      </motion.div>

      {/* Floating candles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-10 flex justify-center gap-5"
      >
        {["🕯️", "🌸", "✨", "🌿", "🕯️"].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-2xl sm:text-3xl"
            animate={{ y: [0, -6, 0] }}
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
  );
}
