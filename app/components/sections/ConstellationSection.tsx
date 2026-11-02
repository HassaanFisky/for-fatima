"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  CONSTELLATION_STARS,
  type ConstellationStarSpec,
} from "../../config/personal";
import { StarsMoonScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { IconSparkle, IconRestart } from "../icons/StoryIcons";
import { useLivingWorld } from "../world/LivingWorldProvider";

/**
 * Scene 7 — The Constellation
 * Restored 14-star parametric heart constellation (`CONSTELLATION_STARS`).
 * - 14 scattered stars (`sx`, `sy`) glide smoothly (`1.1s cubic-bezier(.2,.8,.2,1)`)
 *   to their parametric heart coordinates (`hx`, `hy`) when tapped or dragged across.
 */
export function ConstellationSection({ isActive }: { isActive: boolean }) {
  const { setConstellationFocused, playNote, playChord } = useLivingWorld();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [activeMap, setActiveMap] = useState<Record<number, boolean>>({});
  const [selectedStar, setSelectedStar] = useState<ConstellationStarSpec>(
    CONSTELLATION_STARS[0]
  );

  useEffect(() => {
    setConstellationFocused(isActive);
    return () => {
      if (isActive) {
        setConstellationFocused(false);
      }
    };
  }, [isActive, setConstellationFocused]);

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
      id="constellation"
      aria-labelledby="stars-heading"
      className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 z-10"
    >
      <div className="w-full max-w-[36rem] mx-auto">
        {/* Scene Header */}
        <div className="flex flex-col items-center text-center mb-2.5">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-1.5">
            <KonpeitoCandy flavor="butter" size={15} />
            <span style={{ color: "var(--color-royal-violet)" }}>
              The Constellation
            </span>
          </div>

          <h2
            id="stars-heading"
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.25rem, 3.2vw, 1.6rem)",
              lineHeight: 1.2,
              color: "var(--color-paper-cream)",
            }}
          >
            Trace the stars to gather our sky
          </h2>
        </div>

        {/* Contained Night-Sky Window */}
        <div className="relative rounded-[26px] overflow-hidden p-3.5 sm:p-5 constellation-night-window shadow-lg">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full paper-pill-surface"
              style={{ color: "var(--color-ink-plum)" }}
            >
              {isComplete
                ? "All 14 stars gathered"
                : `${activeCount} / ${totalCount} stars lit`}
            </span>

            <StarsMoonScene />
          </div>

          {/* Interactive SVG Star Canvas (0..100 Coordinate Space) */}
          <div
            data-no-swipe="true"
            className="relative w-full aspect-[4/3] max-h-[290px] sm:max-h-[320px] mx-auto select-none touch-none"
          >
            <svg
              ref={svgRef}
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
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
                    stopOpacity="0.24"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-periwinkle)"
                    stopOpacity="0.2"
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

              {/* 1px Lavender Mist Lines between adjacent active stars */}
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
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    className="transition-opacity duration-700"
                    style={{ opacity: bothActive ? 0.88 : 0 }}
                  />
                );
              })}

              {/* Closing loop segment from Star 13 -> Star 0 */}
              <line
                x1={CONSTELLATION_STARS[totalCount - 1].hx}
                y1={CONSTELLATION_STARS[totalCount - 1].hy}
                x2={CONSTELLATION_STARS[0].hx}
                y2={CONSTELLATION_STARS[0].hy}
                stroke="var(--color-periwinkle)"
                strokeWidth="0.7"
                strokeLinecap="round"
                className="transition-opacity duration-700"
                style={{ opacity: isComplete ? 0.88 : 0 }}
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
                    className="focus:outline-none select-none"
                    style={{
                      transition:
                        "transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1)",
                      outline: "none",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      activateStarByIndex(idx);
                    }}
                  >
                    <circle cx="0" cy="0" r="6.5" fill="transparent" />
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
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            {!isComplete && (
              <>
                <button
                  type="button"
                  onClick={handleLightNextStar}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold paper-pill-surface transition-transform active:scale-95 min-h-[38px]"
                  style={{ color: "var(--color-ink-plum)" }}
                >
                  <IconSparkle
                    size={14}
                    className="text-[var(--color-royal-violet)]"
                  />
                  <span>Light next star</span>
                </button>

                <button
                  type="button"
                  onClick={handleGatherAll}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold paper-pill-surface transition-transform active:scale-95 min-h-[38px]"
                  style={{ color: "var(--color-royal-violet)" }}
                >
                  <span>Gather all 14</span>
                </button>
              </>
            )}

            {activeCount > 0 && (
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold paper-pill-surface transition-transform active:scale-95 min-h-[38px]"
                style={{ color: "var(--color-ink-muted)" }}
              >
                <IconRestart size={14} />
                <span>Replay</span>
              </button>
            )}
          </div>

          {/* Cream Paper Caption Card Inside Bottom of Constellation Frame */}
          <div className="mt-3 rounded-[20px] px-4 py-3.5 paper-card-cream text-center">
            {isComplete ? (
              <>
                <p
                  className="font-handwritten text-sm mb-0.5"
                  style={{ color: "var(--color-royal-violet)" }}
                >
                  Constellation complete · All 14 stars gathered
                </p>
                <h3
                  className="font-display font-bold text-base sm:text-lg mb-0.5"
                  style={{ color: "var(--color-ink-plum)" }}
                >
                  Even from afar, you are my favorite part of the sky.
                </h3>
                <p
                  className="font-sans text-xs sm:text-sm leading-relaxed"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  Every single point of light finds its way back to the same
                  quiet promise made for you, Fatima.
                </p>
              </>
            ) : (
              <>
                <p
                  className="font-handwritten text-xs sm:text-sm mb-0.5"
                  style={{ color: "var(--color-royal-violet)" }}
                >
                  Star {selectedStar.id} of {totalCount} · {selectedStar.label}
                </p>
                <p
                  className="font-sans text-xs sm:text-sm leading-relaxed"
                  style={{ color: "var(--color-ink-plum)" }}
                >
                  {selectedStar.description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
