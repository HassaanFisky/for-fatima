"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CALM_BREATH_GUIDE } from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { FlowersOfferScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { bloomSpring, fadeUp } from "../../lib/motion";

interface FlowerBudItem {
  id: string;
  name: string;
  meaning: string;
  note: string;
  petalFill: string;
  centerFill: string;
}

const GARDEN_FLOWERS: FlowerBudItem[] = [
  {
    id: "sakura-blossom",
    name: "First Sakura",
    meaning: "Gentleness without hurry",
    note: "May your mornings start softly and never ask you to rush.",
    petalFill: "var(--color-sakura-pink)",
    centerFill: "var(--color-butter-star)",
  },
  {
    id: "periwinkle-bell",
    name: "Twilight Bellflower",
    meaning: "Constancy in quiet hours",
    note: "Even when the day feels long, there is a peaceful corner waiting for you.",
    petalFill: "var(--color-periwinkle)",
    centerFill: "var(--color-paper-cream)",
  },
  {
    id: "peach-camellia",
    name: "Warm Camellia",
    meaning: "Admiration and steady warmth",
    note: "Your kindness notices the smallest details and makes ordinary rooms feel safe.",
    petalFill: "var(--color-peach-glow)",
    centerFill: "var(--color-butter-star)",
  },
  {
    id: "butter-cosmos",
    name: "Starlight Cosmos",
    meaning: "Peaceful harmony",
    note: "A bright little wish that your heart feels light and rested tonight.",
    petalFill: "var(--color-butter-star)",
    centerFill: "var(--color-sakura-deep)",
  },
  {
    id: "rose-plum",
    name: "Evening Plum Blossom",
    meaning: "Patience through every season",
    note: "Real care grows quietly, without pressure, in its own honest time.",
    petalFill: "var(--color-sakura-deep)",
    centerFill: "var(--color-paper-cream)",
  },
  {
    id: "lavender-sweetpea",
    name: "Lavender Sweet Pea",
    meaning: "Thankfulness for your presence",
    note: "Simply knowing you exist in this world makes the sky feel kinder.",
    petalFill: "var(--color-periwinkle)",
    centerFill: "var(--color-butter-star)",
  },
];

