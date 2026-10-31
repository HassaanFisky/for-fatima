export interface DeviceClockSnapshot {
  now: Date;
  epochMs: number;
  timeZone: string;
  utcOffsetMinutesEast: number;
  locale: string;
}

export function readDeviceClock(
  now: Date = new Date(),
  overrideTimeZone?: string,
  overrideUtcOffsetMinutesEast?: number
): DeviceClockSnapshot {
  if (Number.isNaN(now.getTime())) {
    throw new TypeError("readDeviceClock received an invalid Date.");
  }

  const resolved = new Intl.DateTimeFormat().resolvedOptions();
  const timeZone = overrideTimeZone || resolved.timeZone || "UTC";
  const utcOffsetMinutesEast =
    typeof overrideUtcOffsetMinutesEast === "number"
      ? overrideUtcOffsetMinutesEast
      : -now.getTimezoneOffset();

  return {
    now,
    epochMs: now.getTime(),
    timeZone,
    utcOffsetMinutesEast,
    locale: resolved.locale || "en",
  };
}

export function formatLocalEventTime(
  date: Date | null | undefined,
  clock: Pick<DeviceClockSnapshot, "timeZone" | "locale">
): string | null {
  if (!date || Number.isNaN(date.getTime())) {
    return null;
  }

  try {
    return new Intl.DateTimeFormat(clock.locale, {
      timeZone: clock.timeZone,
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  }
}
