"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useDesignStore } from "@/store/designStore";
import { SCENT_CATEGORIES } from "@/lib/candle-options";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function StepScent() {
  const { design, setScentCategory, setScent } = useDesignStore();
  const activeCategory = SCENT_CATEGORIES.find((c) => c.id === design.scentCategory);

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
          Choisir le parfum
        </h2>
        <p className="text-[#5a7a76] text-sm font-light leading-relaxed">
          Une fragrance qui vous ressemble. Choisissez d&apos;abord une famille, puis votre parfum.
        </p>
      </motion.div>

      {/* Onglets catégories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SCENT_CATEGORIES.map((cat) => {
          const isActive = design.scentCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => setScentCategory(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                isActive
                  ? "bg-[#1d645c] text-white border-[#1d645c] shadow-sm"
                  : "bg-white text-[#5a7a76] border-[#e8c4ad] hover:border-[#1d645c]/50 hover:text-[#1d3830]"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Cartes parfums */}
      <AnimatePresence mode="wait">
        {activeCategory ? (
          <motion.div
            key={activeCategory.id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {activeCategory.scents.map((scent) => {
              const isSelected = design.scent?.id === scent.id;
              return (
                <motion.div key={scent.id} variants={itemVariants}>
                  <Card selected={isSelected} onClick={() => setScent(scent)} className="p-4">
                    <h3 className="font-semibold text-[#1d3830] mb-1 text-sm">{scent.name}</h3>
                    <p className="text-xs text-[#5a7a76] leading-relaxed mb-3 font-light">
                      {scent.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {scent.notes.map((note) => (
                        <span
                          key={note}
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                            isSelected
                              ? "bg-[#e8f5f3] text-[#1d645c] border-[#1d645c]/30"
                              : "bg-[#fdf5f0] text-[#5a7a76] border-[#e8c4ad]"
                          }`}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-xs text-[#1d645c] font-medium"
                      >
                        ✓ Sélectionné
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-[#9dbfbb]"
          >
            <span className="text-4xl mb-3">🌸</span>
            <p className="text-sm font-light">Sélectionnez une famille ci-dessus pour explorer les parfums</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
