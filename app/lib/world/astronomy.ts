/**
 * Real-time local astronomical engine powered by SunCalc 2.1.1 (BSD-2-Clause License).
 * All calculations execute locally on the client without external API calls.
 */

import * as SunCalc from "suncalc";

import type { DeviceClockSnapshot } from "./time";
import type { WorldLocation } from "./location";

export type SunTimes = ReturnType<typeof SunCalc.getTimes>;
export type MoonTimes = ReturnType<typeof SunCalc.getMoonTimes>;

interface EventCacheEntry {
  sunTimes: SunTimes;
  moonTimes: MoonTimes;
}

const eventCache = new Map<string, EventCacheEntry>();

export interface AstronomySnapshot {
  calculatedAt: Date;

  sun: {
    altitude: number;
    azimuth: number;
    rising: boolean;
  };

  moon: {
    altitude: number;
    azimuth: number;
    distanceKilometers: number;
    parallacticAngle: number;
    illuminatedFraction: number;
    phase: number;
    waxing: boolean;
    brightLimbAngle: number;
    zenithBrightLimbAngle: number;
  };

  times: SunTimes;
  moonTimes: MoonTimes;
}

export function buildAstronomyCacheKey(
  clock: DeviceClockSnapshot,
  location: WorldLocation
): string {
  const shifted = new Date(
    clock.now.getTime() + clock.utcOffsetMinutesEast * 60_000
  );

  const civilDate = [
    shifted.getUTCFullYear(),
    String(shifted.getUTCMonth() + 1).padStart(2, "0"),
    String(shifted.getUTCDate()).padStart(2, "0"),
  ].join("-");

  return [
    civilDate,
    location.latitude.toFixed(2),
    location.longitude.toFixed(2),
    clock.utcOffsetMinutesEast,
  ].join(":");
}

function getDailyEvents(
  clock: DeviceClockSnapshot,
  location: WorldLocation
): EventCacheEntry {
  const key = buildAstronomyCacheKey(clock, location);
  const existing = eventCache.get(key);

  if (existing) {
    return existing;
  }

  const entry: EventCacheEntry = {
    sunTimes: SunCalc.getTimes(
      clock.now,
      location.latitude,
      location.longitude,
      0,
      clock.utcOffsetMinutesEast
    ),
    moonTimes: SunCalc.getMoonTimes(
      clock.now,
      location.latitude,
      location.longitude,
      clock.utcOffsetMinutesEast
    ),
  };

  if (eventCache.size >= 8) {
    eventCache.clear();
  }

  eventCache.set(key, entry);
  return entry;
}

export function calculateAstronomy(
  clock: DeviceClockSnapshot,
  location: WorldLocation
): AstronomySnapshot {
  const now = clock.now;

  const sunPosition = SunCalc.getPosition(
    now,
    location.latitude,
    location.longitude
  );

  const oneMinuteLater = new Date(now.getTime() + 60_000);
  const laterSunPosition = SunCalc.getPosition(
    oneMinuteLater,
    location.latitude,
    location.longitude
  );

  const moonPosition = SunCalc.getMoonPosition(
    now,
    location.latitude,
    location.longitude
  );

  const moonIllumination = SunCalc.getMoonIllumination(now);
  const events = getDailyEvents(clock, location);

  return {
    calculatedAt: now,

    sun: {
      altitude: sunPosition.altitude,
      azimuth: sunPosition.azimuth,
      rising: laterSunPosition.altitude >= sunPosition.altitude,
    },

    moon: {
      altitude: moonPosition.altitude,
      azimuth: moonPosition.azimuth,
      distanceKilometers: moonPosition.distance,
      parallacticAngle: moonPosition.parallacticAngle,
      illuminatedFraction: moonIllumination.fraction,
      phase: moonIllumination.phase,
      waxing: moonIllumination.waxing,
      brightLimbAngle: moonIllumination.angle,
      zenithBrightLimbAngle:
        moonIllumination.angle - moonPosition.parallacticAngle,
    },

    times: events.sunTimes,
    moonTimes: events.moonTimes,
  };
}
