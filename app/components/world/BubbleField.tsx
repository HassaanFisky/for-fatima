"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLivingWorld } from "./LivingWorldProvider";

interface WaterRipple {
  id: number;
  x: number;
  y: number;
}

/**
 * Water-like localized touch ripple overlay.
 * Listens passively to pointerdown across the environment and spawns a soft,
 * concentric liquid shimmer at the exact touch/click coordinates without
 * blocking navigation, buttons, scrolling, or accessibility.
 */
export function BubbleField() {
  const { reducedMotion } = useLivingWorld();
  const [ripples, setRipples] = useState<WaterRipple[]>([]);
  const nextIdRef = useRef(1);

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerDown = (e: PointerEvent) => {
      const id = nextIdRef.current++;
      const x = e.clientX;
      const y = e.clientY;

      setRipples((prev) => [...prev.slice(-4), { id, x, y }]);

      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1200);
    };

    window.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [reducedMotion]);

  if (reducedMotion || ripples.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[25]"
      aria-hidden="true"
    >
      {ripples.map((r) => (
        <div
          key={r.id}
          style={{ left: `${r.x}px`, top: `${r.y}px` }}
          className="pointer-events-none absolute w-0 h-0"
        >
          {/* Outer expanding liquid ring */}
          <div
            className="water-ripple-ring-outer absolute rounded-full"
            style={{
              width: "96px",
              height: "96px",
              border: "1.5px solid rgba(255, 244, 214, 0.58)",
              background:
                "radial-gradient(circle, rgba(185, 196, 255, 0.22) 0%, rgba(246, 184, 207, 0.12) 52%, transparent 74%)",
              boxShadow: "0 0 18px rgba(255, 244, 214, 0.26)",
            }}
          />
          {/* Inner secondary concentric water wave */}
          <div
            className="water-ripple-ring-inner absolute rounded-full"
            style={{
              width: "62px",
              height: "62px",
              border: "1.2px solid rgba(185, 196, 255, 0.62)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
