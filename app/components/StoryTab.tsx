"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ChevronRight, ChevronLeft, BookOpen, X } from "lucide-react";
import { POETIC_CARDS } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function StoryTab() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const nextCard = useCallback(() => {
    audioEngine.playHaptic(600);
    setCardIndex((prev) => (prev + 1) % POETIC_CARDS.length);
  }, []);

  const prevCard = useCallback(() => {
    audioEngine.playHaptic(520);
    setCardIndex((prev) => (prev - 1 + POETIC_CARDS.length) % POETIC_CARDS.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextCard();
      if (e.key === "ArrowLeft") prevCard();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard]);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ─── Apple Letter Envelope (Autonomy-First) ─── */}
      <section 
        aria-label="Welcome note" 
        className="ios-surface-elevated p-5 sm:p-6 text-center relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!envelopeOpen ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-3.5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17131b] border border-[var(--border-subtle)] text-[11px] text-[#b7aabf]">
                <span>Made specifically for Fatima</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl text-[#f0eaf0] font-normal tracking-tight">
                for fatima <span className="text-[#b995b8]">💜</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#b7aabf] leading-relaxed max-w-xs mx-auto font-light">
                I made you a little something...
                <br />
                <span className="italic text-[#f0eaf0]">
                  no pressure, just a little piece of my heart.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-2 max-w-xs mx-auto pt-1">
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playChimeChord();
                    setEnvelopeOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#211a26] border border-[var(--border-prominent)] text-xs font-medium text-[#f0eaf0] flex items-center justify-center gap-2 active:bg-[#362c3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] transition-colors touch-target"
                >
                  <Mail className="w-4 h-4 text-[#b995b8]" />
                  <span>Unseal the envelope</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEnvelopeOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-transparent border border-[var(--border-subtle)] text-xs text-[#b7aabf] hover:text-[#f0eaf0] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] transition-colors touch-target"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#82738a]" />
                  <span>Read note directly</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3.5 text-left"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
                <span className="font-serif italic text-base text-[#b995b8]">
                  hey fatima...
                </span>
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playHaptic(480);
                    setEnvelopeOpen(false);
                  }}
                  aria-label="Fold note closed"
                  className="w-8 h-8 rounded-full bg-white/5 text-[#b7aabf] hover:text-[#f0eaf0] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] touch-target"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5 font-serif text-xs sm:text-sm text-[#f0eaf0] leading-relaxed">
                <p>
                  I wanted to make something instead of simply sending another long message.
                </p>
                <p>
                  Something I could put real thought into, with quiet patience and no noise.
                </p>
                <p className="text-[#b7aabf]">
                  You don&apos;t have to respond to this. I just wanted to build a peaceful space, and I hope it gives you a small reason to smile.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playHaptic(480);
                    setEnvelopeOpen(false);
                  }}
                  className="text-[11px] text-[#82738a] hover:text-[#f0eaf0] underline underline-offset-4 touch-target inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8]"
                >
                  Fold note closed
                </button>
                <span className="text-xs font-serif italic text-[#b995b8]">
                  — Hassaan
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ─── Poetic Card Deck (Accessible & Non-Trapping) ─── */}
      <section aria-label="Poetic reflections deck" className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b995b8]">
            Card {cardIndex + 1} of {POETIC_CARDS.length}
          </span>
          <span className="text-[11px] text-[#82738a]">Use buttons or arrow keys</span>
        </div>

        <div
          role="region"
          aria-live="polite"
          aria-label={`Reflection card ${cardIndex + 1} of ${POETIC_CARDS.length}`}
          className="ios-surface-elevated p-5 sm:p-6 min-h-[260px] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#17131b] text-[#b7aabf] border border-[var(--border-subtle)]">
              {POETIC_CARDS[cardIndex].tag}
            </span>
            <span className="text-[11px] text-[#b995b8] font-medium">
              {POETIC_CARDS[cardIndex].badge}
            </span>
          </div>

          <div className="my-4 space-y-2">
            <p className="text-lg sm:text-xl font-serif font-semibold text-[#f0eaf0] leading-snug">
              &ldquo;{POETIC_CARDS[cardIndex].line}&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[#b7aabf] leading-relaxed font-light">
              {POETIC_CARDS[cardIndex].sub}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs font-medium text-[#b995b8]">
            <button
              type="button"
              onClick={prevCard}
              aria-label="Previous card"
              className="flex items-center gap-1 hover:text-[#f0eaf0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] rounded px-1.5 transition-colors touch-target"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              type="button"
              onClick={nextCard}
              aria-label="Next card"
              className="flex items-center gap-1 hover:text-[#f0eaf0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] rounded px-1.5 transition-colors touch-target"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
