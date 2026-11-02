import assert from "node:assert/strict";
import { readKarachiClock } from "../app/lib/world/time";
import { getKarachiLocation } from "../app/lib/world/location";
import { calculateAstronomy, buildAstronomyCacheKey } from "../app/lib/world/astronomy";
import { buildWorldState, deriveClockOnlyPhase } from "../app/lib/world/world-state";
import type { WorldPhase } from "../app/lib/world/palettes";

console.log("=== 1. Testing Karachi Fixed Coordinates (Zero Geolocation) ===");
const karachi = getKarachiLocation();
assert.equal(karachi.latitude, 24.8607);
assert.equal(karachi.longitude, 67.0011);
assert.equal(karachi.source, "karachi-fixed");
console.log("PASS: Karachi fixed reference coordinates verified.");

console.log("=== 2. Testing All 8 World Phases in Karachi Time (UTC+5) ===");
const EXPECTED_PHASES: Array<{ utcHour: number; utcMinute: number; expected: WorldPhase }> = [
  { utcHour: 0, utcMinute: 0, expected: "preDawn" },      // 05:00 PKT
  { utcHour: 1, utcMinute: 30, expected: "sunrise" },     // 06:30 PKT
  { utcHour: 4, utcMinute: 30, expected: "morning" },     // 09:30 PKT
  { utcHour: 9, utcMinute: 0, expected: "afternoon" },    // 14:00 PKT
  { utcHour: 12, utcMinute: 0, expected: "goldenHour" },  // 17:00 PKT
  { utcHour: 13, utcMinute: 15, expected: "sunset" },     // 18:15 PKT
  { utcHour: 14, utcMinute: 15, expected: "blueHour" },   // 19:15 PKT
  { utcHour: 17, utcMinute: 30, expected: "night" },      // 22:30 PKT
];

for (const tc of EXPECTED_PHASES) {
  const dt = new Date(Date.UTC(2026, 9, 31, tc.utcHour, tc.utcMinute, 0));
  const derived = deriveClockOnlyPhase(dt, 300);
  assert.equal(derived.phase, tc.expected, `Expected ${tc.expected}, got ${derived.phase}`);
  const clock = readKarachiClock(dt);
  const ws = buildWorldState(clock, null);
  assert.equal(ws.phase, tc.expected);
  assert.ok(ws.palette.skyTop.startsWith("#") && ws.palette.skyTop.length === 7);
}
console.log("PASS: All 8 Karachi phases verified.");

console.log("=== 3. Testing SunCalc Astronomy for Karachi Across Solstices & Moon Phases ===");
const TEST_DATES = [
  "2026-03-20T12:00:00Z",
  "2026-06-21T12:00:00Z",
  "2026-09-22T12:00:00Z",
  "2026-10-15T17:00:00Z",
  "2026-12-21T12:00:00Z",
];

for (const iso of TEST_DATES) {
  const dateObj = new Date(iso);
  const clock = readKarachiClock(dateObj);
  const cacheKey = buildAstronomyCacheKey(clock, karachi);
  assert.ok(cacheKey.length > 5);
  const astro = calculateAstronomy(clock, karachi);
  assert.ok(!Number.isNaN(astro.sun.altitude));
  const ws = buildWorldState(clock, astro);
  assert.ok(ws.sunPosition.xPercent >= 10 && ws.sunPosition.xPercent <= 90);
}
console.log("PASS: Karachi SunCalc astronomy verified.");