export function FlowersSection() {
  const { playNote, playChord } = useLivingWorld();
  const [bloomedIds, setBloomedIds] = useState<Record<string, boolean>>({
    "sakura-blossom": true,
  });
  const [activeFlower, setActiveFlower] = useState<FlowerBudItem>(
    GARDEN_FLOWERS[0]
  );

  const toggleBloom = (flower: FlowerBudItem, index: number) => {
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
      id="flowers"
      aria-labelledby="flowers-heading"
      className="relative z-10 max-w-[38rem] mx-auto px-4 sm:px-6 py-12"
    >
      {/* Header + Pose #5 — Mochi offering a single stem flower */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-2">
          <KonpeitoCandy flavor="peach" />
          <span style={{ color: "var(--color-royal-violet)" }}>
            Chapter three · Flowers
          </span>
        </div>

        <FlowersOfferScene />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <PaperCard variant="cream" washi="top-left">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h2
                id="flowers-heading"
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(1.375rem, 3.5vw, 1.875rem)",
                  lineHeight: 1.25,
                  color: "var(--color-ink-plum)",
                }}
              >
                A small night garden
              </h2>
              <p
                className="font-sans text-sm"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Tap any bud in any order to let it bloom ({bloomCount} of{" "}
                {GARDEN_FLOWERS.length} open)
              </p>
            </div>

            {bloomCount < GARDEN_FLOWERS.length && (
              <button
                type="button"
                onClick={bloomAll}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold paper-pill-surface transition-transform active:scale-95 min-h-[38px]"
                style={{ color: "var(--color-royal-violet)" }}
              >
                Bloom all flowers
              </button>
            )}
          </div>

          {/* 6 Round-Petal Kawaii Flower Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 my-4">
            {GARDEN_FLOWERS.map((flower, idx) => {
              const isBloomed = Boolean(bloomedIds[flower.id]);
              const isSelected = activeFlower.id === flower.id;

              return (
                <button
                  key={flower.id}
                  type="button"
                  onClick={() => toggleBloom(flower, idx)}
                  aria-pressed={isBloomed}
                  className="rounded-[20px] p-3.5 flex flex-col items-center text-center transition-all active:scale-95 paper-card-lavender"
                  style={{
                    outline: isSelected
                      ? "2px solid var(--color-royal-violet)"
                      : "none",
                  }}
                >
                  <div className="relative w-20 h-20 flex items-center justify-center mb-2">
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
                      {/* Stem & two round leaves */}
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
                          {/* 5 Round Kawaii Petals */}
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
                          {/* Warm center disc */}
                          <circle
                            cx="50"
                            cy="44"
                            r="10"
                            fill={flower.centerFill}
                          />
                          {/* 3-point sparkle above bloomed flower */}
                          <circle
                            cx="22"
                            cy="16"
                            r="2.2"
                            fill="var(--color-butter-star)"
                          />
                          <circle
                            cx="78"
                            cy="18"
                            r="2"
                            fill="var(--color-butter-star)"
                          />
                          <circle
                            cx="50"
                            cy="6"
                            r="2.4"
                            fill="var(--color-butter-star)"
                          />
                        </g>
                      ) : (
                        /* Unopened round kawaii bud */
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
                    className="font-display font-bold text-sm leading-tight"
                    style={{ color: "var(--color-ink-plum)" }}
                  >
                    {flower.name}
                  </span>
                  <span
                    className="text-[11px] mt-0.5"
                    style={{ color: "var(--color-ink-muted)" }}
                  >
                    {isBloomed ? "In bloom" : "Tap to bloom"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Flower Note */}
          <div
            className="mt-4 pt-4 border-t"
            style={{ borderColor: "var(--color-paper-border)" }}
          >
            <p
              className="font-handwritten text-base mb-1"
              style={{ color: "var(--color-royal-violet)" }}
            >
              {activeFlower.name} · {activeFlower.meaning}
            </p>
            <p
              className="font-sans text-[17px] leading-[1.75]"
              style={{ color: "var(--color-ink-plum)" }}
            >
              {activeFlower.note}
            </p>
          </div>
        </PaperCard>
      </motion.div>

      {/* Gentle Breathing Rhythm Card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6"
      >
        <PaperCard variant="lavender" stamp>
          <p
            className="font-handwritten text-base mb-1"
            style={{ color: "var(--color-royal-violet)" }}
          >
            {CALM_BREATH_GUIDE.subtitle}
          </p>
          <h3
            className="font-display font-bold text-lg mb-2"
            style={{ color: "var(--color-ink-plum)" }}
          >
            {CALM_BREATH_GUIDE.title}
          </h3>
          <p
            className="font-sans text-[16px] leading-[1.7] mb-4"
            style={{ color: "var(--color-ink-plum)" }}
          >
            {CALM_BREATH_GUIDE.instruction}
          </p>
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="rounded-2xl p-3 paper-card-cream">
              <p
                className="font-display font-bold text-lg"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {CALM_BREATH_GUIDE.inhaleSeconds}s
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Inhale softly
              </p>
            </div>
            <div className="rounded-2xl p-3 paper-card-cream">
              <p
                className="font-display font-bold text-lg"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {CALM_BREATH_GUIDE.holdSeconds}s
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Rest gently
              </p>
            </div>
            <div className="rounded-2xl p-3 paper-card-cream">
              <p
                className="font-display font-bold text-lg"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {CALM_BREATH_GUIDE.exhaleSeconds}s
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Exhale slowly
              </p>
            </div>
          </div>
        </PaperCard>
      </motion.div>
    </section>
  );
}
