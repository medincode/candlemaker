"use client";

import { create } from "zustand";
import type { Vessel, Wax, Scent, WaxColor, WickType } from "@/lib/candle-options";

export interface CandleDesign {
  vessel: Vessel | null;
  wax: Wax | null;
  scentCategory: string | null;
  scent: Scent | null;
  waxColor: WaxColor | null;
  label: string;
  wickType: WickType | null;
  botanicals: string[];
}

interface DesignStore {
  currentStep: number;
  design: CandleDesign;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setVessel: (vessel: Vessel) => void;
  setWax: (wax: Wax) => void;
  setScentCategory: (category: string) => void;
  setScent: (scent: Scent) => void;
  setWaxColor: (color: WaxColor) => void;
  setLabel: (label: string) => void;
  setWickType: (wick: WickType) => void;
  toggleBotanical: (botanicalId: string) => void;
  resetDesign: () => void;
}

const initialDesign: CandleDesign = {
  vessel: null,
  wax: null,
  scentCategory: null,
  scent: null,
  waxColor: null,
  label: "",
  wickType: null,
  botanicals: [],
};

export const useDesignStore = create<DesignStore>((set) => ({
  currentStep: 1,
  design: initialDesign,

  setStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 5),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  setVessel: (vessel) =>
    set((state) => ({ design: { ...state.design, vessel } })),

  setWax: (wax) =>
    set((state) => ({ design: { ...state.design, wax } })),

  setScentCategory: (scentCategory) =>
    set((state) => ({ design: { ...state.design, scentCategory, scent: null } })),

  setScent: (scent) =>
    set((state) => ({ design: { ...state.design, scent } })),

  setWaxColor: (waxColor) =>
    set((state) => ({ design: { ...state.design, waxColor } })),

  setLabel: (label) =>
    set((state) => ({ design: { ...state.design, label } })),

  setWickType: (wickType) =>
    set((state) => ({ design: { ...state.design, wickType } })),

  toggleBotanical: (botanicalId) =>
    set((state) => {
      const botanicals = state.design.botanicals.includes(botanicalId)
        ? state.design.botanicals.filter((b) => b !== botanicalId)
        : [...state.design.botanicals, botanicalId];
      return { design: { ...state.design, botanicals } };
    }),

  resetDesign: () =>
    set({ currentStep: 1, design: initialDesign }),
}));
