"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SINCERE_APOLOGY,
  CORE_PILLARS,
  EDITORIAL_NOTES,
} from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { NotesLanternScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { fadeUp } from "../../lib/motion";

export function NotesSection() {
  return (
    <section
      id="notes"
      aria-labelledby="notes-heading"
      className="relative z-10 max-w-[38rem] mx-auto px-4 sm:px-6 py-12"
    >
      {/* Header & Pose #3 — Mochi holding a warm paper lantern */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-2">
          <KonpeitoCandy flavor="periwinkle" />
          <span style={{ color: "var(--color-royal-violet)" }}>
            Honest words · Notes
          </span>
        </div>

        <NotesLanternScene />
      </div>

      {/* Sincere Apology Letter Card on Cream Paper */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mb-8"
      >
        <PaperCard variant="cream" washi="top-left" stamp>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-1"
            style={{ color: "var(--color-royal-violet)" }}
          >
            {SINCERE_APOLOGY.subtitle}
          </p>

          <h2
            id="notes-heading"
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(1.375rem, 3.5vw, 1.875rem)",
              lineHeight: 1.25,
              color: "var(--color-ink-plum)",
            }}
          >
            {SINCERE_APOLOGY.title}
          </h2>

          <div className="space-y-4">
            {SINCERE_APOLOGY.paragraphs.map(
              (paragraph: string, index: number) => (
                <p
                  key={index}
                  className="font-sans text-[17px] leading-[1.75]"
                  style={{ color: "var(--color-ink-plum)" }}
                >
                  {paragraph}
                </p>
              )
            )}
          </div>
        </PaperCard>
      </motion.div>

      {/* Three Core Growth Commitments */}
      <div className="space-y-5 mb-8">
        {CORE_PILLARS.map((pillar, idx) => (
          <motion.div
            key={pillar.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <PaperCard
              variant={idx % 2 === 0 ? "lavender" : "cream"}
              stamp
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-royal-violet)" }}
                >
                  Promise {pillar.number}
                </span>
                <span
                  className="font-handwritten text-sm"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  {pillar.mantra}
                </span>
              </div>

              <h3
                className="font-display font-bold mb-2"
                style={{
                  fontSize: "clamp(1.125rem, 2.5vw, 1.35rem)",
                  lineHeight: 1.3,
                  color: "var(--color-ink-plum)",
                }}
              >
                {pillar.title}
              </h3>

              <p
                className="font-sans text-[17px] leading-[1.75]"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {pillar.detail}
              </p>
            </PaperCard>
          </motion.div>
        ))}
      </div>

      {/* Three Editorial Letter Notes */}
      <div className="space-y-5">
        {EDITORIAL_NOTES.map((note, idx) => (
          <motion.div
            key={note.number}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <PaperCard
              variant={idx % 2 === 0 ? "cream" : "lavender"}
              washi={idx === 0 ? "top-right" : "none"}
              stamp
            >
              <p
                className="font-handwritten text-base mb-1"
                style={{ color: "var(--color-royal-violet)" }}
              >
                Note {note.number}
              </p>

              <h3
                className="font-display font-bold mb-2.5"
                style={{
                  fontSize: "clamp(1.125rem, 2.5vw, 1.35rem)",
                  lineHeight: 1.3,
                  color: "var(--color-ink-plum)",
                }}
              >
                {note.headline}
              </h3>

              <p
                className="font-sans text-[17px] leading-[1.75]"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {note.content}
              </p>
            </PaperCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
