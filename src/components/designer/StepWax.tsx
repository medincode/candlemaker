"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useDesignStore } from "@/store/designStore";
import { WAXES } from "@/lib/candle-options";
import { formatPrice } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function EcoRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-xs ${i < rating ? "text-[#1d645c]" : "text-[#e8c4ad]"}`}>
          ●
        </span>
      ))}
    </div>
  );
}

export function StepWax() {
  const { design, setWax } = useDesignStore();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-7"
      >
        <h2
          className="text-3xl font-light text-[#1d3830] mb-1.5"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Choisir la cire
        </h2>
        <p className="text-[#5a7a76] text-sm font-light leading-relaxed">
          La fondation de votre bougie. Chaque cire offre une combustion, un parfum et une histoire différents.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {WAXES.map((wax) => {
          const isSelected = design.wax?.id === wax.id;
          return (
            <motion.div key={wax.id} variants={itemVariants}>
              <Card selected={isSelected} onClick={() => setWax(wax)} className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className={`text-3xl p-2.5 rounded-xl transition-colors ${
                      isSelected ? "bg-[#e8f5f3]" : "bg-[#fdf5f0]"
                    }`}
                  >
                    {wax.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-[#1d3830]">{wax.name}</h3>
                      <span className={`text-sm font-medium shrink-0 ${isSelected ? "text-[#1d645c]" : "text-[#5a7a76]"}`}>
                        {wax.priceAdd > 0 ? `+${formatPrice(wax.priceAdd)}` : "Inclus"}
                      </span>
                    </div>
                    <p className="text-[#5a7a76] text-xs leading-relaxed font-light mb-3">
                      {wax.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {wax.properties.map((prop) => (
                        <span
                          key={prop}
                          className="text-[10px] px-2 py-0.5 bg-[#fdf5f0] text-[#5a7a76] rounded-full border border-[#e8c4ad] font-medium tracking-wide"
                        >
                          {prop}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#5a7a76]">
                        <span className="mr-1">⏱</span>
                        {wax.burnTime}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#5a7a76]">Éco</span>
                        <EcoRating rating={wax.ecoRating} />
                      </div>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-2 inline-flex items-center gap-1 text-xs text-[#1d645c] font-medium"
                      >
                        <span>✓</span>
                        <span>Sélectionné</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
