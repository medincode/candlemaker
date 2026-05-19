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
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          if (quantity === 1) removeItem(id);
          else updateQuantity(id, quantity - 1);
        }}
        className="w-8 h-8 rounded-full border border-[#E8DDD4] flex items-center justify-center text-[#9B8E84] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors text-base font-medium"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-semibold text-[#6B5E52]">{quantity}</span>
      <button
        onClick={() => updateQuantity(id, quantity + 1)}
        className="w-8 h-8 rounded-full border border-[#E8DDD4] flex items-center justify-center text-[#9B8E84] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors text-base font-medium"
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-2 font-medium">
          Your Collection
        </p>
        <h1
          className="text-4xl sm:text-5xl font-light text-[#6B5E52]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Shopping Cart
        </h1>
      </motion.div>

      {items.length === 0 ? (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-24"
        >
          <div className="text-6xl mb-6">🕯️</div>
          <h2
            className="text-3xl font-light text-[#6B5E52] mb-3"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Your cart is empty
          </h2>
          <p className="text-[#9B8E84] font-light mb-8">
            Design your first bespoke candle and let it find its home here.
          </p>
          <Link href="/design">
            <Button size="lg">Start Designing ✦</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="flex-1 space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item, idx) => {
                const d = item.design;
                const botanicalDetails = BOTANICALS.filter((b) =>
                  d.botanicals.includes(b.id)
                );

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="bg-white rounded-2xl border border-[#E8DDD4] p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      {/* Candle icon placeholder */}
                      <div className="w-16 h-16 bg-[#FDF0E0] rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {d.vessel?.emoji ?? "🕯️"}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3
                              className="font-light text-[#6B5E52] text-lg leading-tight"
                              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                            >
                              {d.label ? `"${d.label}"` : "Bespoke Candle"}
                            </h3>
                            <p className="text-xs text-[#9B8E84] mt-0.5">
                              {d.vessel?.name} · {d.wax?.name} · {d.scent?.name}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#C4B8B0] hover:text-[#D4A5A5] transition-colors text-sm p-1 flex-shrink-0"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Details chips */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {d.waxColor && (
                            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-[#F8F4EF] rounded-full text-[#9B8E84] border border-[#E8DDD4]">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ background: d.waxColor.hex }}
                              />
                              {d.waxColor.name}
                            </span>
                          )}
                          {d.wickType && (
                            <span className="text-[10px] px-2 py-0.5 bg-[#F8F4EF] rounded-full text-[#9B8E84] border border-[#E8DDD4]">
                              {d.wickType.emoji} {d.wickType.name} wick
                            </span>
                          )}
                          {botanicalDetails.map((b) => (
                            <span
                              key={b.id}
                              className="text-[10px] px-2 py-0.5 bg-[#F0F7EF] rounded-full text-[#8FAF8A] border border-[#8FAF8A]/30"
                            >
                              {b.emoji} {b.name}
                            </span>
                          ))}
                        </div>

                        {/* Quantity + price */}
                        <div className="flex items-center justify-between">
                          <QuantityControl id={item.id} quantity={item.quantity} />
                          <div className="text-right">
                            <p
                              className="text-xl font-light text-[#C9A96E]"
                              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                            >
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-[10px] text-[#9B8E84]">
                                {formatPrice(item.price)} each
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

            {/* Add another */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/design">
                <button className="w-full py-4 border-2 border-dashed border-[#E8DDD4] rounded-2xl text-sm text-[#9B8E84] hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-200 font-medium">
                  + Design Another Candle
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Order summary */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:w-80 xl:w-96 lg:sticky lg:top-40 lg:self-start"
          >
            <div className="bg-white rounded-2xl border border-[#E8DDD4] p-6 shadow-sm">
              <h2
                className="text-xl font-light text-[#6B5E52] mb-5 pb-4 border-b border-[#E8DDD4]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#9B8E84] font-light">
                      {item.design.label ? `"${item.design.label}"` : item.design.vessel?.name ?? "Candle"} × {item.quantity}
                    </span>
                    <span className="text-[#6B5E52] font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E8DDD4] pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#9B8E84]">Shipping</span>
                  <span className="text-sm text-[#8FAF8A] font-medium">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#6B5E52] uppercase tracking-wider">Total</span>
                  <span
                    className="text-2xl font-light text-[#C9A96E]"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full">
                  Proceed to Checkout →
                </Button>
              </Link>

              <p className="text-[10px] text-[#9B8E84] text-center mt-4 leading-relaxed">
                🔒 Secure checkout · Free shipping on all orders · Handcrafted to order
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </div>
  );
}
