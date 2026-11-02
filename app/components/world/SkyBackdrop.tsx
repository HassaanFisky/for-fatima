"use client";

import React, { useMemo } from "react";
import { useLivingWorld } from "./LivingWorldProvider";
import { KonpeitoStar } from "../illustrations/Konpeito";

interface AmbientStarSeed {
  id: number;
  x: number;
  y: number;
  scale: number;
  variant: "dot" | "sparkle";
  twinkleIndex: number;
  delay: number;
}

function buildSeededStars(count: number): AmbientStarSeed[] {
  const stars: AmbientStarSeed[] = [];
  for (let i = 0; i < count; i++) {
    const u = ((i * 73 + 19) % 97) / 97;
    const v = ((i * 53 + 11) % 89) / 89;
    const x = 4 + u * 92;
    const y = 4 + v * 52;
    const isSparkle = i % 4 === 0;
    stars.push({
      id: i,
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      scale: isSparkle ? 0.9 + (i % 3) * 0.22 : 0.68 + (i % 3) * 0.18,
      variant: isSparkle ? "sparkle" : "dot",
      twinkleIndex: (i % 4) + 1,
      delay: Number(((i % 7) * 0.6).toFixed(2)),
    });
  }
  return stars;
}

export function SkyBackdrop() {
  const { world, constellationFocused, reducedMotion } = useLivingWorld();
  const seededStars = useMemo(() => buildSeededStars(36), []);

  const effectiveStarAlpha = constellationFocused
    ? 0.15
    : world.lighting.starOpacity;

  const moonX = world.moonPosition ? world.moonPosition.xPercent : 76;
  const moonY = world.moonPosition ? world.moonPosition.yPercent : 18;

  const skyStyle = {
    "--sky-top": world.palette.skyTop,
    "--sky-middle": world.palette.skyMiddle,
    "--sky-horizon": world.palette.skyHorizon,
    "--horizon-glow-color": world.palette.atmosphericAccent,
    "--horizon-glow-alpha": world.lighting.horizonGlow.toFixed(3),
    "--cloud-fill": world.palette.cloudShadow,
    "--cloud-highlight": world.palette.cloudLight,
    "--hill-far": world.palette.hillFar,
    "--hill-mid": world.palette.hillMid,
    "--hill-foreground": world.palette.hillForeground,
    "--sun-x": `${world.sunPosition.xPercent.toFixed(2)}%`,
    "--sun-y": `${world.sunPosition.yPercent.toFixed(2)}%`,
    "--sun-alpha": world.lighting.directSun.toFixed(3),
    "--moon-x": `${moonX.toFixed(2)}%`,
    "--moon-y": `${moonY.toFixed(2)}%`,
    "--moon-alpha": world.lighting.moonVisibility.toFixed(3),
    "--star-alpha": effectiveStarAlpha.toFixed(3),
  } as React.CSSProperties;

  const illumination = world.moonIlluminatedFraction ?? 0.35;
  const shadowOffset = (illumination * 28).toFixed(1);
  const brightLimbDeg = (
    ((world.moonBrightLimbRotation ?? -0.55) * 180) /
    Math.PI
  ).toFixed(1);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0 sky-living-backdrop"
      style={skyStyle}
      aria-hidden="true"
    >
      {/* Layer 1: Lower Atmosphere Horizon Glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-[56%] transition-opacity duration-1000"
        style={{
          opacity: "var(--horizon-glow-alpha)",
          background:
            "radial-gradient(ellipse 92% 62% at 50% 88%, var(--horizon-glow-color) 0%, transparent 74%)",
        }}
      />

      {/* Layer 2: Celestial Sky — 36 Seeded Stars in Upper Sky */}
      <svg
        viewBox="0 0 100 65"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 w-full h-[62%] transition-opacity duration-700"
        style={{ opacity: "var(--star-alpha)" }}
      >
        <defs>
          <symbol id="konpeito-ambient-dot" viewBox="0 0 6 6">
            <circle cx="3" cy="3" r="1.4" fill="var(--color-paper-cream)" />
          </symbol>
          <symbol id="konpeito-ambient-sparkle" viewBox="0 0 12 12">
            <path
              d="M6 0.5 L7.4 4.6 L11.5 6 L7.4 7.4 L6 11.5 L4.6 7.4 L0.5 6 L4.6 4.6 Z"
              fill="var(--color-butter-star)"
            />
            <circle cx="6" cy="6" r="1.5" fill="var(--color-paper-cream)" />
          </symbol>
        </defs>

        {seededStars.map((s) => (
          <g
            key={s.id}
            transform={`translate(${s.x} ${s.y})`}
            className={reducedMotion ? "" : `star-twinkle-${s.twinkleIndex}`}
            style={
              reducedMotion ? undefined : { animationDelay: `${s.delay}s` }
            }
          >
            <use
              href={
                s.variant === "sparkle"
                  ? "#konpeito-ambient-sparkle"
                  : "#konpeito-ambient-dot"
              }
              width={s.variant === "sparkle" ? 1.45 * s.scale : 0.8 * s.scale}
              height={s.variant === "sparkle" ? 1.45 * s.scale : 0.8 * s.scale}
            />
          </g>
        ))}
      </svg>

      {/* 3 Faceted Konpeitō Stars in Upper Sky */}
      <div
        className="absolute inset-x-0 top-0 h-[44%] transition-opacity duration-700"
        style={{ opacity: "var(--star-alpha)" }}
      >
        <div className="absolute left-[10%] top-[15%]">
          <KonpeitoStar size="md" glow />
        </div>
        <div className="absolute right-[14%] top-[20%]">
          <KonpeitoStar size="md" glow />
        </div>
        <div className="absolute left-[48%] top-[10%]">
          <KonpeitoStar size="sm" />
        </div>
      </div>

      {/* Celestial Sun Disc (Daylight / Sunrise / Golden Hour) */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
        style={{
          left: "var(--sun-x)",
          top: "var(--sun-y)",
          opacity: "var(--sun-alpha)",
        }}
      >
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28">
          <defs>
            <radialGradient id="kawaii-sun-halo" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="var(--color-butter-star)"
                stopOpacity="0.65"
              />
              <stop
                offset="55%"
                stopColor="var(--color-peach-glow)"
                stopOpacity="0.28"
              />
              <stop
                offset="100%"
                stopColor="var(--color-peach-glow)"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="56" fill="url(#kawaii-sun-halo)" />
          <circle cx="60" cy="60" r="23" fill="var(--color-butter-star)" />
          <circle
            cx="55"
            cy="54"
            r="17"
            fill="var(--color-paper-cream)"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Celestial Moon Disc with SunCalc Bright-Limb Orientation */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
        style={{
          left: "var(--moon-x)",
          top: "var(--moon-y)",
          opacity: "var(--moon-alpha)",
        }}
      >
        <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28">
          <defs>
            <radialGradient id="kawaii-moon-halo" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="var(--color-butter-star)"
                stopOpacity="0.38"
              />
              <stop
                offset="55%"
                stopColor="var(--color-periwinkle)"
                stopOpacity="0.16"
              />
              <stop
                offset="100%"
                stopColor="var(--color-periwinkle)"
                stopOpacity="0"
              />
            </radialGradient>
            <mask id="kawaii-moon-crescent-mask">
              <rect width="120" height="120" fill="black" />
              <circle cx="60" cy="60" r="22" fill="white" />
              <circle
                cx={60 - Number(shadowOffset)}
                cy="56"
                r="20"
                fill="black"
              />
            </mask>
          </defs>
          <circle cx="60" cy="60" r="54" fill="url(#kawaii-moon-halo)" />
          <circle
            cx="60"
            cy="60"
            r="22"
            fill="var(--color-periwinkle)"
            opacity="0.22"
          />
          <g transform={`rotate(${brightLimbDeg} 60 60)`}>
            <circle
              cx="60"
              cy="60"
              r="22"
              fill="var(--color-butter-star)"
              mask="url(#kawaii-moon-crescent-mask)"
            />
          </g>
        </svg>
      </div>

      {/* Layer 3: Upper/Mid-Sky Drifting Storybook Clouds (Explicitly in the sky, never confused with ground) */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-x-0 top-[14%] w-full h-[36vh] max-h-[280px]"
      >
        {/* Left Upper Sky Cloud */}
        <g className={reducedMotion ? "" : "cloud-drift-slow"} opacity="0.52">
          <path
            d="M70 190 H310 A26 26 0 0 0 336 164 A25 25 0 0 0 312 139 A38 38 0 0 0 274 108 A46 46 0 0 0 188 96 A40 40 0 0 0 116 115 A32 32 0 0 0 68 146 A22 22 0 0 0 46 168 A22 22 0 0 0 70 190 Z"
            fill="var(--cloud-fill)"
          />
          <path
            d="M116 118 A40 40 0 0 1 188 100 A46 46 0 0 1 272 112 C230 104 155 106 116 118 Z"
            fill="var(--cloud-highlight)"
            opacity="0.45"
          />
        </g>

        {/* Right Mid-Sky Cloud */}
        <g className={reducedMotion ? "" : "cloud-drift-mid"} opacity="0.48">
          <path
            d="M1020 230 H1310 A28 28 0 0 0 1338 202 A26 26 0 0 0 1314 176 A40 40 0 0 0 1272 142 A48 48 0 0 0 1180 126 A42 42 0 0 0 1104 148 A34 34 0 0 0 1050 180 A24 24 0 0 0 1020 230 Z"
            fill="var(--cloud-fill)"
          />
          <path
            d="M1104 151 A42 42 0 0 1 1180 130 A48 48 0 0 1 1270 145 C1225 137 1148 139 1104 151 Z"
            fill="var(--cloud-highlight)"
            opacity="0.42"
          />
        </g>
      </svg>

      {/* Layer 4: Distant Lavender Hills Establishing the Lower Horizon */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full h-[26vh] min-h-[150px] max-h-[260px]"
      >
        <defs>
          <linearGradient id="hill-mist-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sky-horizon)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--hill-far)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Far Distant Lavender Ridge */}
        <path
          d="M0 168 C210 112, 420 104, 650 142 C880 180, 1140 96, 1440 136 L1440 320 L0 320 Z"
          fill="var(--hill-far)"
          opacity="0.88"
          className="transition-colors duration-1000"
        />

        {/* Soft Atmospheric Mist Between Ridges */}
        <rect x="0" y="110" width="1440" height="90" fill="url(#hill-mist-fade)" />

        {/* Mid-Distance Rolling Lavender Hill */}
        <path
          d="M0 202 C260 156, 540 218, 840 174 C1090 138, 1280 162, 1440 192 L1440 320 L0 320 Z"
          fill="var(--hill-mid)"
          opacity="0.94"
          className="transition-colors duration-1000"
        />

        {/* Foreground Horizon Stage Hill */}
        <path
          d="M0 248 C340 212, 690 258, 1060 228 C1240 214, 1360 226, 1440 238 L1440 320 L0 320 Z"
          fill="var(--hill-foreground)"
          className="transition-colors duration-1000"
        />
      </svg>
    </div>
  );
}
