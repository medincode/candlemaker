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

const STEP_LABELS = ["Vessel", "Wax", "Scent", "Personalize", "Review"];
const TOTAL_STEPS = 5;

function canProceed(step: number, design: CandleDesign): boolean {
  switch (step) {
    case 1: return !!design.vessel;
    case 2: return !!design.wax;
    case 3: return !!design.scent;
    case 4: return true; // personalize is optional
    default: return true;
  }
}

const slideVariants = {
  enter: (_direction: number) => ({
    x: 60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: (_direction: number) => ({
    x: -60,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};

export default function DesignPage() {
  const { currentStep, design, nextStep, prevStep } = useDesignStore();

  const showPreview = currentStep < 5;
  const isLastStep = currentStep === TOTAL_STEPS;

  // Track direction for slide animation
  const handleNext = () => nextStep();
  const handlePrev = () => prevStep();

  const steps = [
    <StepVessel key="vessel" />,
    <StepWax key="wax" />,
    <StepScent key="scent" />,
    <StepPersonalize key="personalize" />,
    <StepReview key="review" />,
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      {/* Progress header */}
      <div className="border-b border-[#E8DDD4] bg-white/70 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            labels={STEP_LABELS}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`flex gap-10 ${showPreview ? "flex-col lg:flex-row" : ""}`}>
          {/* Preview sidebar */}
          {showPreview && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-40 lg:self-start lg:w-72 xl:w-80"
            >
              <div className="bg-white rounded-2xl border border-[#E8DDD4] p-6 shadow-sm">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium mb-4 text-center">
                  Live Preview
                </p>
                <CandlePreview design={design} />
              </div>

              {/* Quick tip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 p-4 bg-[#F0F7EF] rounded-xl border border-[#8FAF8A]/30 text-center"
              >
                <p className="text-xs text-[#8FAF8A] font-medium mb-1">✦ Tip</p>
                <p className="text-[11px] text-[#9B8E84] leading-relaxed">
                  {currentStep === 1 && "Your vessel sets the stage for your candle's story."}
                  {currentStep === 2 && "Coconut wax has the longest burn time and creamiest finish."}
                  {currentStep === 3 && "Floral scents pair beautifully with blush pink wax."}
                  {currentStep === 4 && "Wooden wicks create a cosy crackling ambiance."}
                </p>
              </motion.div>
            </motion.aside>
          )}

          {/* Step content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-[#E8DDD4] shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait" custom={1}>
                  <motion.div
                    key={currentStep}
                    custom={1}
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
                <div className="px-6 sm:px-8 py-5 bg-[#FDF8F3] border-t border-[#E8DDD4] flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    size="md"
                  >
                    ← Back
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          i + 1 === currentStep
                            ? "bg-[#C9A96E] w-4"
                            : i + 1 < currentStep
                            ? "bg-[#8FAF8A]"
                            : "bg-[#E8DDD4]"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={!canProceed(currentStep, design)}
                    size="md"
                  >
                    {currentStep === 4 ? "Review →" : "Next →"}
                  </Button>
                </div>
              )}

              {currentStep === TOTAL_STEPS && (
                <div className="px-6 sm:px-8 py-5 bg-[#FDF8F3] border-t border-[#E8DDD4] flex justify-start">
                  <Button variant="ghost" onClick={handlePrev} size="md">
                    ← Back to Personalize
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
