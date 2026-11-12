"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GARDEN_FLOWERS,
  type GardenFlowerSpec,
} from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { FlowersOfferScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { bloomSpring, fadeUp, getTitleCadenceVariants } from "../../lib/motion";

const titleCadence = getTitleCadenceVariants(4);

export function FlowersSection() {
  const { playNote, playChord } = useLivingWorld();
  const [bloomedIds, setBloomedIds] = useState<Record<string, boolean>>({
    "sakura-blossom": true,
  });
  const [activeFlower, setActiveFlower] = useState<GardenFlowerSpec>(
    GARDEN_FLOWERS[0]
  );

  const toggleBloom = (flower: GardenFlowerSpec, index: number) => {
    const willBloom = !bloomedIds[flower.id];
    const next = { ...bloomedIds, [flower.id]: true };
    setBloomedIds(next);
    setActiveFlower(flower);

    const bloomCount = Object.values(next).filter(Boolean).length;
    if (willBloom && bloomCount === GARDEN_FLOWERS.length) {
      playChord();
    } else {
      playNote(index + 1);
    }
  };

  const bloomAll = () => {
    const all: Record<string, boolean> = {};
    for (const f of GARDEN_FLOWERS) {
      all[f.id] = true;
    }
    setBloomedIds(all);
    playChord();
  };

  const bloomCount = Object.values(bloomedIds).filter(Boolean).length;

  return (
    <section
      id="garden"
      aria-labelledby="garden-heading"
      className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 z-10"
    >
      <div className="w-full max-w-[35rem] mx-auto">
        {/* Header + Pose #5 — Mochi offering a single stem flower */}
        <motion.div
          variants={titleCadence.container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center mb-3"
        >
          <motion.div
            variants={titleCadence.kicker}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-1"
          >
            <KonpeitoCandy flavor="peach" size={15} />
            <span style={{ color: "var(--color-royal-violet)" }}>
              The Garden
            </span>
          </motion.div>

          <FlowersOfferScene />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <PaperCard variant="cream" washi="top-left">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <motion.div
                variants={titleCadence.container}
                initial="hidden"
                animate="visible"
              >
                <motion.h2
                  id="garden-heading"
                  variants={titleCadence.heading}
                  className="font-display font-bold"
                  style={{
                    fontSize: "clamp(1.25rem, 3.2vw, 1.65rem)",
                    lineHeight: 1.25,
                    color: "var(--color-ink-plum)",
                  }}
                >
                  Three quiet evening blooms
                </motion.h2>
              </motion.div>

              {bloomCount < GARDEN_FLOWERS.length && (
                <button
                  type="button"
                  onClick={bloomAll}
                  className="rounded-full px-3.5 py-1.5 text-xs font-semibold paper-card-lavender transition-transform active:scale-95 min-h-[36px] cursor-pointer"
                  style={{ color: "var(--color-royal-violet)" }}
                >
                  Bloom all three
                </button>
              )}
            </div>

            {/* 3 Round-Petal Kawaii Flowers */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 my-3">
              {GARDEN_FLOWERS.map((flower, idx) => {
                const isBloomed = Boolean(bloomedIds[flower.id]);
                const isSelected = activeFlower.id === flower.id;

                return (
                  <button
                    key={flower.id}
                    type="button"
                    onClick={() => toggleBloom(flower, idx)}
                    aria-pressed={isBloomed}
                    className={`rounded-[20px] p-3 flex flex-col items-center text-center transition-all duration-300 cursor-pointer focus:outline-none ${
                      isSelected
                        ? "paper-card-lavender -translate-y-1"
                        : "paper-card-cream opacity-90 hover:opacity-100 hover:-translate-y-0.5"
                    }`}
                    style={{
                      boxShadow: isSelected
                        ? "0 14px 28px rgba(23, 18, 51, 0.22)"
                        : "0 4px 12px rgba(23, 18, 51, 0.1)",
                    }}
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-1.5">
                      <motion.svg
                        viewBox="0 0 100 100"
                        className="w-full h-full overflow-visible"
                        initial={false}
                        animate={
                          isBloomed
                            ? { scale: 1, rotate: 0 }
                            : { scale: 0.78, rotate: -8 }
                        }
                        transition={bloomSpring}
                      >
                        <path
                          d="M50 58 Q50 78 50 92"
                          stroke="var(--color-mint-leaf)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <ellipse
                          cx="41"
                          cy="76"
                          rx="8"
                          ry="4.5"
                          transform="rotate(-24 41 76)"
                          fill="var(--color-mint-leaf)"
                        />
                        <ellipse
                          cx="59"
                          cy="74"
                          rx="8"
                          ry="4.5"
                          transform="rotate(24 59 74)"
                          fill="var(--color-mint-leaf)"
                        />

                        {isBloomed ? (
                          <g>
                            {[0, 72, 144, 216, 288].map((deg) => (
                              <g
                                key={deg}
                                transform={`rotate(${deg} 50 44)`}
                              >
                                <circle
                                  cx="50"
                                  cy="26"
                                  r="13"
                                  fill={flower.petalFill}
                                />
                                <circle
                                  cx="50"
                                  cy="24"
                                  r="7"
                                  fill="var(--color-paper-cream)"
                                  opacity="0.35"
                                />
                              </g>
                            ))}
                            <circle
                              cx="50"
                              cy="44"
                              r="10"
                              fill={flower.centerFill}
                            />
                            {/* Crisp 4-point starlight sparkles around bloomed flower */}
                            <path
                              d="M22 12 L23.2 15.8 L27 17 L23.2 18.2 L22 22 L20.8 18.2 L17 17 L20.8 15.8 Z"
                              fill="var(--color-butter-star)"
                            />
                            <path
                              d="M78 14 L79 17.2 L82.2 18.2 L79 19.2 L78 22.4 L77 19.2 L73.8 18.2 L77 17.2 Z"
                              fill="var(--color-butter-star)"
                            />
                          </g>
                        ) : (
                          <g>
                            <ellipse
                              cx="50"
                              cy="46"
                              rx="12"
                              ry="15"
                              fill={flower.petalFill}
                            />
                            <path
                              d="M40 52 Q50 60 60 52"
                              stroke="var(--color-mint-leaf)"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              fill="none"
                            />
                          </g>
                        )}
                      </motion.svg>
                    </div>

                    <span
                      className="font-display font-bold text-xs sm:text-sm leading-tight"
                      style={{
                        color: isSelected
                          ? "var(--color-royal-violet)"
                          : "var(--color-ink-plum)",
                      }}
                    >
                      {flower.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Flower Note */}
            <div
              className="mt-3 pt-3.5 border-t"
              style={{ borderColor: "var(--color-paper-border)" }}
            >
              <p
                className="font-handwritten text-base mb-0.5"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {activeFlower.meaning}
              </p>
              <p
                className="font-sans text-[15.5px] sm:text-[16.5px] leading-[1.7]"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {activeFlower.note}
              </p>
            </div>
          </PaperCard>
        </motion.div>
      </div>
    </section>
  );
}
