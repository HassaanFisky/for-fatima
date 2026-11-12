"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NOTICED_OBSERVATIONS,
  type NoticedObservation,
} from "../../config/personal";
import { PaperCard } from "../illustrations/PaperCraft";
import { NotesLanternScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { NoticedObjectIllustration } from "../icons/StoryIcons";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp, getTitleCadenceVariants } from "../../lib/motion";

const titleCadence = getTitleCadenceVariants(2);

export function NotesSection() {
  const { playNote } = useLivingWorld();
  const [activeItem, setActiveItem] = useState<NoticedObservation>(
    NOTICED_OBSERVATIONS[0]
  );

  const handleSelect = (item: NoticedObservation, index: number) => {
    playNote(index + 1);
    setActiveItem(item);
  };

  return (
    <section
      id="noticed"
      aria-labelledby="noticed-heading"
      className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 z-10"
    >
      <div className="w-full max-w-[36rem] mx-auto">
        {/* Scene Header & Pose #3 — Mochi holding a warm interactive paper lantern */}
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
            <KonpeitoCandy flavor="periwinkle" size={15} />
            <span style={{ color: "var(--color-royal-violet)" }}>
              Little Details
            </span>
          </motion.div>

          <NotesLanternScene />

          <motion.h2
            id="noticed-heading"
            variants={titleCadence.heading}
            className="font-display font-bold mt-1"
            style={{
              fontSize: "clamp(1.25rem, 3.2vw, 1.65rem)",
              lineHeight: 1.25,
              color: "var(--color-paper-cream)",
            }}
          >
            Small details remembered quietly
          </motion.h2>
        </motion.div>

        {/* Tactile Illustrated Object Selector Tray */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="rounded-[24px] p-2.5 sm:p-3 paper-card-lavender mb-3.5"
        >
          <div
            role="tablist"
            aria-label="Observed details"
            className="grid grid-cols-4 gap-2"
          >
            {NOTICED_OBSERVATIONS.map((item, idx) => {
              const isSelected = activeItem.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item, idx)}
                  className={`group rounded-[18px] px-2 py-2.5 flex flex-col items-center text-center transition-all duration-300 cursor-pointer focus:outline-none ${
                    isSelected
                      ? "paper-card-cream -translate-y-1"
                      : "opacity-85 hover:opacity-100 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-1">
                    <NoticedObjectIllustration type={item.id} />
                  </div>
                  <span
                    className="font-display font-bold text-[11px] sm:text-xs leading-tight line-clamp-1"
                    style={{
                      color: isSelected
                        ? "var(--color-royal-violet)"
                        : "var(--color-ink-plum)",
                    }}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Illuminated Specimen Reading Sheet */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26 }}
          >
            <PaperCard variant="cream" washi="top-left" stamp>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 mb-3">
                <div className="w-16 h-16 rounded-2xl paper-card-lavender flex items-center justify-center shrink-0">
                  <NoticedObjectIllustration type={activeItem.id} />
                </div>
                <div>
                  <h3
                    className="font-display font-bold text-lg sm:text-xl"
                    style={{ color: "var(--color-ink-plum)" }}
                  >
                    {activeItem.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: "var(--color-royal-violet)" }}
                  >
                    {activeItem.subtitle}
                  </p>
                </div>
              </div>

              <p
                className="font-sans text-[15.5px] sm:text-[16.5px] leading-[1.72]"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {activeItem.note}
              </p>
            </PaperCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
