"use client";

import React from "react";
import { motion } from "framer-motion";
import { PERSONAL_CONTENT } from "../../config/personal";
import { OpeningCloudScene } from "../illustrations/Characters";
import { KonpeitoStar } from "../illustrations/Konpeito";
import { IconChevronRight } from "../icons/StoryIcons";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp, getTitleCadenceVariants } from "../../lib/motion";

const titleCadence = getTitleCadenceVariants(0);

export function OpeningSection({ onContinue }: { onContinue: () => void }) {
  const { world, playNote, playStarBell } = useLivingWorld();

  const handleEnterStory = () => {
    playNote(0);
    onContinue();
  };

  return (
    <section
      id="threshold"
      aria-label="Scene 1: For Fatima"
      className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 z-10"
    >
      <div className="w-full max-w-[34rem] mx-auto flex flex-col items-center">
        {/* Pose #1 — Mochi & Yume sitting close together on Foreground Hill Stage with directly interactive lantern & candle */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[295px] my-1 flex flex-col items-center"
        >
          <OpeningCloudScene phase={world.phase} />
        </motion.div>

        {/* Cream Paper Threshold Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <div className="relative rounded-[24px] px-6 py-6 sm:px-9 sm:py-8 text-center paper-card-cream">
            <motion.div
              variants={titleCadence.container}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={titleCadence.kicker}
                className="inline-flex items-center gap-1.5 mb-2"
              >
                <KonpeitoStar
                  size="sm"
                  onClick={playStarBell}
                  ariaLabel="Ring left star chime"
                />
                <p
                  className="font-handwritten text-lg sm:text-xl"
                  style={{ color: "var(--color-royal-violet)" }}
                >
                  {PERSONAL_CONTENT.dedication}
                </p>
                <KonpeitoStar
                  size="sm"
                  onClick={playStarBell}
                  ariaLabel="Ring right star chime"
                />
              </motion.div>

              <motion.h1
                variants={titleCadence.heading}
                className="font-display font-bold tracking-tight mb-2.5"
                style={{
                  fontSize: "clamp(1.85rem, 4.8vw, 2.75rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  color: "var(--color-ink-plum)",
                }}
              >
                {PERSONAL_CONTENT.heroTitle}
              </motion.h1>

              <motion.p
                variants={titleCadence.subtitle}
                className="font-sans text-[15px] sm:text-[16.5px] leading-[1.7] max-w-[44ch] mx-auto mb-6"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {PERSONAL_CONTENT.heroSubtitle}
              </motion.p>
            </motion.div>

            {/* Single Action to Enter / Continue */}
            <button
              type="button"
              onClick={handleEnterStory}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all active:scale-95 min-h-[46px] shadow-sm cursor-pointer"
              style={{
                backgroundColor: "var(--color-royal-violet)",
                color: "var(--color-paper-cream)",
              }}
            >
              <span>{PERSONAL_CONTENT.continueLabel}</span>
              <IconChevronRight size={17} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
