"use client";

import React from "react";
import { useLivingWorld } from "./LivingWorldProvider";

interface BreezePetalSpec {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  side: "left" | "right";
}

// Balanced left & right breeze-carried petals originating near the coastal trees
const BREEZE_PETAL_SPECS: BreezePetalSpec[] = [
  { id: 1, left: "8%", top: "48%", size: 13, duration: 17, delay: 0.4, side: "left" },
  { id: 2, left: "15%", top: "54%", size: 11, duration: 20, delay: 5.2, side: "left" },
  { id: 3, left: "85%", top: "52%", size: 12, duration: 18, delay: 2.1, side: "right" },
  { id: 4, left: "91%", top: "47%", size: 13, duration: 21, delay: 7.4, side: "right" },
];

export function SakuraField() {
  const { reducedMotion, constellationFocused } = useLivingWorld();

  if (reducedMotion || constellationFocused) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[1]"
      aria-hidden="true"
    >
      {BREEZE_PETAL_SPECS.map((p) => (
        <div
          key={p.id}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
          className={`absolute ${
            p.side === "left" ? "petal-breeze-left" : "petal-breeze-right"
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              d="M12 22 C6 18 4 11 7 5 C8.5 2.5 10.5 3.5 12 6 C13.5 3.5 15.5 2.5 17 5 C20 11 18 18 12 22 Z"
              fill="var(--color-sakura-pink)"
            />
            <path
              d="M12 20 C9 16 8 11 10 7 C11 8.5 12 10 12 10 C12 10 13 8.5 14 7 C16 11 15 16 12 20 Z"
              fill="var(--color-paper-cream)"
              opacity="0.45"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
