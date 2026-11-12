"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { OCTOBER_GIFT, CLOSING_PROMISE } from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { GiftBoxScene, ClosingBackScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { IconRestart } from "../icons/StoryIcons";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp, getTitleCadenceVariants } from "../../lib/motion";

const titleCadence = getTitleCadenceVariants(7);

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
            <KonpeitoCandy flavor="sakura" size={15} />
            <span style={{ color: "var(--color-royal-violet)" }}>
              Closing
            </span>
          </motion.div>

          <GiftBoxScene
            unwrapped={unwrapped}
            onToggleUnwrap={handleRibbonTap}
          />
        </motion.div>

        {/* Combined Gift & Closing Message on Cream Paper */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <PaperCard variant="cream" washi="top-left" stamp>
            <motion.div
              variants={titleCadence.container}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                id="closing-heading"
                variants={titleCadence.heading}
                className="font-display font-bold mb-2.5"
                style={{
                  fontSize: "clamp(1.2rem, 3vw, 1.55rem)",
                  lineHeight: 1.25,
                  color: "var(--color-ink-plum)",
                }}
              >
                {OCTOBER_GIFT.title}
              </motion.h2>
            </motion.div>

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

            {/* Part 2: Closing Note, Single "15 October" Date Badge & Signature */}
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
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold paper-card-lavender transition-transform active:scale-95 min-h-[38px] cursor-pointer"
                    style={{ color: "var(--color-royal-violet)" }}
                  >
                    <IconRestart size={14} />
                    <span>Return to the beginning</span>
                  </button>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span
                    className="font-handwritten text-xs sm:text-sm px-2.5 py-0.5 rounded-full paper-card-lavender mb-1"
                    style={{ color: "var(--color-royal-violet)" }}
                  >
                    {OCTOBER_GIFT.dateBadge}
                  </span>
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

        {/* Closing Vignette Pose #8 Below Card */}
        <div className="flex justify-center mt-2 opacity-95">
          <ClosingBackScene />
        </div>
      </div>
    </section>
  );
}
