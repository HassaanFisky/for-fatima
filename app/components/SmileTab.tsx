"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { COMFORT_NOTES } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function SmileTab() {
  const [selectedNoteId, setSelectedNoteId] = useState<number>(1);
  const [isBreathing, setIsBreathing] = useState(false);
  const [isHoldingHeart, setIsHoldingHeart] = useState(false);
  const heartbeatTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeNote = COMFORT_NOTES.find((n) => n.id === selectedNoteId) || COMFORT_NOTES[0];

  const handleSelectNote = (id: number) => {
    audioEngine.playHaptic(540);
    setSelectedNoteId(id);
  };

  const toggleBreath = () => {
    audioEngine.playHaptic(600);
    setIsBreathing(!isBreathing);
  };

  const startHeartbeat = () => {
    setIsHoldingHeart(true);
    audioEngine.triggerHeartbeatPulse();
    heartbeatTimer.current = setInterval(() => {
      audioEngine.triggerHeartbeatPulse();
    }, 720);
  };

  const stopHeartbeat = () => {
    setIsHoldingHeart(false);
    if (heartbeatTimer.current) {
      clearInterval(heartbeatTimer.current);
      heartbeatTimer.current = null;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* ─── Chapter Header ─── */}
      <section aria-label="Comforts header" className="text-left space-y-1.5 px-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191124] border border-[var(--border-subtle)]">
          <Heart className="w-3 h-3 text-[#9878d1]" />
          <span className="editorial-kicker text-[10px] text-[#c6b4e5]">
            Chapter 03 • Gentle Comforts
          </span>
        </div>
        <h2 className="editorial-title text-2xl sm:text-3xl text-[#f4eff8]">
          Reasons to Smile
        </h2>
        <p className="editorial-body text-xs sm:text-sm text-[#b8adc6]">
          Quiet observant details and small comforts, kept without pressure.
        </p>
      </section>

      {/* ─── Apple iOS 27 Haptic Pulse: "The Touch of Love" ─── */}
      <section 
        aria-label="Tactile heartbeat connection"
        className="luxury-card-elevated p-6 text-center space-y-3.5 relative overflow-hidden transition-all duration-500"
      >
        <span className="editorial-kicker text-[10px] text-[#c6b4e5]">
          Acoustic Tactile Pulse • Hold to Feel
        </span>

        <div className="py-2 flex flex-col items-center justify-center">
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            animate={
              isHoldingHeart
                ? {
                    scale: [1, 1.12, 1],
                    transition: { repeat: Infinity, duration: 0.72, ease: "easeInOut" },
                  }
                : { scale: 1 }
            }
            onMouseDown={startHeartbeat}
            onMouseUp={stopHeartbeat}
            onMouseLeave={stopHeartbeat}
            onTouchStart={startHeartbeat}
            onTouchEnd={stopHeartbeat}
            aria-label="Hold to feel the quiet heartbeat pulse"
            className={`w-24 h-24 rounded-full border flex flex-col items-center justify-center transition-colors duration-300 touch-target ${
              isHoldingHeart
                ? "bg-[#7050b8]/25 border-[#c6b4e5] shadow-[0_0_36px_rgba(152,120,209,0.45),inset_0_1px_2px_rgba(255,255,255,0.3)]"
                : "bg-[#100b19]/80 border-[var(--border-subtle)] hover:border-[var(--border-prominent)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
            }`}
          >
            <Heart
              className={`w-8 h-8 transition-transform duration-300 ${
                isHoldingHeart ? "scale-125 text-[#f4eff8] fill-current" : "text-[#9878d1]"
              }`}
            />
            <span className="text-[9px] font-mono uppercase tracking-wider text-[#857896] mt-1">
              {isHoldingHeart ? "Beating..." : "Hold me"}
            </span>
          </motion.button>
        </div>

        <p className="editorial-body text-xs text-[#b8adc6] max-w-xs mx-auto leading-relaxed">
          {isHoldingHeart
            ? "Ek khamosh dharkan jo hamesha tumhare sukoon ke sath thehri hui hai. 💜"
            : "Press and hold for a quiet sub-bass heartbeat pulse and haptic warmth."}
        </p>
      </section>

      {/* ─── Four Observant Tiles (Direct & Clean) ─── */}
      <section aria-label="Observant comfort notes" className="space-y-3">
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {COMFORT_NOTES.map((note) => {
            const isSelected = selectedNoteId === note.id;
            return (
              <button
                type="button"
                key={note.id}
                onClick={() => handleSelectNote(note.id)}
                aria-pressed={isSelected}
                className={`p-3.5 sm:p-4 rounded-2xl text-left transition-transform active:scale-95 duration-150 touch-target border backdrop-blur-xl ${
                  isSelected
                    ? "bg-[#241832]/85 border-[var(--border-prominent)] shadow-[0_4px_16px_rgba(112,80,184,0.3)]"
                    : "bg-[#191124]/60 border-[var(--border-subtle)] hover:border-[var(--border-prominent)]"
                }`}
              >
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#9878d1]">
                  {note.tag}
                </span>
                <p className="font-serif text-xs sm:text-sm text-[#f4eff8] mt-1 font-normal leading-snug">
                  {note.label}
                </p>
                <p className="text-[10px] text-[#857896] mt-0.5 truncate">
                  {note.heading}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Detail Content */}
        <div className="luxury-card p-4 sm:p-5 text-left space-y-2 border-[var(--border-prominent)]">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
            <span className="editorial-kicker text-[10px] text-[#c6b4e5]">
              {activeNote.heading}
            </span>
            <span className="text-[9px] font-mono text-[#857896]">
              Observed with care
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeNote.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 32,
              }}
              className="editorial-body text-xs sm:text-sm text-[#f4eff8] font-light leading-relaxed"
            >
              {activeNote.body}
            </motion.p>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── The Pending Gift Note (Direct & Respectful, Zero Gating) ─── */}
      <section 
        aria-label="Pending gift note"
        className="luxury-card-elevated p-5 sm:p-6 text-left space-y-3 relative overflow-hidden"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#100b19] border border-[var(--border-subtle)] text-[#9878d1] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="editorial-kicker text-[10px] text-[#c6b4e5]">
              A Quiet Inside Note
            </span>
            <h3 className="font-serif text-sm font-normal text-[#f4eff8]">
              The October Thought
            </h3>
          </div>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-[#b8adc6] font-light leading-relaxed border-t border-[var(--border-subtle)] pt-3">
          <p>
            Bracelet wali baat aur pending birthday wish kisi screen par show karne ke liye nahi hai.
          </p>
          <p className="text-[#f4eff8] font-normal italic">
            Koi shart, koi formality, ya koi dabao nahi hai. Jab bhi kabhi munasib waqt hua, yeh baat wahi poori hogi. Hamesha tumhara sukoon aur tumhari marzi pehle. 💜
          </p>
        </div>
      </section>

      {/* ─── Calming Breath Space (Genuine Utility for Busy Medical Routine) ─── */}
      <section 
        aria-label="Calming breath space"
        className="luxury-card p-5 text-center space-y-3 relative overflow-hidden"
      >
        <span className="editorial-kicker text-[10px] text-[#c6b4e5]">
          A Quiet Moment For You
        </span>

        <div className="py-2 flex flex-col items-center justify-center">
          <div 
            className={`w-20 h-20 rounded-full border border-[#9878d1]/30 flex items-center justify-center transition-all duration-1000 ${
              isBreathing ? "scale-125 bg-[#9878d1]/10 border-[#9878d1]" : "scale-100 bg-transparent"
            }`}
          >
            <span className="text-[11px] font-serif italic text-[#c6b4e5]">
              {isBreathing ? "Exhale..." : "Inhale..."}
            </span>
          </div>
        </div>

        <p className="editorial-body text-xs text-[#b8adc6] max-w-xs mx-auto">
          Jab bhi din bhari lage ya thakan ho, bas ek pal thehar jao aur lamba saans lo.
        </p>

        <button
          type="button"
          onClick={toggleBreath}
          className="text-xs py-1.5 px-4 rounded-full bg-[#100b19] border border-[var(--border-subtle)] text-[#c6b4e5] hover:text-[#f4eff8] transition-colors touch-target"
        >
          {isBreathing ? "Pause" : "Start calming rhythm"}
        </button>
      </section>
    </div>
  );
}
