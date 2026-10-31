"use client";

import React, { useState, useCallback } from "react";
import { useLivingWorld } from "./LivingWorldProvider";

interface BubbleSpec {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

// 10 bubbles max, >=70% placed in the outer 20% horizontal margins so reading columns remain clear
const BUBBLE_SPECS: BubbleSpec[] = [
  { id: 1, left: "4%", size: 22, duration: 15, delay: 0 },
  { id: 2, left: "9%", size: 16, duration: 18, delay: 2.4 },
  { id: 3, left: "14%", size: 28, duration: 20, delay: 4.1 },
  { id: 4, left: "18%", size: 14, duration: 16, delay: 1.3 },
  { id: 5, left: "83%", size: 20, duration: 17, delay: 0.8 },
  { id: 6, left: "88%", size: 26, duration: 19, delay: 3.2 },
  { id: 7, left: "93%", size: 15, duration: 14, delay: 5.0 },
  { id: 8, left: "96%", size: 18, duration: 21, delay: 2.0 },
  { id: 9, left: "26%", size: 14, duration: 18, delay: 6.2 },
  { id: 10, left: "74%", size: 16, duration: 19, delay: 4.7 },
];

export function BubbleField() {
  const { world, reducedMotion, constellationFocused, playNote } = useLivingWorld();
  const [poppedIds, setPoppedIds] = useState<Record<number, boolean>>({});

  const handlePop = useCallback(
    (id: number) => {
      setPoppedIds((prev) => ({ ...prev, [id]: true }));
      playNote(id);
      window.setTimeout(() => {
        setPoppedIds((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }, 4200);
    },
    [playNote]
  );

  // Unmount completely when reduced motion is enabled or when constellation sky is focused
  if (reducedMotion || constellationFocused) {
    return null;
  }

  const activeCount = Math.max(
    3,
    Math.min(10, Math.round(world.lighting.bubbleDensity * 10))
  );
  const visibleBubbles = BUBBLE_SPECS.slice(0, activeCount);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[1]"
      aria-hidden="true"
    >
      {visibleBubbles.map((b) => {
        const isPopped = Boolean(poppedIds[b.id]);
        return (
          <button
            key={b.id}
            type="button"
            tabIndex={-1}
            onClick={() => handlePop(b.id)}
            style={{
              left: b.left,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
            className={`pointer-events-auto absolute bottom-[-40px] rounded-full transition-transform duration-300 ${
              isPopped ? "scale-150 opacity-0" : "bubble-float-up opacity-75"
            }`}
            aria-label="Dream bubble"
          >
            <svg
              viewBox="0 0 32 32"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <radialGradient
                  id={`bubble-grad-${b.id}`}
                  cx="35%"
                  cy="30%"
                  r="65%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-paper-cream)"
                    stopOpacity="0.65"
                  />
                  <stop
                    offset="55%"
                    stopColor="var(--color-sakura-pink)"
                    stopOpacity="0.22"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-periwinkle)"
                    stopOpacity="0.38"
                  />
                </radialGradient>
              </defs>
              <circle
                cx="16"
                cy="16"
                r="14"
                fill={`url(#bubble-grad-${b.id})`}
                stroke="var(--color-paper-lavender)"
                strokeWidth="0.8"
                strokeOpacity="0.55"
              />
              {/* Specular crescent highlight */}
              <path
                d="M9 11 A7 7 0 0 1 18 7.5"
                fill="none"
                stroke="var(--color-paper-cream)"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.8"
              />
              <circle
                cx="21"
                cy="21"
                r="1.4"
                fill="var(--color-butter-star)"
                opacity="0.6"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
