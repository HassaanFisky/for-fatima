"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { WorldPhase } from "../../lib/world/world-state";
import { KonpeitoCandy } from "./Konpeito";

/**
 * Reusable Mochi Bear SVG group (2.5 heads tall, three-quarter front view, outline-free).
 * Tapping Mochi's Royal Violet scarf triggers a brief flutter without any rectangular outline.
 */
export function MochiSvgGroup({
  x = 0,
  y = 0,
  scale = 1,
  armPose = "hold-right",
  sleeping = false,
  onScarfTap,
}: {
  x?: number;
  y?: number;
  scale?: number;
  armPose?: "hold-right" | "offer" | "rest" | "read";
  sleeping?: boolean;
  onScarfTap?: () => void;
}) {
  const [flutter, setFlutter] = useState(false);

  const handleTap = () => {
    setFlutter(true);
    onScarfTap?.();
    window.setTimeout(() => setFlutter(false), 650);
  };

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Soft ground shadow on foreground stage */}
      <ellipse
        cx="50"
        cy="106"
        rx="28"
        ry="6"
        fill="var(--color-dusk-lavender)"
        opacity="0.22"
      />

      {/* Stubby legs */}
      <rect
        x="30"
        y="88"
        width="14"
        height="18"
        rx="7"
        fill="var(--color-mochi-shadow)"
      />
      <rect
        x="54"
        y="88"
        width="14"
        height="18"
        rx="7"
        fill="var(--color-mochi-base)"
      />

      {/* Rounded trapezoid body */}
      <rect
        x="24"
        y="52"
        width="50"
        height="44"
        rx="22"
        fill="var(--color-mochi-base)"
      />
      {/* Two-tone body shadow (bottom-right) */}
      <path
        d="M34 86 C52 86 66 74 68 58 C72 64 74 72 74 76 C74 88 64 96 52 96 L38 96 C32 96 28 92 27 87 Z"
        fill="var(--color-mochi-shadow)"
      />
      {/* Warm sunset rim light overlay */}
      <path
        d="M24 72 C24 60 32 52 44 52 L38 52 C29 52 24 60 24 72 C24 84 30 92 38 95 C30 90 24 82 24 72 Z"
        fill="var(--color-soft-peach)"
        style={{ opacity: "var(--warm-rim-alpha, 0)" }}
      />

      {/* Left arm */}
      <rect
        x="16"
        y="58"
        width="14"
        height="24"
        rx="7"
        transform="rotate(14 23 65)"
        fill="var(--color-mochi-shadow)"
      />

      {/* Right arm by pose */}
      {armPose === "offer" ? (
        <rect
          x="64"
          y="50"
          width="15"
          height="26"
          rx="7.5"
          transform="rotate(-38 70 60)"
          fill="var(--color-mochi-base)"
        />
      ) : armPose === "read" ? (
        <rect
          x="58"
          y="60"
          width="15"
          height="22"
          rx="7.5"
          transform="rotate(24 65 68)"
          fill="var(--color-mochi-base)"
        />
      ) : (
        <rect
          x="64"
          y="56"
          width="15"
          height="25"
          rx="7.5"
          transform="rotate(-22 70 64)"
          fill="var(--color-mochi-base)"
        />
      )}

      {/* Ears */}
      <circle cx="26" cy="20" r="11" fill="var(--color-mochi-shadow)" />
      <circle cx="26" cy="20" r="5.5" fill="var(--color-butter-yellow)" />
      <circle cx="72" cy="20" r="11" fill="var(--color-mochi-base)" />
      <circle cx="72" cy="20" r="5.5" fill="var(--color-butter-yellow)" />

      {/* Head (55% of total height, rounded) */}
      <rect
        x="18"
        y="14"
        width="62"
        height="48"
        rx="24"
        fill="var(--color-mochi-base)"
      />
      {/* Head two-tone shadow */}
      <path
        d="M30 56 C55 56 72 44 75 26 C79 32 80 39 80 42 C80 54 70 62 56 62 L36 62 C28 62 22 59 20 54 Z"
        fill="var(--color-mochi-shadow)"
      />
      {/* Cool moonlight top-left highlight dot */}
      <circle
        cx="31"
        cy="24"
        r="3.2"
        fill="var(--color-cream-paper)"
        opacity="0.85"
      />

      {/* Butter muzzle */}
      <ellipse
        cx="50"
        cy="44"
        rx="11"
        ry="7.5"
        fill="var(--color-butter-yellow)"
      />

      {/* Blush ovals (Sakura Pink at 60%) */}
      <ellipse
        cx="31"
        cy="43"
        rx="5.5"
        ry="3.2"
        fill="var(--color-sakura-pink)"
        opacity="0.6"
      />
      <ellipse
        cx="69"
        cy="43"
        rx="5.5"
        ry="3.2"
        fill="var(--color-sakura-pink)"
        opacity="0.6"
      />

      {/* Sleepy content eyes */}
      {sleeping ? (
        <>
          <path
            d="M33 37 Q37 40 41 37"
            stroke="var(--color-ink-violet)"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M59 37 Q63 40 67 37"
            stroke="var(--color-ink-violet)"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : (
        <>
          <ellipse
            cx="37"
            cy="36.5"
            rx="3.2"
            ry="2.2"
            fill="var(--color-ink-violet)"
          />
          <ellipse
            cx="63"
            cy="36.5"
            rx="3.2"
            ry="2.2"
            fill="var(--color-ink-violet)"
          />
        </>
      )}

      {/* Tiny nose & omega mouth */}
      <ellipse cx="50" cy="41.5" rx="2.4" ry="1.7" fill="var(--color-ink-violet)" />
      <path
        d="M46.5 45 Q48.2 47 50 45 Q51.8 47 53.5 45"
        stroke="var(--color-ink-violet)"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />

      {/* Signature Royal Violet Scarf (Tappable, zero rectangular outline) */}
      <g
        onClick={handleTap}
        className="focus:outline-none select-none"
        style={{
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
          outline: "none",
        }}
      >
        <rect
          x="26"
          y="54"
          width="46"
          height="10"
          rx="5"
          fill="var(--color-royal-violet)"
        />
        <motion.g
          animate={
            flutter
              ? { rotate: [0, -14, 10, -6, 0] }
              : { rotate: 0 }
          }
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "58px 60px" }}
        >
          <rect
            x="53"
            y="58"
            width="11"
            height="20"
            rx="5.5"
            fill="var(--color-royal-violet)"
          />
          <rect
            x="55"
            y="72"
            width="7"
            height="3"
            rx="1.5"
            fill="var(--color-amethyst-dream)"
          />
        </motion.g>
      </g>
    </g>
  );
}

