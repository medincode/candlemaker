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
      className="flex items-start justify-between py-3 border-b border-[#f2dcce]"
    >
      <div className="flex items-center gap-2">
        {emoji && <span className="text-base">{emoji}</span>}
        <div>
          <p className="text-[10px] text-[#5a7a76] uppercase tracking-widest font-medium mb-0.5">{label}</p>
          <p className="text-sm text-[#1d3830] font-medium">{value}</p>
        </div>
      </div>
      {price && <span className="text-sm font-semibold text-[#1d645c] shrink-0 ml-4">{price}</span>}
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
        className="mb-7"
      >
        <h2
          className="text-3xl font-light text-[#1d3830] mb-1.5"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Votre création
        </h2>
        <p className="text-[#5a7a76] text-sm font-light">
          Vérifiez votre bougie sur mesure avant de l&apos;ajouter à votre panier.
        </p>
      </motion.div>

      {/* Carte récap */}
      <div className="bg-white rounded-2xl border border-[#e8c4ad] overflow-hidden shadow-sm mb-6">
        <div className="bg-gradient-to-r from-[#e8f5f3] to-[#f2dcce] px-5 py-4 border-b border-[#e8c4ad]">
          <h3
            className="text-xl text-[#1d3830] font-light"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {design.label ? `"${design.label}"` : "Ma Bougie Light Of Mizaj"}
          </h3>
          {design.scent && (
            <p className="text-xs text-[#5a7a76] mt-0.5 italic">{design.scent.name}</p>
          )}
        </div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          animate="visible"
          className="px-5"
        >
          {design.vessel && (
            <ReviewRow
              label="Contenant"
              value={design.vessel.name}
              price={formatPrice(design.vessel.basePrice)}
              emoji={design.vessel.emoji}
            />
          )}
          {design.wax && (
            <ReviewRow
              label="Cire"
              value={design.wax.name}
              price={design.wax.priceAdd > 0 ? `+${formatPrice(design.wax.priceAdd)}` : "Inclus"}
              emoji={design.wax.emoji}
            />
          )}
          {design.scent && (
            <ReviewRow label="Parfum" value={design.scent.name} price="Inclus" emoji="✨" />
          )}
          {design.waxColor && (
            <ReviewRow label="Couleur" value={design.waxColor.name} emoji="🎨" />
          )}
          {design.wickType && (
            <ReviewRow label="Mèche" value={design.wickType.name} emoji={design.wickType.emoji} />
          )}
          {design.label.trim() && (
            <ReviewRow
              label="Étiquette"
              value={`"${design.label}"`}
              price="+20 dhs"
              emoji="🏷️"
            />
          )}
          {botanicalDetails.length > 0 && (
            <ReviewRow
              label="Botaniques"
              value={botanicalDetails.map((b) => b.name).join(", ")}
              price={`+${formatPrice(botanicalDetails.length * 30)}`}
              emoji="🌿"
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-5 py-4 bg-[#f2dcce]/50 border-t border-[#e8c4ad] flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-[#1d3830] uppercase tracking-widest">Total</span>
          <span
            className="text-2xl font-light text-[#1d645c]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {formatPrice(totalPrice)}
          </span>
        </motion.div>
      </div>

      {/* Durée de combustion */}
      {design.wax && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 p-4 bg-[#e8f5f3] rounded-xl border border-[#1d645c]/20 mb-6"
        >
          <span className="text-2xl">{design.wax.emoji}</span>
          <div>
            <p className="text-xs font-semibold text-[#1d645c] uppercase tracking-wide mb-0.5">Durée de combustion estimée</p>
            <p className="text-sm text-[#1d3830]">{design.wax.burnTime}</p>
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
          Ajouter au panier — {formatPrice(totalPrice)}
        </Button>
        {(!design.vessel || !design.wax || !design.scent) && (
          <p className="text-center text-xs text-[#5a7a76] mt-2">
            Veuillez compléter les étapes 1 à 3 pour continuer
          </p>
        )}
      </motion.div>
    </div>
  );
}
