"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useDesignStore } from "@/store/designStore";
import { WAX_COLORS, WICK_TYPES, BOTANICALS } from "@/lib/candle-options";
import { formatPrice } from "@/lib/utils";

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function StepPersonalize() {
  const { design, setWaxColor, setLabel, setWickType, toggleBotanical } = useDesignStore();

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
          Personalize
        </h2>
        <p className="text-[#9B8E84] text-sm font-light leading-relaxed">
          The finishing touches that make it truly yours.
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Wax Color */}
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.05 }}>
          <h3 className="text-sm font-semibold text-[#6B5E52] uppercase tracking-widest mb-4">
            Wax Color
          </h3>
          <div className="flex flex-wrap gap-3">
            {WAX_COLORS.map((color) => {
              const isSelected = design.waxColor?.id === color.id;
              return (
                <motion.button
                  key={color.id}
                  onClick={() => setWaxColor(color)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  title={color.name}
                  className={`flex flex-col items-center gap-1.5 group`}
                >
                  <div
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 shadow-sm ${
                      isSelected
                        ? "border-[#C9A96E] scale-110 shadow-md"
                        : "border-[#E8DDD4] group-hover:border-[#C9A96E]/50"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span
                    className={`text-[10px] font-medium tracking-wide ${
                      isSelected ? "text-[#C9A96E]" : "text-[#9B8E84]"
                    }`}
                  >
                    {color.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <hr className="border-[#E8DDD4]" />

        {/* Custom Label */}
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#6B5E52] uppercase tracking-widest">
              Custom Label
            </h3>
            <span className="text-xs text-[#9B8E84]">+€2.00</span>
          </div>
          <div className="relative">
            <input
              type="text"
              maxLength={30}
              placeholder="e.g. Morning Ritual, For You..."
              value={design.label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E8DDD4] rounded-xl text-[#6B5E52] placeholder:text-[#C4B8B0] focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all text-sm font-light tracking-wide"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#C4B8B0]">
              {design.label.length}/30
            </span>
          </div>
          {design.label.trim() && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-[#9B8E84] italic"
            >
              Preview: &ldquo;{design.label}&rdquo; will appear on your candle
            </motion.p>
          )}
        </motion.div>

        <hr className="border-[#E8DDD4]" />

        {/* Wick Type */}
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.15 }}>
          <h3 className="text-sm font-semibold text-[#6B5E52] uppercase tracking-widest mb-4">
            Wick Type
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {WICK_TYPES.map((wick) => {
              const isSelected = design.wickType?.id === wick.id;
              return (
                <Card
                  key={wick.id}
                  selected={isSelected}
                  onClick={() => setWickType(wick)}
                  className="p-3 text-center"
                >
                  <div className="text-2xl mb-1.5">{wick.emoji}</div>
                  <div className="font-semibold text-[#6B5E52] text-xs mb-1">{wick.name}</div>
                  <p className="text-[9px] text-[#9B8E84] leading-relaxed font-light">
                    {wick.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </motion.div>

        <hr className="border-[#E8DDD4]" />

        {/* Botanicals */}
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#6B5E52] uppercase tracking-widest">
              Dried Botanicals
            </h3>
            <span className="text-xs text-[#9B8E84]">+€3.00 each</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {BOTANICALS.map((botanical) => {
              const isSelected = design.botanicals.includes(botanical.id);
              return (
                <motion.button
                  key={botanical.id}
                  onClick={() => toggleBotanical(botanical.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                    isSelected
                      ? "border-[#C9A96E] bg-[#FDF8F3] shadow-sm"
                      : "border-[#E8DDD4] bg-white hover:border-[#C9A96E]/40"
                  }`}
                >
                  {/* Checkbox */}
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? "bg-[#C9A96E] border-[#C9A96E]"
                        : "border-[#E8DDD4] bg-white"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-white text-xs font-bold"
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                  <span className="text-xl">{botanical.emoji}</span>
                  <div>
                    <p className="text-xs font-medium text-[#6B5E52]">{botanical.name}</p>
                    <p className="text-[10px] text-[#9B8E84]">+{formatPrice(botanical.priceAdd)}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
