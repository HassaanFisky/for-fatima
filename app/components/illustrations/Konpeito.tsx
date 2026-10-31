"use client";

import React, { useId } from "react";

interface KonpeitoStarProps {
  size?: "lg" | "md" | "sm";
  glow?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const SIZE_MAP = {
  lg: 48,
  md: 20,
  sm: 6,
} as const;

/**
 * Faceted 8-point rounded Konpeitō sugar-star.
 * Only Large stars include an SVG radialGradient halo glow.
 */
export function KonpeitoStar({
  size = "md",
  glow = false,
  className = "",
  onClick,
  ariaLabel,
}: KonpeitoStarProps) {
  const uid = useId();
  const px = SIZE_MAP[size];

  if (size === "sm") {
    return (
      <svg
        width={px}
        height={px}
        viewBox="0 0 8 8"
        className={className}
        aria-hidden="true"
      >
        <circle cx="4" cy="4" r="3" fill="var(--color-starlight)" />
      </svg>
    );
  }

  const content = (
    <svg
      width={px}
      height={px}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden={onClick ? undefined : "true"}
    >
      <defs>
        {glow && (
          <radialGradient id={`star-halo-${uid}`} cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="var(--color-starlight)"
              stopOpacity="0.65"
            />
            <stop
              offset="45%"
              stopColor="var(--color-butter-yellow)"
              stopOpacity="0.28"
            />
            <stop
              offset="100%"
              stopColor="var(--color-amethyst-dream)"
              stopOpacity="0"
            />
          </radialGradient>
        )}
      </defs>

      {glow && <circle cx="24" cy="24" r="23" fill={`url(#star-halo-${uid})`} />}

      {/* Outer amethyst sugar rim */}
      <path
        d="M24 6 C26 6 27 11 29 12 C31 13 36 10 37 11 C38 12 35 17 36 19 C37 21 42 22 42 24 C42 26 37 27 36 29 C35 31 38 36 37 37 C36 38 31 35 29 36 C27 37 26 42 24 42 C22 42 21 37 19 36 C17 35 12 38 11 37 C10 36 13 31 12 29 C11 27 6 26 6 24 C6 22 11 21 12 19 C13 17 10 12 11 11 C12 10 17 13 19 12 C21 11 22 6 24 6 Z"
        fill="var(--color-amethyst-dream)"
        opacity="0.32"
        transform="scale(1.06)"
        style={{ transformOrigin: "24px 24px" }}
      />

      {/* Mid butter-yellow crystal body */}
      <path
        d="M24 7 C26 7 27 11.5 28.8 12.5 C30.5 13.5 35 10.8 36.2 12 C37.4 13.2 34.5 17.5 35.5 19.2 C36.5 21 41 22 41 24 C41 26 36.5 27 35.5 28.8 C34.5 30.5 37.4 34.8 36.2 36 C35 37.2 30.5 34.5 28.8 35.5 C27 36.5 26 41 24 41 C22 41 21 36.5 19.2 35.5 C17.5 34.5 13 37.2 11.8 36 C10.6 34.8 13.5 30.5 12.5 28.8 C11.5 27 7 26 7 24 C7 22 11.5 21 12.5 19.2 C13.5 17.5 10.6 13.2 11.8 12 C13 10.8 17.5 13.5 19.2 12.5 C21 11.5 22 7 24 7 Z"
        fill="var(--color-butter-yellow)"
      />

      {/* Starlight core facet */}
      <polygon
        points="24,11 31,20 24,25 17,20"
        fill="var(--color-starlight)"
        opacity="0.92"
      />
      <polygon
        points="24,25 33,24 27,33 20,31"
        fill="var(--color-starlight)"
        opacity="0.65"
      />

      {/* Top-left moonlit highlight dot */}
      <circle cx="20.5" cy="17.5" r="2.2" fill="var(--color-cream-paper)" />
    </svg>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel || "Bright konpeitō star"}
        className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-amethyst-dream)]"
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
        d="M16 3 C17.6 3 18.4 7 19.8 7.8 C21.2 8.6 25 6.4 26 7.4 C27 8.4 24.6 12 25.4 13.4 C26.2 14.8 30 15.6 30 17 C30 18.4 26.2 19.2 25.4 20.6 C24.6 22 27 25.6 26 26.6 C25 27.6 21.2 25.4 19.8 26.2 C18.4 27 17.6 30 16 30 C14.4 30 13.6 27 12.2 26.2 C10.8 25.4 7 27.6 6 26.6 C5 25.6 7.4 22 6.6 20.6 C5.8 19.2 2 18.4 2 17 C2 15.6 5.8 14.8 6.6 13.4 C7.4 12 5 8.4 6 7.4 C7 6.4 10.8 8.6 12.2 7.8 C13.6 7 14.4 3 16 3 Z"
        fill={CANDY_FILL[flavor]}
      />
      <circle cx="13" cy="12" r="2" fill="var(--color-cream-paper)" opacity="0.85" />
    </svg>
  );
}
