"use client";

import React from "react";
import { motion } from "framer-motion";
import { CLOSING_PROMISE } from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { ClosingBackScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { fadeUp } from "../../lib/motion";

export function ClosingSection() {
  return (
    <footer
      id="closing"
      aria-labelledby="closing-heading"
      className="relative z-10 max-w-[38rem] mx-auto px-4 sm:px-6 pt-12 pb-36"
    >
      {/* Pose #8 — Mochi & Yume seen from behind, looking up at the night sky */}
      <div className="flex flex-col items-center text-center mb-4">
        <ClosingBackScene />
      </div>

      {/* Final Closing Letter on Cream Paper */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <PaperCard variant="cream" washi="top-left">
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-1"
            style={{ color: "var(--color-royal-violet)" }}
          >
            {CLOSING_PROMISE.subtitle}
          </p>

          <h2
            id="closing-heading"
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(1.375rem, 3.5vw, 1.875rem)",
              lineHeight: 1.25,
              color: "var(--color-ink-plum)",
            }}
          >
            {CLOSING_PROMISE.title}
          </h2>

          <div className="space-y-4">
            {CLOSING_PROMISE.paragraphs.map(
              (paragraph: string, idx: number) => (
                <p
                  key={idx}
                  className="font-sans text-[17px] leading-[1.75]"
                  style={{ color: "var(--color-ink-plum)" }}
                >
                  {paragraph}
                </p>
              )
            )}
          </div>

          {/* 3 Scattered Konpeitō Candies, 1 Tiny Sakura Heart, and Handwritten Sign-off */}
          <div
            className="mt-8 pt-5 border-t flex flex-wrap items-center justify-between gap-4"
            style={{ borderColor: "var(--color-paper-border)" }}
          >
            <div className="flex items-center gap-2.5" aria-hidden="true">
              <KonpeitoCandy flavor="sakura" />
              <KonpeitoCandy flavor="butter" />
              <KonpeitoCandy flavor="periwinkle" />
              {/* Tiny Sakura Heart SVG */}
              <svg viewBox="0 0 20 20" className="w-4 h-4">
                <path
                  d="M10 17.2 C10 17.2 3 12.4 3 7.2 C3 4.8 4.9 3 7.2 3 C8.6 3 9.5 3.7 10 4.6 C10.5 3.7 11.4 3 12.8 3 C15.1 3 17 4.8 17 7.2 C17 12.4 10 17.2 10 17.2 Z"
                  fill="var(--color-sakura-deep)"
                />
              </svg>
            </div>

            <div className="text-right">
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {CLOSING_PROMISE.signoff}
              </p>
              <p
                className="font-handwritten text-2xl mt-0.5"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {CLOSING_PROMISE.signature}
              </p>
            </div>
          </div>
        </PaperCard>
      </motion.div>
    </footer>
  );
}
