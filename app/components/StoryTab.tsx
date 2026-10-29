"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { POETIC_CARDS } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function StoryTab() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const nextCard = () => {
    audioEngine.playHaptic(600);
    setCardIndex((prev) => (prev + 1) % POETIC_CARDS.length);
  };

  const prevCard = () => {
    audioEngine.playHaptic(520);
    setCardIndex((prev) => (prev - 1 + POETIC_CARDS.length) % POETIC_CARDS.length);
  };

  return (
    <div className="space-y-6">
      {/* ─── Apple Letter Envelope ─── */}
      <div className="apple-glass-card rounded-[32px] p-6 sm:p-7 text-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!envelopeOpen ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/20 text-xs text-purple-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Made specifically for Fatima</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#f5f3f9] font-normal tracking-tight">
                for fatima <span className="text-purple-400">💜</span>
              </h1>

              <p className="text-sm text-[#b8afc4] leading-relaxed max-w-sm mx-auto font-light">
                I made you a little something...
                <br />
                <span className="italic text-purple-300">
                  no pressure, just a little piece of my heart.
                </span>
              </p>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  audioEngine.playChimeChord();
                  setEnvelopeOpen(true);
                }}
                className="w-full max-w-xs mx-auto py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-900/60 via-purple-800/40 to-pink-900/40 border border-purple-400/30 shadow-lg flex items-center justify-center gap-3 text-sm font-medium text-purple-100 hover:border-purple-400/60 transition-all group"
              >
                <Mail className="w-5 h-5 text-purple-300 group-hover:rotate-6 transition-transform" />
                <span>Tap to unseal the envelope</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-serif italic text-lg text-purple-300">
                  hey fatima...
                </span>
                <span className="text-[11px] text-[#746788] uppercase tracking-widest font-mono">
                  Personal Note
                </span>
              </div>

              <div className="space-y-3 font-serif text-sm sm:text-base text-[#d8d0e5] leading-relaxed">
                <p>
                  I wanted to make something instead of simply sending another long message.
                </p>
                <p>
                  Something I could put real thought into, with quiet patience and no noise.
                </p>
                <p className="text-purple-200">
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
                  className="text-xs text-[#8e81a3] hover:text-white underline underline-offset-4"
                >
                  Fold note closed
                </button>
                <span className="text-xs font-serif italic text-purple-400">
                  — Hassaan
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Tactile Poetic Deck ─── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
            Card {cardIndex + 1} of {POETIC_CARDS.length}
          </span>
          <span className="text-xs text-[#746788]">Swipe or tap buttons</span>
        </div>

        <motion.div
          key={cardIndex}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -40) nextCard();
            else if (info.offset.x > 40) prevCard();
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`apple-glass-card rounded-[32px] p-7 min-h-[290px] flex flex-col justify-between relative bg-gradient-to-br ${POETIC_CARDS[cardIndex].bgGradient}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/20">
              {POETIC_CARDS[cardIndex].tag}
            </span>
            <span className="text-xs text-purple-300 font-medium">
              {POETIC_CARDS[cardIndex].badge}
            </span>
          </div>

          <div className="my-5 space-y-3">
            <p className="text-xl sm:text-2xl font-serif font-bold text-[#f5f3f9] leading-snug">
              &ldquo;{POETIC_CARDS[cardIndex].line}&rdquo;
            </p>
            <p className="text-sm text-[#b8afc4] leading-relaxed font-light">
              {POETIC_CARDS[cardIndex].sub}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-semibold text-purple-300">
            <button
              type="button"
              onClick={prevCard}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              type="button"
              onClick={nextCard}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
