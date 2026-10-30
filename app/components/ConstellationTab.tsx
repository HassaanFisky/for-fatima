"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Moon } from "lucide-react";
import { audioEngine } from "../lib/sound";

interface StarPoint {
  id: number;
  x: number;
  y: number;
  label: string;
  freq: number;
}

const STARS: StarPoint[] = [
  { id: 1, x: 20, y: 35, label: "Patience", freq: 523.25 },
  { id: 2, x: 50, y: 20, label: "Grace", freq: 587.33 },
  { id: 3, x: 80, y: 35, label: "Warmth", freq: 659.25 },
  { id: 4, x: 35, y: 65, label: "Trust", freq: 698.46 },
  { id: 5, x: 65, y: 65, label: "Peace", freq: 783.99 },
];

export default function ConstellationTab() {
  const [activeStarId, setActiveStarId] = useState<number | null>(null);

  const handleStarTouch = (star: StarPoint) => {
    setActiveStarId(star.id);
    audioEngine.playPluck(star.freq, 2.0, 0.9);
    setTimeout(() => setActiveStarId(null), 800);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* ─── Chapter Header ─── */}
      <section aria-label="Closing note header" className="text-left space-y-1.5 px-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191124] border border-[var(--border-subtle)]">
          <Moon className="w-3 h-3 text-[#9878d1]" />
          <span className="editorial-kicker text-[10px] text-[#c6b4e5]">
            Final Chapter • With Peace
          </span>
        </div>
        <h2 className="editorial-title text-2xl sm:text-3xl text-[#f4eff8]">
          Under Midnight Skies
        </h2>
        <p className="editorial-body text-xs sm:text-sm text-[#b8adc6]">
          A closing letter written with patience, respect, and no expectations.
        </p>
      </section>

      {/* ─── Serene Interactive Starfield (Optional & Atmospheric, Not a Game) ─── */}
      <section 
        aria-label="Ambient starry sky"
        className="luxury-card p-5 relative overflow-hidden text-center"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#857896]">
            Karachi Starlight
          </span>
          <span className="text-[10px] text-[#9878d1] font-mono">
            Touch any star
          </span>
        </div>

        <div className="relative w-full h-[180px] rounded-2xl bg-[#100b19] border border-[var(--border-subtle)] overflow-hidden flex items-center justify-center">
          <div className="amethyst-glow inset-0 m-auto w-32 h-32 rounded-full opacity-30" />

          {STARS.map((star) => {
            const isLit = activeStarId === star.id;
            return (
              <motion.button
                type="button"
                key={star.id}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleStarTouch(star)}
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                aria-label={`Star of ${star.label}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group touch-target justify-center focus-visible:outline-none"
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isLit
                      ? "bg-[#c6b4e5] text-[#100b19] scale-125 shadow-[0_0_20px_#c6b4e5,0_0_35px_rgba(152,120,209,0.8)]"
                      : "bg-white/10 text-[#c6b4e5] hover:bg-white/20 active:scale-90"
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                </span>
                <span className="text-[9px] mt-1 text-[#857896] font-mono group-hover:text-[#c6b4e5] transition-colors">
                  {star.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ─── Final Letter with Dignity & Zero Pressure ─── */}
      <section 
        aria-label="Final closing letter"
        className="luxury-card-elevated p-6 sm:p-8 text-left space-y-4 relative overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#c6b4e5]">
            Closing Words
          </span>
          <span className="text-[10px] text-[#857896]">
            No pressure to reply
          </span>
        </div>

        <div className="space-y-3.5 font-serif text-sm sm:text-[15px] text-[#f4eff8] leading-relaxed">
          <p className="font-medium text-[#c6b4e5]">
            Fatima,
          </p>
          <p className="text-[#b8adc6] font-light">
            I don&apos;t know what the future holds, and I don&apos;t want to pretend that a website can fix everything.
          </p>
          <p className="text-[#b8adc6] font-light">
            I just wanted to do something different and put genuine effort into expressing what I couldn&apos;t always communicate properly.
          </p>
          <p className="text-[#f4eff8] font-normal pl-3 border-l-2 border-[#9878d1]/40">
            You matter as a person, regardless of what happens between us.
          </p>
          <p className="text-[#b8adc6] font-light">
            I genuinely hope life brings you peace, happiness, and the things you want for yourself.
          </p>
          <p className="text-[#f4eff8] font-light">
            Take your time, live your life, and look after yourself.
          </p>
          <p className="text-[11px] text-[#857896] italic pt-2 border-t border-[var(--border-subtle)] font-sans">
            No pressure to reply. Just something I made with care.
          </p>
          <p className="pt-2 font-serif italic text-base sm:text-lg text-[#c6b4e5]">
            — Hassaan 💜
          </p>
        </div>
      </section>
    </div>
  );
}
