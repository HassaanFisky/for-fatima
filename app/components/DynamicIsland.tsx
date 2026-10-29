"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { VolumeX, Disc } from "lucide-react";
import { audioEngine } from "../lib/sound";

interface DynamicIslandProps {
  timeGreeting: string;
}

export default function DynamicIsland({ timeGreeting }: DynamicIslandProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<"acoustic" | "dream">("acoustic");
  const [isExpanded, setIsExpanded] = useState(false);

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

  const switchMode = (mode: "acoustic" | "dream") => {
    audioEngine.playHaptic(720);
    setAudioMode(mode);
    audioEngine.switchMode(mode);
    if (!isPlaying) {
      audioEngine.startLoop();
      setIsPlaying(true);
    }
  };

  return (
    <header className="sticky top-3.5 z-50 px-4 flex justify-center">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="apple-glass-pill rounded-full text-white shadow-2xl px-3 py-1.5 flex items-center justify-between gap-3 max-w-md w-full border border-white/10"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isPlaying ? "Mute audio" : "Play ambient audio"}
            className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-all ${
              isPlaying
                ? "bg-purple-600/80 text-white shadow-lg shadow-purple-600/30"
                : "bg-white/10 text-purple-300 hover:bg-white/15"
            }`}
          >
            {isPlaying ? (
              <Disc className="w-4 h-4 animate-spin text-purple-200" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer min-w-0 leading-tight text-left"
          >
            <div className="flex items-center gap-1.5 truncate">
              {isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              )}
              <p className="text-[11px] font-semibold tracking-wide truncate text-[#f5f3f9]">
                {audioMode === "acoustic"
                  ? "Late Night Plucks (Acoustic)"
                  : "Post You Vibe (Sunset Chords)"}
              </p>
            </div>
            <p className="text-[10px] text-[#ad9fc0] truncate">
              {timeGreeting}
            </p>
          </div>
        </div>

        {/* Apple Segmented Switcher */}
        <div className="flex items-center bg-white/10 rounded-full p-0.5 text-[10px] shrink-0 font-medium">
          <button
            type="button"
            onClick={() => switchMode("acoustic")}
            className={`px-2.5 py-1 rounded-full transition-all ${
              audioMode === "acoustic"
                ? "bg-white/90 text-[#09060f] font-bold shadow-sm"
                : "text-purple-200 hover:text-white"
            }`}
          >
            Acoustic
          </button>
          <button
            type="button"
            onClick={() => switchMode("dream")}
            className={`px-2.5 py-1 rounded-full transition-all ${
              audioMode === "dream"
                ? "bg-white/90 text-[#09060f] font-bold shadow-sm"
                : "text-purple-200 hover:text-white"
            }`}
          >
            Sunset
          </button>
        </div>
      </motion.div>
    </header>
  );
}
