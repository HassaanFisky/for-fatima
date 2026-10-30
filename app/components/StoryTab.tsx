"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { POETIC_REFLECTIONS } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function StoryTab() {
  const [reflectionIndex, setReflectionIndex] = useState(0);

  const nextReflection = () => {
    audioEngine.playHaptic(600);
    setReflectionIndex((prev) => (prev + 1) % POETIC_REFLECTIONS.length);
  };

  const prevReflection = () => {
    audioEngine.playHaptic(520);
    setReflectionIndex((prev) => (prev - 1 + POETIC_REFLECTIONS.length) % POETIC_REFLECTIONS.length);
  };

  const current = POETIC_REFLECTIONS[reflectionIndex];

  return (
    <div className="space-y-5 sm:space-y-6 animate-fadeIn">
      {/* ─── Hero Editorial Opening (Direct, Dignified, Sincere) ─── */}
      <section 
        aria-label="Welcome and opening letter"
        className="luxury-card-elevated p-5 sm:p-7 text-left relative overflow-hidden space-y-4"
      >
        {/* Subtle Amethyst Ambient Glow */}
        <div className="amethyst-glow -top-16 -right-16 w-48 h-48 rounded-full" />

        {/* Editorial Header */}
        <div className="space-y-1.5 relative z-10 border-b border-[var(--border-subtle)] pb-3.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#100b19] border border-[var(--border-subtle)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9878d1]" />
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#c6b4e5]">
              Personal Gift • October 2026
            </span>
          </div>

          <h1 className="editorial-title text-2xl sm:text-3xl text-[#f4eff8] font-normal tracking-tight">
            for fatima kamran.
          </h1>

          <p className="editorial-subhead text-xs sm:text-sm text-[#c6b4e5]">
            a quiet space crafted with patience, care, and no expectations.
          </p>
        </div>

        {/* The Direct Personal Letter */}
        <div className="space-y-3 font-serif text-xs sm:text-sm text-[#f4eff8] leading-relaxed relative z-10 break-words">
          <p>
            Hey Fatima,
          </p>
          <p className="text-[#b8adc6] font-light">
            I wanted to make something tangible instead of sending another long, fleeting screen message. Something I could pour real craftsmanship and quiet patience into, without any of the daily digital noise.
          </p>
          <p className="text-[#f4eff8] font-normal pl-2.5 border-l-2 border-[#9878d1]/40 italic">
            You don&apos;t have to respond to this. You don&apos;t have to carry any expectations. I simply wanted to build a peaceful sanctuary for you, and I hope it gives you a gentle, genuine reason to smile.
          </p>
        </div>

        {/* Signature */}
        <div className="pt-2 flex items-center justify-between border-t border-[var(--border-subtle)] text-xs relative z-10">
          <span className="text-[10px] text-[#857896] uppercase font-mono tracking-wider">
            With quiet respect
          </span>
          <span className="font-serif italic text-sm sm:text-base text-[#c6b4e5]">
            — Hassaan 💜
          </span>
        </div>
      </section>

      {/* ─── Editorial Poetic Reflections (Curated, Elegant, Unforced) ─── */}
      <section 
        aria-label="Poetic reflections"
        className="luxury-card p-5 sm:p-6 relative overflow-hidden space-y-3.5"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#9878d1]" />
            <span className="editorial-kicker text-[9px] text-[#c6b4e5]">
              {current.kicker}
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#857896]">
            {reflectionIndex + 1} / {POETIC_REFLECTIONS.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="my-2.5 space-y-2.5"
          >
            <blockquote className="font-serif text-base sm:text-lg font-normal text-[#f4eff8] leading-snug break-words">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <p className="text-xs text-[#b8adc6] leading-relaxed font-light break-words">
              {current.context}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Refined Navigation Controls */}
        <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border-subtle)]">
          <button
            type="button"
            onClick={prevReflection}
            aria-label="Previous reflection"
            className="flex items-center gap-1 text-xs text-[#b8adc6] hover:text-[#f4eff8] transition-colors py-1 px-2.5 rounded-lg hover:bg-white/5 touch-target"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-[#9878d1]" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={nextReflection}
            aria-label="Next reflection"
            className="flex items-center gap-1 text-xs text-[#c6b4e5] hover:text-[#f4eff8] transition-colors py-1 px-2.5 rounded-lg hover:bg-white/5 touch-target font-medium"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#9878d1]" />
          </button>
        </div>
      </section>
    </div>
  );
}
