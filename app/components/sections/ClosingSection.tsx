"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { OCTOBER_GIFT, CLOSING_PROMISE } from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { GiftBoxScene, ClosingBackScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { IconSparkle, IconRestart } from "../icons/StoryIcons";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp } from "../../lib/motion";

export function ClosingSection({
  onReturnToStart,
}: {
  onReturnToStart: () => void;
}) {
  const { playChord, playNote } = useLivingWorld();
  const [unwrapped, setUnwrapped] = useState(false);

  const handleRibbonTap = () => {
    setUnwrapped((prev) => !prev);
    playChord();
  };

  const handleRestart = () => {
    playNote(0);
    onReturnToStart();
  };

  return (
    <section
      id="closing"
      aria-labelledby="closing-heading"
      className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 z-10"
    >
      <div className="w-full max-w-[36rem] mx-auto">
        {/* Scene Header + Gift Box Illustration */}
        <div className="flex flex-col items-center text-center mb-3">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-1">
            <KonpeitoCandy flavor="sakura" size={15} />
            <span style={{ color: "var(--color-royal-violet)" }}>
              Gift & Closing
            </span>
          </div>

          <GiftBoxScene
            unwrapped={unwrapped}
            onToggleUnwrap={handleRibbonTap}
          />

          <button
            type="button"
            onClick={handleRibbonTap}
            className="mt-1 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface transition-transform active:scale-95 min-h-[34px]"
            style={{ color: "var(--color-royal-violet)" }}
          >
            <IconSparkle size={14} />
            <span>
              {unwrapped
                ? "Ribbon untied · Keepsake open"
                : "Tap the ribbon for a gentle sparkle"}
            </span>
          </button>
        </div>

        {/* Combined Restrained Gift Reveal & Closing Message on Cream Paper */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <PaperCard variant="cream" washi="top-left" stamp>
            {/* Part 1: 15 October Keepsake Note */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {OCTOBER_GIFT.subtitle}
              </span>
              <span
                className="font-handwritten text-xs sm:text-sm px-2.5 py-0.5 rounded-full paper-card-lavender"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {OCTOBER_GIFT.dateBadge}
              </span>
            </div>

            <h2
              id="closing-heading"
              className="font-display font-bold mb-2"
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.55rem)",
                lineHeight: 1.25,
                color: "var(--color-ink-plum)",
              }}
            >
              {OCTOBER_GIFT.title}
            </h2>

            <div className="space-y-2.5 mb-4">
              {OCTOBER_GIFT.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-sans text-[15px] sm:text-[16px] leading-[1.68]"
                  style={{ color: "var(--color-ink-plum)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Part 2: Closing Promise & Signature */}
            <div
              className="pt-3.5 border-t"
              style={{ borderColor: "var(--color-paper-border)" }}
            >
              <p
                className="font-sans text-[15px] sm:text-[16px] leading-[1.68] mb-3.5"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {CLOSING_PROMISE.paragraphs[0]}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold paper-card-lavender transition-transform active:scale-95 min-h-[38px]"
                    style={{ color: "var(--color-royal-violet)" }}
                  >
                    <IconRestart size={14} />
                    <span>Return to the beginning</span>
                  </button>
                </div>

                <div className="text-right">
                  <p
                    className="text-xs font-medium"
                    style={{ color: "var(--color-ink-muted)" }}
                  >
                    {CLOSING_PROMISE.signoff}
                  </p>
                  <p
                    className="font-handwritten text-2xl leading-tight"
                    style={{ color: "var(--color-royal-violet)" }}
                  >
                    {CLOSING_PROMISE.signature}
                  </p>
                </div>
              </div>
            </div>
          </PaperCard>
        </motion.div>

        {/* Subtle Closing Vignette Pose #8 Below Card on Tall Screens */}
        <div className="hidden sm:flex justify-center mt-2 opacity-90">
          <ClosingBackScene />
        </div>
      </div>
    </section>
  );
}
