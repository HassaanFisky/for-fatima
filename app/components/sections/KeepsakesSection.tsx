"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  KEEPSAKE_ITEMS,
  COMFORT_NOTES,
  type KeepsakeItem,
} from "../../config/personal";
import { PaperCard, KeepsakeArtifactIcon } from "../illustrations/PaperCraft";
import { KeepsakesJarScene } from "../illustrations/Characters";
import { KonpeitoCandy } from "../illustrations/Konpeito";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp } from "../../lib/motion";

export function KeepsakesSection() {
  const { playNote } = useLivingWorld();
  const [selectedArtifact, setSelectedArtifact] = useState<KeepsakeItem | null>(
    KEEPSAKE_ITEMS[0]
  );

  const handleSelectArtifact = (artifact: KeepsakeItem, index: number) => {
    playNote(index);
    setSelectedArtifact(artifact);
  };

  return (
    <section
      id="keepsakes"
      aria-labelledby="keepsakes-heading"
      className="relative z-10 max-w-[38rem] mx-auto px-4 sm:px-6 py-12"
    >
      {/* Section Header + Pose #4 — Mochi & Yume beside a glass jar of Konpeitō */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-2">
          <KonpeitoCandy flavor="butter" />
          <span style={{ color: "var(--color-royal-violet)" }}>
            Chapter two · Keepsakes
          </span>
        </div>

        <KeepsakesJarScene />

        <div className="mt-2 rounded-[22px] px-6 py-4 paper-card-cream w-full">
          <h2
            id="keepsakes-heading"
            className="font-display font-bold mb-1"
            style={{
              fontSize: "clamp(1.375rem, 3.5vw, 1.875rem)",
              lineHeight: 1.25,
              color: "var(--color-ink-plum)",
            }}
          >
            Small objects kept on the shelf
          </h2>
          <p
            className="font-sans text-sm sm:text-base"
            style={{ color: "var(--color-ink-muted)" }}
          >
            Tap any keepsake on the paper shelf to read the memory inside it.
          </p>
        </div>
      </div>

      {/* 2-Column (Mobile) / 3-Column (Desktop) Keepsake Shelf Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
        {KEEPSAKE_ITEMS.map((item: KeepsakeItem, idx: number) => {
          const isSelected = selectedArtifact?.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectArtifact(item, idx)}
              aria-pressed={isSelected}
              className={`text-left rounded-[22px] p-4 transition-all active:scale-95 flex flex-col items-center text-center min-h-[148px] justify-between ${
                isSelected ? "paper-card-lavender" : "paper-card-cream"
              }`}
              style={{
                outline: isSelected
                  ? "2px solid var(--color-royal-violet)"
                  : "none",
              }}
            >
              <KeepsakeArtifactIcon type={item.artifactType} />
              <div>
                <p
                  className="font-display font-bold text-sm sm:text-[15px] leading-snug mb-0.5"
                  style={{ color: "var(--color-ink-plum)" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-xs leading-tight"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  {item.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Keepsake Paper Detail Sheet */}
      <AnimatePresence mode="wait">
        {selectedArtifact && (
          <motion.div
            key={selectedArtifact.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="mb-10"
          >
            <PaperCard variant="lavender" washi="top-left">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
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

                <button
                  type="button"
                  onClick={() => setSelectedArtifact(null)}
                  aria-label="Close keepsake memory card"
                  className="w-11 h-11 rounded-full flex items-center justify-center paper-pill-surface shrink-0"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <p
                className="font-sans text-[17px] leading-[1.75]"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {selectedArtifact.reflection}
              </p>
            </PaperCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Four Observant Comfort Notes */}
      <div className="space-y-4">
        {COMFORT_NOTES.map((card, idx) => (
          <motion.div
            key={card.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <PaperCard
              variant={idx % 2 === 0 ? "cream" : "lavender"}
              stamp
            >
              <p
                className="font-handwritten text-sm mb-1"
                style={{ color: "var(--color-royal-violet)" }}
              >
                {card.tag} · {card.label}
              </p>
              <h3
                className="font-display font-bold text-lg mb-2"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {card.heading}
              </h3>
              <p
                className="font-sans text-[17px] leading-[1.75]"
                style={{ color: "var(--color-ink-plum)" }}
              >
                {card.body}
              </p>
            </PaperCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
