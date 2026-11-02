"use client";

/**
 * Scene 6 — The Quiet Sky
 * Integrates the 4:3 translucent liquid-glass 3D ribbon wave video derived from
 * `E:\ADOBE 3D WAVE.mp4` (`1600×1200` 4:3, 30fps, 12.67s, silent).
 *
 * Asset & Licensing Note:
 * - Served from optimised silent (`-an`) 4:3 web derivatives:
 *   `/media/liquid-wave-4x3.mp4` (desktop 1200×900)
 *   `/media/liquid-wave-mobile-4x3.mp4` (mobile 960×720)
 *   `/media/liquid-wave-poster.jpg` (poster frame)
 * - Source is creator-supplied Adobe 3D Wave visual study (`E:\ADOBE 3D WAVE.mp4` kept untouched).
 *   If this private gift is ever repurposed commercially, verify the Adobe Stock / artist redistribution licence.
 */

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { QUIET_SKY_CONTENT } from "../../config/personal";
import { KonpeitoStar } from "../illustrations/Konpeito";
import { useLivingWorld } from "../world/LivingWorldProvider";
import { fadeUp } from "../../lib/motion";

export function QuietSkySection({ isActive }: { isActive: boolean }) {
  const { visible, reducedMotion } = useLivingWorld();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loopSoftening, setLoopSoftening] = useState(false);

  // Manage playback lifecycle strictly by scene activity, tab visibility, and reduced-motion preference
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const shouldPlay = isActive && visible && !reducedMotion;

    if (shouldPlay) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Poster fallback remains visible if playback is deferred
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, visible, reducedMotion]);

  // Smoothly soften loop boundary near 12.67s so the non-identical start/end frames never jump-cut harshly
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const remaining = video.duration - video.currentTime;
    if (remaining <= 0.42 || video.currentTime <= 0.18) {
      if (!loopSoftening) setLoopSoftening(true);
    } else if (loopSoftening) {
      setLoopSoftening(false);
    }
  };

  return (
    <section
      id="quiet-sky"
      aria-labelledby="quiet-sky-heading"
      className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 z-10"
    >
      <div className="w-full max-w-[38rem] mx-auto flex flex-col items-center">
        {/* Subtle Scene Header Pill */}
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold paper-pill-surface mb-3">
          <KonpeitoStar size="sm" />
          <span style={{ color: "var(--color-royal-violet)" }}>
            {QUIET_SKY_CONTENT.kicker} · The Quiet Sky
          </span>
          <KonpeitoStar size="sm" />
        </div>

        {/* Deliberate 4:3 Atmospheric Stage Harmonising the Bright Lavender Video Backdrop */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[33rem] rounded-[28px] p-2.5 sm:p-3.5 quiet-sky-stage-frame"
        >
          <div
            className="relative w-full aspect-[4/3] rounded-[22px] overflow-hidden select-none"
            style={{
              background:
                "linear-gradient(145deg, #DED9FA 0%, #C7BFF3 55%, #B9B2EE 100%)",
            }}
          >
            {/* Poster Underlay for Seamless Loop Cross-Dissolve & Reduced-Motion Static Fallback */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-center bg-contain bg-no-repeat"
              style={{
                backgroundImage: "url('/media/liquid-wave-poster.jpg')",
              }}
            />

            {!reducedMotion && (
              <video
                ref={videoRef}
                poster="/media/liquid-wave-poster.jpg"
                muted
                loop
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                aria-label="Translucent iridescent liquid-glass 3D ribbon wave drifting across a soft lavender sky"
                className={`relative z-10 w-full h-full object-contain transition-opacity duration-500 ${
                  loopSoftening ? "opacity-55" : "opacity-100"
                }`}
              >
                <source
                  src="/media/liquid-wave-mobile-4x3.mp4"
                  type="video/mp4"
                  media="(max-width: 767px)"
                />
                <source src="/media/liquid-wave-4x3.mp4" type="video/mp4" />
              </video>
            )}

            {/* Soft Lavender Vignette Feather so the 4:3 Window Melts Naturally into the Frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 rounded-[22px]"
              style={{
                boxShadow:
                  "inset 0 0 36px 10px rgba(42, 31, 85, 0.18), inset 0 0 12px 2px rgba(244, 238, 255, 0.55)",
              }}
            />
          </div>
        </motion.div>

        {/* Minimal Poetic Paper Caption Below the 4:3 Stage */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[33rem] mt-3.5"
        >
          <div className="rounded-[22px] px-5 py-4 sm:px-7 sm:py-5 text-center paper-card-cream">
            <h2
              id="quiet-sky-heading"
              className="font-display font-bold text-base sm:text-lg mb-1"
              style={{ color: "var(--color-ink-plum)" }}
            >
              {QUIET_SKY_CONTENT.title}
            </h2>
            <p
              className="font-sans text-sm sm:text-[15.5px] leading-[1.68]"
              style={{ color: "var(--color-ink-muted)" }}
            >
              {QUIET_SKY_CONTENT.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
