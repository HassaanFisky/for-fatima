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
import { getKarachiLocation } from "../../lib/world/location";
import { readKarachiClock } from "../../lib/world/time";
import {
  buildWorldState,
  type WorldPhase,
  type WorldState,
} from "../../lib/world/world-state";
import { AmbientAudioEngine } from "../../lib/world/ambient-audio";

interface LivingWorldOptions {
  tickMs?: number;
}

export interface LivingWorldValue {
  world: WorldState;
  reducedMotion: boolean;
  visible: boolean;
  /** True when sound is set to ON (default true unless explicitly muted by user) */
  audioEnabled: boolean;
  /** True when the browser AudioContext is actively running */
  audioPlaying: boolean;
  audioSupported: boolean;
  constellationFocused: boolean;
  setConstellationFocused: (focused: boolean) => void;
  refreshSky: () => void;
  toggleAudio: () => Promise<void>;
  playNote: (step?: number) => void;
  playChord: () => void;
}

const LivingWorldContext = createContext<LivingWorldValue | null>(null);

const INITIAL_NIGHT_CLOCK = readKarachiClock(
  new Date(Date.UTC(2026, 9, 31, 17, 30, 0)) // 22:30 PKT
);
const INITIAL_WORLD_STATE = buildWorldState(INITIAL_NIGHT_CLOCK, null);

/**
 * Development-only deterministic QA override reader.
 * Strictly disabled in production builds (process.env.NODE_ENV === "production").
 */
function readDevQaOverrides(): {
  date?: Date;
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
  const qaReduced = params.get("qaReducedMotion");

  if (!qaPhase && !qaTime && !qaReduced) {
    return null;
  }

  // UTC hours corresponding to Karachi (UTC+5) local phases
  const phaseUtcHourMap: Record<WorldPhase, [number, number]> = {
    preDawn: [0, 0],     // 05:00 PKT
    sunrise: [1, 30],    // 06:30 PKT
    morning: [4, 30],    // 09:30 PKT
    afternoon: [9, 0],   // 14:00 PKT
    goldenHour: [12, 0], // 17:00 PKT
    sunset: [13, 15],    // 18:15 PKT
    blueHour: [14, 15],  // 19:15 PKT
    night: [17, 30],     // 22:30 PKT
  };

  let date: Date | undefined;
  if (qaTime) {
    const parsed = new Date(qaTime);
    if (!Number.isNaN(parsed.getTime())) {
      date = parsed;
    }
  } else if (qaPhase && phaseUtcHourMap[qaPhase]) {
    const [h, m] = phaseUtcHourMap[qaPhase];
    date = new Date(Date.UTC(2026, 9, 31, h, m, 0));
  }

  return {
    date,
    reducedMotion: qaReduced === "true",
  };
}

function useLivingWorldEngine({
  tickMs = 30_000,
}: LivingWorldOptions = {}): LivingWorldValue {
  const activity = usePageActivity();

  const [world, setWorld] = useState<WorldState>(INITIAL_WORLD_STATE);
  const [audioEnabled, setAudioEnabled] = useState(true); // Sound ON by default
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioSupported, setAudioSupported] = useState(true);
  const [constellationFocused, setConstellationFocused] = useState(false);
  const [devReducedMotion, setDevReducedMotion] = useState(false);

  const audioRef = useRef<AmbientAudioEngine | null>(null);

  useEffect(() => {
    const engine = new AmbientAudioEngine();
    audioRef.current = engine;

    engine.onStateChange((desired, playing) => {
      setAudioEnabled(desired);
      setAudioPlaying(playing);
    });

    const initTimer = window.setTimeout(() => {
      setAudioSupported(engine.isSupported);
      // Attempt gentle autoplay immediately on load
      void engine.unlockAndStart();
    }, 0);

    // Browser-compliant autoplay fallback: start on the first deliberate user interaction
    // unless the user has explicitly muted sound.
    const handleFirstInteraction = (event: Event) => {
      if (!audioRef.current || !audioRef.current.isDesired) {
        return;
      }
      // Do not intercept clicks on the mute button itself (toggleAudio handles that directly)
      const target = event.target as HTMLElement | null;
      if (target?.closest?.('[data-audio-toggle="true"]')) {
        return;
      }
      if (!audioRef.current.isPlaying) {
        void audioRef.current.unlockAndStart();
      }
    };

    window.addEventListener("pointerdown", handleFirstInteraction, {
      passive: true,
    });
    window.addEventListener("keydown", handleFirstInteraction, {
      passive: true,
    });
    window.addEventListener("touchstart", handleFirstInteraction, {
      passive: true,
    });

    return () => {
      window.clearTimeout(initTimer);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      void engine.dispose();
      audioRef.current = null;
    };
  }, []);

  const calculate = useCallback(() => {
    const devOverride = readDevQaOverrides();
    if (devOverride?.reducedMotion !== undefined) {
      setDevReducedMotion(devOverride.reducedMotion);
    }

    const clock = readKarachiClock(devOverride?.date ?? new Date());
    const karachiLocation = getKarachiLocation(clock.epochMs);

    let astronomy: AstronomySnapshot | null = null;
    try {
      astronomy = calculateAstronomy(clock, karachiLocation);
    } catch {
      astronomy = null;
    }

    const nextWorld = buildWorldState(clock, astronomy);
    setWorld(nextWorld);
    audioRef.current?.setMood(nextWorld.phase);
  }, []);

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

  const refreshSky = useCallback(() => {
    calculate();
  }, [calculate]);

  const toggleAudio = useCallback(async () => {
    if (!audioRef.current) {
      audioRef.current = new AmbientAudioEngine();
    }

    const engine = audioRef.current;
    engine.setMood(world.phase);

    // If sound is currently desired ON and playing (or waiting to play), mute it when user clicks the mute toggle
    if (engine.isDesired) {
      await engine.mute();
      setAudioEnabled(false);
      setAudioPlaying(false);
    } else {
      const started = await engine.unmute();
      setAudioEnabled(true);
      setAudioPlaying(started);
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
      visible: activity.visible,
      reducedMotion: effectiveReducedMotion,
      audioEnabled,
      audioPlaying,
      audioSupported,
      constellationFocused,
      setConstellationFocused,
      refreshSky,
      toggleAudio,
      playNote,
      playChord,
    }),
    [
      world,
      activity.visible,
      effectiveReducedMotion,
      audioEnabled,
      audioPlaying,
      audioSupported,
      constellationFocused,
      refreshSky,
      toggleAudio,
      playNote,
      playChord,
    ]
  );
}

export function LivingWorldProvider({
  children,
}: {
  children: ReactNode;
}) {
  const value = useLivingWorldEngine();

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
