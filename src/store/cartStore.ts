"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CandleDesign } from "./designStore";

export interface CartItem {
  id: string;
  design: CandleDesign;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (design: CandleDesign, price: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (design, price) => {
        const id = `candle-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        set((state) => ({
          items: [...state.items, { id, design, price, quantity: 1 }],
        }));
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "candlemaker-cart",
    }
  )
);
