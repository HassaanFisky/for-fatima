"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL_CONTENT } from "../../config/personal";
import { OpeningCloudScene } from "../illustrations/Characters";
import { KonpeitoStar } from "../illustrations/Konpeito";
import { IconChevronRight, IconSparkle } from "../icons/StoryIcons";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp } from "../../lib/motion";

export function OpeningSection({ onContinue }: { onContinue: () => void }) {
  const { world, playNote } = useLivingWorld();
  const [lanternBoosted, setLanternBoosted] = useState(false);

  const handleBrightStarTap = () => {
    setLanternBoosted((prev) => !prev);
    playNote(3);
  };

  const handleEnterStory = () => {
    playNote(0);
    onContinue();
  };

  return (
    <section
      id="threshold"
      aria-label="Scene 1: The Threshold"
      className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 z-10"
    >
      <div className="w-full max-w-[34rem] mx-auto flex flex-col items-center">
        {/* Subtle Interactive Konpeitō Star Above Foreground Stage */}
        <div className="mb-1 flex flex-col items-center">
          <button
            type="button"
            onClick={handleBrightStarTap}
            className="group relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium paper-pill-surface transition-transform active:scale-95 focus:outline-none"
            style={{ color: "var(--color-ink-plum)" }}
            aria-label="Tap to warm Mochi's star lantern"
          >
            <IconSparkle
              size={13}
              className="text-[var(--color-royal-violet)]"
            />
            <span>
              {lanternBoosted
                ? "Lantern glowing warmly"
                : "Tap to warm the lantern"}
            </span>
          </button>
        </div>

        {/* Pose #1 — Mochi & Yume on Foreground Hill Stage */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[290px] my-1 flex flex-col items-center"
        >
          <OpeningCloudScene
            phase={world.phase}
            lanternBoost={lanternBoosted}
            onInteraction={handleBrightStarTap}
          />
        </motion.div>

        {/* Cream Paper Threshold Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <div className="relative rounded-[24px] px-6 py-6 sm:px-9 sm:py-8 text-center paper-card-cream">
            <div className="inline-flex items-center gap-1.5 mb-2">
              <KonpeitoStar size="sm" />
              <p
                className="font-handwritten text-lg sm:text-xl"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {PERSONAL_CONTENT.dedication}
              </p>
              <KonpeitoStar size="sm" />
            </div>

            <h1
              className="font-display font-bold tracking-tight mb-2.5"
              style={{
                fontSize: "clamp(1.85rem, 4.8vw, 2.75rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                color: "var(--color-ink-plum)",
              }}
            >
              {PERSONAL_CONTENT.heroTitle}
            </h1>

            <p
              className="font-sans text-[15px] sm:text-[16.5px] leading-[1.7] max-w-[44ch] mx-auto mb-6"
              style={{ color: "var(--color-ink-muted)" }}
            >
              {PERSONAL_CONTENT.heroSubtitle}
            </p>

            {/* Single Elegant Action to Enter / Continue */}
            <button
              type="button"
              onClick={handleEnterStory}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all active:scale-95 min-h-[46px] shadow-sm"
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
