"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import {
  CONSTELLATION_STARS,
  type ConstellationStarSpec,
} from "../../config/personal";
import { StarsMoonScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { useLivingWorld } from "../world/LivingWorldProvider";

/**
 * Restored Original Star Experience (`00fcf13:app/components/Constellation.tsx` + `0263749:app/components/ConstellationTab.tsx`)
 * - 14 scattered stars (`sx`, `sy`) that glide smoothly (`1.1s cubic-bezier(.2,.8,.2,1)`) to their parametric heart coordinates (`hx`, `hy`) when tapped or dragged across (`Math.hypot(px - x, py - y) < 9`).
 * - Adjacent active stars draw `1px` Lavender Mist (`--color-periwinkle`) constellation lines along the heart contour.
 * - When all 14 stars are gathered, the closing contour segment connects and the heart polygon softly fills while a Cream Paper caption card reveals the personal message.
 */
export function ConstellationSection() {
  const { setConstellationFocused, playNote, playChord } = useLivingWorld();
  const sectionRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [activeMap, setActiveMap] = useState<Record<number, boolean>>({});
  const [selectedStar, setSelectedStar] = useState<ConstellationStarSpec>(
    CONSTELLATION_STARS[0]
  );

  // Observe when the constellation section is focused in the viewport so ambient stars and bottom nav yield cleanly
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setConstellationFocused(
            entry.isIntersecting && entry.intersectionRatio >= 0.55
          );
        }
      },
      { threshold: [0.25, 0.55, 0.75] }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      setConstellationFocused(false);
    };
  }, [setConstellationFocused]);

  const activeCount = Object.values(activeMap).filter(Boolean).length;
  const totalCount = CONSTELLATION_STARS.length;
  const isComplete = activeCount === totalCount;

  const activateStarByIndex = useCallback(
    (index: number) => {
      const star = CONSTELLATION_STARS[index];
      if (!star) return;
      setSelectedStar(star);

      setActiveMap((prev) => {
        if (prev[index]) return prev;
        const next = { ...prev, [index]: true };
        const nextCount = Object.values(next).filter(Boolean).length;
        if (nextCount === totalCount) {
          playChord();
        } else {
          playNote(index);
        }
        return next;
      });
    },
    [playChord, playNote, totalCount]
  );

  // Original pointer/touch hit-testing (`Math.hypot(px - x, py - y) < 9` in 0..100 SVG space)
  const handlePointerSweep = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const px = ((clientX - rect.left) / rect.width) * 100;
    const py = ((clientY - rect.top) / rect.height) * 100;

    CONSTELLATION_STARS.forEach((s, idx) => {
      const isAct = Boolean(activeMap[idx]);
      const curX = isAct ? s.hx : s.sx;
      const curY = isAct ? s.hy : s.sy;
      if (Math.hypot(px - curX, py - curY) < 9) {
        activateStarByIndex(idx);
      }
    });
  };

  const handleLightNextStar = () => {
    for (let i = 0; i < totalCount; i++) {
      if (!activeMap[i]) {
        activateStarByIndex(i);
        return;
      }
    }
  };

  const handleGatherAll = () => {
    const all: Record<number, boolean> = {};
    CONSTELLATION_STARS.forEach((_, idx) => {
      all[idx] = true;
    });
    setActiveMap(all);
    setSelectedStar(CONSTELLATION_STARS[totalCount - 1]);
    playChord();
  };

  const handleReplay = () => {
    setActiveMap({});
    setSelectedStar(CONSTELLATION_STARS[0]);
    playNote(0);
  };

  const heartPolygonPoints = CONSTELLATION_STARS.map(
    (s) => `${s.hx},${s.hy}`
  ).join(" ");

  return (
    <section
      id="stars"
      ref={sectionRef}
      aria-labelledby="stars-heading"
      className="relative z-10 max-w-[42rem] mx-auto px-4 sm:px-6 py-12"
    >
      {/* Chapter Pill */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-3">
          <KonpeitoCandy flavor="butter" />
          <span style={{ color: "var(--color-royal-violet)" }}>
            Chapter four · Stars
          </span>
        </div>

        <div className="rounded-[22px] px-6 py-4 paper-card-cream w-full max-w-[38rem]">
          <h2
            id="stars-heading"
            className="font-display font-bold mb-1"
            style={{
              fontSize: "clamp(1.375rem, 3.5vw, 1.875rem)",
              lineHeight: 1.25,
              color: "var(--color-ink-plum)",
            }}
          >
            Trace the stars to gather our sky
          </h2>
          <p
            className="font-sans text-sm sm:text-base"
            style={{ color: "var(--color-ink-muted)" }}
          >
            Tap or gently drag across the scattered stars to guide them into a
            constellation ({activeCount} of {totalCount} gathered).
          </p>
        </div>
      </div>

      {/* Contained Night-Sky Window (Always Deep Indigo -> Royal Dusk -> Soft Twilight so gold & lavender lines have 10:1+ contrast at any hour) */}
      <div className="relative rounded-[28px] overflow-hidden p-4 sm:p-6 constellation-night-window shadow-lg">
        {/* Top Corner Pose #6 — Yume sitting on a crescent moon watching the stars */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full paper-pill-surface"
            style={{ color: "var(--color-ink-plum)" }}
          >
            {isComplete
              ? "Every star gathered in place"
              : `${activeCount} / ${totalCount} stars lit`}
          </span>

          <StarsMoonScene />
        </div>

        {/* Interactive SVG Star Canvas (0..100 Coordinate Space from 00fcf13) */}
        <div className="relative w-full aspect-square max-h-[440px] mx-auto select-none touch-none">
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            className="w-full h-full overflow-visible cursor-pointer"
            onPointerDown={(e) => handlePointerSweep(e.clientX, e.clientY)}
            onPointerMove={(e) => {
              if (e.buttons > 0) {
                handlePointerSweep(e.clientX, e.clientY);
              }
            }}
            aria-label="Interactive 14-star heart constellation canvas"
          >
            <defs>
              <radialGradient
                id="constellation-star-halo"
                cx="50%"
                cy="50%"
                r="50%"
              >
                <stop
                  offset="0%"
                  stopColor="var(--color-butter-star)"
                  stopOpacity="0.85"
                />
                <stop
                  offset="55%"
                  stopColor="var(--color-peach-glow)"
                  stopOpacity="0.35"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-peach-glow)"
                  stopOpacity="0"
                />
              </radialGradient>
              <linearGradient
                id="constellation-heart-fill"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="var(--color-sakura-pink)"
                  stopOpacity="0.22"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-periwinkle)"
                  stopOpacity="0.18"
                />
              </linearGradient>
            </defs>

            {/* Completed Heart Polygon Soft Fill */}
            <polygon
              points={heartPolygonPoints}
              fill="url(#constellation-heart-fill)"
              className="transition-opacity duration-1000"
              style={{ opacity: isComplete ? 1 : 0 }}
            />

            {/* 1px Lavender Mist Lines between adjacent active stars along the heart contour */}
            {CONSTELLATION_STARS.map((star, i) => {
              if (i === 0) return null;
              const prev = CONSTELLATION_STARS[i - 1];
              const bothActive = Boolean(activeMap[i] && activeMap[i - 1]);
              return (
                <line
                  key={`seg-${star.id}`}
                  x1={prev.hx}
                  y1={prev.hy}
                  x2={star.hx}
                  y2={star.hy}
                  stroke="var(--color-periwinkle)"
                  strokeWidth="0.65"
                  strokeLinecap="round"
                  className="transition-opacity duration-700"
                  style={{ opacity: bothActive ? 0.85 : 0 }}
                />
              );
            })}

            {/* Closing loop segment from Star 13 -> Star 0 when all 14 stars are active */}
            <line
              x1={CONSTELLATION_STARS[totalCount - 1].hx}
              y1={CONSTELLATION_STARS[totalCount - 1].hy}
              x2={CONSTELLATION_STARS[0].hx}
              y2={CONSTELLATION_STARS[0].hy}
              stroke="var(--color-periwinkle)"
              strokeWidth="0.65"
              strokeLinecap="round"
              className="transition-opacity duration-700"
              style={{ opacity: isComplete ? 0.85 : 0 }}
            />

            {/* 14 Tappable Star Nodes gliding from (sx, sy) to (hx, hy) */}
            {CONSTELLATION_STARS.map((star, idx) => {
              const isAct = Boolean(activeMap[idx]);
              const cx = isAct ? star.hx : star.sx;
              const cy = isAct ? star.hy : star.sy;

              return (
                <g
                  key={star.id}
                  transform={`translate(${cx} ${cy})`}
                  style={{
                    transition:
                      "transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    activateStarByIndex(idx);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Star ${idx + 1}: ${star.label}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      activateStarByIndex(idx);
                    }
                  }}
                >
                  {/* Generous invisible hit target */}
                  <circle cx="0" cy="0" r="6.5" fill="transparent" />

                  {/* Warm Butter-Gold Halo when lit */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isAct ? "5.2" : "2.8"}
                    fill="url(#constellation-star-halo)"
                    style={{
                      opacity: isAct ? 0.95 : 0.4,
                      transition: "all 0.5s ease",
                    }}
                  />

                  {/* 8-Point Konpeitō Star Silhouette */}
                  <polygon
                    points="0,-2.6 0.7,-1.1 2.2,-1.6 1.2,-0.3 2.6,0.5 1.0,1.0 1.5,2.4 0.1,1.4 -0.9,2.5 -0.8,1.0 -2.4,1.0 -1.2,-0.1 -2.2,-1.5 -0.7,-1.0"
                    fill={
                      isAct
                        ? "var(--color-butter-star)"
                        : "var(--color-paper-cream)"
                    }
                    style={{
                      transform: isAct ? "scale(1.15)" : "scale(0.85)",
                      transition: "transform 0.5s ease",
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Accessible Controls inside the Constellation Window */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
          {!isComplete && (
            <>
              <button
                type="button"
                onClick={handleLightNextStar}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold paper-pill-surface transition-transform active:scale-95 min-h-[40px]"
                style={{ color: "var(--color-ink-plum)" }}
              >
                <Sparkles
                  className="w-3.5 h-3.5"
                  style={{ color: "var(--color-royal-violet)" }}
                  aria-hidden="true"
                />
                <span>Light the next star</span>
              </button>

              <button
                type="button"
                onClick={handleGatherAll}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold paper-pill-surface transition-transform active:scale-95 min-h-[40px]"
                style={{ color: "var(--color-royal-violet)" }}
              >
                <span>Gather all stars</span>
              </button>
            </>
          )}

          {activeCount > 0 && (
            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold paper-pill-surface transition-transform active:scale-95 min-h-[40px]"
              style={{ color: "var(--color-ink-muted)" }}
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Replay</span>
            </button>
          )}
        </div>

        {/* Cream Paper Caption Card Inside Bottom of Constellation Frame */}
        <div className="mt-4 rounded-[22px] p-5 paper-card-cream text-center">
          {isComplete ? (
            <>
              <p
                className="font-handwritten text-base mb-1"
                style={{ color: "var(--color-royal-violet)" }}
              >
                Constellation complete · All 14 stars gathered
              </p>
              <h3
                className="font-display font-bold text-lg sm:text-xl mb-1.5"
                style={{ color: "var(--color-ink-plum)" }}
              >
                Even from afar, you are my favorite part of the sky.
              </h3>
              <p
                className="font-sans text-[16px] leading-[1.7]"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Every single point of light finds its way back to the same
                quiet promise made for you, Fatima.
              </p>
            </>
          ) : (
            <>
              <p
                className="font-handwritten text-sm mb-0.5"
                style={{ color: "var(--color-royal-violet)" }}
              >
                Star {selectedStar.id} of {totalCount}
              </p>
              <h3
                className="font-display font-bold text-base sm:text-lg mb-1"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {selectedStar.label}
              </h3>
              <p
                className="font-sans text-sm sm:text-[15px] leading-relaxed"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {selectedStar.description}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
