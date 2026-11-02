"use client";

import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Original Project Identity Mark:
 * Combines the Konpeitō sugar-star and flowing liquid-glass ribbon wave into a minimal emblem.
 */
export function KonpeitoWaveMark({
  className = "",
  size = 22,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Flowing ribbon wave */}
      <path
        d="M3.5 22.5 C8.5 18.2, 13.5 25.5, 18.8 21.2 C22.5 18.2, 25.8 19.8, 28.5 17.5"
        stroke="var(--color-royal-violet)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M5.5 26 C10.2 22.8, 15 27.8, 20.5 24.4 C23.8 22.4, 26.2 23.4, 28 21.8"
        stroke="var(--color-amethyst-dream)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.78"
      />
      {/* Faceted Konpeitō star */}
      <path
        d="M16 4 C16.9 4 17.4 6.5 18.3 7 C19.2 7.5 21.5 6 22.1 6.6 C22.7 7.2 21.2 9.5 21.7 10.4 C22.2 11.3 24.5 11.8 24.5 12.7 C24.5 13.6 22.2 14.1 21.7 15 C21.2 15.9 22.7 18.1 22.1 18.7 C21.5 19.3 19.2 17.9 18.3 18.4 C17.4 18.9 16.9 21 16 21 C15.1 21 14.6 18.9 13.7 18.4 C12.8 17.9 10.5 19.3 9.9 18.7 C9.3 18.1 10.8 15.9 10.3 15 C9.8 14.1 7.5 13.6 7.5 12.7 C7.5 11.8 9.8 11.3 10.3 10.4 C10.8 9.5 9.3 7.2 9.9 6.6 C10.5 6 12.8 7.5 13.7 7 C14.6 6.5 15.1 4 16 4 Z"
        fill="var(--color-butter-star)"
        stroke="var(--color-royal-violet)"
        strokeWidth="1.1"
      />
      <circle cx="14.5" cy="11" r="1.2" fill="var(--color-paper-cream)" />
    </svg>
  );
}

/**
 * Apple SF-Symbols-inspired unified stroke icons (1.75px stroke, rounded caps/joins, optically centered).
 */
