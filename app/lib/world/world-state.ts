import type { AstronomySnapshot } from "./astronomy";
import type { LocationResolution } from "./location";
import type { DeviceClockSnapshot } from "./time";
import {
  PHASE_PALETTES,
  PHASE_LABELS,
  type WorldPhase,
  type WorldPalette,
} from "./palettes";

export { PHASE_PALETTES, PHASE_LABELS, type WorldPhase, type WorldPalette };

export interface ScreenPosition {
  xPercent: number;
  yPercent: number;
}

export interface WorldLighting {
  daylight: number;
  directSun: number;
  horizonGlow: number;
  starOpacity: number;
  moonVisibility: number;
  warmth: number;
  bubbleDensity: number;
  petalDensity: number;
}

export interface WorldState {
  phase: WorldPhase;
  phaseProgress: number;
  phaseLabel: string;

  localTime: Date;
  timezone: string;
  utcOffsetMinutesEast: number;

  calculationMode: "device-location" | "creator-fallback" | "clock-only";
  locationPermission: LocationResolution["permission"];

  solarAltitude: number | null;
  solarAzimuth: number | null;
  solarRising: boolean | null;

  sunPosition: ScreenPosition;
  moonPosition: ScreenPosition | null;

  sunrise: Date | null;
  sunset: Date | null;
  civilDusk: Date | null;
  nauticalDusk: Date | null;

  moonPhase: number | null;
  moonIlluminatedFraction: number | null;
  moonBrightLimbRotation: number | null;

  lighting: WorldLighting;
  palette: WorldPalette;
}

const NEXT_PHASE: Record<WorldPhase, WorldPhase> = {
  preDawn: "sunrise",
  sunrise: "morning",
  morning: "afternoon",
  afternoon: "goldenHour",
  goldenHour: "sunset",
  sunset: "blueHour",
  blueHour: "night",
  night: "night",
};

const BUBBLE_DENSITY: Record<WorldPhase, number> = {
  preDawn: 0.35,
  sunrise: 0.55,
  morning: 0.9,
  afternoon: 0.7,
  goldenHour: 0.45,
  sunset: 0.3,
  blueHour: 0.35,
  night: 0.25,
};

const WARMTH: Record<WorldPhase, number> = {
  preDawn: 0.08,
  sunrise: 0.65,
  morning: 0.35,
  afternoon: 0.2,
  goldenHour: 0.9,
  sunset: 1,
  blueHour: 0.25,
  night: 0,
};

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function inverseLerp(start: number, end: number, value: number): number {
  if (start === end) {
    return 0;
  }
  return clamp01((value - start) / (end - start));
}

function smoothstep(start: number, end: number, value: number): number {
  const t = inverseLerp(start, end, value);
  return t * t * (3 - 2 * t);
}

function progressBetweenDates(
  now: Date,
  start: Date | null | undefined,
  end: Date | null | undefined
): number {
  if (!start || !end || end.getTime() <= start.getTime()) {
    return 0;
  }
  return inverseLerp(start.getTime(), end.getTime(), now.getTime());
}

function parseHex(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    throw new Error(`Expected six-digit HEX colour, got ${hex}`);
  }
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

