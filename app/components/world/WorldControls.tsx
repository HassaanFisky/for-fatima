"use client";

import React from "react";
import { useLivingWorld } from "./LivingWorldProvider";
import { STORY_SCENES } from "../../config/personal";
import {
  KonpeitoWaveMark,
  IconSoundOn,
  IconSoundMuted,
} from "../icons/StoryIcons";

export function WorldControls({ activeScene = 0 }: { activeScene?: number }) {
  const { world, audioEnabled, toggleAudio } = useLivingWorld();
  const sceneMeta = STORY_SCENES[activeScene] ?? STORY_SCENES[0];

  return (
    <header
      className="fixed top-0 inset-x-0 z-30 pointer-events-none px-4 sm:px-6"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 12px)",
      }}
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Original Identity Mark + Scene Indicator + Living Sky Phase */}
        <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full pl-2.5 pr-4 py-1.5 text-xs font-semibold paper-pill-surface">
          <KonpeitoWaveMark size={20} />
          <span
            className="font-display font-bold tracking-tight"
            style={{ color: "var(--color-ink-plum)" }}
          >
            {sceneMeta.index + 1} / {STORY_SCENES.length} · {sceneMeta.title}
          </span>
          <span
            aria-hidden="true"
            className="hidden sm:inline opacity-40"
            style={{ color: "var(--color-ink-muted)" }}
          >
            |
          </span>
          <span
            className="hidden sm:inline text-[11px] font-medium"
            style={{ color: "var(--color-ink-muted)" }}
          >
            {world.phaseLabel}
          </span>
        </div>

        {/* Right: Persistent 44x44px Audio Mute/Unmute Control (Sound ON by default) */}
        <button
          type="button"
          data-audio-toggle="true"
          onClick={() => void toggleAudio()}
          aria-pressed={audioEnabled}
          aria-label={
            audioEnabled
              ? "Mute ambient night-sky sound"
              : "Unmute ambient night-sky sound"
          }
          title={audioEnabled ? "Sound on (tap to mute)" : "Sound muted (tap to unmute)"}
          className="pointer-events-auto h-11 px-3.5 rounded-full inline-flex items-center justify-center gap-1.5 paper-pill-surface transition-transform active:scale-95 shrink-0 min-w-[44px]"
          style={{
            color: audioEnabled
              ? "var(--color-royal-violet)"
              : "var(--color-ink-muted)",
          }}
        >
          {audioEnabled ? (
            <IconSoundOn size={18} />
          ) : (
            <IconSoundMuted size={18} />
          )}
          <span className="hidden sm:inline text-xs font-semibold">
            {audioEnabled ? "Sound on" : "Muted"}
          </span>
        </button>
      </div>
    </header>
  );
}
