"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { BOTANICALS } from "@/lib/candle-options";
import { formatPrice } from "@/lib/utils";

function QuantityControl({ id, quantity }: { id: string; quantity: number }) {
  const { updateQuantity, removeItem } = useCartStore();
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => {
          if (quantity === 1) removeItem(id);
          else updateQuantity(id, quantity - 1);
        }}
        className="w-9 h-9 rounded-full border border-[#e8c4ad] flex items-center justify-center text-[#5a7a76] hover:border-[#1d645c] hover:text-[#1d645c] transition-colors text-base font-medium active:scale-95"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-semibold text-[#1d3830]">{quantity}</span>
      <button
        onClick={() => updateQuantity(id, quantity + 1)}
        className="w-9 h-9 rounded-full border border-[#e8c4ad] flex items-center justify-center text-[#5a7a76] hover:border-[#1d645c] hover:text-[#1d645c] transition-colors text-base font-medium active:scale-95"
      >
        +
      </button>
    </div>
  );
}

export default function CartPage() {
  const { items, removeItem, totalPrice } = useCartStore();
  const subtotal = totalPrice();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#1d645c] mb-2 font-medium">
          Light Of Mizaj
        </p>
        <h1
          className="text-4xl sm:text-5xl font-light text-[#1d3830]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Mon Panier
        </h1>
      </motion.div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-6">🕯️</div>
          <h2
            className="text-3xl font-light text-[#1d3830] mb-3"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Votre panier est vide
          </h2>
          <p className="text-[#5a7a76] font-light mb-8">
            Créez votre première bougie sur mesure.
          </p>
          <Link href="/design">
            <Button size="lg">Créer ma bougie ✦</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Articles */}
          <div className="flex-1 space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item, idx) => {
                const d = item.design;
                const botanicalDetails = BOTANICALS.filter((b) => d.botanicals.includes(b.id));

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="bg-white rounded-2xl border border-[#e8c4ad] p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#e8f5f3] rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {d.vessel?.emoji ?? "🕯️"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3
                              className="font-light text-[#1d3830] text-lg leading-tight"
                              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                            >
                              {d.label ? `"${d.label}"` : "Bougie Sur Mesure"}
                            </h3>
                            <p className="text-xs text-[#5a7a76] mt-0.5">
                              {d.vessel?.name} · {d.wax?.name} · {d.scent?.name}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#9dbfbb] hover:text-[#e88a8a] transition-colors text-sm p-1 flex-shrink-0"
                            title="Supprimer"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {d.waxColor && (
                            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-[#fdf5f0] rounded-full text-[#5a7a76] border border-[#e8c4ad]">
                              <span className="w-2 h-2 rounded-full" style={{ background: d.waxColor.hex }} />
                              {d.waxColor.name}
                            </span>
                          )}
                          {d.wickType && (
                            <span className="text-[10px] px-2 py-0.5 bg-[#fdf5f0] rounded-full text-[#5a7a76] border border-[#e8c4ad]">
                              {d.wickType.emoji} Mèche {d.wickType.name}
                            </span>
                          )}
                          {botanicalDetails.map((b) => (
                            <span
                              key={b.id}
                              className="text-[10px] px-2 py-0.5 bg-[#e8f5f3] rounded-full text-[#1d645c] border border-[#1d645c]/20"
                            >
                              {b.emoji} {b.name}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <QuantityControl id={item.id} quantity={item.quantity} />
                          <div className="text-right">
                            <p
                              className="text-xl font-light text-[#1d645c]"
                              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                            >
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-[10px] text-[#9dbfbb]">
                                {formatPrice(item.price)} / pièce
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <Link href="/design">
                <button className="w-full py-4 border-2 border-dashed border-[#e8c4ad] rounded-2xl text-sm text-[#5a7a76] hover:border-[#1d645c]/50 hover:text-[#1d645c] transition-all duration-200 font-medium">
                  + Créer une autre bougie
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Récap commande */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:w-80 xl:w-96 lg:sticky lg:top-40 lg:self-start"
          >
            <div className="bg-white rounded-2xl border border-[#e8c4ad] p-6 shadow-sm">
              <h2
                className="text-xl font-light text-[#1d3830] mb-5 pb-4 border-b border-[#e8c4ad]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Récapitulatif
              </h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#5a7a76] font-light">
                      {item.design.label ? `"${item.design.label}"` : item.design.vessel?.name ?? "Bougie"} × {item.quantity}
                    </span>
                    <span className="text-[#1d3830] font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e8c4ad] pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#5a7a76]">Livraison</span>
                  <span className="text-sm text-[#1d645c] font-medium">Gratuite</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#1d3830] uppercase tracking-wider">Total</span>
                  <span
                    className="text-2xl font-light text-[#1d645c]"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full">
                  Passer la commande →
                </Button>
              </Link>

              <p className="text-[10px] text-[#9dbfbb] text-center mt-4 leading-relaxed">
                🔒 Paiement sécurisé · Livraison gratuite · Fait à la main
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </div>
  );
}
