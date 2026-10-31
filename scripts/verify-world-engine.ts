import assert from "node:assert/strict";
import { readDeviceClock } from "../app/lib/world/time";
import { roundCoordinate, createFallbackResolution } from "../app/lib/world/location";
import { calculateAstronomy, buildAstronomyCacheKey } from "../app/lib/world/astronomy";
import { buildWorldState, deriveClockOnlyPhase } from "../app/lib/world/world-state";
import type { WorldPhase } from "../app/lib/world/palettes";

interface TestLocation {
  name: string;
  lat: number;
  lng: number;
  tz: string;
  utcOffsetMinutesEast: number;
}

const TEST_LOCATIONS: TestLocation[] = [
  { name: "New York", lat: 40.7128, lng: -74.006, tz: "America/New_York", utcOffsetMinutesEast: -240 },
  { name: "London", lat: 51.5074, lng: -0.1278, tz: "Europe/London", utcOffsetMinutesEast: 0 },
  { name: "Karachi (test coord)", lat: 24.8607, lng: 67.0011, tz: "Asia/Karachi", utcOffsetMinutesEast: 300 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, tz: "Asia/Tokyo", utcOffsetMinutesEast: 540 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, tz: "Australia/Sydney", utcOffsetMinutesEast: 660 },
  { name: "Tromso (Arctic)", lat: 69.6492, lng: 18.9553, tz: "Europe/Oslo", utcOffsetMinutesEast: 60 },
  { name: "Fiji (IDL+)", lat: -18.1416, lng: 178.4419, tz: "Pacific/Fiji", utcOffsetMinutesEast: 720 },
  { name: "Pago Pago (IDL-)", lat: -14.2756, lng: -170.702, tz: "Pacific/Pago_Pago", utcOffsetMinutesEast: -660 },
];

const TEST_DATES = [
  { label: "March Equinox", iso: "2026-03-20T12:00:00Z" },
  { label: "June Solstice (Polar Day in Tromso)", iso: "2026-06-21T12:00:00Z" },
  { label: "September Equinox", iso: "2026-09-22T12:00:00Z" },
  { label: "December Solstice (Polar Night in Tromso)", iso: "2026-12-21T12:00:00Z" },
  { label: "DST Spring Forward", iso: "2026-03-08T07:30:00Z" },
  { label: "DST Fall Back", iso: "2026-11-01T06:30:00Z" },
  { label: "New Moon", iso: "2026-10-10T18:00:00Z" },
  { label: "First Quarter Moon", iso: "2026-10-18T18:00:00Z" },
  { label: "Full Moon", iso: "2026-10-26T04:00:00Z" },
  { label: "Third Quarter Moon", iso: "2026-11-01T20:00:00Z" },
];

console.log("=== 1. Testing Coordinate Quantisation (2 Decimal Places) ===");
for (const loc of TEST_LOCATIONS) {
  const rLat = roundCoordinate(loc.lat);
  const rLng = roundCoordinate(loc.lng);
  assert.equal(Number(rLat.toFixed(2)), rLat, `Lat not rounded to 2 decimals: ${rLat}`);
  assert.equal(Number(rLng.toFixed(2)), rLng, `Lng not rounded to 2 decimals: ${rLng}`);
}
console.log("PASS: All coordinates quantised to 2 decimal places in memory.");

console.log("=== 2. Testing All 8 World Phases via Clock-Only Fallback ===");
const EXPECTED_PHASES: Array<{ hour: number; minute: number; expected: WorldPhase }> = [
  { hour: 5, minute: 0, expected: "preDawn" },
  { hour: 6, minute: 30, expected: "sunrise" },
  { hour: 9, minute: 30, expected: "morning" },
  { hour: 14, minute: 0, expected: "afternoon" },
  { hour: 17, minute: 0, expected: "goldenHour" },
  { hour: 18, minute: 15, expected: "sunset" },
  { hour: 19, minute: 15, expected: "blueHour" },
  { hour: 22, minute: 30, expected: "night" },
];

for (const tc of EXPECTED_PHASES) {
  const dt = new Date(2026, 9, 31, tc.hour, tc.minute, 0);
  const derived = deriveClockOnlyPhase(dt);
  assert.equal(derived.phase, tc.expected, `Expected ${tc.expected} at ${tc.hour}:${tc.minute}, got ${derived.phase}`);
  const clock = readDeviceClock(dt);
  const ws = buildWorldState(clock, createFallbackResolution(), null);
  assert.equal(ws.phase, tc.expected);
  assert.ok(ws.palette.skyTop.startsWith("#") && ws.palette.skyTop.length === 7);
}
console.log("PASS: All 8 phases (preDawn, sunrise, morning, afternoon, goldenHour, sunset, blueHour, night) verified.");

console.log("=== 3. Testing SunCalc Astronomy Matrix (Locations × Dates, including Polar Day/Night & IDL) ===");
let matrixCount = 0;
for (const loc of TEST_LOCATIONS) {
  for (const d of TEST_DATES) {
    const dateObj = new Date(d.iso);
    const clock = readDeviceClock(dateObj, loc.tz, loc.utcOffsetMinutesEast);
    const locSample = {
      latitude: roundCoordinate(loc.lat),
      longitude: roundCoordinate(loc.lng),
      source: "device" as const,
      capturedAt: clock.epochMs,
    };
    const cacheKey = buildAstronomyCacheKey(clock, locSample);
    assert.ok(cacheKey.length > 5);

    const astro = calculateAstronomy(clock, locSample);
    assert.ok(!Number.isNaN(astro.sun.altitude), `NaN sun altitude for ${loc.name} on ${d.label}`);
    assert.ok(!Number.isNaN(astro.moon.illuminatedFraction), `NaN moon fraction for ${loc.name} on ${d.label}`);

    const ws = buildWorldState(
      clock,
      { permission: "granted", location: locSample, failure: null },
      astro
    );

    assert.ok(ws.sunPosition.xPercent >= 10 && ws.sunPosition.xPercent <= 90);
    assert.ok(ws.sunPosition.yPercent >= 14 && ws.sunPosition.yPercent <= 82);
    assert.ok(ws.lighting.daylight >= 0 && ws.lighting.daylight <= 1);
    assert.ok(ws.lighting.starOpacity >= 0 && ws.lighting.starOpacity <= 1);

    // Ensure no palette hex drops below #171233
    for (const hex of [ws.palette.skyTop, ws.palette.skyMiddle, ws.palette.skyHorizon]) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      assert.ok(r >= 0x17 && g >= 0x12 && b >= 0x33, `Hex ${hex} dropped darker than #171233`);
    }
    matrixCount++;
  }
}
console.log(`PASS: ${matrixCount} Location × Date astronomical combinations verified without NaN or floor violation.`);
