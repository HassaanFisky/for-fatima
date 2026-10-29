"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, RotateCcw, Sparkles } from "lucide-react";
import { CONSTELLATION_POINTS } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function ConstellationTab() {
  const [connectedIds, setConnectedIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const isComplete = connectedIds.length === CONSTELLATION_POINTS.length;

  const connectStar = useCallback(
    (id: number, freq: number) => {
      if (!connectedIds.includes(id)) {
        const next = [...connectedIds, id];
        setConnectedIds(next);
        audioEngine.playPluck(freq, 1.4, 0.9);
        if (next.length === CONSTELLATION_POINTS.length) {
          setTimeout(() => audioEngine.playChimeChord(), 250);
        }
      }
    },
    [connectedIds]
  );

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.buttons === 0) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;

    CONSTELLATION_POINTS.forEach((pt) => {
      if (!connectedIds.includes(pt.id)) {
        const dist = Math.hypot(pt.x - px, pt.y - py);
        if (dist < 10) {
          connectStar(pt.id, pt.freq);
        }
      }
    });
  };

  const autoConnect = () => {
    audioEngine.playChimeChord();
    setConnectedIds(CONSTELLATION_POINTS.map((p) => p.id));
  };

  const resetConstellation = () => {
    audioEngine.playHaptic(420);
    setConnectedIds([]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-400/20">
          Chapter 04 • Signature Interaction
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[#f5f3f9]">
          A Tiny Constellation
        </h2>
        <p className="text-xs text-[#ad9fc0]">
          Tap or drag across the stars to connect the heart ({connectedIds.length}/
          {CONSTELLATION_POINTS.length}).
        </p>
      </div>

      {/* ─── Apple Midnight Constellation Box ─── */}
      <div className="apple-glass-card rounded-[32px] p-6 shadow-2xl border border-purple-400/20 relative overflow-hidden">
        <div
          ref={containerRef}
          onPointerDown={handlePointerMove}
          onPointerMove={handlePointerMove}
          className="relative w-full h-[310px] select-none touch-none rounded-2xl bg-black/40 border border-white/5"
        >
          {/* SVG Connection Lines */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full absolute inset-0 pointer-events-none"
          >
            {connectedIds.length > 1 &&
              connectedIds.map((id, idx) => {
                if (idx === 0) return null;
                const prev = CONSTELLATION_POINTS.find(
                  (p) => p.id === connectedIds[idx - 1]
                );
                const curr = CONSTELLATION_POINTS.find((p) => p.id === id);
                if (!prev || !curr) return null;
                return (
                  <line
                    key={`${prev.id}-${curr.id}`}
                    x1={prev.x}
                    y1={prev.y}
                    x2={curr.x}
                    y2={curr.y}
                    stroke="#c084fc"
                    strokeWidth="0.8"
                    strokeDasharray="1.5 1"
                    strokeOpacity="0.85"
                  />
                );
              })}

            {isComplete && (
              <polygon
                points={CONSTELLATION_POINTS.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="rgba(192, 132, 252, 0.12)"
                stroke="#e9d5ff"
                strokeWidth="0.9"
              />
            )}
          </svg>

          {/* Star Buttons */}
          {CONSTELLATION_POINTS.map((pt) => {
            const isLit = connectedIds.includes(pt.id);
            return (
              <button
                type="button"
                key={pt.id}
                onClick={() => connectStar(pt.id, pt.freq)}
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                aria-label={`Star ${pt.label}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none"
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isLit
                      ? "bg-purple-300 text-[#09060f] scale-110 shadow-lg shadow-purple-400/50"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${isLit ? "fill-current" : ""}`} />
                </span>
                <span className="text-[9px] mt-1 text-purple-200/80 font-medium tracking-wide">
                  {pt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer controls */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {isComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-0.5"
            >
              <p className="font-serif text-sm font-semibold text-purple-200">
                Made with care. Nothing expected in return. 💜
              </p>
              <p className="text-[11px] text-[#ad9fc0]">
                Every star connected—a quiet symbol of genuine effort.
              </p>
            </motion.div>
          ) : (
            <p className="text-xs text-[#ad9fc0]">
              Tap all stars or use &ldquo;Auto-Connect&rdquo; to complete the heart.
            </p>
          )}

          <div className="flex items-center gap-2">
            {!isComplete && (
              <button
                type="button"
                onClick={autoConnect}
                className="text-xs px-3.5 py-1.5 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/30 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Connect</span>
              </button>
            )}
            <button
              type="button"
              onClick={resetConstellation}
              className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-[#b8afc4] hover:bg-white/10 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Final Letter with No Expectations ─── */}
      <div className="apple-glass-card rounded-[32px] p-7 sm:p-9 text-left space-y-4 border border-purple-400/20 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 font-mono">
            Final Chapter • With Peace
          </span>
          <span className="text-xs text-[#746788]">No pressure to reply</span>
        </div>

        <div className="space-y-4 font-serif text-sm sm:text-base text-[#e0d8ec] leading-relaxed">
          <p className="font-medium text-purple-300">Fatima,</p>
          <p>
            I don&apos;t know what the future holds, and I don&apos;t want to pretend that a website can fix everything.
          </p>
          <p>
            I just wanted to do something different and put genuine effort into expressing what I couldn&apos;t always communicate properly.
          </p>
          <p className="text-[#f5f3f9] font-medium">
            You matter as a person, regardless of what happens between us.
          </p>
          <p>
            I hope life brings you peace, happiness, and the things you genuinely want for yourself.
          </p>
          <p>Take your time, live your life, and look after yourself.</p>
          <p className="text-xs text-[#8e81a3] italic pt-1">
            No pressure to reply. Just something I made with care.
          </p>
          <p className="pt-3 font-serif italic text-xl text-purple-300 font-medium">
            — Hassaan 💜
          </p>
        </div>
      </div>
    </div>
  );
}
