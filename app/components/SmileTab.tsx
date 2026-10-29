"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Activity, Lock, Unlock } from "lucide-react";
import { PULSE_TILES } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function SmileTab() {
  // Flower state (1 to 5)
  const [flowerStage, setFlowerStage] = useState(1);

  // Star Mood state
  const [starIndex, setStarIndex] = useState(0);

  // BPM sensor
  const [bpm, setBpm] = useState(78);
  const [heartPulsing, setHeartPulsing] = useState(false);

  // Selected tile
  const [activeTileId, setActiveTileId] = useState<number>(1);

  // Vault state
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
    audioEngine.playPluck(480 + next * 70, 1.2);
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
    setTimeout(() => setHeartPulsing(false), 280);
  };

  const handleUnlockTap = () => {
    if (tapsLeft > 1) {
      audioEngine.playHaptic(440 + (5 - tapsLeft) * 80);
      setTapsLeft((t) => t - 1);
    } else {
      audioEngine.playChimeChord();
      setTapsLeft(0);
      setIsUnlocked(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-400/20">
          Chapter 03 • Playful Experiences
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[#f5f3f9]">
          A Small Reason to Smile
        </h2>
        <p className="text-xs text-[#ad9fc0]">
          Interactive corners built to give you a quiet boost anytime you visit.
        </p>
      </div>

      {/* ─── Row 1: Flower & Star ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Blooming Flower */}
        <div className="apple-glass-card rounded-3xl p-5 text-center flex flex-col justify-between items-center space-y-3">
          <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase px-3 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/20">
            Interactive Bloom ({flowerStage}/5)
          </span>

          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={handleBloomTap}
            aria-label="Tap to bloom flower"
            className="w-24 h-24 rounded-full bg-purple-950/40 border border-purple-400/30 flex items-center justify-center shadow-inner hover:border-purple-400/60 transition-all"
          >
            <motion.span
              key={flowerStage}
              initial={{ scale: 0.6, rotate: -10 }}
              animate={{ scale: 0.85 + flowerStage * 0.1, rotate: 0 }}
              className="text-4xl select-none"
            >
              {flowerStage === 1 && "🌱"}
              {flowerStage === 2 && "🌿"}
              {flowerStage === 3 && "🌷"}
              {flowerStage === 4 && "🌸"}
              {flowerStage === 5 && "💐"}
            </motion.span>
          </motion.button>

          <div>
            <h4 className="font-serif text-sm font-bold text-[#f5f3f9]">
              {flowerStage < 5 ? "Tap to help it bloom" : "Full Bloom Unlocked 💜"}
            </h4>
            <p className="text-[11px] text-[#ad9fc0] font-light">
              {flowerStage < 5
                ? "Patience and care make everything grow."
                : "A gentle bouquet waiting for you."}
            </p>
          </div>
        </div>

        {/* 2. Mood Star */}
        <div className="apple-glass-card rounded-3xl p-5 text-center flex flex-col justify-between items-center space-y-3">
          <span className="text-[10px] font-bold tracking-wider text-purple-300 uppercase px-3 py-0.5 rounded-full bg-purple-500/15 border border-purple-400/20">
            Mood Star
          </span>

          <motion.button
            type="button"
            whileHover={{ rotate: 12, scale: 1.05 }}
            whileTap={{ scale: 0.88 }}
            onClick={handleStarTap}
            aria-label="Tap to change star mood"
            className="w-24 h-24 rounded-full bg-purple-950/40 border border-purple-400/30 flex items-center justify-center shadow-inner hover:border-purple-400/60 transition-all"
          >
            <span className="text-4xl select-none">
              {starMoods[starIndex].face}
            </span>
          </motion.button>

          <div>
            <h4 className="font-serif text-sm font-bold text-[#f5f3f9]">
              {starMoods[starIndex].label}
            </h4>
            <p className="text-[11px] text-[#ad9fc0] font-light">
              {starMoods[starIndex].desc}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Row 2: Pre-Med Pulse Sensor ─── */}
      <div className="apple-glass-card rounded-[28px] p-5 flex items-center justify-between border border-purple-400/20">
        <div className="space-y-1 text-left">
          <span className="text-[10px] font-bold tracking-wider uppercase text-pink-400 bg-pink-500/15 px-2.5 py-0.5 rounded-full border border-pink-400/20">
            Live Vitals Check
          </span>
          <h3 className="text-xl font-bold text-[#f5f3f9] flex items-center gap-2">
            <span>{bpm} BPM</span>
            <Activity className="w-4 h-4 text-pink-400 animate-pulse" />
          </h3>
          <p className="text-xs text-[#ad9fc0]">
            {bpm > 95
              ? "Jab tum samne aati ho toh aise hi barhti hai 😉"
              : "Heart sensor pe tap karke pulse check karo"}
          </p>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={handleHeartSensor}
          aria-label="Tap heart sensor"
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 to-purple-700 text-white flex items-center justify-center shadow-lg shadow-pink-600/30 transition-transform ${
            heartPulsing ? "scale-110" : "scale-100"
          }`}
        >
          <Heart className="w-8 h-8 fill-current" />
        </motion.button>
      </div>

      {/* ─── Row 3: 4 Detail Tiles ─── */}
      <div className="grid grid-cols-2 gap-3">
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
              className={`p-4 rounded-2xl text-left border transition-all ${
                isSelected
                  ? "bg-purple-900/40 text-white border-purple-400/60 shadow-lg"
                  : "apple-glass-card text-[#f5f3f9] hover:border-white/20"
              }`}
            >
              <span className="text-2xl">{tile.emoji}</span>
              <p className="text-sm font-bold mt-1.5 leading-snug">{tile.title}</p>
              <p
                className={`text-[10px] mt-0.5 ${
                  isSelected ? "text-purple-300" : "text-[#8e81a3]"
                }`}
              >
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
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="apple-glass rounded-2xl p-4 text-left border border-purple-400/30 space-y-1"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                {tile.title}
              </p>
              <p className="text-xs text-[#e0d8ec] leading-relaxed font-light">
                {tile.reveal}
              </p>
            </motion.div>
          )
      )}

      {/* ─── Row 4: The Secret Kami Vault ─── */}
      <div className="apple-glass-card rounded-[32px] p-6 text-center space-y-4 border border-purple-400/20">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/15 text-purple-300 flex items-center justify-center mx-auto border border-purple-400/20">
          {isUnlocked ? (
            <Unlock className="w-7 h-7 text-pink-400" />
          ) : (
            <Lock className="w-7 h-7" />
          )}
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
            The Secret Hook • &ldquo;Knsi Kami??&rdquo;
          </span>
          <h3 className="text-xl font-bold text-[#f5f3f9]">
            {isUnlocked ? "Raaz Phir Bhi Mehfooz Hai 😉" : `Tap ${tapsLeft} Times to Peek Inside`}
          </h3>
        </div>

        {!isUnlocked ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={handleUnlockTap}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-800 to-pink-700 text-white font-semibold text-xs shadow-lg shadow-purple-900/40 border border-purple-400/30 hover:border-purple-400/60 transition-all"
          >
            Tap to Unlock ({tapsLeft} left) ✨
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="apple-glass rounded-2xl p-4 text-left space-y-2 border border-purple-400/30"
          >
            <p className="text-xs font-bold text-purple-200">
              &ldquo;Ufffff / Achwww&rdquo; bolne se baat nahi banegi! 😂
            </p>
            <p className="text-xs text-[#b8afc4] leading-relaxed font-light">
              Bracelet wali picture mein jo ek cheez missing thi, aur jo 15 October ka pending surprise hai—woh chat ya website par leak nahi ho sakta.
            </p>
            <p className="text-xs font-bold text-purple-300">
              Shart abhi bhi wohi hai: Samne aane par khud ba khud dikh jayegi. 💜
            </p>
            <button
              type="button"
              onClick={() => {
                setIsUnlocked(false);
                setTapsLeft(5);
                audioEngine.playHaptic(440);
              }}
              className="text-[11px] text-[#ad9fc0] hover:text-white underline pt-1"
            >
              Lock again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
