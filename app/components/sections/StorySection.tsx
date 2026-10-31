"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  DIRECT_OPENING_MESSAGE,
  POETIC_REFLECTIONS,
  PERSONAL_CONTENT,
} from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { StoryPetalScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { fadeUp } from "../../lib/motion";

export function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="relative z-10 max-w-[38rem] mx-auto px-4 sm:px-6 pt-16 pb-12"
    >
      {/* Section Header Pill */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-3">
          <KonpeitoCandy flavor="sakura" />
          <span style={{ color: "var(--color-royal-violet)" }}>
            Chapter one · Story
          </span>
        </div>

        {/* Pose #2 — Yume catching a falling sakura petal */}
        <StoryPetalScene />
      </div>

      {/* Card 1: Direct Opening Letter on Cream Paper with Washi Tape */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mb-8"
      >
        <PaperCard variant="cream" washi="top-left">
          <p
            className="font-handwritten text-lg sm:text-xl mb-2"
            style={{ color: "var(--color-royal-violet)" }}
          >
            {DIRECT_OPENING_MESSAGE.salutation}
          </p>

          <h2
            id="story-heading"
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(1.375rem, 3.5vw, 1.875rem)",
              lineHeight: 1.25,
              color: "var(--color-ink-plum)",
            }}
          >
            A quiet place built with care
          </h2>

          <div className="space-y-4">
            {DIRECT_OPENING_MESSAGE.paragraphs.map(
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

          <div
            className="mt-6 pt-4 border-t flex items-center justify-between"
            style={{ borderColor: "var(--color-paper-border)" }}
          >
            <span
              className="text-xs font-medium"
              style={{ color: "var(--color-ink-muted)" }}
            >
              Written for {PERSONAL_CONTENT.recipientName}
            </span>
            <span
              className="font-handwritten text-lg"
              style={{ color: "var(--color-royal-violet)" }}
            >
              {PERSONAL_CONTENT.creatorName}
            </span>
          </div>
        </PaperCard>
      </motion.div>

      {/* Poetic Reflections alternating Lavender and Cream Paper */}
      <div className="space-y-5">
        {POETIC_REFLECTIONS.map((item, index) => (
          <motion.div
            key={item.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <PaperCard
              variant={index % 2 === 0 ? "lavender" : "cream"}
              washi={index === 0 ? "top-right" : "none"}
              stamp={index % 2 === 0}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {item.kicker}
              </p>

              <h3
                className="font-display font-bold mb-2.5"
                style={{
                  fontSize: "clamp(1.15rem, 2.8vw, 1.45rem)",
                  lineHeight: 1.3,
                  color: "var(--color-ink-plum)",
                }}
              >
                {item.quote}
              </h3>

              <p
                className="font-sans text-[17px] leading-[1.75]"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {item.context}
              </p>
            </PaperCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
