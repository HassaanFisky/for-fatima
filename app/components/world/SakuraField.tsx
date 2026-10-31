"use client";

import React from "react";
import { useLivingWorld } from "./LivingWorldProvider";

interface SakuraSpec {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

// Max 7 environmental sakura petals in outer viewport margins
const SAKURA_SPECS: SakuraSpec[] = [
  { id: 1, left: "6%", size: 15, duration: 16, delay: 0.5 },
  { id: 2, left: "13%", size: 12, duration: 19, delay: 3.1 },
  { id: 3, left: "19%", size: 14, duration: 17, delay: 6.4 },
  { id: 4, left: "82%", size: 13, duration: 18, delay: 1.8 },
  { id: 5, left: "89%", size: 16, duration: 21, delay: 4.5 },
  { id: 6, left: "94%", size: 12, duration: 15, delay: 2.2 },
  { id: 7, left: "77%", size: 14, duration: 20, delay: 7.0 },
];

export function SakuraField() {
  const { world, reducedMotion, constellationFocused } = useLivingWorld();

  // Unmount completely when reduced motion is enabled or when constellation sky is focused
  if (reducedMotion || constellationFocused) {
    return null;
  }

  const activeCount = Math.max(
    2,
    Math.min(7, Math.round(world.lighting.petalDensity * 7))
  );
  const visiblePetals = SAKURA_SPECS.slice(0, activeCount);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[1]"
      aria-hidden="true"
    >
      {visiblePetals.map((p) => (
        <div
          key={p.id}
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
          className="absolute top-[-32px] sakura-drift-down opacity-80"
        >
          {/* Authentic notched sakura single petal silhouette */}
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
