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
  phone: string;
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
  phone: "",
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
      <label htmlFor={id} className="block text-xs font-medium text-[#5a7a76] uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-3.5 bg-white border border-[#e8c4ad] rounded-xl text-[#1d3830] placeholder:text-[#9dbfbb] focus:outline-none focus:border-[#1d645c] focus:ring-1 focus:ring-[#1d645c]/30 transition-all text-sm font-light"
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

    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
      setForm((prev) => ({ ...prev, cardNumber: formatted }));
      return;
    }

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
    await new Promise((r) => setTimeout(r, 1800));
    clearCart();
    router.push("/confirmation");
  };

  if (items.length === 0 && subtotal === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h1
          className="text-3xl font-light text-[#1d3830] mb-4"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Panier vide
        </h1>
        <p className="text-[#5a7a76] mb-6">Créez une bougie avant de passer commande.</p>
        <Button onClick={() => router.push("/design")}>Créer ma bougie</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-[#1d645c] mb-2 font-medium">
          Dernière étape
        </p>
        <h1
          className="text-4xl sm:text-5xl font-light text-[#1d3830]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Finaliser la commande
        </h1>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-6"
          >
            {/* Infos personnelles */}
            <div className="bg-white rounded-2xl border border-[#e8c4ad] p-6 shadow-sm">
              <h2
                className="text-xl font-light text-[#1d3830] mb-5"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Informations personnelles
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput label="Prénom" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Yasmine" required />
                  <FormInput label="Nom" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="El Amrani" required />
                </div>
                <FormInput label="Email" id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="yasmine@email.com" required />
                <FormInput label="Téléphone" id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+212 6 00 00 00 00" required />
              </div>
            </div>

            {/* Adresse de livraison */}
            <div className="bg-white rounded-2xl border border-[#e8c4ad] p-6 shadow-sm">
              <h2
                className="text-xl font-light text-[#1d3830] mb-5"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Adresse de livraison
              </h2>
              <div className="space-y-4">
                <FormInput label="Adresse" id="address" name="address" value={form.address} onChange={handleChange} placeholder="12 Rue des Roses" required />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput label="Ville" id="city" name="city" value={form.city} onChange={handleChange} placeholder="Casablanca" required />
                  <FormInput label="Code postal" id="postcode" name="postcode" value={form.postcode} onChange={handleChange} placeholder="20000" required />
                </div>
              </div>
            </div>

            {/* Paiement */}
            <div className="bg-white rounded-2xl border border-[#e8c4ad] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2
                  className="text-xl font-light text-[#1d3830]"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  Paiement
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#5a7a76]">
                  <span>🔒</span>
                  <span>Sécurisé</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#5a7a76] uppercase tracking-widest mb-1.5">
                    Numéro de carte
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
                      className="w-full px-4 py-3.5 pr-14 bg-white border border-[#e8c4ad] rounded-xl text-[#1d3830] placeholder:text-[#9dbfbb] focus:outline-none focus:border-[#1d645c] focus:ring-1 focus:ring-[#1d645c]/30 transition-all text-sm font-light tracking-widest"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">💳</span>
                  </div>
                </div>

                <FormInput label="Nom sur la carte" id="cardName" name="cardName" value={form.cardName} onChange={handleChange} placeholder="YASMINE EL AMRANI" required />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5a7a76] uppercase tracking-widest mb-1.5">
                      Expiration
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="MM/AA"
                      maxLength={5}
                      required
                      className="w-full px-4 py-3.5 bg-white border border-[#e8c4ad] rounded-xl text-[#1d3830] placeholder:text-[#9dbfbb] focus:outline-none focus:border-[#1d645c] focus:ring-1 focus:ring-[#1d645c]/30 transition-all text-sm font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5a7a76] uppercase tracking-widest mb-1.5">
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
                      className="w-full px-4 py-3.5 bg-white border border-[#e8c4ad] rounded-xl text-[#1d3830] placeholder:text-[#9dbfbb] focus:outline-none focus:border-[#1d645c] focus:ring-1 focus:ring-[#1d645c]/30 transition-all text-sm font-light"
                    />
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-[#9dbfbb] mt-4 text-center">
                Démo uniquement — aucun paiement réel ne sera effectué.
              </p>
            </div>

            {/* Bouton commande */}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    ✦
                  </motion.span>
                  Traitement en cours...
                </span>
              ) : (
                <>Commander — {formatPrice(subtotal)}</>
              )}
            </Button>
          </motion.div>

          {/* Récap sidebar */}
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
                Votre commande
              </h2>

              <div className="space-y-4 mb-5">
                {items.map((item) => {
                  const d = item.design;
                  return (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-[#e8f5f3] rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {d.vessel?.emoji ?? "🕯️"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1d3830] truncate">
                          {d.label ? `"${d.label}"` : d.vessel?.name ?? "Bougie"}
                        </p>
                        <p className="text-xs text-[#5a7a76] truncate">
                          {d.scent?.name} · Qté {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-[#1d645c] mt-0.5">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[#e8c4ad] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5a7a76]">Sous-total</span>
                  <span className="text-[#1d3830] font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5a7a76]">Livraison</span>
                  <span className="text-[#1d645c] font-medium">Gratuite</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#e8c4ad] mt-2">
                  <span className="font-semibold text-[#1d3830] text-sm uppercase tracking-wider">Total</span>
                  <span
                    className="text-2xl font-light text-[#1d645c]"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#e8c4ad]">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { emoji: "🔒", label: "Sécurisé" },
                    { emoji: "🌿", label: "Éco" },
                    { emoji: "🎁", label: "Cadeau" },
                  ].map((badge) => (
                    <div key={badge.label} className="flex flex-col items-center gap-1">
                      <span className="text-xl">{badge.emoji}</span>
                      <span className="text-[9px] text-[#9dbfbb] uppercase tracking-wider font-medium">
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
