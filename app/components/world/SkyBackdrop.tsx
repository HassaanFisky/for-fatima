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
    // Deterministic Halton-inspired distribution in upper 62% of sky
    const u = ((i * 73 + 19) % 97) / 97;
    const v = ((i * 53 + 11) % 89) / 89;
    const x = 4 + u * 92;
    const y = 4 + v * 56;
    const isSparkle = i % 4 === 0;
    stars.push({
      id: i,
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      scale: isSparkle ? 0.9 + (i % 3) * 0.25 : 0.7 + (i % 3) * 0.2,
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
    ? 0
    : world.lighting.starOpacity;

  const moonX = world.moonPosition ? world.moonPosition.xPercent : 74;
  const moonY = world.moonPosition ? world.moonPosition.yPercent : 20;

  const skyStyle = {
    "--sky-top": world.palette.skyTop,
    "--sky-middle": world.palette.skyMiddle,
    "--sky-horizon": world.palette.skyHorizon,
    "--horizon-glow-color": world.palette.atmosphericAccent,
    "--horizon-glow-alpha": world.lighting.horizonGlow.toFixed(3),
    "--cloud-fill": world.palette.cloudShadow,
    "--cloud-highlight": world.palette.cloudLight,
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
      {/* Horizon atmospheric glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] transition-opacity duration-1000"
        style={{
          opacity: "var(--horizon-glow-alpha)",
          background:
            "radial-gradient(ellipse 90% 60% at 50% 100%, var(--horizon-glow-color) 0%, transparent 72%)",
        }}
      />

      {/* Ambient SVG Starfield (36 seeded stars via <symbol> + <use>) */}
      <svg
        viewBox="0 0 100 70"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 w-full h-[68%] transition-opacity duration-700"
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
              width={s.variant === "sparkle" ? 1.5 * s.scale : 0.85 * s.scale}
              height={s.variant === "sparkle" ? 1.5 * s.scale : 0.85 * s.scale}
            />
          </g>
        ))}
      </svg>

      {/* 3 Ambient Faceted Konpeitō Stars in Upper Sky */}
      <div
        className="absolute inset-x-0 top-0 h-[50%] transition-opacity duration-700"
        style={{ opacity: "var(--star-alpha)" }}
      >
        <div className="absolute left-[12%] top-[14%]">
          <KonpeitoStar size="md" glow />
        </div>
        <div className="absolute right-[16%] top-[22%]">
          <KonpeitoStar size="md" glow />
        </div>
        <div className="absolute left-[46%] top-[9%]">
          <KonpeitoStar size="sm" />
        </div>
      </div>

      {/* Kawaii Sun Disc (visible during daylight / sunrise / goldenHour) */}
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
          <circle cx="60" cy="60" r="24" fill="var(--color-butter-star)" />
          <circle
            cx="55"
            cy="54"
            r="18"
            fill="var(--color-paper-cream)"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Kawaii Moon Disc with SunCalc Bright-Limb Orientation */}
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
          {/* Soft earthshine disc */}
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

      {/* 3 Storybook Cloud Groups (4-7 overlapping circles + flat rounded base + top highlight) */}
      <svg
        viewBox="0 0 1440 360"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 w-full h-[34vh] max-h-[300px]"
      >
        {/* Back Cloud Group 1 (Left Horizon) */}
        <g className={reducedMotion ? "" : "cloud-drift-slow"} opacity="0.78">
          <path
            d="M60 320 H370 A34 34 0 0 0 404 286 A32 32 0 0 0 374 254 A48 48 0 0 0 328 214 A58 58 0 0 0 220 198 A50 50 0 0 0 128 222 A42 42 0 0 0 64 262 A30 30 0 0 0 32 292 A28 28 0 0 0 60 320 Z"
            fill="var(--cloud-fill)"
          />
          <path
            d="M128 226 A50 50 0 0 1 220 202 A58 58 0 0 1 326 218 A46 46 0 0 1 368 252 C320 238 190 236 128 226 Z"
            fill="var(--cloud-highlight)"
            opacity="0.42"
          />
        </g>

        {/* Mid Cloud Group 2 (Right Horizon) */}
        <g className={reducedMotion ? "" : "cloud-drift-mid"} opacity="0.82">
          <path
            d="M980 332 H1360 A36 36 0 0 0 1396 296 A34 34 0 0 0 1364 262 A52 52 0 0 0 1310 218 A64 64 0 0 0 1190 198 A54 54 0 0 0 1090 226 A44 44 0 0 0 1018 268 A32 32 0 0 0 980 332 Z"
            fill="var(--cloud-fill)"
          />
          <path
            d="M1090 230 A54 54 0 0 1 1190 202 A64 64 0 0 1 1308 222 C1250 212 1148 214 1090 230 Z"
            fill="var(--cloud-highlight)"
            opacity="0.4"
          />
        </g>

        {/* Front Low Cloud Cushion 3 (Center-Bottom) */}
        <g opacity="0.65">
          <path
            d="M460 352 H930 A34 34 0 0 0 964 318 A44 44 0 0 0 916 276 A56 56 0 0 0 812 246 A68 68 0 0 0 684 238 A58 58 0 0 0 568 264 A46 46 0 0 0 486 296 A30 30 0 0 0 460 352 Z"
            fill="var(--cloud-fill)"
          />
          <path
            d="M570 268 A58 58 0 0 1 684 242 A68 68 0 0 1 810 250 C740 242 630 246 570 268 Z"
            fill="var(--cloud-highlight)"
            opacity="0.35"
          />
        </g>
      </svg>
    </div>
  );
}
