"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      {/* Step labels */}
      {labels && (
        <div className="flex justify-between mb-3">
          {labels.map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#8FAF8A] text-white"
                      : isActive
                      ? "bg-[#C9A96E] text-white shadow-md"
                      : "bg-[#E8DDD4] text-[#9B8E84]"
                  }`}
                >
                  {isCompleted ? "✓" : stepNum}
                </div>
                <span
                  className={`hidden sm:block text-[10px] tracking-wider uppercase font-medium transition-colors duration-300 ${
                    isActive ? "text-[#C9A96E]" : isCompleted ? "text-[#8FAF8A]" : "text-[#C4B8B0]"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Bar */}
      <div className="relative h-1 bg-[#E8DDD4] rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8FAF8A] to-[#C9A96E] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
