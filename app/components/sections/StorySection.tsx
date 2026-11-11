"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SHIKWA_MOMENT } from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { StoryPetalScene } from "../illustrations/Characters";
import { KonpeitoCandy, KonpeitoStar } from "../illustrations/Konpeito";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp } from "../../lib/motion";

export function StorySection() {
  const { playNote, reducedMotion } = useLivingWorld();
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
        <div className="flex flex-col items-center text-center mb-3">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-1.5">
            <KonpeitoCandy flavor="sakura" size={15} />
            <span style={{ color: "var(--color-royal-violet)" }}>
              {SHIKWA_MOMENT.kicker}
            </span>
          </div>

          <StoryPetalScene />
        </div>

        {/* Cream-Paper Call-and-Response Card */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <PaperCard variant="cream" washi="top-left" stamp>
            <p
              className="font-handwritten text-base sm:text-lg mb-1"
              style={{ color: "var(--color-royal-violet)" }}
            >
              {SHIKWA_MOMENT.kicker}
            </p>

            <h2
              id="letter-heading"
              className="font-display font-bold mb-2.5"
              style={{
                fontSize: "clamp(1.25rem, 3vw, 1.65rem)",
                lineHeight: 1.25,
                color: "var(--color-ink-plum)",
              }}
            >
              {SHIKWA_MOMENT.title}
            </h2>

            <p
              className="font-sans text-[14.5px] sm:text-[15.5px] leading-[1.68] mb-4"
              style={{ color: "var(--color-ink-muted)" }}
            >
              {SHIKWA_MOMENT.intro}
            </p>

            {/* Two Interactive Call-and-Response Cards */}
            <div className="space-y-3">
              {SHIKWA_MOMENT.exchanges.map((item, idx) => {
                const isRevealed = Boolean(revealedIds[item.id]);
                const panelId = `shikwa-response-${item.id}`;

                return (
                  <div
                    key={item.id}
                    className="rounded-[18px] border transition-colors"
                    style={{
                      background: isRevealed
                        ? "rgba(244, 238, 255, 0.72)"
                        : "rgba(255, 252, 247, 0.78)",
                      borderColor: isRevealed
                        ? "rgba(109, 74, 255, 0.32)"
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
                      className="w-full text-left px-4 py-3 sm:px-4.5 sm:py-3.5 rounded-[18px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4AFF]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span
                            className="block text-[11px] font-semibold uppercase tracking-wider mb-1"
                            style={{ color: "var(--color-royal-violet)" }}
                          >
                            0{idx + 1} · {item.stepLabel}
                          </span>
                          <p
                            className="font-sans text-xs sm:text-[13.5px] leading-relaxed"
                            style={{ color: "var(--color-ink-plum)" }}
                          >
                            {item.callContext}
                          </p>
                        </div>

                        <span
                          className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold border transition-colors"
                          style={{
                            background: isRevealed
                              ? "rgba(109, 74, 255, 0.12)"
                              : "rgba(255, 255, 255, 0.85)",
                            borderColor: "rgba(109, 74, 255, 0.24)",
                            color: "var(--color-royal-violet)",
                          }}
                        >
                          <KonpeitoStar size="sm" />
                          <span>
                            {isRevealed ? "Revealed" : item.revealPrompt}
                          </span>
                        </span>
                      </div>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-label={item.stepLabel}
                      hidden={!isRevealed}
                      className="px-4 pb-3.5 sm:px-4.5"
                    >
                      {isRevealed && (
                        <motion.div
                          initial={
                            reducedMotion ? false : { opacity: 0, y: 4 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: reducedMotion ? 0 : 0.22,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="pt-2.5 border-t"
                          style={{
                            borderColor: "rgba(109, 74, 255, 0.16)",
                          }}
                        >
                          <span
                            className="block text-[11px] font-medium mb-0.5"
                            style={{ color: "var(--color-ink-muted)" }}
                          >
                            Hassaan&apos;s spoken response
                          </span>
                          <p
                            className="font-display font-bold text-base sm:text-lg"
                            style={{ color: "var(--color-ink-plum)" }}
                          >
                            &ldquo;{item.spokenResponse}&rdquo;
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-4 pt-3 border-t flex items-center justify-between"
              style={{ borderColor: "var(--color-paper-border)" }}
            >
              <span
                className="text-xs font-medium"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {SHIKWA_MOMENT.footerNote}
              </span>
              <span
                className="font-handwritten text-xl"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {SHIKWA_MOMENT.signature}
              </span>
            </div>
          </PaperCard>
        </motion.div>
      </div>
    </section>
  );
}
