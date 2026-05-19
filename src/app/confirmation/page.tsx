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
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-24 h-24 rounded-full bg-[#e8f5f3] border-2 border-[#1d645c] flex items-center justify-center"
      >
        <svg viewBox="0 0 40 40" className="w-12 h-12" fill="none">
          <motion.path
            d="M10 20 L17 27 L30 13"
            stroke="#1d645c"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

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
          animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
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
    { label: "Fabrication", value: "2–3 jours ouvrés" },
    { label: "Livraison", value: "3–5 jours ouvrés" },
    { label: "Emballage", value: "Boîte cadeau éco" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <AnimatedCheckmark />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#1d645c] mb-3 font-medium">
          Commande confirmée
        </p>
        <h1
          className="text-4xl sm:text-5xl font-light text-[#1d3830] mb-4"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Merci !
        </h1>
        <p className="text-lg font-light text-[#1d3830] mb-2">
          Votre bougie est en cours de fabrication.
        </p>
        <p className="text-[#5a7a76] font-light leading-relaxed max-w-sm mx-auto mb-8">
          Nous vous enverrons un email de confirmation avec les détails de suivi une fois votre bougie artisanale prête.
        </p>

        {orderNumber && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block mb-8"
          >
            <div className="bg-white rounded-2xl border border-[#e8c4ad] px-8 py-5 shadow-sm">
              <p className="text-[10px] text-[#9dbfbb] uppercase tracking-widest mb-1.5 font-medium">
                Référence commande
              </p>
              <p
                className="text-2xl text-[#1d645c] font-light tracking-wider"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {orderNumber}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-3 mb-10"
        >
          {details.map((detail, idx) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + idx * 0.1 }}
              className="bg-white rounded-2xl border border-[#e8c4ad] p-4 shadow-sm"
            >
              <p className="text-[9px] text-[#9dbfbb] uppercase tracking-widest mb-1.5 font-medium">
                {detail.label}
              </p>
              <p className="text-sm text-[#1d3830] font-medium">{detail.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-10"
        >
          <blockquote className="border-l-2 border-[#1d645c] pl-4 text-left max-w-xs mx-auto">
            <p
              className="text-lg text-[#5a7a76] font-light italic"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              &ldquo;Une bougie ne perd rien en en allumant une autre.&rdquo;
            </p>
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/design">
            <Button size="lg">Créer une autre bougie 🕯️</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">Retour à l&apos;accueil</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
