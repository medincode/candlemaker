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
                      ? "bg-[#1d645c] text-white"
                      : isActive
                      ? "bg-[#1d645c] text-white shadow-md ring-2 ring-[#1d645c]/30"
                      : "bg-[#e8c4ad] text-[#5a7a76]"
                  }`}
                >
                  {isCompleted ? "✓" : stepNum}
                </div>
                <span
                  className={`hidden sm:block text-[10px] tracking-wider uppercase font-medium transition-colors duration-300 ${
                    isActive ? "text-[#1d645c]" : isCompleted ? "text-[#1d645c]" : "text-[#9dbfbb]"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="relative h-1.5 bg-[#e8c4ad] rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#1d645c] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
