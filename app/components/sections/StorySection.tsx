"use client";

import React from "react";
import { motion } from "framer-motion";
import { SMALL_LETTER } from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { StoryPetalScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { fadeUp } from "../../lib/motion";

export function StorySection() {
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
              A Small Letter
            </span>
          </div>

          <StoryPetalScene />
        </div>

        {/* Single Concise Cream-Paper Letter */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <PaperCard variant="cream" washi="top-left" stamp>
            <p
              className="font-handwritten text-lg sm:text-xl mb-1.5"
              style={{ color: "var(--color-royal-violet)" }}
            >
              {SMALL_LETTER.salutation}
            </p>

            <h2
              id="letter-heading"
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1.3rem, 3.2vw, 1.75rem)",
                lineHeight: 1.25,
                color: "var(--color-ink-plum)",
              }}
            >
              {SMALL_LETTER.title}
            </h2>

            <div className="space-y-3.5">
              {SMALL_LETTER.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="font-sans text-[15.5px] sm:text-[16.5px] leading-[1.72]"
                  style={{ color: "var(--color-ink-plum)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              className="mt-5 pt-3.5 border-t flex items-center justify-between"
              style={{ borderColor: "var(--color-paper-border)" }}
            >
              <span
                className="text-xs font-medium"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {SMALL_LETTER.footerNote}
              </span>
              <span
                className="font-handwritten text-xl"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {SMALL_LETTER.signature}
              </span>
            </div>
          </PaperCard>
        </motion.div>
      </div>
    </section>
  );
}
