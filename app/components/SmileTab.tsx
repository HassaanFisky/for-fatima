"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Activity, Lock, Unlock } from "lucide-react";
import { PULSE_TILES } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function SmileTab() {
  const [flowerStage, setFlowerStage] = useState(1);
  const [starIndex, setStarIndex] = useState(0);
  const [bpm, setBpm] = useState(78);
  const [heartPulsing, setHeartPulsing] = useState(false);
  const [activeTileId, setActiveTileId] = useState<number>(1);
  const [tapsLeft, setTapsLeft] = useState(5);
  const [isUnlocked, setIsUnlocked] = useState(false);

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

  const handleUnlockTap = () => {
    if (tapsLeft > 1) {
      audioEngine.playHaptic(440 + (5 - tapsLeft) * 70);
      setTapsLeft((t) => t - 1);
    } else {
      audioEngine.playChimeChord();
      setTapsLeft(0);
      setIsUnlocked(true);
    }
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
            aria-label="Tap to bloom flower"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#17131b] border border-[var(--border-subtle)] flex items-center justify-center active:scale-95 transition-transform touch-target"
          >
            <motion.span
              key={flowerStage}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              className="text-3xl select-none"
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
            aria-label="Tap to change star mood"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#17131b] border border-[var(--border-subtle)] flex items-center justify-center active:scale-95 transition-transform touch-target"
          >
            <span className="text-3xl select-none">
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
              ? "Jab tum samne aati ho toh aise hi barhti hai 😉"
              : "Heart sensor pe tap karke pulse check karo"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleHeartSensor}
          aria-label="Tap heart sensor"
          className={`w-12 h-12 rounded-xl bg-[#211a26] border border-[var(--border-prominent)] text-[#f0eaf0] flex items-center justify-center transition-transform touch-target ${
            heartPulsing ? "scale-110" : "scale-100"
          }`}
        >
          <Heart className="w-6 h-6 fill-current text-[#b995b8]" />
        </button>
      </div>

      {/* ─── Row 3: Detail Tiles ─── */}
      <div className="grid grid-cols-2 gap-2">
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
              className={`p-3 rounded-xl text-left border transition-colors touch-target ${
                isSelected
                  ? "bg-[#2b2230] text-[#f0eaf0] border-[var(--border-prominent)]"
                  : "bg-[#211a26] text-[#b7aabf] border-[var(--border-subtle)] hover:text-[#f0eaf0]"
              }`}
            >
              <span className="text-xl">{tile.emoji}</span>
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

      {/* ─── Row 4: Secret Vault ─── */}
      <div className="ios-surface-elevated p-5 text-center space-y-3">
        <div className="w-12 h-12 rounded-xl bg-[#17131b] border border-[var(--border-subtle)] text-[#b995b8] flex items-center justify-center mx-auto">
          {isUnlocked ? (
            <Unlock className="w-5 h-5 text-[#f0eaf0]" />
          ) : (
            <Lock className="w-5 h-5" />
          )}
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b995b8]">
            The Secret Hook • &ldquo;Knsi Kami??&rdquo;
          </span>
          <h3 className="text-base font-bold text-[#f0eaf0]">
            {isUnlocked ? "Raaz Phir Bhi Mehfooz Hai 😉" : `Tap ${tapsLeft} Times To Reveal`}
          </h3>
        </div>

        {!isUnlocked ? (
          <button
            type="button"
            onClick={handleUnlockTap}
            className="w-full py-3 rounded-xl bg-[#211a26] border border-[var(--border-prominent)] text-[#f0eaf0] text-xs font-medium active:bg-[#362c3d] touch-target"
          >
            Tap to Unlock ({tapsLeft} left)
          </button>
        ) : (
          <div className="ios-surface p-3.5 text-left space-y-1.5">
            <p className="text-xs font-semibold text-[#f0eaf0]">
              &ldquo;Ufffff / Achwww&rdquo; bolne se baat nahi banegi! 😂
            </p>
            <p className="text-xs text-[#b7aabf] leading-relaxed font-light">
              Bracelet wali picture mein jo ek cheez missing thi, aur jo 15 October ka pending surprise hai—woh chat ya website par leak nahi ho sakta.
            </p>
            <p className="text-xs font-semibold text-[#b995b8]">
              Shart abhi bhi wohi hai: Samne aane par khud ba khud dikh jayegi. 💜
            </p>
            <button
              type="button"
              onClick={() => {
                setIsUnlocked(false);
                setTapsLeft(5);
                audioEngine.playHaptic(440);
              }}
              className="text-[11px] text-[#82738a] hover:text-[#f0eaf0] underline pt-1 touch-target inline-block"
            >
              Lock again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