export function IconChevronLeft({ className = "", size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14.5 6L8.5 12L14.5 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronRight({ className = "", size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9.5 6L15.5 12L9.5 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSoundOn({ className = "", size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M11 5.5L6.8 9H4.2C3.54 9 3 9.54 3 10.2V13.8C3 14.46 3.54 15 4.2 15H6.8L11 18.5C11.65 19.04 12.6 18.58 12.6 17.73V6.27C12.6 5.42 11.65 4.96 11 5.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 9.2C17.2 10.6 17.2 13.4 16 14.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M19 6.8C21.2 9.7 21.2 14.3 19 17.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconSoundMuted({ className = "", size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M11 5.5L6.8 9H4.2C3.54 9 3 9.54 3 10.2V13.8C3 14.46 3.54 15 4.2 15H6.8L11 18.5C11.65 19.04 12.6 18.58 12.6 17.73V6.27C12.6 5.42 11.65 4.96 11 5.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 9.5L21 14M21 9.5L16.5 14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconSparkle({ className = "", size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 3.5C12.7 7.8 14.2 9.3 18.5 10C14.2 10.7 12.7 12.2 12 16.5C11.3 12.2 9.8 10.7 5.5 10C9.8 9.3 11.3 7.8 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 16.5C18.3 18.1 18.9 18.7 20.5 19C18.9 19.3 18.3 19.9 18 21.5C17.7 19.9 17.1 19.3 15.5 19C17.1 18.7 17.7 18.1 18 16.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconRestart({ className = "", size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.5 10.5C5.3 6.8 8.6 4 12.5 4C17.2 4 21 7.8 21 12.5C21 17.2 17.2 21 12.5 21C8.8 21 5.6 18.6 4.5 15.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M4 6V10.8H8.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Custom Illustrated Visual Objects for Scene 3 ("Things That Were Noticed"):
 * - gajre: Fragrant jasmine flower wrist garland
 * - piercings: Ear silhouette with three delicate star-like piercings (including the center Ramzan piercing)
 * - bracelet: Delicate charm bracelet with a soft lavender-gold clasp
 * - late-night: Quiet crescent moon over a calm city window
 */
export function NoticedObjectIllustration({
  type,
}: {
  type: "gajre" | "piercings" | "bracelet" | "late-night";
}) {
  switch (type) {
    case "gajre":
      return (
        <svg
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
          aria-hidden="true"
        >
          {/* Soft circular garland base */}
          <circle
            cx="34"
            cy="34"
            r="20"
            stroke="var(--color-mint-leaf)"
            strokeWidth="2.5"
            strokeDasharray="3 3"
          />
          {/* Jasmine buds around the ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
            <g key={angle} transform={`rotate(${angle} 34 34)`}>
              <circle
                cx="34"
                cy="14"
                r="5.2"
                fill={
                  idx % 2 === 0
                    ? "var(--color-paper-cream)"
                    : "var(--color-sakura-pink)"
                }
              />
              <circle
                cx="34"
                cy="14"
                r="2.1"
                fill="var(--color-butter-star)"
              />
            </g>
          ))}
          {/* Silk ribbon tie at bottom */}
          <path
            d="M30 53 C28 59, 25 62, 23 64 M38 53 C40 59, 43 62, 45 64"
            stroke="var(--color-royal-violet)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "piercings":
      return (
        <svg
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
          aria-hidden="true"
        >
          {/* Soft lavender halo backdrop */}
          <circle
            cx="34"
            cy="34"
            r="26"
            fill="var(--color-lavender-paper)"
          />
          {/* Minimalist graceful ear contour */}
          <path
            d="M27 17 C38 14, 46 23, 44 35 C42.5 44, 36 51, 28 50 C24 49.5, 22 46, 23.5 43"
            stroke="var(--color-ink-plum)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M30 25 C35 24, 38 29, 36.5 35"
            stroke="var(--color-dusty-violet)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Piercing 1 (Upper) */}
          <circle cx="42.5" cy="26" r="2.6" fill="var(--color-periwinkle)" />
          {/* Piercing 2 (Center Ramzan piercing — highlighted with a warm gold star) */}
          <circle cx="42.5" cy="35" r="4.2" fill="var(--color-butter-star)" />
          <circle cx="42.5" cy="35" r="1.8" fill="var(--color-paper-cream)" />
          {/* Piercing 3 (Lower lobe) */}
          <circle cx="36" cy="45.5" r="2.8" fill="var(--color-sakura-pink)" />
        </svg>
      );

    case "bracelet":
      return (
        <svg
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="34"
            cy="35"
            rx="21"
            ry="15"
            stroke="var(--color-royal-violet)"
            strokeWidth="2.2"
          />
          <ellipse
            cx="34"
            cy="35"
            rx="21"
            ry="15"
            stroke="var(--color-butter-star)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          {/* Delicate charm at the bottom */}
          <circle cx="34" cy="50" r="5.5" fill="var(--color-sakura-pink)" />
          <circle cx="34" cy="50" r="2.3" fill="var(--color-paper-cream)" />
          {/* Side pearls */}
          <circle cx="16" cy="42" r="3" fill="var(--color-butter-star)" />
          <circle cx="52" cy="42" r="3" fill="var(--color-butter-star)" />
        </svg>
      );

    case "late-night":
      return (
        <svg
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="34" cy="34" r="25" fill="var(--color-sky-mid)" />
          {/* Crescent moon */}
          <path
            d="M40 19 C31 20.5, 25 28, 25 36.5 C25 44, 31 50, 39 50.5 C29 51, 21 43.5, 21 34 C21 24.5, 29.5 17, 40 19 Z"
            fill="var(--color-butter-star)"
          />
          {/* Two tiny stars */}
          <circle cx="45" cy="26" r="1.8" fill="var(--color-paper-cream)" />
          <circle cx="48" cy="36" r="1.4" fill="var(--color-sakura-pink)" />
        </svg>
      );
  }
}
