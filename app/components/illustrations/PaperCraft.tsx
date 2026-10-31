"use client";

import React, { type ReactNode } from "react";
import { KonpeitoCandy } from "./Konpeito";

export function StampBear({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      {/* Left and right rounded ears */}
      <circle cx="6.5" cy="6.5" r="3.2" fill="var(--color-yume-base)" />
      <circle cx="17.5" cy="6.5" r="3.2" fill="var(--color-yume-base)" />
      {/* Rounded bear head */}
      <rect
        x="4.5"
        y="6.5"
        width="15"
        height="13.5"
        rx="6.8"
        fill="var(--color-yume-base)"
      />
      {/* Tiny inner ear dots */}
      <circle cx="6.5" cy="6.5" r="1.5" fill="var(--color-lavender-paper)" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="var(--color-lavender-paper)" />
    </svg>
  );
}

export function WashiTape({
  position = "top-left",
  className = "",
}: {
  position?: "top-left" | "top-right";
  className?: string;
}) {
  const rotation = position === "top-left" ? "-rotate-12 -top-2 -left-3" : "rotate-12 -top-2 -right-3";
  return (
    <svg
      width="54"
      height="18"
      viewBox="0 0 54 18"
      className={`absolute pointer-events-none select-none ${rotation} ${className}`}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="2"
        width="52"
        height="14"
        rx="3"
        fill="var(--color-lavender-paper)"
        opacity="0.94"
      />
      <line
        x1="4"
        y1="6.5"
        x2="50"
        y2="6.5"
        stroke="var(--color-periwinkle)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="11.5"
        x2="50"
        y2="11.5"
        stroke="var(--color-periwinkle)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface PaperCardProps {
  variant?: "cream" | "lavender";
  washi?: "top-left" | "top-right" | "none";
  stamp?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
  ariaLabel?: string;
}

export function PaperCard({
  variant = "cream",
  washi = "none",
  stamp = false,
  className = "",
  children,
  id,
  ariaLabel,
}: PaperCardProps) {
  const surfaceClass =
    variant === "cream" ? "paper-card-cream" : "paper-card-lavender";

  return (
    <article
      id={id}
      aria-label={ariaLabel}
      className={`relative rounded-[20px] p-5 sm:p-6 ${surfaceClass} ${className}`}
    >
      {washi !== "none" && <WashiTape position={washi} />}
      {stamp && (
        <span className="absolute top-3.5 right-3.5 opacity-80 pointer-events-none">
          <StampBear size={17} />
        </span>
      )}
      {children}
    </article>
  );
}

export function KeepsakeArtifactIcon({
  type,
}: {
  type: "letter" | "star" | "heart" | "flower" | "jar" | "moon";
}) {
  switch (type) {
    case "letter":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
          <rect
            x="6"
            y="11"
            width="32"
            height="22"
            rx="5"
            fill="var(--color-mochi-base)"
          />
          <path
            d="M6 15 L22 25 L38 15 L38 14 C38 12.3 36.7 11 35 11 L9 11 C7.3 11 6 12.3 6 14 Z"
            fill="var(--color-mochi-shadow)"
          />
          <circle cx="22" cy="23" r="3.5" fill="var(--color-sakura-pink)" />
        </svg>
      );
    case "star":
      return (
        <div className="w-[44px] h-[44px] flex items-center justify-center">
          <KonpeitoCandy flavor="butter" size={34} />
        </div>
      );
    case "heart":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
          <path
            d="M22 35 C22 35 9 27 9 17.5 C9 13.4 12.2 10.5 16 10.5 C18.6 10.5 20.8 12 22 14 C23.2 12 25.4 10.5 28 10.5 C31.8 10.5 35 13.4 35 17.5 C35 27 22 35 22 35 Z"
            fill="var(--color-sakura-pink)"
            opacity="0.82"
          />
          <circle cx="15.5" cy="15.5" r="2" fill="var(--color-cream-paper)" />
        </svg>
      );
    case "flower":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
          {[0, 72, 144, 216, 288].map((deg) => (
            <circle
              key={deg}
              cx="22"
              cy="13"
              r="6"
              fill="var(--color-soft-peach)"
              transform={`rotate(${deg} 22 22)`}
            />
          ))}
          <circle cx="22" cy="22" r="5" fill="var(--color-ink-violet)" />
          <circle cx="20.5" cy="20.5" r="1.4" fill="var(--color-cream-paper)" />
        </svg>
      );
    case "jar":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
          <rect
            x="14"
            y="8"
            width="16"
            height="4"
            rx="2"
            fill="var(--color-royal-violet)"
          />
          <rect
            x="11"
            y="12"
            width="22"
            height="24"
            rx="7"
            fill="var(--color-periwinkle)"
            opacity="0.42"
          />
          <circle cx="17" cy="29" r="3.5" fill="var(--color-sakura-pink)" />
          <circle cx="24" cy="30" r="3.5" fill="var(--color-butter-yellow)" />
          <circle cx="21" cy="24" r="3.5" fill="var(--color-soft-peach)" />
        </svg>
      );
    case "moon":
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
          <path
            d="M27 10 C19.5 11.2 14 17.5 14 25 C14 32 19.2 37.5 26.5 38 C17.5 38.5 10 31.5 10 22.5 C10 14 17.2 7.5 27 10 Z"
            fill="var(--color-butter-yellow)"
          />
          <circle cx="28" cy="18" r="2.2" fill="var(--color-periwinkle)" />
        </svg>
      );
  }
}
