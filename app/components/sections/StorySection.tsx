"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL_MOMENT } from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { StoryPetalScene } from "../illustrations/Characters";
import { KonpeitoCandy, KonpeitoStar } from "../illustrations/Konpeito";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp, getTitleCadenceVariants } from "../../lib/motion";

const titleCadence = getTitleCadenceVariants(1);

export function StorySection() {
  const { playNote, playStarBell, reducedMotion } = useLivingWorld();
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const handleToggleExchange = (id: string, noteStep: number) => {
    setRevealedIds((prev) => {
      const nextState = !prev[id];
      if (nextState) {
        playNote(noteStep);
      }
      return { ...prev, [id]: nextState };
    });
  };

  return (
    <section
      id="letter"
      aria-labelledby="letter-heading"
      className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 z-10"
    >
      <div className="w-full max-w-[35rem] mx-auto">
        {/* Scene Header & Pose #2 — Yume catching a falling sakura petal */}
        <motion.div
          variants={titleCadence.container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center mb-3"
        >
          <motion.div
            variants={titleCadence.kicker}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-1.5"
          >
            <KonpeitoCandy flavor="sakura" size={15} />
            <span style={{ color: "var(--color-royal-violet)" }}>
              A Small Memory
            </span>
          </motion.div>

          <StoryPetalScene />
        </motion.div>

        {/* Cream-Paper Call-and-Response Card */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <PaperCard variant="cream" washi="top-left" stamp>
            <motion.div
              variants={titleCadence.container}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                id="letter-heading"
                variants={titleCadence.heading}
                className="font-display font-bold mb-4"
                style={{
                  fontSize: "clamp(1.25rem, 3vw, 1.6rem)",
                  lineHeight: 1.25,
                  color: "var(--color-ink-plum)",
                }}
              >
                {PERSONAL_MOMENT.title}
              </motion.h2>
            </motion.div>

            {/* Two Interactive Call-and-Response Cards */}
            <div className="space-y-3">
              {PERSONAL_MOMENT.exchanges.map((item) => {
                const isRevealed = Boolean(revealedIds[item.id]);
                const panelId = `moment-response-${item.id}`;

                return (
                  <div
                    key={item.id}
                    className="rounded-[18px] border transition-colors"
                    style={{
                      background: isRevealed
                        ? "rgba(244, 238, 255, 0.76)"
                        : "rgba(255, 252, 247, 0.84)",
                      borderColor: isRevealed
                        ? "rgba(94, 63, 184, 0.36)"
                        : "var(--color-paper-border)",
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={isRevealed}
                      aria-controls={panelId}
                      onClick={() =>
                        handleToggleExchange(item.id, item.noteStep)
                      }
                      className="w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 rounded-[18px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E3FB8]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p
                            className="font-display font-bold text-base sm:text-lg leading-snug"
                            style={{ color: "var(--color-ink-plum)" }}
                          >
                            &ldquo;{item.musicalThought}&rdquo;
                          </p>
                        </div>

                        <span
                          className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition-colors"
                          style={{
                            background: isRevealed
                              ? "rgba(94, 63, 184, 0.14)"
                              : "rgba(255, 255, 255, 0.9)",
                            borderColor: "rgba(94, 63, 184, 0.28)",
                            color: "var(--color-royal-violet)",
                          }}
                        >
                          <KonpeitoStar size="sm" />
                          <span>{isRevealed ? "Heard" : "Listen"}</span>
                        </span>
                      </div>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-label={item.musicalThought}
                      hidden={!isRevealed}
                      className="px-4 pb-3.5 sm:px-5"
                    >
                      {isRevealed && (
                        <motion.div
                          initial={
                            reducedMotion ? false : { opacity: 0, y: 4 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: reducedMotion ? 0 : 0.24,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="pt-2.5 border-t flex items-center justify-between gap-2"
                          style={{
                            borderColor: "rgba(94, 63, 184, 0.18)",
                          }}
                        >
                          <p
                            className="font-handwritten text-xl sm:text-2xl font-bold"
                            style={{ color: "var(--color-royal-violet)" }}
                          >
                            &ldquo;{item.spokenResponse}&rdquo;
                          </p>
                          <KonpeitoStar
                            size="sm"
                            onClick={playStarBell}
                            ariaLabel="Ring star chime"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-4 pt-3 border-t flex items-center justify-end"
              style={{ borderColor: "var(--color-paper-border)" }}
            >
              <span
                className="font-handwritten text-xl"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {PERSONAL_MOMENT.signature}
              </span>
            </div>
          </PaperCard>
        </motion.div>
      </div>
    </section>
  );
}
