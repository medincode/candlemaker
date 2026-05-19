"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { CandlePreview } from "@/components/designer/CandlePreview";
import { StepVessel } from "@/components/designer/StepVessel";
import { StepWax } from "@/components/designer/StepWax";
import { StepScent } from "@/components/designer/StepScent";
import { StepPersonalize } from "@/components/designer/StepPersonalize";
import { StepReview } from "@/components/designer/StepReview";
import { useDesignStore, type CandleDesign } from "@/store/designStore";

const STEP_LABELS = ["Contenant", "Cire", "Parfum", "Finitions", "Récap"];
const TOTAL_STEPS = 5;

const TIPS: Record<number, string> = {
  1: "Le contenant donne le caractère à votre bougie.",
  2: "La cire de coco a la meilleure durée de combustion.",
  3: "Les parfums floraux se marient bien avec une cire blush.",
  4: "La mèche en bois crée un crépitement cosy et enveloppant.",
};

function canProceed(step: number, design: CandleDesign): boolean {
  switch (step) {
    case 1: return !!design.vessel;
    case 2: return !!design.wax;
    case 3: return !!design.scent;
    case 4: return true;
    default: return true;
  }
}

const slideVariants = {
  enter: { x: 60, opacity: 0 },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: {
    x: -60,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

export default function DesignPage() {
  const { currentStep, design, nextStep, prevStep } = useDesignStore();
  const showPreview = currentStep < 5;
  const isLastStep = currentStep === TOTAL_STEPS;

  const steps = [
    <StepVessel key="vessel" />,
    <StepWax key="wax" />,
    <StepScent key="scent" />,
    <StepPersonalize key="personalize" />,
    <StepReview key="review" />,
  ];

  return (
    <div className="min-h-screen bg-[#f2dcce]">
      {/* Barre de progression */}
      <div className="border-b border-[#e8c4ad] bg-[#f2dcce]/80 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            labels={STEP_LABELS}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className={`flex gap-8 ${showPreview ? "flex-col lg:flex-row" : ""}`}>
          {/* Preview sidebar */}
          {showPreview && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-40 lg:self-start lg:w-64 xl:w-72"
            >
              <div className="bg-white rounded-2xl border border-[#e8c4ad] p-5 shadow-sm">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#1d645c] font-medium mb-4 text-center">
                  Aperçu en direct
                </p>
                <CandlePreview design={design} />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-3 p-4 bg-[#e8f5f3] rounded-xl border border-[#1d645c]/20 text-center"
              >
                <p className="text-xs text-[#1d645c] font-medium mb-1">✦ Conseil</p>
                <p className="text-[11px] text-[#5a7a76] leading-relaxed">
                  {TIPS[currentStep]}
                </p>
              </motion.div>
            </motion.aside>
          )}

          {/* Contenu de l'étape */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-[#e8c4ad] shadow-sm overflow-hidden">
              <div className="p-5 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {steps[currentStep - 1]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              {!isLastStep && (
                <div className="px-5 sm:px-8 py-4 bg-[#f2dcce]/50 border-t border-[#e8c4ad] flex items-center justify-between gap-4">
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    size="sm"
                  >
                    ← Retour
                  </Button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i + 1 === currentStep
                            ? "bg-[#1d645c] w-5"
                            : i + 1 < currentStep
                            ? "bg-[#1d645c]/60 w-1.5"
                            : "bg-[#e8c4ad] w-1.5"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="primary"
                    onClick={nextStep}
                    disabled={!canProceed(currentStep, design)}
                    size="sm"
                  >
                    {currentStep === 4 ? "Récap →" : "Suivant →"}
                  </Button>
                </div>
              )}

              {currentStep === TOTAL_STEPS && (
                <div className="px-5 sm:px-8 py-4 bg-[#f2dcce]/50 border-t border-[#e8c4ad] flex justify-start">
                  <Button variant="ghost" onClick={prevStep} size="sm">
                    ← Retour aux finitions
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
