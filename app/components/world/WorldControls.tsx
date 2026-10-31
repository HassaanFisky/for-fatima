"use client";

import React from "react";
import { Volume2, VolumeX, Sparkles, Compass } from "lucide-react";
import { useLivingWorld } from "./LivingWorldProvider";
import { formatLocalEventTime } from "../../lib/world/time";

export function WorldControls() {
  const {
    world,
    location,
    locationBusy,
    requestLocation,
    audioEnabled,
    toggleAudio,
  } = useLivingWorld();

  const isLocalSky = world.calculationMode === "device-location";
  const isDenied = location.permission === "denied";

  const statusText = isLocalSky
    ? `Your local sky \u00B7 ${world.phaseLabel}`
    : isDenied
      ? `Location is off \u00B7 ${world.phaseLabel}`
      : `A sky chosen for this gift \u00B7 ${world.phaseLabel}`;

  const clockFormatOptions = {
    timeZone: world.timezone,
    locale: "en",
  };

  const sunsetFormatted = formatLocalEventTime(world.sunset, clockFormatOptions);
  const sunriseFormatted = formatLocalEventTime(
    world.sunrise,
    clockFormatOptions
  );

  const nextTransitionText =
    sunsetFormatted && world.phase !== "night"
      ? `Sunset ${sunsetFormatted}`
      : sunriseFormatted
        ? `Sunrise ${sunriseFormatted}`
        : null;

  return (
    <header
      className="fixed top-0 inset-x-0 z-30 pointer-events-none px-4 sm:px-6"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 12px)",
      }}
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Truthful Sky Status Pill & Optional Location Invitation */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold paper-pill-surface shadow-sm">
            <Sparkles
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: "var(--color-royal-violet)" }}
              aria-hidden="true"
            />
            <span style={{ color: "var(--color-ink-plum)" }}>{statusText}</span>
            {nextTransitionText && (
              <span
                className="hidden sm:inline text-[11px] font-normal"
                style={{ color: "var(--color-ink-muted)" }}
              >
                ({nextTransitionText})
              </span>
            )}
          </div>

          {!isLocalSky && !isDenied && (
            <button
              type="button"
              onClick={() => void requestLocation()}
              disabled={locationBusy}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold paper-pill-surface transition-transform active:scale-95 min-h-[36px]"
              style={{ color: "var(--color-royal-violet)" }}
              aria-label="Let this sky follow where I am"
            >
              <Compass className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>
                {locationBusy
                  ? "Reading sky"
                  : "Let this sky follow where I am"}
              </span>
            </button>
          )}
        </div>

        {/* Right: Single 44x44px Paper Audio Button (Muted by Default) */}
        <button
          type="button"
          onClick={() => void toggleAudio()}
          aria-pressed={audioEnabled}
          aria-label={
            !audioEnabled
              ? "Turn on gentle night-sky music"
              : "Mute night-sky music"
          }
          title={!audioEnabled ? "Sound off" : "Sound on"}
          className="pointer-events-auto w-11 h-11 rounded-full flex items-center justify-center paper-pill-surface transition-transform active:scale-95 shrink-0"
          style={{ color: "var(--color-ink-plum)" }}
        >
          {!audioEnabled ? (
            <VolumeX className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Volume2
              className="w-4 h-4"
              style={{ color: "var(--color-royal-violet)" }}
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </header>
  );
}
