"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  postcode: "",
  country: "",
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvv: "",
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

function FormInput({ label, id, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-[#9B8E84] uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-3 bg-white border border-[#E8DDD4] rounded-xl text-[#6B5E52] placeholder:text-[#C4B8B0] focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all text-sm font-light"
        {...props}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const subtotal = totalPrice();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
      setForm((prev) => ({ ...prev, cardNumber: formatted }));
      return;
    }

    // Format expiry with slash
    if (name === "expiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
      setForm((prev) => ({ ...prev, expiry: formatted }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate processing
    await new Promise((r) => setTimeout(r, 1800));

    clearCart();
    router.push("/confirmation");
  };

  if (items.length === 0 && subtotal === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h1
          className="text-3xl font-light text-[#6B5E52] mb-4"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Nothing to checkout
        </h1>
        <p className="text-[#9B8E84] mb-6">Your cart is empty. Design a candle first!</p>
        <Button onClick={() => router.push("/design")}>Start Designing</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-2 font-medium">
          Final Step
        </p>
        <h1
          className="text-4xl sm:text-5xl font-light text-[#6B5E52]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Checkout
        </h1>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-8"
          >
            {/* Personal info */}
            <div className="bg-white rounded-2xl border border-[#E8DDD4] p-6 shadow-sm">
              <h2
                className="text-xl font-light text-[#6B5E52] mb-5"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Aria"
                    required
                  />
                  <FormInput
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Sterling"
                    required
                  />
                </div>
                <FormInput
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="aria@example.com"
                  required
                />
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl border border-[#E8DDD4] p-6 shadow-sm">
              <h2
                className="text-xl font-light text-[#6B5E52] mb-5"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Shipping Address
              </h2>
              <div className="space-y-4">
                <FormInput
                  label="Street Address"
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="12 Blossom Lane"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="City"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="London"
                    required
                  />
                  <FormInput
                    label="Postcode"
                    id="postcode"
                    name="postcode"
                    value={form.postcode}
                    onChange={handleChange}
                    placeholder="EC1A 1BB"
                    required
                  />
                </div>
                <FormInput
                  label="Country"
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="United Kingdom"
                  required
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-[#E8DDD4] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2
                  className="text-xl font-light text-[#6B5E52]"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  Payment Details
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#9B8E84]">
                  <span>🔒</span>
                  <span>Secure</span>
                </div>
              </div>

              {/* Mock Stripe-style card input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#9B8E84] uppercase tracking-widest mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      required
                      className="w-full px-4 py-3 pr-14 bg-white border border-[#E8DDD4] rounded-xl text-[#6B5E52] placeholder:text-[#C4B8B0] focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all text-sm font-light tracking-widest"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">💳</span>
                  </div>
                </div>

                <FormInput
                  label="Name on Card"
                  id="cardName"
                  name="cardName"
                  value={form.cardName}
                  onChange={handleChange}
                  placeholder="ARIA STERLING"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#9B8E84] uppercase tracking-widest mb-1.5">
                      Expiry
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      className="w-full px-4 py-3 bg-white border border-[#E8DDD4] rounded-xl text-[#6B5E52] placeholder:text-[#C4B8B0] focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all text-sm font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9B8E84] uppercase tracking-widest mb-1.5">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={4}
                      required
                      className="w-full px-4 py-3 bg-white border border-[#E8DDD4] rounded-xl text-[#6B5E52] placeholder:text-[#C4B8B0] focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all text-sm font-light"
                    />
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-[#9B8E84] mt-4 text-center">
                This is a demo. No real payment will be processed.
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    ✦
                  </motion.span>
                  Processing...
                </span>
              ) : (
                <>Place Order — {formatPrice(subtotal)}</>
              )}
            </Button>
          </motion.div>

          {/* Order summary sidebar */}
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

              <div className="space-y-4 mb-5">
                {items.map((item) => {
                  const d = item.design;
                  return (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-[#FDF0E0] rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {d.vessel?.emoji ?? "🕯️"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#6B5E52] truncate">
                          {d.label ? `"${d.label}"` : `${d.vessel?.name ?? "Candle"}`}
                        </p>
                        <p className="text-xs text-[#9B8E84] truncate">
                          {d.scent?.name} · Qty {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-[#C9A96E] mt-0.5">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[#E8DDD4] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9B8E84]">Subtotal</span>
                  <span className="text-[#6B5E52] font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9B8E84]">Shipping</span>
                  <span className="text-[#8FAF8A] font-medium">Free</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#E8DDD4] mt-2">
                  <span className="font-semibold text-[#6B5E52] text-sm uppercase tracking-wider">Total</span>
                  <span
                    className="text-2xl font-light text-[#C9A96E]"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-5 border-t border-[#E8DDD4]">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { emoji: "🔒", label: "Secure" },
                    { emoji: "🌿", label: "Eco" },
                    { emoji: "🎁", label: "Gift Wrap" },
                  ].map((badge) => (
                    <div key={badge.label} className="flex flex-col items-center gap-1">
                      <span className="text-xl">{badge.emoji}</span>
                      <span className="text-[9px] text-[#9B8E84] uppercase tracking-wider font-medium">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </form>
    </div>
  );
}
