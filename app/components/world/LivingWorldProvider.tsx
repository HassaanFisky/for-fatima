"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { usePageActivity } from "../../hooks/usePageActivity";
import {
  calculateAstronomy,
  type AstronomySnapshot,
} from "../../lib/world/astronomy";
import {
  createFallbackResolution,
  requestLocationFromUser,
  resolveLocationWithoutPrompt,
  type CreatorFallbackCoordinate,
  type LocationResolution,
} from "../../lib/world/location";
import { readDeviceClock } from "../../lib/world/time";
import {
  buildWorldState,
  type WorldPhase,
  type WorldState,
} from "../../lib/world/world-state";
import { AmbientAudioEngine } from "../../lib/world/ambient-audio";

interface LivingWorldOptions {
  fallback?: CreatorFallbackCoordinate;
  tickMs?: number;
}

export interface LivingWorldValue {
  world: WorldState;
  location: LocationResolution;
  locationBusy: boolean;
  reducedMotion: boolean;
  visible: boolean;
  audioEnabled: boolean;
  audioSupported: boolean;
  constellationFocused: boolean;
  setConstellationFocused: (focused: boolean) => void;
  requestLocation: () => Promise<LocationResolution>;
  refreshSky: () => void;
  toggleAudio: () => Promise<void>;
  playNote: (step?: number) => void;
  playChord: () => void;
}

const LivingWorldContext = createContext<LivingWorldValue | null>(null);

const INITIAL_NIGHT_CLOCK = readDeviceClock(new Date(2026, 9, 31, 22, 0, 0));
const INITIAL_WORLD_STATE = buildWorldState(
  INITIAL_NIGHT_CLOCK,
  { permission: "unknown", location: null, failure: null },
  null
);

/**
 * Development-only deterministic QA override reader.
 * Strictly disabled in production builds (process.env.NODE_ENV === "production").
 */
