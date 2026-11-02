"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  KEEPSAKE_ITEMS,
  type KeepsakeItem,
} from "../../config/personal";
import { PaperCard, KeepsakeArtifactIcon } from "../illustrations/PaperCraft";
import { KeepsakesJarScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp } from "../../lib/motion";

export function KeepsakesSection() {
  const { playNote } = useLivingWorld();
  const [selectedArtifact, setSelectedArtifact] = useState<KeepsakeItem>(
    KEEPSAKE_ITEMS[0]
  );

  const handleSelectArtifact = (artifact: KeepsakeItem, index: number) => {
    playNote(index + 2);
    setSelectedArtifact(artifact);
  };

  return (
    <section
      id="keepsakes"
      aria-labelledby="keepsakes-heading"
      className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 z-10"
    >
      <div className="w-full max-w-[36rem] mx-auto">
        {/* Scene Header + Pose #4 — Mochi & Yume beside a glass jar of Konpeitō */}
        <div className="flex flex-col items-center text-center mb-3">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-1">
            <KonpeitoCandy flavor="butter" size={15} />
            <span style={{ color: "var(--color-royal-violet)" }}>
              Keepsake Shelf
            </span>
          </div>

          <KeepsakesJarScene />

          <h2
            id="keepsakes-heading"
            className="font-display font-bold mt-1"
            style={{
              fontSize: "clamp(1.25rem, 3.2vw, 1.65rem)",
              lineHeight: 1.25,
              color: "var(--color-paper-cream)",
            }}
          >
            Small objects kept on the shelf
          </h2>
        </div>

        {/* 4 Tactile Keepsakes on the Shelf — Responding with subtle movement, depth, and shadow (NO purple selection outlines) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3.5"
        >
          {KEEPSAKE_ITEMS.map((item: KeepsakeItem, idx: number) => {
            const isSelected = selectedArtifact.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectArtifact(item, idx)}
                aria-pressed={isSelected}
                className={`group text-center rounded-[20px] p-3.5 flex flex-col items-center justify-between min-h-[124px] transition-all duration-300 focus:outline-none ${
                  isSelected
                    ? "paper-card-cream -translate-y-1.5"
                    : "paper-card-lavender opacity-88 hover:opacity-100 hover:-translate-y-0.5"
                }`}
                style={{
                  boxShadow: isSelected
                    ? "0 18px 36px rgba(23, 18, 51, 0.34)"
                    : "0 8px 20px rgba(23, 18, 51, 0.18)",
                }}
              >
                <div
                  className={`transition-transform duration-300 ${
                    isSelected ? "scale-110" : "group-hover:scale-105"
                  }`}
                >
                  <KeepsakeArtifactIcon type={item.artifactType} />
                </div>
                <div className="mt-1.5">
                  <p
                    className="font-display font-bold text-xs sm:text-[13.5px] leading-snug"
                    style={{
                      color: isSelected
                        ? "var(--color-royal-violet)"
                        : "var(--color-ink-plum)",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-[11px] leading-tight mt-0.5"
                    style={{ color: "var(--color-ink-muted)" }}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Active Keepsake Paper Detail Sheet */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedArtifact.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <PaperCard variant="cream" washi="top-left" stamp>
              <div className="flex items-center gap-3 mb-2.5">
                <KeepsakeArtifactIcon type={selectedArtifact.artifactType} />
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--color-royal-violet)" }}
                  >
                    Keepsake {selectedArtifact.num} ·{" "}
                    {selectedArtifact.subtitle}
                  </p>
                  <h3
                    className="font-display font-bold text-lg sm:text-xl"
                    style={{ color: "var(--color-ink-plum)" }}
                  >
                    {selectedArtifact.title}
                  </h3>
                </div>
              </div>

              <p
                className="font-sans text-[15.5px] sm:text-[16.5px] leading-[1.72]"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {selectedArtifact.reflection}
              </p>
            </PaperCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
