"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { OCTOBER_GIFT } from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { GiftBoxScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp } from "../../lib/motion";

export function GiftSection() {
  const { playChord } = useLivingWorld();
  const [unwrapped, setUnwrapped] = useState(false);

  const handleRibbonTap = () => {
    setUnwrapped((prev) => !prev);
    playChord();
  };

  return (
    <section
      id="gift"
      aria-labelledby="gift-heading"
      className="relative z-10 max-w-[38rem] mx-auto px-4 sm:px-6 py-12"
    >
      {/* Header + Pose #7 — Mochi & Yume holding a ribbon-tied keepsake box */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-2">
          <KonpeitoCandy flavor="sakura" />
          <span style={{ color: "var(--color-royal-violet)" }}>
            Chapter five · Gift
          </span>
        </div>

        <GiftBoxScene unwrapped={unwrapped} onToggleUnwrap={handleRibbonTap} />

        <button
          type="button"
          onClick={handleRibbonTap}
          className="mt-1 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface transition-transform active:scale-95 min-h-[36px]"
          style={{ color: "var(--color-royal-violet)" }}
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>
            {unwrapped
              ? "Ribbon untied · Keepsake open"
              : "Tap the ribbon for a little sparkle"}
          </span>
        </button>
      </div>

      {/* The Gift Card is directly visible on Cream Paper without any forced click-wall */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <PaperCard variant="cream" washi="top-left" stamp>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-royal-violet)" }}
            >
              {OCTOBER_GIFT.subtitle}
            </span>
            <span
              className="font-handwritten text-sm px-2.5 py-0.5 rounded-full paper-card-lavender"
              style={{ color: "var(--color-royal-violet)" }}
            >
              {OCTOBER_GIFT.dateBadge}
            </span>
          </div>

          <h2
            id="gift-heading"
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(1.375rem, 3.5vw, 1.875rem)",
              lineHeight: 1.25,
              color: "var(--color-ink-plum)",
            }}
          >
            {OCTOBER_GIFT.title}
          </h2>

          <div className="space-y-4">
            {OCTOBER_GIFT.paragraphs.map((paragraph: string, index: number) => (
              <p
                key={index}
                className="font-sans text-[17px] leading-[1.75]"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </PaperCard>
      </motion.div>
    </section>
  );
}
