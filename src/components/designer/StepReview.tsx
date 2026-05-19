"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useDesignStore } from "@/store/designStore";
import { useCartStore } from "@/store/cartStore";
import { calculatePrice, BOTANICALS } from "@/lib/candle-options";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

interface ReviewRowProps {
  label: string;
  value: string;
  price?: string;
  emoji?: string;
}

function ReviewRow({ label, value, price, emoji }: ReviewRowProps) {
  return (
    <motion.div
      variants={rowVariants}
      className="flex items-start justify-between py-3 border-b border-[#F0E8E0]"
    >
      <div className="flex items-center gap-2">
        {emoji && <span className="text-base">{emoji}</span>}
        <div>
          <p className="text-[10px] text-[#9B8E84] uppercase tracking-widest font-medium mb-0.5">{label}</p>
          <p className="text-sm text-[#6B5E52] font-medium">{value}</p>
        </div>
      </div>
      {price && <span className="text-sm font-semibold text-[#C9A96E] shrink-0 ml-4">{price}</span>}
    </motion.div>
  );
}

export function StepReview() {
  const { design, resetDesign } = useDesignStore();
  const { addItem } = useCartStore();
  const router = useRouter();

  const totalPrice = calculatePrice({
    vessel: design.vessel,
    wax: design.wax,
    botanicals: design.botanicals,
    label: design.label,
  });

  const botanicalDetails = BOTANICALS.filter((b) => design.botanicals.includes(b.id));

  const handleAddToCart = () => {
    addItem(design, totalPrice);
    resetDesign();
    router.push("/cart");
  };

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
          Your Creation
        </h2>
        <p className="text-[#9B8E84] text-sm font-light">
          Review your bespoke candle before adding to your collection.
        </p>
      </motion.div>

      {/* Summary card */}
      <div className="bg-white rounded-2xl border border-[#E8DDD4] overflow-hidden shadow-sm mb-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FDF0E0] to-[#F5EEE8] px-5 py-4 border-b border-[#E8DDD4]">
          <h3
            className="text-xl text-[#6B5E52] font-light"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {design.label ? `"${design.label}"` : "Your Bespoke Candle"}
          </h3>
          {design.scent && (
            <p className="text-xs text-[#9B8E84] mt-0.5 italic">{design.scent.name} fragrance</p>
          )}
        </div>

        {/* Details */}
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          initial="hidden"
          animate="visible"
          className="px-5"
        >
          {design.vessel && (
            <ReviewRow
              label="Vessel"
              value={design.vessel.name}
              price={formatPrice(design.vessel.basePrice)}
              emoji={design.vessel.emoji}
            />
          )}
          {design.wax && (
            <ReviewRow
              label="Wax"
              value={design.wax.name}
              price={design.wax.priceAdd > 0 ? `+${formatPrice(design.wax.priceAdd)}` : "Included"}
              emoji={design.wax.emoji}
            />
          )}
          {design.scent && design.scentCategory && (
            <ReviewRow
              label="Scent"
              value={design.scent.name}
              price="Included"
              emoji="✨"
            />
          )}
          {design.waxColor && (
            <ReviewRow
              label="Color"
              value={design.waxColor.name}
              emoji="🎨"
            />
          )}
          {design.wickType && (
            <ReviewRow
              label="Wick"
              value={design.wickType.name}
              emoji={design.wickType.emoji}
            />
          )}
          {design.label.trim() && (
            <ReviewRow
              label="Custom Label"
              value={`"${design.label}"`}
              price="+€2.00"
              emoji="🏷️"
            />
          )}
          {botanicalDetails.length > 0 && (
            <ReviewRow
              label="Botanicals"
              value={botanicalDetails.map((b) => b.name).join(", ")}
              price={`+${formatPrice(botanicalDetails.length * 3)}`}
              emoji="🌿"
            />
          )}
        </motion.div>

        {/* Total */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-5 py-4 bg-[#FDF8F3] border-t border-[#E8DDD4] flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-[#6B5E52] uppercase tracking-widest">Total</span>
          <span
            className="text-2xl font-light text-[#C9A96E]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {formatPrice(totalPrice)}
          </span>
        </motion.div>
      </div>

      {/* Burn info */}
      {design.wax && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 p-4 bg-[#F0F7EF] rounded-xl border border-[#8FAF8A]/30 mb-6"
        >
          <span className="text-2xl">{design.wax.emoji}</span>
          <div>
            <p className="text-xs font-semibold text-[#8FAF8A] uppercase tracking-wide mb-0.5">Estimated Burn Time</p>
            <p className="text-sm text-[#6B5E52]">{design.wax.burnTime}</p>
          </div>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="w-full"
          disabled={!design.vessel || !design.wax || !design.scent}
        >
          <span className="mr-2">🕯️</span>
          Add to Cart — {formatPrice(totalPrice)}
        </Button>
        {(!design.vessel || !design.wax || !design.scent) && (
          <p className="text-center text-xs text-[#9B8E84] mt-2">
            Please complete steps 1–3 to add to cart
          </p>
        )}
      </motion.div>
    </div>
  );
}
