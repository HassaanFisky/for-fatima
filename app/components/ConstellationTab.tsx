"use client";

import React, { useState, useRef, useCallback } from "react";
import { Star, RotateCcw } from "lucide-react";
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
    <div className="space-y-4 sm:space-y-5">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-[#b995b8] bg-[#211a26] px-3 py-1 rounded-full border border-[var(--border-subtle)]">
          Chapter 04 • Signature Interaction
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f0eaf0]">
          A Tiny Constellation
        </h2>
        <p className="text-xs text-[#b7aabf]">
          Tap or drag across the stars to connect the heart ({connectedIds.length}/
          {CONSTELLATION_POINTS.length}).
        </p>
      </div>

      {/* ─── Constellation Box ─── */}
      <div className="ios-surface-elevated p-4 sm:p-5 relative overflow-hidden">
        <div
          ref={containerRef}
          onPointerDown={handlePointerMove}
          onPointerMove={handlePointerMove}
          className="relative w-full h-[280px] sm:h-[300px] select-none touch-none rounded-xl bg-[#17131b] border border-[var(--border-subtle)]"
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
                    stroke="#b995b8"
                    strokeWidth="0.8"
                    strokeDasharray="1.5 1"
                    strokeOpacity="0.8"
                  />
                );
              })}

            {isComplete && (
              <polygon
                points={CONSTELLATION_POINTS.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="rgba(185, 149, 184, 0.12)"
                stroke="#b995b8"
                strokeWidth="0.8"
              />
            )}
          </svg>

          {/* Star Buttons (Touch targets 44px) */}
          {CONSTELLATION_POINTS.map((pt) => {
            const isLit = connectedIds.includes(pt.id);
            return (
              <button
                type="button"
                key={pt.id}
                onClick={() => connectStar(pt.id, pt.freq)}
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                aria-label={`Star ${pt.label}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none touch-target justify-center"
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isLit
                      ? "bg-[#b995b8] text-[#17131b]"
                      : "bg-white/10 text-[#b7aabf] hover:bg-white/15"
                  }`}
                >
                  <Star className={`w-3 h-3 ${isLit ? "fill-current" : ""}`} />
                </span>
                <span className="text-[9px] mt-0.5 text-[#82738a] font-medium tracking-wide">
                  {pt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer controls */}
        <div className="pt-3.5 border-t border-[var(--border-subtle)] mt-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          {isComplete ? (
            <div className="space-y-0.5">
              <p className="font-serif text-xs font-semibold text-[#f0eaf0]">
                Made with care. Nothing expected in return. 💜
              </p>
              <p className="text-[10px] text-[#82738a]">
                Every star connected—a quiet symbol of genuine effort.
              </p>
            </div>
          ) : (
            <p className="text-[11px] text-[#82738a]">
              Tap stars or tap &ldquo;Auto-Connect&rdquo; to complete the heart.
            </p>
          )}

          <div className="flex items-center gap-2">
            {!isComplete && (
              <button
                type="button"
                onClick={autoConnect}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#211a26] border border-[var(--border-prominent)] text-[#f0eaf0] transition-colors flex items-center gap-1.5 touch-target"
              >
                <span>Auto-Connect</span>
              </button>
            )}
            <button
              type="button"
              onClick={resetConstellation}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] text-[#b7aabf] hover:text-[#f0eaf0] transition-colors flex items-center gap-1 touch-target"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Final Letter with No Expectations ─── */}
      <div className="ios-surface-elevated p-6 text-left space-y-3.5">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b995b8] font-mono">
            Final Chapter • With Peace
          </span>
          <span className="text-[11px] text-[#82738a]">No pressure to reply</span>
        </div>

        <div className="space-y-3 font-serif text-xs sm:text-sm text-[#f0eaf0] leading-relaxed">
          <p className="font-medium text-[#b995b8]">Fatima,</p>
          <p>
            I don&apos;t know what the future holds, and I don&apos;t want to pretend that a website can fix everything.
          </p>
          <p>
            I just wanted to do something different and put genuine effort into expressing what I couldn&apos;t always communicate properly.
          </p>
          <p className="text-[#f0eaf0] font-medium">
            You matter as a person, regardless of what happens between us.
          </p>
          <p>
            I hope life brings you peace, happiness, and the things you genuinely want for yourself.
          </p>
          <p>Take your time, live your life, and look after yourself.</p>
          <p className="text-xs text-[#82738a] italic pt-1">
            No pressure to reply. Just something I made with care.
          </p>
          <p className="pt-2 font-serif italic text-base sm:text-lg text-[#b995b8] font-medium">
            — Hassaan 💜
          </p>
        </div>
      </div>
    </div>
  );
}
