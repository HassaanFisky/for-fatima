"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Activity, Sparkles, ChevronDown } from "lucide-react";
import { PULSE_TILES } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function SmileTab() {
  const [flowerStage, setFlowerStage] = useState(1);
  const [starIndex, setStarIndex] = useState(0);
  const [bpm, setBpm] = useState(78);
  const [heartPulsing, setHeartPulsing] = useState(false);
  const [activeTileId, setActiveTileId] = useState<number>(1);
  const [isMysteryOpen, setIsMysteryOpen] = useState(false);

  const starMoods = [
    { face: "✨", label: "Quietly shining", desc: "Always here in peace." },
    { face: "🌟", label: "Smiling gently", desc: "That smile looks good on the universe." },
    { face: "💫", label: "Little orbit", desc: "Orbiting quietly for Fatima." },
    { face: "🌙", label: "Keeping watch", desc: "Making sure you rest well." },
  ];

  const handleBloomTap = () => {
    const next = flowerStage < 5 ? flowerStage + 1 : 1;
    setFlowerStage(next);
    audioEngine.playPluck(480 + next * 60, 1.2);
  };

  const handleStarTap = () => {
    const next = (starIndex + 1) % starMoods.length;
    setStarIndex(next);
    audioEngine.playHaptic(680);
  };

  const handleHeartSensor = () => {
    audioEngine.playPluck(bpm > 95 ? 659.25 : 523.25, 0.45, 0.6);
    setHeartPulsing(true);
    setBpm((b) => (b < 118 ? b + 6 : 76));
    setTimeout(() => setHeartPulsing(false), 240);
  };

  const toggleMystery = () => {
    audioEngine.playHaptic(isMysteryOpen ? 460 : 640);
    setIsMysteryOpen(!isMysteryOpen);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-[#b995b8] bg-[#211a26] px-3 py-1 rounded-full border border-[var(--border-subtle)]">
          Chapter 03 • Playful Experiences
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f0eaf0]">
          A Small Reason to Smile
        </h2>
        <p className="text-xs text-[#b7aabf]">
          Interactive corners built to give you a quiet boost anytime you visit.
        </p>
      </div>

      {/* ─── Row 1: Flower & Star ─── */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Blooming Flower */}
        <div className="ios-surface p-3.5 sm:p-4 text-center flex flex-col justify-between items-center space-y-2">
          <span className="text-[10px] font-medium text-[#b995b8] uppercase">
            Bloom ({flowerStage}/5)
          </span>

          <button
            type="button"
            onClick={handleBloomTap}
            aria-label="Tap to cycle blooming flower"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#17131b] border border-[var(--border-subtle)] flex items-center justify-center active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] transition-transform touch-target"
          >
            <motion.span
              key={flowerStage}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              className="text-3xl select-none"
              aria-hidden="true"
            >
              {flowerStage === 1 && "🌱"}
              {flowerStage === 2 && "🌿"}
              {flowerStage === 3 && "🌷"}
              {flowerStage === 4 && "🌸"}
              {flowerStage === 5 && "💐"}
            </motion.span>
          </button>

          <div>
            <h4 className="font-serif text-xs font-semibold text-[#f0eaf0]">
              {flowerStage < 5 ? "Tap to bloom" : "Full Bloom 💜"}
            </h4>
            <p className="text-[10px] text-[#82738a]">
              {flowerStage < 5 ? "Patience & care" : "A gentle bouquet"}
            </p>
          </div>
        </div>

        {/* Mood Star */}
        <div className="ios-surface p-3.5 sm:p-4 text-center flex flex-col justify-between items-center space-y-2">
          <span className="text-[10px] font-medium text-[#b995b8] uppercase">
            Mood Star
          </span>

          <button
            type="button"
            onClick={handleStarTap}
            aria-label="Tap to cycle star mood"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#17131b] border border-[var(--border-subtle)] flex items-center justify-center active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] transition-transform touch-target"
          >
            <span className="text-3xl select-none" aria-hidden="true">
              {starMoods[starIndex].face}
            </span>
          </button>

          <div>
            <h4 className="font-serif text-xs font-semibold text-[#f0eaf0]">
              {starMoods[starIndex].label}
            </h4>
            <p className="text-[10px] text-[#82738a] truncate max-w-[120px]">
              {starMoods[starIndex].desc}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Row 2: Heart Vitals Sensor ─── */}
      <div className="ios-surface-elevated p-4 flex items-center justify-between">
        <div className="space-y-0.5 text-left">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-[#b995b8]">
            Vitals Check
          </span>
          <h3 className="text-lg font-bold text-[#f0eaf0] flex items-center gap-2">
            <span>{bpm} BPM</span>
            <Activity className="w-4 h-4 text-[#b995b8]" />
          </h3>
          <p className="text-[11px] text-[#b7aabf]">
            {bpm > 95
              ? "A gentle reminder to take a deep breath and relax."
              : "Tap heart sensor for a steady calming rhythm."}
          </p>
        </div>

        <button
          type="button"
          onClick={handleHeartSensor}
          aria-label="Tap heart sensor for calming rhythm"
          className={`w-12 h-12 rounded-xl bg-[#211a26] border border-[var(--border-prominent)] text-[#f0eaf0] flex items-center justify-center transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] touch-target ${
            heartPulsing ? "scale-110" : "scale-100"
          }`}
        >
          <Heart className="w-6 h-6 fill-current text-[#b995b8]" />
        </button>
      </div>

      {/* ─── Row 3: Detail Tiles ─── */}
      <div className="grid grid-cols-2 gap-2" role="region" aria-label="Personal reflections tiles">
        {PULSE_TILES.map((tile) => {
          const isSelected = activeTileId === tile.id;
          return (
            <button
              type="button"
              key={tile.id}
              onClick={() => {
                audioEngine.playHaptic(540);
                setActiveTileId(tile.id);
              }}
              aria-pressed={isSelected}
              className={`p-3 rounded-xl text-left border transition-colors touch-target focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] ${
                isSelected
                  ? "bg-[#2b2230] text-[#f0eaf0] border-[var(--border-prominent)]"
                  : "bg-[#211a26] text-[#b7aabf] border-[var(--border-subtle)] hover:text-[#f0eaf0]"
              }`}
            >
              <span className="text-xl" aria-hidden="true">{tile.emoji}</span>
              <p className="text-xs font-semibold mt-1 leading-snug">{tile.title}</p>
              <p className="text-[10px] text-[#82738a] mt-0.5">
                {tile.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Tile Reveal Note */}
      {PULSE_TILES.map(
        (tile) =>
          tile.id === activeTileId && (
            <div
              key={tile.id}
              role="region"
              aria-live="polite"
              className="ios-surface p-3.5 text-left space-y-1"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#b995b8]">
                {tile.title}
              </p>
              <p className="text-xs text-[#f0eaf0] leading-relaxed font-light">
                {tile.reveal}
              </p>
            </div>
          )
      )}

      {/* ─── Row 4: Secret Hook (Autonomy-first, zero gating) ─── */}
      <div className="ios-surface-elevated p-5 text-left space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#17131b] border border-[var(--border-subtle)] text-[#b995b8] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b995b8]">
                A Quiet Inside Note
              </span>
              <h3 className="text-sm font-bold text-[#f0eaf0]">
                Woh Ek Baat...
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleMystery}
            aria-expanded={isMysteryOpen}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#211a26] border border-[var(--border-subtle)] text-[#b7aabf] hover:text-[#f0eaf0] flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] touch-target"
          >
            <span>{isMysteryOpen ? "Hide" : "Read note"}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMysteryOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {isMysteryOpen && (
          <div className="ios-surface p-3.5 text-left space-y-2 border border-[var(--border-prominent)] mt-2">
            <p className="text-xs font-serif italic text-[#f0eaf0] leading-relaxed">
              Bracelet wali baat aur pending birthday wish screen par nahi—jab bhi kabhi munasib waqt hua, tab wazeh hogi.
            </p>
            <p className="text-xs text-[#b995b8] font-medium">
              Koi shart ya dabao nahi hai. Hamesha izzat aur sukoon pehle. 💜
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
