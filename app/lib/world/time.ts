export interface DeviceClockSnapshot {
  now: Date;
  epochMs: number;
  timeZone: string;
  utcOffsetMinutesEast: number;
  locale: string;
}

export const KARACHI_TIMEZONE = "Asia/Karachi";
export const KARACHI_UTC_OFFSET_MINUTES_EAST = 300; // UTC+5 (PKT, no DST)

/**
 * Reads the current moment anchored to Karachi time (Asia/Karachi, UTC+5).
 * Never queries device geolocation or permissions.
 */
export function readKarachiClock(
  now: Date = new Date()
): DeviceClockSnapshot {
  if (Number.isNaN(now.getTime())) {
    throw new TypeError("readKarachiClock received an invalid Date.");
  }

  return {
    now,
    epochMs: now.getTime(),
    timeZone: KARACHI_TIMEZONE,
    utcOffsetMinutesEast: KARACHI_UTC_OFFSET_MINUTES_EAST,
    locale: "en-PK",
  };
}

// Preserve backwards-compatible export alias for any caller expecting readDeviceClock
export const readDeviceClock = readKarachiClock;

export function formatLocalEventTime(
  date: Date | null | undefined,
  clock: Pick<DeviceClockSnapshot, "timeZone" | "locale"> = {
    timeZone: KARACHI_TIMEZONE,
    locale: "en-PK",
  }
): string | null {
  if (!date || Number.isNaN(date.getTime())) {
    return null;
  }

  try {
    return new Intl.DateTimeFormat(clock.locale || "en-PK", {
      timeZone: clock.timeZone || KARACHI_TIMEZONE,
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en", {
      timeZone: KARACHI_TIMEZONE,
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  }
}