function mixHex(from: string, to: string, amount: number): string {
  const a = parseHex(from);
  const b = parseHex(to);
  const t = clamp01(amount);

  const mixed = a.map((value, index) => {
    const channel = Math.round(value + (b[index] - value) * t);
    // Floor at #171233 per channel to ensure no pixel drops darker than Midnight Indigo
    const minChannel = index === 0 ? 0x17 : index === 1 ? 0x12 : 0x33;
    return Math.max(minChannel, channel);
  });

  return `#${mixed.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function mixPalette(
  from: WorldPalette,
  to: WorldPalette,
  amount: number
): WorldPalette {
  return {
    skyTop: mixHex(from.skyTop, to.skyTop, amount),
    skyMiddle: mixHex(from.skyMiddle, to.skyMiddle, amount),
    skyHorizon: mixHex(from.skyHorizon, to.skyHorizon, amount),
    cloudLight: mixHex(from.cloudLight, to.cloudLight, amount),
    cloudShadow: mixHex(from.cloudShadow, to.cloudShadow, amount),
    atmosphericAccent: mixHex(
      from.atmosphericAccent,
      to.atmosphericAccent,
      amount
    ),
  };
}

function celestialScreenPosition(
  altitude: number,
  azimuth: number
): ScreenPosition {
  const azimuthRadians = (azimuth * Math.PI) / 180;

  // East appears left, west appears right, solar transit near centre.
  const xPercent = Math.min(
    90,
    Math.max(10, 50 - 38 * Math.sin(azimuthRadians))
  );

  const normalizedAltitude = inverseLerp(-6, 75, altitude);
  const yPercent = 78 - normalizedAltitude * 62;

  return {
    xPercent,
    yPercent: Math.min(82, Math.max(14, yPercent)),
  };
}

function deriveAstronomicalPhase(
  clock: DeviceClockSnapshot,
  astronomy: AstronomySnapshot
): { phase: WorldPhase; progress: number } {
  const altitude = astronomy.sun.altitude;
  const rising = astronomy.sun.rising;
  const times = astronomy.times;

  if (rising) {
    if (altitude < -12) {
      return { phase: "night", progress: 0 };
    }
    if (altitude < -6) {
      return {
        phase: "preDawn",
        progress: inverseLerp(-12, -6, altitude),
      };
    }
    if (altitude < 3) {
      return {
        phase: "sunrise",
        progress: inverseLerp(-6, 3, altitude),
      };
    }
    return {
      phase: "morning",
      progress: progressBetweenDates(
        clock.now,
        times.goldenHourEnd ?? times.sunrise ?? times.nauticalDawn,
        times.solarNoon
      ),
    };
  }

  if (altitude > 6) {
    return {
      phase: "afternoon",
      progress: progressBetweenDates(
        clock.now,
        times.solarNoon,
        times.goldenHour ?? times.sunset
      ),
    };
  }

  if (altitude > 1) {
    return {
      phase: "goldenHour",
      progress: inverseLerp(6, 1, altitude),
    };
  }

  if (altitude > -1) {
    return {
      phase: "sunset",
      progress: inverseLerp(1, -1, altitude),
    };
  }

  if (altitude > -12) {
    return {
      phase: "blueHour",
      progress: inverseLerp(-1, -12, altitude),
    };
  }

  return { phase: "night", progress: 0 };
}

export function deriveClockOnlyPhase(
  now: Date,
  utcOffsetMinutesEast?: number
): { phase: WorldPhase; progress: number } {
  let minutes: number;
  if (typeof utcOffsetMinutesEast === "number") {
    const shifted = new Date(now.getTime() + utcOffsetMinutesEast * 60_000);
    minutes = shifted.getUTCHours() * 60 + shifted.getUTCMinutes();
  } else {
    minutes = now.getHours() * 60 + now.getMinutes();
  }

  if (minutes >= 270 && minutes < 360) {
    return { phase: "preDawn", progress: inverseLerp(270, 360, minutes) };
  }
  if (minutes >= 360 && minutes < 480) {
    return { phase: "sunrise", progress: inverseLerp(360, 480, minutes) };
  }
  if (minutes >= 480 && minutes < 750) {
    return { phase: "morning", progress: inverseLerp(480, 750, minutes) };
  }
  if (minutes >= 750 && minutes < 990) {
    return { phase: "afternoon", progress: inverseLerp(750, 990, minutes) };
  }
  if (minutes >= 990 && minutes < 1080) {
    return { phase: "goldenHour", progress: inverseLerp(990, 1080, minutes) };
  }
  if (minutes >= 1080 && minutes < 1140) {
    return { phase: "sunset", progress: inverseLerp(1080, 1140, minutes) };
  }
  if (minutes >= 1140 && minutes < 1230) {
    return { phase: "blueHour", progress: inverseLerp(1140, 1230, minutes) };
  }
  return { phase: "night", progress: 0 };
}

function approximateSunPosition(
  now: Date,
  utcOffsetMinutesEast?: number
): ScreenPosition {
  let minutes: number;
  if (typeof utcOffsetMinutesEast === "number") {
    const shifted = new Date(now.getTime() + utcOffsetMinutesEast * 60_000);
    minutes = shifted.getUTCHours() * 60 + shifted.getUTCMinutes();
  } else {
    minutes = now.getHours() * 60 + now.getMinutes();
  }

  const dayProgress = inverseLerp(6 * 60, 18 * 60, minutes);

  return {
    xPercent: 14 + dayProgress * 72,
    yPercent: 74 - Math.sin(dayProgress * Math.PI) * 52,
  };
}

export function buildWorldState(
  clock: DeviceClockSnapshot,
  location: LocationResolution,
  astronomy: AstronomySnapshot | null
): WorldState {
  const derived = astronomy
    ? deriveAstronomicalPhase(clock, astronomy)
    : deriveClockOnlyPhase(clock.now, clock.utcOffsetMinutesEast);

  const nextPhase = NEXT_PHASE[derived.phase];

  const palette = mixPalette(
    PHASE_PALETTES[derived.phase],
    PHASE_PALETTES[nextPhase],
    smoothstep(0, 1, derived.progress)
  );

  if (!astronomy) {
    const approximateLight: Record<WorldPhase, number> = {
      preDawn: 0.1,
      sunrise: 0.45,
      morning: 0.9,
      afternoon: 1,
      goldenHour: 0.7,
      sunset: 0.35,
      blueHour: 0.12,
      night: 0,
    };

    const daylight = approximateLight[derived.phase];

    return {
      phase: derived.phase,
      phaseProgress: derived.progress,
      phaseLabel: PHASE_LABELS[derived.phase],
      localTime: clock.now,
      timezone: clock.timeZone,
      utcOffsetMinutesEast: clock.utcOffsetMinutesEast,
      calculationMode: "clock-only",
      locationPermission: location.permission,

      solarAltitude: null,
      solarAzimuth: null,
      solarRising: null,

      sunPosition: approximateSunPosition(
        clock.now,
        clock.utcOffsetMinutesEast
      ),
      moonPosition:
        derived.phase === "night" ||
        derived.phase === "blueHour" ||
        derived.phase === "preDawn"
          ? { xPercent: 74, yPercent: 20 }
          : null,

      sunrise: null,
      sunset: null,
      civilDusk: null,
      nauticalDusk: null,

      moonPhase: null,
      moonIlluminatedFraction: null,
      moonBrightLimbRotation: null,

      lighting: {
        daylight,
        directSun:
          derived.phase === "morning" || derived.phase === "afternoon"
            ? 0.95
            : derived.phase === "sunrise" ||
                derived.phase === "goldenHour" ||
                derived.phase === "sunset"
              ? 0.78
              : 0,
        horizonGlow:
          derived.phase === "sunrise" ||
          derived.phase === "goldenHour" ||
          derived.phase === "sunset"
            ? 1
            : 0.28,
        starOpacity:
          derived.phase === "night"
            ? 1
            : derived.phase === "blueHour"
              ? 0.78
              : derived.phase === "preDawn"
                ? 0.32
                : derived.phase === "sunset"
                  ? 0.2
                  : 0,
        moonVisibility:
          derived.phase === "night"
            ? 0.9
            : derived.phase === "blueHour"
              ? 0.55
              : derived.phase === "preDawn"
                ? 0.35
                : 0,
        warmth: WARMTH[derived.phase],
        bubbleDensity: BUBBLE_DENSITY[derived.phase],
        petalDensity:
          derived.phase === "sunrise"
            ? 0.85
            : derived.phase === "morning"
              ? 0.4
              : derived.phase === "goldenHour"
                ? 0.35
                : 0,
      },

      palette,
    };
  }

  const altitude = astronomy.sun.altitude;
  const daylight = smoothstep(-6, 6, altitude);
  const directSun = smoothstep(-1.5, 4, altitude);
  const starOpacity = 1 - smoothstep(-12, -1, altitude);
  const horizonGlow = 1 - smoothstep(0, 22, Math.abs(altitude));

  const moonAboveHorizon = smoothstep(-2, 4, astronomy.moon.altitude);
  const moonPhaseStrength = 0.25 + astronomy.moon.illuminatedFraction * 0.75;
  const moonVisibility =
    moonAboveHorizon * moonPhaseStrength * (0.25 + (1 - daylight) * 0.75);

  return {
    phase: derived.phase,
    phaseProgress: derived.progress,
    phaseLabel: PHASE_LABELS[derived.phase],

    localTime: clock.now,
    timezone: clock.timeZone,
    utcOffsetMinutesEast: clock.utcOffsetMinutesEast,

    calculationMode:
      location.location?.source === "device"
        ? "device-location"
        : "creator-fallback",

    locationPermission: location.permission,

    solarAltitude: altitude,
    solarAzimuth: astronomy.sun.azimuth,
    solarRising: astronomy.sun.rising,

    sunPosition: celestialScreenPosition(altitude, astronomy.sun.azimuth),
    moonPosition:
      moonVisibility > 0.04
        ? celestialScreenPosition(
            astronomy.moon.altitude,
            astronomy.moon.azimuth
          )
        : null,

    sunrise: astronomy.times.sunrise,
    sunset: astronomy.times.sunset,
    civilDusk: astronomy.times.dusk,
    nauticalDusk: astronomy.times.nauticalDusk,

    moonPhase: astronomy.moon.phase,
    moonIlluminatedFraction: astronomy.moon.illuminatedFraction,
    moonBrightLimbRotation: astronomy.moon.zenithBrightLimbAngle,

    lighting: {
      daylight,
      directSun,
      horizonGlow,
      starOpacity,
      moonVisibility,
      warmth: WARMTH[derived.phase],
      bubbleDensity: BUBBLE_DENSITY[derived.phase],
      petalDensity:
        derived.phase === "sunrise"
          ? 0.85
          : derived.phase === "morning"
            ? 0.4
            : derived.phase === "goldenHour"
              ? 0.35
              : 0,
    },

    palette,
  };
}
