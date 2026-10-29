"use client";

import React, { useState } from "react";
import { VolumeX, Disc } from "lucide-react";
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
    <header className="sticky top-2 sm:top-3 z-50 px-3 flex justify-center w-full">
      <div className="ios-pill rounded-full text-[#f0eaf0] px-3 py-1.5 flex items-center justify-between gap-2.5 max-w-[420px] w-full">
        {/* Play/Mute Audio Button (Touch target 44px equivalent area) */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isPlaying ? "Mute ambient audio" : "Play subtle ambient audio (optional)"}
            className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center transition-colors touch-target focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] ${
              isPlaying
                ? "bg-[#362c3d] text-[#f0eaf0]"
                : "bg-white/5 text-[#b7aabf] hover:bg-white/10"
            }`}
          >
            {isPlaying ? (
              <Disc className="w-4 h-4 animate-spin text-[#b995b8]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#82738a]" />
            )}
          </button>

          <div className="min-w-0 text-left leading-tight">
            <div className="flex items-center gap-1.5 truncate">
              {isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#b995b8] shrink-0" aria-hidden="true" />
              )}
              <p className="text-[11px] font-medium tracking-wide truncate text-[#f0eaf0]">
                {audioMode === "acoustic"
                  ? "Acoustic Pluck (Lo-Fi)"
                  : "Sunset Pad (Warm Tone)"}
              </p>
            </div>
            <p className="text-[10px] text-[#82738a] truncate">
              {timeGreeting}
            </p>
          </div>
        </div>

        {/* Apple Segmented Switcher */}
        <div 
          role="group" 
          aria-label="Audio theme switcher"
          className="flex items-center bg-white/5 rounded-full p-0.5 text-[10px] shrink-0 font-medium"
        >
          <button
            type="button"
            onClick={() => switchMode("acoustic")}
            aria-pressed={audioMode === "acoustic"}
            className={`px-2.5 py-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] ${
              audioMode === "acoustic"
                ? "bg-[#2b2230] text-[#f0eaf0] font-semibold"
                : "text-[#b7aabf] hover:text-[#f0eaf0]"
            }`}
          >
            Acoustic
          </button>
          <button
            type="button"
            onClick={() => switchMode("dream")}
            aria-pressed={audioMode === "dream"}
            className={`px-2.5 py-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] ${
              audioMode === "dream"
                ? "bg-[#2b2230] text-[#f0eaf0] font-semibold"
                : "text-[#b7aabf] hover:text-[#f0eaf0]"
            }`}
          >
            Sunset
          </button>
        </div>
      </div>
    </header>
  );
}
