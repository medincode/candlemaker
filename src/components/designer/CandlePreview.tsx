"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { CandleDesign } from "@/store/designStore";

interface CandlePreviewProps {
  design: CandleDesign;
}

function FlameAnimation() {
  return (
    <motion.g>
      {/* Outer glow */}
      <motion.ellipse
        cx="100" cy="58"
        rx="12" ry="16"
        fill="#FFF3CD"
        opacity={0.3}
        animate={{
          scaleX: [1, 1.2, 0.9, 1.1, 1],
          scaleY: [1, 0.95, 1.05, 0.98, 1],
          opacity: [0.3, 0.4, 0.25, 0.35, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Main flame */}
      <motion.path
        d="M100 72 C94 68 90 62 92 54 C93 49 96 46 100 42 C104 46 107 49 108 54 C110 62 106 68 100 72Z"
        fill="url(#flameGrad)"
        animate={{
          d: [
            "M100 72 C94 68 90 62 92 54 C93 49 96 46 100 42 C104 46 107 49 108 54 C110 62 106 68 100 72Z",
            "M100 72 C93 67 89 61 91 53 C92 48 95 44 100 40 C105 44 108 48 109 53 C111 61 107 67 100 72Z",
            "M100 72 C95 68 91 63 93 55 C94 50 97 47 100 43 C103 47 106 50 107 55 C109 63 105 68 100 72Z",
          ],
          scaleX: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Inner flame highlight */}
      <motion.path
        d="M100 68 C97 65 96 61 97 57 C98 54 99 52 100 50 C101 52 102 54 103 57 C104 61 103 65 100 68Z"
        fill="#FFF8DC"
        opacity={0.8}
        animate={{
          opacity: [0.8, 0.9, 0.7, 0.85, 0.8],
        }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#C9A96E" />
          <stop offset="50%" stopColor="#F4A229" />
          <stop offset="100%" stopColor="#FFF3CD" />
        </linearGradient>
      </defs>
    </motion.g>
  );
}

function WickLine() {
  return (
    <line x1="100" y1="72" x2="100" y2="80" stroke="#4A3728" strokeWidth="1.5" strokeLinecap="round" />
  );
}

export function CandlePreview({ design }: CandlePreviewProps) {
  const waxColor = design.waxColor?.hex ?? "#FFFFF0";
  const hasFlame = true; // always show flame for prettiness
  const label = design.label;
  const botanicals = design.botanicals;
  const vessel = design.vessel;

  // Vessel shape config
  const vesselShapes = {
    jar: {
      body: "M68 82 Q65 82 64 90 L62 190 Q62 198 70 198 L130 198 Q138 198 138 190 L136 90 Q135 82 132 82 Z",
      top: "M66 82 Q68 78 100 76 Q132 78 134 82 Z",
      highlight: "M70 90 Q69 88 70 140 Q71 140 73 140 Q72 90 70 90 Z",
    },
    pot: {
      body: "M60 95 Q58 95 57 105 L55 185 Q55 198 70 198 L130 198 Q145 198 145 185 L143 105 Q142 95 140 95 Z",
      top: "M58 95 Q60 90 100 88 Q140 90 142 95 Z",
      highlight: "M64 100 Q63 98 64 155 Q66 155 68 155 Q67 100 64 100 Z",
    },
    bowl: {
      body: "M55 115 Q53 115 52 120 L50 175 Q50 198 75 198 L125 198 Q150 198 150 175 L148 120 Q147 115 145 115 Z",
      top: "M53 115 Q57 108 100 106 Q143 108 147 115 Z",
      highlight: "M60 120 Q59 118 60 165 Q62 165 64 165 Q63 120 60 120 Z",
    },
    tin: {
      body: "M70 88 Q68 88 67 94 L65 192 Q65 198 72 198 L128 198 Q135 198 135 192 L133 94 Q132 88 130 88 Z",
      top: "M68 88 Q70 84 100 82 Q130 84 132 88 Z",
      highlight: "M73 94 Q72 92 73 150 Q75 150 77 150 Q76 94 73 94 Z",
    },
  };

  const shape = vesselShapes[vessel?.shape ?? "jar"];

  // Vessel color based on type
  const vesselColors = {
    jar: { fill: "#E8F4F8", stroke: "#C5D8DF", opacity: 0.5 },
    pot: { fill: "#B0A898", stroke: "#8C8278", opacity: 0.95 },
    bowl: { fill: "#D4C5B5", stroke: "#B5A090", opacity: 0.95 },
    tin: { fill: "#C8C8C8", stroke: "#A0A0A0", opacity: 0.95 },
  };

  const vc = vesselColors[vessel?.shape ?? "jar"];

  // Botanical emoji positions (on top of wax surface)
  const botanicalPositions: Record<string, { emoji: string; positions: { x: number; y: number }[] }> = {
    "rose-petals": { emoji: "🌹", positions: [{ x: 85, y: 84 }, { x: 110, y: 88 }] },
    "lavender-buds": { emoji: "💜", positions: [{ x: 92, y: 86 }, { x: 108, y: 84 }] },
    "citrus-slices": { emoji: "🍋", positions: [{ x: 88, y: 83 }, { x: 112, y: 87 }] },
    "chamomile": { emoji: "🌼", positions: [{ x: 90, y: 85 }, { x: 107, y: 83 }] },
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-full"
        style={{ maxWidth: 240 }}
      >
        {/* Glow halo behind candle */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse at center 40%, rgba(201,169,110,0.15) 0%, transparent 70%)",
            transform: "translateY(-10%)",
          }}
        />

        <svg
          viewBox="0 0 200 220"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full drop-shadow-lg"
        >
          {/* Shadow beneath */}
          <ellipse cx="100" cy="210" rx="50" ry="6" fill="#00000015" />

          {/* Vessel body */}
          <motion.path
            d={shape.body}
            fill={vc.fill}
            stroke={vc.stroke}
            strokeWidth="1.5"
            fillOpacity={vc.opacity}
            animate={{ fill: vc.fill }}
            transition={{ duration: 0.4 }}
          />

          {/* Wax fill inside vessel */}
          <AnimatePresence>
            <motion.rect
              key={waxColor}
              x="65"
              y="82"
              width="70"
              height="110"
              rx="2"
              fill={waxColor}
              fillOpacity={0.92}
              clipPath="url(#vesselClip)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>

          {/* Clip path for wax */}
          <defs>
            <clipPath id="vesselClip">
              <path d={shape.body} />
            </clipPath>
          </defs>

          {/* Label area */}
          {label && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <rect
                x="72" y="130"
                width="56" height="30"
                rx="3"
                fill="white"
                fillOpacity={0.85}
                stroke="#C9A96E"
                strokeWidth="0.75"
              />
              <text
                x="100"
                y="150"
                textAnchor="middle"
                fontSize="7"
                fontFamily="Georgia, serif"
                fill="#6B5E52"
                fontStyle="italic"
              >
                {label.length > 14 ? label.slice(0, 14) + "…" : label}
              </text>
            </motion.g>
          )}

          {/* Botanical decorations on wax surface */}
          {botanicals.map((bId) => {
            const b = botanicalPositions[bId];
            if (!b) return null;
            return b.positions.map((pos, idx) => (
              <motion.text
                key={`${bId}-${idx}`}
                x={pos.x}
                y={pos.y}
                fontSize="10"
                textAnchor="middle"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                {b.emoji}
              </motion.text>
            ));
          })}

          {/* Vessel top/rim */}
          <path
            d={shape.top}
            fill={vc.stroke}
            stroke={vc.stroke}
            strokeWidth="1"
            fillOpacity={0.9}
          />

          {/* Glass highlight */}
          {vessel?.shape === "jar" && (
            <path
              d={shape.highlight}
              fill="white"
              fillOpacity={0.4}
            />
          )}

          {/* Wick */}
          <WickLine />

          {/* Flame */}
          {hasFlame && <FlameAnimation />}
        </svg>
      </div>

      {/* Info below */}
      <div className="mt-4 text-center space-y-1">
        {vessel && (
          <p className="text-sm font-medium text-[#6B5E52]">
            {vessel.emoji} {vessel.name}
          </p>
        )}
        {design.scent && (
          <p className="text-xs text-[#9B8E84] italic">
            ✨ {design.scent.name}
          </p>
        )}
        {design.waxColor && (
          <div className="flex items-center justify-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full border border-[#E8DDD4]"
              style={{ background: design.waxColor.hex }}
            />
            <span className="text-xs text-[#9B8E84]">{design.waxColor.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
