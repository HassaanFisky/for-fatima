"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Moon, Disc } from "lucide-react";
import { audioEngine } from "../lib/sound";

interface DynamicIslandProps {
  timeGreeting: string;
}

export default function DynamicIsland({ timeGreeting }: DynamicIslandProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<"acoustic" | "dream">("acoustic");

  const toggleSound = () => {
    audioEngine.playHaptic(640);
    if (isPlaying) {
      audioEngine.stopLoop();
      setIsPlaying(false);
    } else {
      audioEngine.startLoop();
      setIsPlaying(true);
    }
  };

  const switchMode = () => {
    const nextMode = audioMode === "acoustic" ? "dream" : "acoustic";
    audioEngine.playHaptic(720);
    setAudioMode(nextMode);
    audioEngine.switchMode(nextMode);
    if (!isPlaying) {
      audioEngine.startLoop();
      setIsPlaying(true);
    }
  };

  return (
    <header className="sticky top-2 sm:top-3 z-50 px-2.5 sm:px-3 flex justify-center w-full">
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 28,
        }}
        className="luxury-pill rounded-full text-[#f5f0f8] px-3.5 py-1.5 flex items-center justify-between gap-2 max-w-[420px] w-full"
      >
        {/* Left: Time Greeting */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-[#100b19]/80 border border-[var(--border-subtle)] flex items-center justify-center shrink-0 text-[#9878d1]">
            <Moon className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            {isPlaying && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#9878d1] shrink-0 animate-pulse" />
            )}
            <p className="text-[11px] font-medium tracking-wide text-[#f5f0f8] truncate">
              {timeGreeting}
            </p>
          </div>
        </div>

        {/* Right: Ambient Sound Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Mode Switcher */}
          <button
            type="button"
            onClick={switchMode}
            aria-label={`Current sound theme: ${audioMode === "acoustic" ? "Acoustic" : "Sunset"}. Tap to switch.`}
            className="apple-spring px-2.5 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase bg-[#100b19]/70 border border-[var(--border-subtle)] text-[#c6b4e5] hover:text-[#f5f0f8] hover:border-[var(--border-prominent)]"
          >
            {audioMode === "acoustic" ? "Acoustic" : "Sunset"}
          </button>

          {/* Mute/Play Audio Button */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isPlaying ? "Mute ambient audio" : "Play subtle ambient sound"}
            className={`apple-spring w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all ${
              isPlaying
                ? "bg-[#7050b8] text-[#f5f0f8] shadow-[0_0_14px_rgba(152,120,209,0.5)] border border-[rgba(214,198,245,0.4)]"
                : "bg-[#100b19]/70 border border-[var(--border-subtle)] text-[#857896] hover:text-[#b8adc6]"
            }`}
          >
            {isPlaying ? (
              <Disc className="w-3.5 h-3.5 animate-spin text-[#f5f0f8]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </motion.div>
    </header>
  );
}
