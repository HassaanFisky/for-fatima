"use client";

import React, { useId, useState, useCallback } from "react";

interface KonpeitoStarProps {
  size?: "lg" | "md" | "sm";
  glow?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  variant?: "five-point" | "four-point";
}

const SIZE_MAP = {
  lg: 44,
  md: 24,
  sm: 12,
} as const;

/**
 * Crisp, recognizable 5-point or 4-point celestial star with warm starlight facets.
 * Supports tactile touch/click shimmer and bell chime callback.
 */
export function KonpeitoStar({
  size = "md",
  glow = false,
  className = "",
  onClick,
  ariaLabel,
  variant = "five-point",
}: KonpeitoStarProps) {
  const uid = useId();
  const px = SIZE_MAP[size];
  const [shimmering, setShimmering] = useState(false);

  const handlePress = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setShimmering(true);
      onClick?.();
      window.setTimeout(() => setShimmering(false), 520);
    },
    [onClick]
  );

  // Clean, symmetrical 5-point star path (center 24,24, outer R=19, inner r=8.2)
  const fivePointOuter =
    "M24 5 L28.8 17.4 L42.1 18.1 L31.8 26.5 L35.2 39.4 L24 32.2 L12.8 39.4 L16.2 26.5 L5.9 18.1 L19.2 17.4 Z";
  const fivePointCore =
    "M24 9.5 L27.6 18.8 L37.6 19.3 L29.9 25.6 L32.4 35.2 L24 29.8 L15.6 35.2 L18.1 25.6 L10.4 19.3 L20.4 18.8 Z";

  // Clean 4-point celestial diamond star path
  const fourPointOuter =
    "M24 4 L28.6 19.4 L44 24 L28.6 28.6 L24 44 L19.4 28.6 L4 24 L19.4 19.4 Z";
  const fourPointCore =
    "M24 9 L27.3 20.7 L39 24 L27.3 27.3 L24 39 L20.7 27.3 L9 24 L20.7 20.7 Z";

  const outerPath = variant === "four-point" ? fourPointOuter : fivePointOuter;
  const corePath = variant === "four-point" ? fourPointCore : fivePointCore;

  const content = (
    <svg
      width={px}
      height={px}
      viewBox="0 0 48 48"
      className={`${className} transition-transform duration-300 ${
        shimmering ? "scale-125" : "scale-100"
      }`}
      aria-hidden={onClick ? undefined : "true"}
    >
      <defs>
        {(glow || shimmering) && (
          <radialGradient id={`star-halo-${uid}`} cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="var(--color-starlight)"
              stopOpacity={shimmering ? "0.92" : "0.68"}
            />
            <stop
              offset="50%"
              stopColor="var(--color-butter-yellow)"
              stopOpacity={shimmering ? "0.48" : "0.28"}
            />
            <stop
              offset="100%"
              stopColor="var(--color-amethyst-dream)"
              stopOpacity="0"
            />
          </radialGradient>
        )}
      </defs>

      {(glow || shimmering) && (
        <circle
          cx="24"
          cy="24"
          r={shimmering ? "24" : "22"}
          fill={`url(#star-halo-${uid})`}
        />
      )}

      {/* Soft outer star rim */}
      <path
        d={outerPath}
        fill="var(--color-butter-yellow)"
        stroke="var(--color-starlight)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Warm starlight inner facet */}
      <path
        d={corePath}
        fill="var(--color-starlight)"
        opacity="0.92"
        strokeLinejoin="round"
      />

      {/* Crisp center gleam */}
      <circle
        cx="24"
        cy="23"
        r={size === "sm" ? "3.2" : "2.6"}
        fill="var(--color-cream-paper)"
      />
    </svg>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={handlePress}
        aria-label={ariaLabel || "Celestial star"}
        className="pointer-events-auto inline-flex items-center justify-center min-w-[36px] min-h-[36px] rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-amethyst-dream)]"
      >
        {content}
      </button>
    );
  }

  return content;
}

export type CandyFlavor = "sakura" | "periwinkle" | "butter" | "peach";

const CANDY_FILL: Record<CandyFlavor, string> = {
  sakura: "var(--color-sakura-pink)",
  periwinkle: "var(--color-periwinkle)",
  butter: "var(--color-butter-yellow)",
  peach: "var(--color-soft-peach)",
};

export function KonpeitoCandy({
  flavor = "sakura",
  size = 18,
  className = "",
}: {
  flavor?: CandyFlavor;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 3 L19.5 11.2 L28.4 12.1 L21.6 18.1 L23.6 26.8 L16 22.1 L8.4 26.8 L10.4 18.1 L3.6 12.1 L12.5 11.2 Z"
        fill={CANDY_FILL[flavor]}
        stroke="var(--color-cream-paper)"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <circle cx="14.5" cy="13.5" r="2" fill="var(--color-cream-paper)" opacity="0.85" />
    </svg>
  );
}
