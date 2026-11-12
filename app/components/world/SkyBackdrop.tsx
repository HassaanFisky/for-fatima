"use client";

import React, { useMemo, useState, useCallback } from "react";
import { useLivingWorld } from "./LivingWorldProvider";
import { KonpeitoStar } from "../illustrations/Konpeito";

interface AmbientStarSeed {
  id: number;
  x: number;
  y: number;
  scale: number;
  variant: "four-point" | "five-point";
  twinkleIndex: number;
  delay: number;
}

function buildSeededStars(count: number): AmbientStarSeed[] {
  const stars: AmbientStarSeed[] = [];
  for (let i = 0; i < count; i++) {
    // Evenly distribute across left, center, and right sky zones
    const zone = i % 3; // 0 = left, 1 = center, 2 = right
    const localU = ((i * 67 + 13) % 89) / 89;
    const x = zone * 31 + 3.5 + localU * 28.5;
    const v = ((i * 53 + 11) % 83) / 83;
    const y = 3.5 + v * 46;
    const isFivePoint = i % 2 === 0;
    stars.push({
      id: i,
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      scale: isFivePoint ? 0.92 + (i % 3) * 0.22 : 0.82 + (i % 3) * 0.18,
      variant: isFivePoint ? "five-point" : "four-point",
      twinkleIndex: (i % 4) + 1,
      delay: Number(((i % 7) * 0.55).toFixed(2)),
    });
  }
  return stars;
}

