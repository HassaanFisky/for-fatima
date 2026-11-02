/**
 * Fixed Karachi, Pakistan astronomical reference coordinates.
 * Zero browser geolocation or permission checks are ever performed.
 */

export interface WorldLocation {
  latitude: number;
  longitude: number;
  source: "karachi-fixed";
  capturedAt: number;
  label: string;
}

export const KARACHI_LOCATION: WorldLocation = {
  latitude: 24.8607,
  longitude: 67.0011,
  source: "karachi-fixed",
  capturedAt: 0,
  label: "Karachi",
};

export function getKarachiLocation(capturedAt = Date.now()): WorldLocation {
  return {
    ...KARACHI_LOCATION,
    capturedAt,
  };
}
