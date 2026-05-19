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
        className="mb-7"
      >
        <h2
          className="text-3xl font-light text-[#1d3830] mb-1.5"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Personnaliser
        </h2>
        <p className="text-[#5a7a76] text-sm font-light leading-relaxed">
          Les dernières touches qui en font vraiment la vôtre.
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Couleur de cire */}
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.05 }}>
          <h3 className="text-xs font-semibold text-[#1d3830] uppercase tracking-widest mb-4">
            Couleur de la cire
          </h3>
          <div className="flex flex-wrap gap-4">
            {WAX_COLORS.map((color) => {
              const isSelected = design.waxColor?.id === color.id;
              return (
                <motion.button
                  key={color.id}
                  onClick={() => setWaxColor(color)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  title={color.name}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`w-11 h-11 rounded-full border-2 transition-all duration-200 shadow-sm ${
                      isSelected
                        ? "border-[#1d645c] scale-110 shadow-md"
                        : "border-[#e8c4ad] group-hover:border-[#1d645c]/50"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span
                    className={`text-[10px] font-medium tracking-wide ${
                      isSelected ? "text-[#1d645c]" : "text-[#5a7a76]"
                    }`}
                  >
                    {color.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <hr className="border-[#e8c4ad]" />

        {/* Étiquette personnalisée */}
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-[#1d3830] uppercase tracking-widest">
              Étiquette personnalisée
            </h3>
            <span className="text-xs text-[#5a7a76]">+20 dhs</span>
          </div>
          <div className="relative">
            <input
              type="text"
              maxLength={30}
              placeholder="ex. Rituel du matin, Pour toi..."
              value={design.label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-[#e8c4ad] rounded-xl text-[#1d3830] placeholder:text-[#9dbfbb] focus:outline-none focus:border-[#1d645c] focus:ring-1 focus:ring-[#1d645c]/30 transition-all text-sm font-light tracking-wide"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9dbfbb]">
              {design.label.length}/30
            </span>
          </div>
          {design.label.trim() && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-[#5a7a76] italic"
            >
              Aperçu : &ldquo;{design.label}&rdquo; apparaîtra sur votre bougie
            </motion.p>
          )}
        </motion.div>

        <hr className="border-[#e8c4ad]" />

        {/* Type de mèche */}
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.15 }}>
          <h3 className="text-xs font-semibold text-[#1d3830] uppercase tracking-widest mb-4">
            Type de mèche
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
                  <div className="font-semibold text-[#1d3830] text-xs mb-1">{wick.name}</div>
                  <p className="text-[9px] text-[#5a7a76] leading-relaxed font-light">
                    {wick.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </motion.div>

        <hr className="border-[#e8c4ad]" />

        {/* Botaniques séchés */}
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-[#1d3830] uppercase tracking-widest">
              Botaniques séchés
            </h3>
            <span className="text-xs text-[#5a7a76]">+30 dhs chacun</span>
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
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 text-left ${
                    isSelected
                      ? "border-[#1d645c] bg-[#e8f5f3] shadow-sm"
                      : "border-[#e8c4ad] bg-white hover:border-[#1d645c]/40"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? "bg-[#1d645c] border-[#1d645c]"
                        : "border-[#e8c4ad] bg-white"
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
                    <p className="text-xs font-medium text-[#1d3830]">{botanical.name}</p>
                    <p className="text-[10px] text-[#5a7a76]">+{formatPrice(botanical.priceAdd)}</p>
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
