"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useDesignStore } from "@/store/designStore";
import { VESSELS } from "@/lib/candle-options";
import { formatPrice } from "@/lib/utils";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function StepVessel() {
  const { design, setVessel } = useDesignStore();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h2
          className="text-3xl font-light text-[#6B5E52] mb-2"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Choose Your Vessel
        </h2>
        <p className="text-[#9B8E84] text-sm font-light leading-relaxed">
          Your candle&apos;s home. Each vessel brings its own character and energy.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {VESSELS.map((vessel) => {
          const isSelected = design.vessel?.id === vessel.id;
          return (
            <motion.div key={vessel.id} variants={itemVariants}>
              <Card
                selected={isSelected}
                onClick={() => setVessel(vessel)}
                className="p-5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`text-4xl p-3 rounded-xl transition-colors duration-200 ${
                      isSelected ? "bg-[#FDF0E0]" : "bg-[#F8F4EF]"
                    }`}
                  >
                    {vessel.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-[#6B5E52] text-base">{vessel.name}</h3>
                      <span
                        className={`text-sm font-semibold shrink-0 ${
                          isSelected ? "text-[#C9A96E]" : "text-[#9B8E84]"
                        }`}
                      >
                        {formatPrice(vessel.basePrice)}
                      </span>
                    </div>
                    <p className="text-[#9B8E84] text-sm leading-relaxed font-light">
                      {vessel.description}
                    </p>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-2 inline-flex items-center gap-1 text-xs text-[#C9A96E] font-medium"
                      >
                        <span>✓</span>
                        <span>Selected</span>
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