/**
 * Reusable Yume Bear SVG group (10% smaller than Mochi, Lavender fur, Sakura Pink bow on left ear).
 * Tapping Yume's bow triggers a tiny bounce without any browser outline.
 */
export function YumeSvgGroup({
  x = 0,
  y = 0,
  scale = 0.9,
  armPose = "point-up",
  sleeping = false,
  onBowTap,
}: {
  x?: number;
  y?: number;
  scale?: number;
  armPose?: "point-up" | "catch" | "rest" | "peer";
  sleeping?: boolean;
  onBowTap?: () => void;
}) {
  const [bounce, setBounce] = useState(false);

  const handleBowTap = () => {
    setBounce(true);
    onBowTap?.();
    window.setTimeout(() => setBounce(false), 600);
  };

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Soft ground shadow */}
      <ellipse
        cx="50"
        cy="106"
        rx="26"
        ry="5.5"
        fill="var(--color-dusk-lavender)"
        opacity="0.22"
      />

      {/* Stubby legs */}
      <rect
        x="31"
        y="88"
        width="13"
        height="17"
        rx="6.5"
        fill="var(--color-yume-shadow)"
      />
      <rect
        x="54"
        y="88"
        width="13"
        height="17"
        rx="6.5"
        fill="var(--color-yume-base)"
      />

      {/* Body */}
      <rect
        x="25"
        y="53"
        width="48"
        height="42"
        rx="21"
        fill="var(--color-yume-base)"
      />
      <path
        d="M34 86 C52 86 65 75 67 59 C71 65 73 72 73 76 C73 87 63 95 51 95 L38 95 C32 95 28 91 27 86 Z"
        fill="var(--color-yume-shadow)"
      />

      {/* Left arm */}
      <rect
        x="17"
        y="58"
        width="13"
        height="22"
        rx="6.5"
        transform="rotate(16 23 65)"
        fill="var(--color-yume-shadow)"
      />

      {/* Right arm */}
      {armPose === "point-up" || armPose === "catch" ? (
        <rect
          x="64"
          y="42"
          width="13"
          height="26"
          rx="6.5"
          transform="rotate(-48 68 54)"
          fill="var(--color-yume-base)"
        />
      ) : (
        <rect
          x="62"
          y="58"
          width="13"
          height="22"
          rx="6.5"
          transform="rotate(-14 68 64)"
          fill="var(--color-yume-base)"
        />
      )}

      {/* Ears */}
      <circle cx="27" cy="21" r="10.5" fill="var(--color-yume-shadow)" />
      <circle cx="27" cy="21" r="5" fill="var(--color-lavender-paper)" />
      <circle cx="71" cy="21" r="10.5" fill="var(--color-yume-base)" />
      <circle cx="71" cy="21" r="5" fill="var(--color-lavender-paper)" />

      {/* Head */}
      <rect
        x="19"
        y="15"
        width="60"
        height="46"
        rx="23"
        fill="var(--color-yume-base)"
      />
      <path
        d="M31 55 C54 55 70 43 73 27 C77 33 79 39 79 42 C79 53 69 61 55 61 L36 61 C29 61 23 58 21 53 Z"
        fill="var(--color-yume-shadow)"
      />
      <circle
        cx="32"
        cy="25"
        r="3"
        fill="var(--color-cream-paper)"
        opacity="0.85"
      />

      {/* Lavender Paper muzzle */}
      <ellipse
        cx="49"
        cy="44"
        rx="10.5"
        ry="7"
        fill="var(--color-lavender-paper)"
      />

      {/* Blush ovals */}
      <ellipse
        cx="31"
        cy="43"
        rx="5"
        ry="3"
        fill="var(--color-sakura-pink)"
        opacity="0.6"
      />
      <ellipse
        cx="67"
        cy="43"
        rx="5"
        ry="3"
        fill="var(--color-sakura-pink)"
        opacity="0.6"
      />

      {/* Curious bright round bead eyes */}
      {sleeping ? (
        <>
          <path
            d="M33 36.5 Q37 39.5 41 36.5"
            stroke="var(--color-ink-violet)"
            strokeWidth="2.3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M57 36.5 Q61 39.5 65 36.5"
            stroke="var(--color-ink-violet)"
            strokeWidth="2.3"
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : (
        <>
          <circle cx="37" cy="36" r="3.3" fill="var(--color-ink-violet)" />
          <circle cx="61" cy="36" r="3.3" fill="var(--color-ink-violet)" />
        </>
      )}

      {/* Nose & tiny mouth */}
      <ellipse cx="49" cy="41.5" rx="2.2" ry="1.6" fill="var(--color-ink-violet)" />
      <path
        d="M46 45 Q49 47.2 52 45"
        stroke="var(--color-ink-violet)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Signature Sakura Pink Bow on Left Ear (Tappable, zero rectangular outline) */}
      <motion.g
        onClick={handleBowTap}
        animate={bounce ? { scale: [1, 1.24, 0.92, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
        className="focus:outline-none select-none"
        style={{
          transformOrigin: "29px 15px",
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
          outline: "none",
        }}
      >
        <ellipse
          cx="22"
          cy="14"
          rx="6.5"
          ry="4.2"
          transform="rotate(-18 22 14)"
          fill="var(--color-sakura-pink)"
        />
        <ellipse
          cx="35"
          cy="16"
          rx="6.5"
          ry="4.2"
          transform="rotate(18 35 16)"
          fill="var(--color-sakura-pink)"
        />
        <circle cx="28.5" cy="15" r="3" fill="var(--color-soft-peach)" />
      </motion.g>
    </g>
  );
}

/**
 * 1. OPENING THRESHOLD ILLUSTRATION (Pose #1)
 * Mochi and Yume resting on a foreground hill stage cushion under the Karachi sky.
 */
export function OpeningCloudScene({
  phase,
  lanternBoost = false,
  onInteraction,
}: {
  phase: WorldPhase;
  lanternBoost?: boolean;
  onInteraction?: () => void;
}) {
  const isResting = phase === "preDawn";
  const isReading = phase === "afternoon" || phase === "goldenHour";
  const isMorning = phase === "sunrise" || phase === "morning";
  const lanternLit =
    phase === "night" ||
    phase === "blueHour" ||
    phase === "sunset" ||
    lanternBoost;

  return (
    <div className="relative mx-auto w-full max-w-[300px] flex justify-center select-none">
      <svg
        viewBox="0 0 320 180"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Mochi and Yume resting on a foreground stage hill under the Karachi sky"
      >
        <defs>
          <radialGradient id="opening-lantern-glow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="var(--color-starlight)"
              stopOpacity={lanternBoost ? "0.85" : "0.55"}
            />
            <stop
              offset="60%"
              stopColor="var(--color-butter-yellow)"
              stopOpacity="0.22"
            />
            <stop
              offset="100%"
              stopColor="var(--color-butter-yellow)"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* Believable Foreground Hill Stage Cushion */}
        <ellipse
          cx="160"
          cy="152"
          rx="132"
          ry="22"
          fill="var(--color-dusk-lavender)"
          opacity="0.35"
        />
        <path
          d="M28 148 C44 120, 100 112, 160 112 C220 112, 276 120, 292 148 C298 160, 268 168, 160 168 C52 168, 22 160, 28 148 Z"
          fill="var(--color-lavender-paper)"
          opacity="0.96"
        />
        <path
          d="M52 126 C98 114, 222 114, 268 126"
          stroke="var(--color-cream-paper)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />

        {/* Mochi on the left of the stage */}
        <MochiSvgGroup
          x={68}
          y={34}
          scale={0.95}
          sleeping={isResting}
          armPose={isReading ? "read" : "hold-right"}
          onScarfTap={onInteraction}
        />

        {/* Yume on the right of the stage */}
        <YumeSvgGroup
          x={162}
          y={44}
          scale={0.86}
          sleeping={isResting}
          armPose={
            isResting || isReading
              ? "rest"
              : isMorning
                ? "catch"
                : "point-up"
          }
          onBowTap={onInteraction}
        />

        {/* Pose-specific prop: Reading a cream letter in Afternoon/Golden Hour */}
        {isReading && (
          <g transform="translate(142, 92)">
            <rect
              x="0"
              y="0"
              width="34"
              height="24"
              rx="4"
              transform="rotate(-8 17 12)"
              fill="var(--color-cream-paper)"
            />
            <line
              x1="6"
              y1="8"
              x2="24"
              y2="6"
              stroke="var(--color-royal-violet)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="7"
              y1="14"
              x2="22"
              y2="12"
              stroke="var(--color-amethyst-dream)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Pose-specific prop: Mochi's paper lantern */}
        {!isReading && (
          <g transform="translate(138, 72)">
            {lanternLit && (
              <circle
                cx="16"
                cy="24"
                r={lanternBoost ? "34" : "24"}
                fill="url(#opening-lantern-glow)"
              />
            )}
            <path
              d="M8 10 Q16 2 24 10"
              stroke="var(--color-royal-violet)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <rect
              x="6"
              y="10"
              width="20"
              height="26"
              rx="9"
              fill={
                lanternLit
                  ? "var(--color-butter-yellow)"
                  : "var(--color-cream-paper)"
              }
            />
            {lanternLit && (
              <ellipse
                cx="16"
                cy="23"
                rx="6"
                ry="8"
                fill="var(--color-starlight)"
              />
            )}
            <rect
              x="10"
              y="8"
              width="12"
              height="3.5"
              rx="1.5"
              fill="var(--color-royal-violet)"
            />
            <rect
              x="10"
              y="34"
              width="12"
              height="3.5"
              rx="1.5"
              fill="var(--color-royal-violet)"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

/**
 * 2. LETTER INTRO ILLUSTRATION (Pose #2)
 * Yume catching a drifting sakura petal on a soft stage cushion.
 */
export function StoryPetalScene() {
  return (
    <div className="mx-auto w-[112px] h-[112px] flex items-center justify-center select-none">
      <svg
        viewBox="0 0 130 130"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Yume reaching toward a drifting sakura petal"
      >
        <ellipse
          cx="65"
          cy="114"
          rx="44"
          ry="11"
          fill="var(--color-lavender-paper)"
          opacity="0.94"
        />
        <YumeSvgGroup x={18} y={14} scale={0.88} armPose="catch" />
        <path
          d="M98 28 C104 22 114 26 112 34 C110 42 100 44 96 38 C93 34 95 30 98 28 Z"
          fill="var(--color-sakura-pink)"
        />
      </svg>
    </div>
  );
}

/**
 * 3. NOTICED THINGS ILLUSTRATION (Pose #3)
 * Small Mochi holding his warm paper lantern.
 */
export function NotesLanternScene() {
  return (
    <div className="mx-auto w-[108px] h-[108px] flex items-center justify-center select-none">
      <svg
        viewBox="0 0 130 130"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Mochi holding a warm paper lantern"
      >
        <ellipse
          cx="62"
          cy="114"
          rx="44"
          ry="11"
          fill="var(--color-lavender-paper)"
          opacity="0.94"
        />
        <MochiSvgGroup x={12} y={12} scale={0.88} armPose="hold-right" />
        <g transform="translate(86, 52)">
          <circle
            cx="12"
            cy="18"
            r="18"
            fill="var(--color-butter-yellow)"
            opacity="0.3"
          />
          <rect
            x="4"
            y="8"
            width="16"
            height="20"
            rx="7"
            fill="var(--color-butter-yellow)"
          />
          <circle cx="12" cy="18" r="5" fill="var(--color-starlight)" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 4. KEEPSAKES ILLUSTRATION (Pose #4)
 * Mochi and Yume peering at the glass jar of Konpeitō sugar-star candies on a cream shelf.
 */
export function KeepsakesJarScene() {
  return (
    <div className="mx-auto w-full max-w-[236px] flex justify-center select-none">
      <svg
        viewBox="0 0 260 135"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Mochi and Yume beside a glass jar of konpeitō star candies"
      >
        <rect
          x="18"
          y="108"
          width="224"
          height="14"
          rx="7"
          fill="var(--color-cream-paper)"
        />
        <MochiSvgGroup x={22} y={12} scale={0.86} armPose="hold-right" />

        <g transform="translate(108, 38)">
          <rect
            x="10"
            y="0"
            width="24"
            height="7"
            rx="3.5"
            fill="var(--color-royal-violet)"
          />
          <rect
            x="4"
            y="7"
            width="36"
            height="48"
            rx="12"
            fill="var(--color-lavender-paper)"
            opacity="0.92"
          />
          <circle cx="15" cy="44" r="5.5" fill="var(--color-sakura-pink)" />
          <circle cx="28" cy="45" r="5.5" fill="var(--color-butter-yellow)" />
          <circle cx="21" cy="35" r="5.5" fill="var(--color-periwinkle)" />
          <circle cx="13" cy="32" r="5" fill="var(--color-soft-peach)" />
          <circle cx="29" cy="33" r="5" fill="var(--color-butter-yellow)" />
          <rect
            x="9"
            y="13"
            width="4"
            height="28"
            rx="2"
            fill="var(--color-cream-paper)"
            opacity="0.8"
          />
        </g>

        <YumeSvgGroup x={154} y={20} scale={0.78} armPose="peer" />
      </svg>
    </div>
  );
}

/**
 * 5. GARDEN ILLUSTRATION (Pose #5)
 * Mochi offering a single round-petal flower on a stage cushion.
 */
export function FlowersOfferScene() {
  return (
    <div className="w-[122px] h-[114px] flex items-center justify-center select-none">
      <svg
        viewBox="0 0 140 130"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Mochi offering a soft round-petal flower"
      >
        <ellipse
          cx="64"
          cy="115"
          rx="46"
          ry="10"
          fill="var(--color-lavender-paper)"
          opacity="0.92"
        />
        <MochiSvgGroup x={10} y={14} scale={0.9} armPose="offer" />
        <g transform="translate(96, 48)">
          <rect
            x="-1.5"
            y="8"
            width="3"
            height="22"
            rx="1.5"
            fill="var(--color-royal-violet)"
          />
          {[0, 72, 144, 216, 288].map((deg) => (
            <circle
              key={deg}
              cx="0"
              cy="-7"
              r="5.5"
              fill="var(--color-sakura-pink)"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle cx="0" cy="0" r="4.2" fill="var(--color-ink-violet)" />
          <circle cx="-1.2" cy="-1.2" r="1.2" fill="var(--color-cream-paper)" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 6. STARS ILLUSTRATION (Pose #6)
 * Yume sitting quietly on the soft crescent moon in the corner of the constellation sky.
 */
export function StarsMoonScene() {
  return (
    <div className="w-[82px] h-[82px] select-none pointer-events-none">
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Yume sitting on a soft crescent moon"
      >
        <path
          d="M78 14 C46 18 24 44 24 74 C24 98 44 114 72 114 C40 118 12 94 12 60 C12 28 42 6 78 14 Z"
          fill="var(--color-starlight)"
        />
        <path
          d="M72 16 C44 22 26 46 26 74 C26 94 42 109 64 112 C40 112 20 92 20 64 C20 36 42 16 72 16 Z"
          fill="var(--color-butter-yellow)"
          opacity="0.55"
        />
        <YumeSvgGroup x={28} y={24} scale={0.58} armPose="point-up" />
      </svg>
    </div>
  );
}

/**
 * 7. GIFT ILLUSTRATION (Pose #7)
 * Mochi and Yume beside the Lavender Paper wrapped box with Royal Violet ribbon.
 */
export function GiftBoxScene({
  unwrapped,
  onToggleUnwrap,
}: {
  unwrapped: boolean;
  onToggleUnwrap: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-[260px] flex flex-col items-center select-none">
      <svg
        viewBox="0 0 290 150"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Mochi and Yume beside a wrapped gift box"
      >
        <ellipse
          cx="145"
          cy="132"
          rx="112"
          ry="14"
          fill="var(--color-lavender-paper)"
          opacity="0.92"
        />

        <MochiSvgGroup x={20} y={22} scale={0.86} armPose="hold-right" />
        <YumeSvgGroup x={182} y={30} scale={0.78} armPose="peer" />

        {/* Center Wrapped Box (zero rectangular outline) */}
        <g
          onClick={onToggleUnwrap}
          className="focus:outline-none select-none"
          style={{
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            outline: "none",
          }}
        >
          <rect
            x="108"
            y="74"
            width="68"
            height="52"
            rx="10"
            fill="var(--color-lavender-paper)"
          />
          <circle
            cx="124"
            cy="96"
            r="4"
            fill="var(--color-yume-base)"
            opacity="0.65"
          />
          <circle
            cx="160"
            cy="106"
            r="4"
            fill="var(--color-yume-base)"
            opacity="0.65"
          />
          <rect
            x="137"
            y="74"
            width="10"
            height="52"
            fill="var(--color-royal-violet)"
          />

          {unwrapped && (
            <motion.g
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: -16 }}
              transition={{ duration: 0.55 }}
            >
              <circle
                cx="124"
                cy="62"
                r="5.5"
                fill="var(--color-sakura-pink)"
              />
              <circle
                cx="142"
                cy="54"
                r="6"
                fill="var(--color-butter-yellow)"
              />
              <circle
                cx="160"
                cy="62"
                r="5.5"
                fill="var(--color-periwinkle)"
              />
            </motion.g>
          )}

          <motion.g
            animate={
              unwrapped
                ? { y: -18, rotate: -8 }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "142px 70px" }}
          >
            <rect
              x="104"
              y="62"
              width="76"
              height="15"
              rx="6"
              fill="var(--color-cream-paper)"
            />
            <rect
              x="137"
              y="62"
              width="10"
              height="15"
              fill="var(--color-royal-violet)"
            />
            <ellipse
              cx="132"
              cy="57"
              rx="10"
              ry="6"
              transform="rotate(-16 132 57)"
              fill="var(--color-royal-violet)"
            />
            <ellipse
              cx="152"
              cy="57"
              rx="10"
              ry="6"
              transform="rotate(16 152 57)"
              fill="var(--color-royal-violet)"
            />
            <circle
              cx="142"
              cy="59"
              r="4.5"
              fill="var(--color-amethyst-dream)"
            />
          </motion.g>
        </g>
      </svg>

      <div className="flex items-center gap-2 mt-0.5" aria-hidden="true">
        <KonpeitoCandy flavor="sakura" size={13} />
        <KonpeitoCandy flavor="butter" size={13} />
        <KonpeitoCandy flavor="periwinkle" size={13} />
      </div>
    </div>
  );
}

/**
 * 8. CLOSING ILLUSTRATION (Pose #8)
 * Mochi and Yume seen from behind on a foreground stage hill looking out at the night sky.
 */
export function ClosingBackScene() {
  return (
    <div className="mx-auto w-full max-w-[240px] flex justify-center select-none">
      <svg
        viewBox="0 0 280 150"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Mochi and Yume sitting together from behind, looking out at the sky"
      >
        <ellipse
          cx="140"
          cy="128"
          rx="114"
          ry="18"
          fill="var(--color-dusk-lavender)"
          opacity="0.38"
        />
        <path
          d="M28 126 C44 102, 92 96, 140 96 C188 96, 236 102, 252 126 C258 136, 232 142, 140 142 C48 142, 22 136, 28 126 Z"
          fill="var(--color-lavender-paper)"
          opacity="0.95"
        />

        {/* Mochi from behind (left) */}
        <g transform="translate(66, 22) scale(0.88)">
          <circle cx="26" cy="20" r="10.5" fill="var(--color-mochi-shadow)" />
          <circle cx="72" cy="20" r="10.5" fill="var(--color-mochi-base)" />
          <rect
            x="24"
            y="50"
            width="50"
            height="44"
            rx="22"
            fill="var(--color-mochi-base)"
          />
          <rect
            x="18"
            y="14"
            width="62"
            height="46"
            rx="23"
            fill="var(--color-mochi-base)"
          />
          <rect
            x="25"
            y="52"
            width="48"
            height="10"
            rx="5"
            fill="var(--color-royal-violet)"
          />
          <rect
            x="38"
            y="56"
            width="10"
            height="22"
            rx="5"
            fill="var(--color-royal-violet)"
          />
          <rect
            x="50"
            y="56"
            width="9"
            height="18"
            rx="4.5"
            fill="var(--color-amethyst-dream)"
          />
          <circle cx="49" cy="88" r="6" fill="var(--color-mochi-shadow)" />
        </g>

        {/* Yume from behind (right) */}
        <g transform="translate(142, 30) scale(0.8)">
          <circle cx="27" cy="21" r="10" fill="var(--color-yume-shadow)" />
          <circle cx="71" cy="21" r="10" fill="var(--color-yume-base)" />
          <rect
            x="25"
            y="52"
            width="48"
            height="42"
            rx="21"
            fill="var(--color-yume-base)"
          />
          <rect
            x="19"
            y="15"
            width="60"
            height="45"
            rx="22.5"
            fill="var(--color-yume-base)"
          />
          <ellipse
            cx="22"
            cy="14"
            rx="6"
            ry="4"
            transform="rotate(-18 22 14)"
            fill="var(--color-sakura-pink)"
          />
          <ellipse
            cx="34"
            cy="16"
            rx="6"
            ry="4"
            transform="rotate(18 34 16)"
            fill="var(--color-sakura-pink)"
          />
          <circle cx="28" cy="15" r="2.8" fill="var(--color-soft-peach)" />
          <circle cx="49" cy="88" r="5.5" fill="var(--color-yume-shadow)" />
        </g>
      </svg>
    </div>
  );
}