export function SkyBackdrop() {
  const { world, constellationFocused, reducedMotion, playStarBell } =
    useLivingWorld();
  const seededStars = useMemo(() => buildSeededStars(36), []);
  const [moonShimmer, setMoonShimmer] = useState(false);

  const handleMoonTap = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setMoonShimmer(true);
      playStarBell();
      window.setTimeout(() => setMoonShimmer(false), 620);
    },
    [playStarBell]
  );

  const effectiveStarAlpha = constellationFocused
    ? 0.18
    : world.lighting.starOpacity;

  const moonX = world.moonPosition ? world.moonPosition.xPercent : 78;
  const moonY = world.moonPosition ? world.moonPosition.yPercent : 16;

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
    "--moon-alpha": Math.max(0.88, world.lighting.moonVisibility).toFixed(3),
    "--star-alpha": effectiveStarAlpha.toFixed(3),
  } as React.CSSProperties;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0 sky-living-backdrop"
      style={skyStyle}
    >
      {/* Layer 1: Atmospheric Horizon Glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-[58%] transition-opacity duration-1000"
        style={{
          opacity: "var(--horizon-glow-alpha)",
          background:
            "radial-gradient(ellipse 95% 64% at 50% 84%, var(--horizon-glow-color) 0%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 2: 36 Crisp 4-Point and 5-Point Stars Balanced Across Left, Center, Right */}
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 w-full h-[58%] transition-opacity duration-700"
        style={{ opacity: "var(--star-alpha)" }}
        aria-hidden="true"
      >
        <defs>
          {/* Crisp 4-point celestial diamond star */}
          <symbol id="celestial-star-4pt" viewBox="0 0 16 16">
            <path
              d="M8 0.6 L9.9 6.1 L15.4 8 L9.9 9.9 L8 15.4 L6.1 9.9 L0.6 8 L6.1 6.1 Z"
              fill="var(--color-starlight)"
            />
            <circle cx="8" cy="8" r="1.6" fill="var(--color-paper-cream)" />
          </symbol>
          {/* Crisp 5-point classic star */}
          <symbol id="celestial-star-5pt" viewBox="0 0 16 16">
            <path
              d="M8 0.8 L9.9 5.5 L15 5.9 L11.1 9.2 L12.3 14.2 L8 11.4 L3.7 14.2 L4.9 9.2 L1 5.9 L6.1 5.5 Z"
              fill="var(--color-butter-star)"
            />
            <circle cx="8" cy="8.2" r="1.5" fill="var(--color-paper-cream)" />
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
                s.variant === "five-point"
                  ? "#celestial-star-5pt"
                  : "#celestial-star-4pt"
              }
              width={1.45 * s.scale}
              height={1.45 * s.scale}
            />
          </g>
        ))}
      </svg>

      {/* Interactive Foreground Sky Stars (Left, Left-Center, Center, Right-Center, Right) */}
      <div
        className="absolute inset-x-0 top-0 h-[44%] transition-opacity duration-700"
        style={{ opacity: "var(--star-alpha)" }}
      >
        <div className="absolute left-[7%] top-[14%]">
          <KonpeitoStar
            size="md"
            glow
            variant="five-point"
            onClick={playStarBell}
            ariaLabel="Touch morning star"
          />
        </div>
        <div className="absolute left-[26%] top-[9%]">
          <KonpeitoStar
            size="sm"
            glow
            variant="four-point"
            onClick={playStarBell}
            ariaLabel="Touch northern star"
          />
        </div>
        <div className="absolute left-[49%] top-[11%]">
          <KonpeitoStar
            size="md"
            glow
            variant="five-point"
            onClick={playStarBell}
            ariaLabel="Touch zenith star"
          />
        </div>
        <div className="absolute right-[27%] top-[15%]">
          <KonpeitoStar
            size="sm"
            glow
            variant="four-point"
            onClick={playStarBell}
            ariaLabel="Touch twilight star"
          />
        </div>
        <div className="absolute right-[9%] top-[22%]">
          <KonpeitoStar
            size="md"
            glow
            variant="five-point"
            onClick={playStarBell}
            ariaLabel="Touch evening star"
          />
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
        aria-hidden="true"
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

      {/* Interactive Crescent Moon in Upper Sky (Touches play soft "tin tin" bell + shimmer) */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
        style={{
          left: "var(--moon-x)",
          top: "var(--moon-y)",
          opacity: "var(--moon-alpha)",
        }}
      >
        <button
          type="button"
          onClick={handleMoonTap}
          aria-label="Touch the crescent moon"
          className="pointer-events-auto relative flex items-center justify-center rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none"
        >
          <svg
            viewBox="0 0 120 120"
            className={`w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-500 ${
              moonShimmer ? "scale-115" : "scale-100"
            }`}
          >
            <defs>
              <radialGradient id="kawaii-moon-halo" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="var(--color-starlight)"
                  stopOpacity={moonShimmer ? "0.75" : "0.45"}
                />
                <stop
                  offset="52%"
                  stopColor="var(--color-periwinkle)"
                  stopOpacity={moonShimmer ? "0.34" : "0.18"}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-periwinkle)"
                  stopOpacity="0"
                />
              </radialGradient>
            </defs>
            <circle
              cx="60"
              cy="60"
              r={moonShimmer ? "58" : "52"}
              fill="url(#kawaii-moon-halo)"
            />
            {/* Soft earthshine disc */}
            <circle
              cx="60"
              cy="60"
              r="23"
              fill="var(--color-periwinkle)"
              opacity="0.16"
            />
            {/* Unmistakable sculpted crescent moon silhouette */}
            <path
              d="M66 36 A24 24 0 1 0 82 77 A19.5 19.5 0 1 1 66 36 Z"
              fill="var(--color-butter-star)"
              stroke="var(--color-starlight)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Inner crescent highlight */}
            <path
              d="M62 41 A20 20 0 0 0 74 75 A18 18 0 0 1 62 41 Z"
              fill="var(--color-paper-cream)"
              opacity="0.65"
            />
            {/* Companion star beside moon */}
            <path
              d="M86 42 L87.8 46.2 L92 48 L87.8 49.8 L86 54 L84.2 49.8 L80 48 L84.2 46.2 Z"
              fill="var(--color-starlight)"
              opacity={moonShimmer ? "1" : "0.82"}
            />
          </svg>
        </button>
      </div>

      {/* Layer 3: 5 Drifting Layered Storybook Clouds Across Left, Center, and Right Sky */}
      <svg
        viewBox="0 0 1440 340"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-x-0 top-[9%] w-full h-[40vh] max-h-[310px]"
        aria-hidden="true"
      >
        {/* Cloud 1: Far-Left Upper Sky Cloud */}
        <g className={reducedMotion ? "" : "cloud-drift-1"} opacity="0.56">
          <path
            d="M40 165 H275 A25 25 0 0 0 300 140 A24 24 0 0 0 278 116 A36 36 0 0 0 242 86 A44 44 0 0 0 160 74 A38 38 0 0 0 92 94 A30 30 0 0 0 46 124 A20 20 0 0 0 24 145 A20 20 0 0 0 40 165 Z"
            fill="var(--cloud-fill)"
          />
          <path
            d="M92 97 A38 38 0 0 1 160 78 A44 44 0 0 1 240 90 C200 82 130 84 92 97 Z"
            fill="var(--cloud-highlight)"
            opacity="0.5"
          />
        </g>

        {/* Cloud 2: Left-Center Mid-Sky Cloud */}
        <g className={reducedMotion ? "" : "cloud-drift-4"} opacity="0.44">
          <path
            d="M330 235 H535 A22 22 0 0 0 557 213 A20 20 0 0 0 537 193 A32 32 0 0 0 505 168 A38 38 0 0 0 434 156 A34 34 0 0 0 374 174 A26 26 0 0 0 336 200 A18 18 0 0 0 330 235 Z"
            fill="var(--cloud-fill)"
          />
          <path
            d="M374 176 A34 34 0 0 1 434 160 A38 38 0 0 1 502 170 C468 163 408 165 374 176 Z"
            fill="var(--cloud-highlight)"
            opacity="0.42"
          />
        </g>

        {/* Cloud 3: Center-Sky High Drifting Cloud */}
        <g className={reducedMotion ? "" : "cloud-drift-3"} opacity="0.48">
          <path
            d="M610 142 H845 A24 24 0 0 0 869 118 A22 22 0 0 0 848 96 A35 35 0 0 0 812 68 A42 42 0 0 0 732 56 A36 36 0 0 0 666 74 A28 28 0 0 0 622 102 A20 20 0 0 0 610 142 Z"
            fill="var(--cloud-fill)"
          />
          <path
            d="M666 77 A36 36 0 0 1 732 60 A42 42 0 0 1 808 72 C770 64 702 66 666 77 Z"
            fill="var(--cloud-highlight)"
            opacity="0.46"
          />
        </g>

        {/* Cloud 4: Right-Center Mid-Sky Cloud */}
        <g className={reducedMotion ? "" : "cloud-drift-5"} opacity="0.45">
          <path
            d="M890 250 H1095 A22 22 0 0 0 1117 228 A21 21 0 0 0 1096 207 A32 32 0 0 0 1064 182 A38 38 0 0 0 992 170 A34 34 0 0 0 932 188 A26 26 0 0 0 894 214 A18 18 0 0 0 890 250 Z"
            fill="var(--cloud-fill)"
          />
          <path
            d="M932 190 A34 34 0 0 1 992 174 A38 38 0 0 1 1060 185 C1025 178 966 180 932 190 Z"
            fill="var(--cloud-highlight)"
            opacity="0.4"
          />
        </g>

        {/* Cloud 5: Far-Right Upper Sky Cloud */}
        <g className={reducedMotion ? "" : "cloud-drift-2"} opacity="0.54">
          <path
            d="M1110 188 H1375 A26 26 0 0 0 1401 162 A25 25 0 0 0 1378 137 A38 38 0 0 0 1338 106 A46 46 0 0 0 1250 92 A40 40 0 0 0 1178 112 A32 32 0 0 0 1128 142 A22 22 0 0 0 1110 188 Z"
            fill="var(--cloud-fill)"
          />
          <path
            d="M1178 115 A40 40 0 0 1 1250 96 A46 46 0 0 1 1335 110 C1292 102 1218 104 1178 115 Z"
            fill="var(--cloud-highlight)"
            opacity="0.48"
          />
        </g>
      </svg>

      {/* Layer 4: Coastal Night Horizon — Distant Headlands, Shimmering Moonlit Sea Waves, Swaying Trees, Rose Gardens & Terrace Candles */}
      <svg
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full h-[36vh] min-h-[210px] max-h-[340px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sea-deep-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#27225E" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#1B1642" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="wave-crest-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-periwinkle)" stopOpacity="0.16" />
            <stop offset="50%" stopColor="var(--color-starlight)" stopOpacity="0.46" />
            <stop offset="100%" stopColor="var(--color-periwinkle)" stopOpacity="0.16" />
          </linearGradient>

          <radialGradient id="terrace-candle-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-butter-star)" stopOpacity="0.65" />
            <stop offset="55%" stopColor="var(--color-peach-glow)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-peach-glow)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Distant Left & Right Coastal Headlands Framing the Sea Horizon */}
        <path
          d="M0 195 C145 148, 310 154, 490 198 L490 250 L0 250 Z"
          fill="var(--hill-far)"
          opacity="0.86"
        />
        <path
          d="M950 198 C1130 152, 1295 146, 1440 192 L1440 250 L950 250 Z"
          fill="var(--hill-far)"
          opacity="0.86"
        />

        {/* Calm Nighttime Ocean Horizon Band */}
        <rect
          x="0"
          y="194"
          width="1440"
          height="136"
          fill="url(#sea-deep-gradient)"
        />

        {/* Horizon Water Shimmer Line */}
        <line
          x1="0"
          y1="195"
          x2="1440"
          y2="195"
          stroke="url(#wave-crest-glow)"
          strokeWidth="1.6"
        />

        {/* Wave Layer 1: Far Ocean Swell */}
        <g className={reducedMotion ? "" : "ocean-wave-far"}>
          <path
            d="M-60 218 C140 204, 340 230, 540 216 C740 202, 940 228, 1140 215 C1300 205, 1410 222, 1500 216 L1500 320 L-60 320 Z"
            fill="#292464"
            opacity="0.78"
          />
          <path
            d="M-40 218 C140 204, 340 230, 540 216 C740 202, 940 228, 1140 215 C1300 205, 1410 222, 1480 216"
            fill="none"
            stroke="url(#wave-crest-glow)"
            strokeWidth="1.5"
          />
        </g>

        {/* Wave Layer 2: Mid Ocean Rollers */}
        <g className={reducedMotion ? "" : "ocean-wave-mid"}>
          <path
            d="M-60 242 C120 256, 310 228, 520 244 C730 260, 930 230, 1140 244 C1310 255, 1420 236, 1500 244 L1500 330 L-60 330 Z"
            fill="#322B74"
            opacity="0.82"
          />
          <path
            d="M-40 242 C120 256, 310 228, 520 244 C730 260, 930 230, 1140 244 C1310 255, 1420 236, 1480 244"
            fill="none"
            stroke="url(#wave-crest-glow)"
            strokeWidth="1.8"
          />
        </g>

        {/* Wave Layer 3: Near Coastal Waves */}
        <g className={reducedMotion ? "" : "ocean-wave-near"}>
          <path
            d="M-60 268 C160 252, 360 280, 580 266 C800 252, 1010 280, 1220 266 C1350 257, 1430 272, 1500 266 L1500 350 L-60 350 Z"
            fill="#3B3285"
            opacity="0.86"
          />
          <path
            d="M-40 268 C160 252, 360 280, 580 266 C800 252, 1010 280, 1220 266 C1350 257, 1430 272, 1480 266"
            fill="none"
            stroke="var(--color-periwinkle)"
            strokeOpacity="0.38"
            strokeWidth="2"
          />
        </g>

        {/* Wave Layer 4: Gentle Shore Ripple */}
        <g className={reducedMotion ? "" : "ocean-wave-shore"}>
          <path
            d="M-40 292 C180 302, 390 282, 620 294 C850 306, 1060 284, 1280 294 C1380 298, 1440 290, 1480 294"
            fill="none"
            stroke="var(--color-starlight)"
            strokeOpacity="0.34"
            strokeWidth="2.2"
          />
        </g>

        {/* Shimmering Moonlit Water Reflection Path Across the Sea */}
        <g transform="translate(980, 204)">
          <g className={reducedMotion ? "" : "water-reflection-shimmer"}>
            <ellipse cx="0" cy="6" rx="34" ry="2.2" fill="var(--color-starlight)" opacity="0.65" />
            <ellipse cx="-6" cy="18" rx="46" ry="2.6" fill="var(--color-butter-star)" opacity="0.52" />
            <ellipse cx="4" cy="32" rx="58" ry="3" fill="var(--color-starlight)" opacity="0.44" />
            <ellipse cx="-4" cy="48" rx="70" ry="3.4" fill="var(--color-periwinkle)" opacity="0.36" />
            <ellipse cx="2" cy="66" rx="82" ry="3.8" fill="var(--color-starlight)" opacity="0.28" />
          </g>
        </g>

        {/* Secondary Center-Left Starlight Water Glints */}
        <g transform="translate(460, 222)">
          <g className={reducedMotion ? "" : "water-reflection-shimmer"}>
            <ellipse cx="0" cy="0" rx="28" ry="1.8" fill="var(--color-periwinkle)" opacity="0.4" />
            <ellipse cx="8" cy="16" rx="38" ry="2.2" fill="var(--color-starlight)" opacity="0.32" />
            <ellipse cx="-4" cy="34" rx="46" ry="2.5" fill="var(--color-periwinkle)" opacity="0.26" />
          </g>
        </g>

        {/* Mid-Foreground Left & Right Coastal Garden Slopes Framing the Sea */}
        <path
          d="M0 246 C190 242, 360 278, 540 316 L0 340 Z"
          fill="var(--hill-mid)"
          opacity="0.96"
        />
        <path
          d="M1440 244 C1250 240, 1080 276, 900 316 L1440 340 Z"
          fill="var(--hill-mid)"
          opacity="0.96"
        />

        {/* Foreground Full-Width Garden Terrace & Coastal Meadow */}
        <path
          d="M0 302 C290 276, 560 318, 720 318 C880 318, 1150 276, 1440 302 L1440 420 L0 420 Z"
          fill="var(--hill-foreground)"
        />
        {/* Subtle Moonlit Rim on Foreground Terrace */}
        <path
          d="M0 302 C290 276, 560 318, 720 318 C880 318, 1150 276, 1440 302"
          fill="none"
          stroke="var(--color-periwinkle)"
          strokeOpacity="0.28"
          strokeWidth="2"
        />

        {/* ─── LEFT COASTAL GARDEN: Swaying Tree, Connected Branches/Leaves, Rose Bush & Terrace Candle ─── */}
        <g className={reducedMotion ? "" : "tree-sway-left"}>
          {/* Left Tree Trunk & Connected Branches */}
          <path
            d="M96 312 C98 265, 102 222, 112 172 C116 150, 134 128, 156 114 M106 218 C82 198, 62 182, 44 170 M110 192 C134 176, 158 166, 182 158"
            fill="none"
            stroke="#2B1E4A"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M99 312 C101 265, 105 222, 114 172"
            fill="none"
            stroke="#4B3878"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Left Tree Connected Foliage Canopy Clusters */}
          <g className={reducedMotion ? "" : "branch-breeze"}>
            <ellipse cx="52" cy="162" rx="46" ry="28" fill="#352766" />
            <ellipse cx="116" cy="134" rx="58" ry="34" fill="#3F2E78" />
            <ellipse cx="174" cy="154" rx="48" ry="28" fill="#352766" />
            <ellipse cx="144" cy="112" rx="46" ry="26" fill="#4D398E" />
            <ellipse cx="84" cy="122" rx="42" ry="24" fill="#5843A0" opacity="0.85" />
            {/* Blossom & Leaf Highlights on Left Canopy */}
            <circle cx="72" cy="118" r="6" fill="var(--color-sakura-pink)" opacity="0.78" />
            <circle cx="136" cy="106" r="7" fill="var(--color-sakura-pink)" opacity="0.82" />
            <circle cx="162" cy="124" r="5.5" fill="var(--color-paper-lavender)" opacity="0.75" />
            <circle cx="104" cy="136" r="5" fill="var(--color-mint-leaf)" opacity="0.65" />
            <circle cx="184" cy="148" r="6" fill="var(--color-sakura-pink)" opacity="0.72" />
          </g>
        </g>

        {/* Left Rose Bush on Garden Slope */}
        <g transform="translate(185, 272)">
          <g className={reducedMotion ? "" : "rose-sway"}>
            <ellipse cx="38" cy="28" rx="42" ry="20" fill="#2E4A4E" opacity="0.85" />
            <ellipse cx="64" cy="32" rx="34" ry="17" fill="#385B5F" opacity="0.85" />
            {/* Connected Rose Stems & Leaves */}
            <path
              d="M22 36 Q26 18 32 10 M46 36 Q48 16 54 8 M70 38 Q74 22 80 14"
              fill="none"
              stroke="#588B76"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Sculpted Layered Roses */}
            <g transform="translate(32, 10)">
              <circle cx="0" cy="0" r="7.5" fill="var(--color-sakura-deep)" />
              <circle cx="-1" cy="-1" r="4.8" fill="var(--color-sakura-pink)" />
              <circle cx="0" cy="-1.5" r="2.2" fill="var(--color-paper-cream)" opacity="0.8" />
            </g>
            <g transform="translate(54, 8)">
              <circle cx="0" cy="0" r="8.5" fill="var(--color-sakura-deep)" />
              <circle cx="1" cy="-1" r="5.4" fill="var(--color-sakura-pink)" />
              <circle cx="0.5" cy="-1.5" r="2.5" fill="var(--color-paper-cream)" opacity="0.85" />
            </g>
            <g transform="translate(80, 14)">
              <circle cx="0" cy="0" r="7" fill="var(--color-sakura-deep)" />
              <circle cx="-0.8" cy="-0.8" r="4.4" fill="var(--color-sakura-pink)" />
              <circle cx="0" cy="-1" r="2" fill="var(--color-paper-cream)" opacity="0.8" />
            </g>
          </g>
        </g>

        {/* Left Terrace Stone Plinth & Flickering Candle (Firmly Grounded) */}
        <g transform="translate(310, 286)">
          <circle cx="14" cy="6" r="28" fill="url(#terrace-candle-halo)" />
          {/* Stone garden ledge */}
          <rect x="0" y="22" width="28" height="7" rx="3.5" fill="#463772" stroke="#6E5BA6" strokeWidth="1" />
          {/* Cream pillar candle */}
          <rect x="8" y="8" width="12" height="15" rx="2.5" fill="var(--color-paper-cream)" stroke="#E5D9FA" strokeWidth="0.9" />
          {/* Wick */}
          <line x1="14" y1="5" x2="14" y2="8" stroke="#3B2C5E" strokeWidth="1.2" />
          {/* Flickering Flame */}
          <g className={reducedMotion ? "" : "candle-flicker"}>
            <path
              d="M14 -3 C17.5 1.5, 17.5 5.5, 14 7 C10.5 5.5, 10.5 1.5, 14 -3 Z"
              fill="var(--color-butter-star)"
            />
            <circle cx="14" cy="4.2" r="1.8" fill="var(--color-paper-cream)" />
          </g>
        </g>

        {/* ─── RIGHT COASTAL GARDEN: Swaying Tree, Connected Branches/Leaves, Rose Bush & Terrace Candle ─── */}
        <g className={reducedMotion ? "" : "tree-sway-right"}>
          {/* Right Tree Trunk & Connected Branches */}
          <path
            d="M1344 312 C1342 264, 1336 220, 1326 170 C1322 148, 1304 126, 1282 112 M1334 216 C1358 196, 1378 180, 1396 168 M1330 190 C1306 174, 1282 164, 1258 156"
            fill="none"
            stroke="#2B1E4A"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M1341 312 C1339 264, 1334 220, 1324 170"
            fill="none"
            stroke="#4B3878"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Right Tree Connected Foliage Canopy Clusters */}
          <g className={reducedMotion ? "" : "branch-breeze"}>
            <ellipse cx="1388" cy="160" rx="46" ry="28" fill="#352766" />
            <ellipse cx="1324" cy="132" rx="58" ry="34" fill="#3F2E78" />
            <ellipse cx="1266" cy="152" rx="48" ry="28" fill="#352766" />
            <ellipse cx="1296" cy="110" rx="46" ry="26" fill="#4D398E" />
            <ellipse cx="1356" cy="120" rx="42" ry="24" fill="#5843A0" opacity="0.85" />
            {/* Blossom & Leaf Highlights on Right Canopy */}
            <circle cx="1368" cy="116" r="6" fill="var(--color-sakura-pink)" opacity="0.78" />
            <circle cx="1304" cy="104" r="7" fill="var(--color-sakura-pink)" opacity="0.82" />
            <circle cx="1278" cy="122" r="5.5" fill="var(--color-paper-lavender)" opacity="0.75" />
            <circle cx="1336" cy="134" r="5" fill="var(--color-mint-leaf)" opacity="0.65" />
            <circle cx="1256" cy="146" r="6" fill="var(--color-sakura-pink)" opacity="0.72" />
          </g>
        </g>

        {/* Right Rose Bush on Garden Slope */}
        <g transform="translate(1155, 272)">
          <g className={reducedMotion ? "" : "rose-sway"}>
            <ellipse cx="62" cy="28" rx="42" ry="20" fill="#2E4A4E" opacity="0.85" />
            <ellipse cx="36" cy="32" rx="34" ry="17" fill="#385B5F" opacity="0.85" />
            {/* Connected Rose Stems & Leaves */}
            <path
              d="M20 38 Q24 22 30 14 M46 36 Q48 16 54 8 M74 36 Q78 18 84 10"
              fill="none"
              stroke="#588B76"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Sculpted Layered Roses */}
            <g transform="translate(30, 14)">
              <circle cx="0" cy="0" r="7" fill="var(--color-sakura-deep)" />
              <circle cx="0.8" cy="-0.8" r="4.4" fill="var(--color-sakura-pink)" />
              <circle cx="0" cy="-1" r="2" fill="var(--color-paper-cream)" opacity="0.8" />
            </g>
            <g transform="translate(54, 8)">
              <circle cx="0" cy="0" r="8.5" fill="var(--color-sakura-deep)" />
              <circle cx="-1" cy="-1" r="5.4" fill="var(--color-sakura-pink)" />
              <circle cx="-0.5" cy="-1.5" r="2.5" fill="var(--color-paper-cream)" opacity="0.85" />
            </g>
            <g transform="translate(84, 10)">
              <circle cx="0" cy="0" r="7.5" fill="var(--color-sakura-deep)" />
              <circle cx="1" cy="-1" r="4.8" fill="var(--color-sakura-pink)" />
              <circle cx="0" cy="-1.5" r="2.2" fill="var(--color-paper-cream)" opacity="0.8" />
            </g>
          </g>
        </g>

        {/* Right Terrace Stone Plinth & Flickering Candle (Firmly Grounded) */}
        <g transform="translate(1102, 286)">
          <circle cx="14" cy="6" r="28" fill="url(#terrace-candle-halo)" />
          {/* Stone garden ledge */}
          <rect x="0" y="22" width="28" height="7" rx="3.5" fill="#463772" stroke="#6E5BA6" strokeWidth="1" />
          {/* Cream pillar candle */}
          <rect x="8" y="8" width="12" height="15" rx="2.5" fill="var(--color-paper-cream)" stroke="#E5D9FA" strokeWidth="0.9" />
          {/* Wick */}
          <line x1="14" y1="5" x2="14" y2="8" stroke="#3B2C5E" strokeWidth="1.2" />
          {/* Flickering Flame */}
          <g className={reducedMotion ? "" : "candle-flicker"}>
            <path
              d="M14 -3 C17.5 1.5, 17.5 5.5, 14 7 C10.5 5.5, 10.5 1.5, 14 -3 Z"
              fill="var(--color-butter-star)"
            />
            <circle cx="14" cy="4.2" r="1.8" fill="var(--color-paper-cream)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