function readDevQaOverrides(): {
  date?: Date;
  lat?: number;
  lng?: number;
  mode?: "device" | "creator-fallback" | "denied" | "clock-only";
  tz?: string;
  utcOffset?: number;
  reducedMotion?: boolean;
} | null {
  if (
    process.env.NODE_ENV === "production" ||
    typeof window === "undefined"
  ) {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const qaPhase = params.get("qaPhase") as WorldPhase | null;
  const qaTime = params.get("qaTime");
  const qaLat = params.get("qaLat");
  const qaLng = params.get("qaLng");
  const qaMode = params.get("qaMode") as
    | "device"
    | "creator-fallback"
    | "denied"
    | "clock-only"
    | null;
  const qaTz = params.get("qaTz") || undefined;
  const qaOffset = params.get("qaOffset");
  const qaReduced = params.get("qaReducedMotion");

  if (
    !qaPhase &&
    !qaTime &&
    !qaLat &&
    !qaLng &&
    !qaMode &&
    !qaTz &&
    !qaOffset &&
    !qaReduced
  ) {
    return null;
  }

  const phaseHourMap: Record<WorldPhase, [number, number]> = {
    preDawn: [5, 0],
    sunrise: [6, 30],
    morning: [9, 30],
    afternoon: [14, 0],
    goldenHour: [17, 0],
    sunset: [18, 15],
    blueHour: [19, 15],
    night: [22, 30],
  };

  let date: Date | undefined;
  if (qaTime) {
    const parsed = new Date(qaTime);
    if (!Number.isNaN(parsed.getTime())) {
      date = parsed;
    }
  } else if (qaPhase && phaseHourMap[qaPhase]) {
    const [h, m] = phaseHourMap[qaPhase];
    date = new Date(2026, 9, 31, h, m, 0);
  }

  return {
    date,
    lat: qaLat !== null ? Number(qaLat) : undefined,
    lng: qaLng !== null ? Number(qaLng) : undefined,
    mode: qaMode || undefined,
    tz: qaTz,
    utcOffset: qaOffset !== null ? Number(qaOffset) : undefined,
    reducedMotion: qaReduced === "true",
  };
}

function useLivingWorldEngine({
  fallback,
  tickMs = 30_000,
}: LivingWorldOptions): LivingWorldValue {
  const activity = usePageActivity();

  const [location, setLocation] = useState<LocationResolution>(() =>
    createFallbackResolution(fallback)
  );
  const [locationBusy, setLocationBusy] = useState(false);
  const [world, setWorld] = useState<WorldState>(INITIAL_WORLD_STATE);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioSupported, setAudioSupported] = useState(true);
  const [constellationFocused, setConstellationFocused] = useState(false);
  const [devReducedMotion, setDevReducedMotion] = useState(false);

  const lastLocationCheck = useRef(0);
  const audioRef = useRef<AmbientAudioEngine | null>(null);

  useEffect(() => {
    const engine = new AmbientAudioEngine();
    audioRef.current = engine;
    const initTimer = window.setTimeout(() => {
      setAudioSupported(engine.isSupported);
    }, 0);

    return () => {
      window.clearTimeout(initTimer);
      void engine.dispose();
      audioRef.current = null;
    };
  }, []);

  const calculate = useCallback(() => {
    const devOverride = readDevQaOverrides();
    if (devOverride?.reducedMotion !== undefined) {
      setDevReducedMotion(devOverride.reducedMotion);
    }

    const clock = readDeviceClock(
      devOverride?.date ?? new Date(),
      devOverride?.tz,
      devOverride?.utcOffset
    );

    let activeLocation = location;
    if (devOverride) {
      if (devOverride.mode === "denied") {
        activeLocation = {
          permission: "denied",
          location: null,
          failure: "permission-denied",
        };
      } else if (devOverride.mode === "clock-only") {
        activeLocation = {
          permission: "prompt",
          location: null,
          failure: null,
        };
      } else if (
        typeof devOverride.lat === "number" &&
        typeof devOverride.lng === "number" &&
        !Number.isNaN(devOverride.lat) &&
        !Number.isNaN(devOverride.lng)
      ) {
        activeLocation = {
          permission:
            devOverride.mode === "creator-fallback" ? "unknown" : "granted",
          failure: null,
          location: {
            latitude: Math.round(devOverride.lat * 100) / 100,
            longitude: Math.round(devOverride.lng * 100) / 100,
            source:
              devOverride.mode === "creator-fallback"
                ? "creator-fallback"
                : "device",
            capturedAt: clock.epochMs,
          },
        };
      }
    }

    let astronomy: AstronomySnapshot | null = null;
    if (activeLocation.location) {
      try {
        astronomy = calculateAstronomy(clock, activeLocation.location);
      } catch {
        astronomy = null;
      }
    }

    const nextWorld = buildWorldState(clock, activeLocation, astronomy);
    setWorld(nextWorld);
    audioRef.current?.setMood(nextWorld.phase);
  }, [location]);

  useEffect(() => {
    if (!activity.visible) {
      return;
    }

    const sixHours = 6 * 60 * 60 * 1000;
    if (Date.now() - lastLocationCheck.current < sixHours) {
      return;
    }

    lastLocationCheck.current = Date.now();
    let cancelled = false;

    void resolveLocationWithoutPrompt(fallback).then((result) => {
      if (!cancelled) {
        setLocation(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [activity.visible, activity.resyncToken, fallback]);

  useEffect(() => {
    if (!activity.visible) {
      return;
    }

    const initialTimer = window.setTimeout(calculate, 0);
    const intervalId = window.setInterval(calculate, tickMs);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(intervalId);
    };
  }, [activity.visible, activity.resyncToken, calculate, tickMs]);

  useEffect(() => {
    audioRef.current?.handleVisibility(activity.visible);
  }, [activity.visible]);

  const requestLocation = useCallback(async () => {
    setLocationBusy(true);
    try {
      const result = await requestLocationFromUser(fallback);
      setLocation(result);
      lastLocationCheck.current = Date.now();
      return result;
    } finally {
      setLocationBusy(false);
    }
  }, [fallback]);

  const refreshSky = useCallback(() => {
    calculate();
  }, [calculate]);

  const toggleAudio = useCallback(async () => {
    if (!audioRef.current) {
      audioRef.current = new AmbientAudioEngine();
    }

    if (audioRef.current.isEnabled) {
      await audioRef.current.mute();
      setAudioEnabled(false);
    } else {
      audioRef.current.setMood(world.phase);
      const started = await audioRef.current.start();
      setAudioEnabled(started);
    }
  }, [world.phase]);

  const playNote = useCallback((step = 0) => {
    audioRef.current?.playInteractionNote(step);
  }, []);

  const playChord = useCallback(() => {
    audioRef.current?.playCompletionChord();
  }, []);

  const effectiveReducedMotion = activity.reducedMotion || devReducedMotion;

  return useMemo(
    () => ({
      world,
      location,
      locationBusy,
      visible: activity.visible,
      reducedMotion: effectiveReducedMotion,
      audioEnabled,
      audioSupported,
      constellationFocused,
      setConstellationFocused,
      requestLocation,
      refreshSky,
      toggleAudio,
      playNote,
      playChord,
    }),
    [
      world,
      location,
      locationBusy,
      activity.visible,
      effectiveReducedMotion,
      audioEnabled,
      audioSupported,
      constellationFocused,
      requestLocation,
      refreshSky,
      toggleAudio,
      playNote,
      playChord,
    ]
  );
}

export function LivingWorldProvider({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: CreatorFallbackCoordinate;
}) {
  const value = useLivingWorldEngine({ fallback });

  return (
    <LivingWorldContext.Provider value={value}>
      {children}
    </LivingWorldContext.Provider>
  );
}

export function useLivingWorld(): LivingWorldValue {
  const context = useContext(LivingWorldContext);
  if (!context) {
    throw new Error(
      "useLivingWorld must be used inside LivingWorldProvider."
    );
  }
  return context;
}
