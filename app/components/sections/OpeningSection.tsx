"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PERSONAL_CONTENT } from "../../config/personal";
import { OpeningCloudScene } from "../illustrations/Characters";
import { KonpeitoStar } from "../illustrations/Konpeito";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp, floatSoftTransition } from "../../lib/motion";

export function OpeningSection() {
  const { world, reducedMotion, playNote } = useLivingWorld();
  const [lanternBoosted, setLanternBoosted] = useState(false);

  const handleBrightStarTap = () => {
    setLanternBoosted((prev) => !prev);
    playNote(3);
  };

  const scrollToStory = () => {
    playNote(0);
    const el = document.getElementById("story");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="opening"
      aria-label="Opening title and night sky greeting"
      className="relative min-h-[100svh] flex flex-col items-center justify-between px-4 sm:px-6 pt-24 pb-12 z-10"
    >
      {/* Top Zone: Moon Halo & 3 Large Konpeitō Stars (Tap brightest star to warm Mochi's lantern) */}
      <div className="relative w-full max-w-2xl flex items-center justify-between pt-2 sm:pt-4 px-2">
        <div className="opacity-90">
          <KonpeitoStar size="md" glow />
        </div>

        <button
          type="button"
          onClick={handleBrightStarTap}
          className="group relative flex flex-col items-center focus:outline-none transition-transform active:scale-95"
          aria-label="Tap the brightest star to brighten Mochi's star lantern"
        >
          <KonpeitoStar size="lg" glow />
          <span
            className="mt-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full paper-pill-surface opacity-90 group-hover:opacity-100 transition-opacity"
            style={{ color: "var(--color-ink-plum)" }}
          >
            {lanternBoosted
              ? "Lantern glowing warmly"
              : "Tap the brightest star"}
          </span>
        </button>

        <div className="opacity-90">
          <KonpeitoStar size="md" glow />
        </div>
      </div>

      {/* Middle Zone: Pose #1 — Mochi & Yume sitting on a lavender cloud cushion */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md my-2 flex flex-col items-center"
      >
        <OpeningCloudScene
          phase={world.phase}
          lanternBoost={lanternBoosted}
          onInteraction={handleBrightStarTap}
        />
      </motion.div>

      {/* Lower-Middle Zone: Cream Paper Title Card (Every word lives on Paper) */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[38rem] mx-auto"
      >
        <div className="relative rounded-[24px] px-6 py-7 sm:px-10 sm:py-9 text-center paper-card-cream">
          <p
            className="font-handwritten text-xl sm:text-2xl mb-1"
            style={{ color: "var(--color-royal-violet)" }}
          >
            {PERSONAL_CONTENT.recipientShort}
          </p>

          <h1
            className="font-display font-bold tracking-tight mb-3"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 3.25rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--color-ink-plum)",
            }}
          >
            {PERSONAL_CONTENT.heroTitle}
          </h1>

          <p
            className="font-sans text-base sm:text-[17px] leading-[1.75] max-w-[54ch] mx-auto"
            style={{ color: "var(--color-ink-muted)" }}
          >
            {PERSONAL_CONTENT.heroSubtitle}
          </p>
        </div>
      </motion.div>

      {/* Bottom Zone: Bobbing Konpeitō Star Scroll Hint */}
      <div className="mt-6 flex flex-col items-center">
        <motion.button
          type="button"
          onClick={scrollToStory}
          animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
          transition={reducedMotion ? undefined : floatSoftTransition}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold paper-pill-surface transition-transform active:scale-95 min-h-[44px]"
          style={{ color: "var(--color-ink-plum)" }}
          aria-label="Open the letter and scroll to Story"
        >
          <KonpeitoStar size="sm" />
          <span>Read your letter</span>
          <ChevronDown
            className="w-3.5 h-3.5"
            style={{ color: "var(--color-royal-violet)" }}
            aria-hidden="true"
          />
        </motion.button>
      </div>
    </section>
  );
}
