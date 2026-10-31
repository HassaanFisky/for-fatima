export interface CreatorFallbackCoordinate {
  latitude: number;
  longitude: number;
  label?: string;
}

export interface WorldLocation {
  latitude: number;
  longitude: number;
  source: "device" | "creator-fallback";
  accuracyMeters?: number;
  capturedAt: number;
  label?: string;
}

export type GeoPermissionState =
  | PermissionState
  | "unknown"
  | "unsupported";

export type GeoFailure =
  | "permission-denied"
  | "position-unavailable"
  | "timeout"
  | "unsupported"
  | "invalid-fallback"
  | "unknown"
  | null;

export interface LocationResolution {
  permission: GeoPermissionState;
  location: WorldLocation | null;
  failure: GeoFailure;
}

const GEO_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  maximumAge: 6 * 60 * 60 * 1000,
  timeout: 10_000,
};

export function isValidCoordinate(
  coordinate: CreatorFallbackCoordinate
): boolean {
  return (
    Number.isFinite(coordinate.latitude) &&
    Number.isFinite(coordinate.longitude) &&
    coordinate.latitude >= -90 &&
    coordinate.latitude <= 90 &&
    coordinate.longitude >= -180 &&
    coordinate.longitude <= 180
  );
}

export function roundCoordinate(value: number): number {
  return Math.round(value * 100) / 100;
}

export function createFallbackResolution(
  fallback?: CreatorFallbackCoordinate
): LocationResolution {
  if (!fallback) {
    return {
      permission: "unknown",
      location: null,
      failure: null,
    };
  }

  if (!isValidCoordinate(fallback)) {
    return {
      permission: "unknown",
      location: null,
      failure: "invalid-fallback",
    };
  }

  return {
    permission: "unknown",
    location: {
      latitude: roundCoordinate(fallback.latitude),
      longitude: roundCoordinate(fallback.longitude),
      source: "creator-fallback",
      capturedAt: Date.now(),
      label: fallback.label,
    },
    failure: null,
  };
}

export async function inspectGeolocationPermission(): Promise<GeoPermissionState> {
  if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
    return "unsupported";
  }

  if (!navigator.permissions?.query) {
    return "unknown";
  }

  try {
    const result = await navigator.permissions.query({
      name: "geolocation",
    });
    return result.state;
  } catch {
    return "unknown";
  }
}

function readDevicePosition(
  fallback?: CreatorFallbackCoordinate
): Promise<LocationResolution> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      resolve({
        ...createFallbackResolution(fallback),
        permission: "unsupported",
        failure: "unsupported",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          permission: "granted",
          failure: null,
          location: {
            latitude: roundCoordinate(position.coords.latitude),
            longitude: roundCoordinate(position.coords.longitude),
            source: "device",
            accuracyMeters: Math.round(position.coords.accuracy),
            capturedAt: position.timestamp,
          },
        });
      },
      (error) => {
        const failure: GeoFailure =
          error.code === error.PERMISSION_DENIED
            ? "permission-denied"
            : error.code === error.POSITION_UNAVAILABLE
              ? "position-unavailable"
              : error.code === error.TIMEOUT
                ? "timeout"
                : "unknown";

        const fallbackResolution = createFallbackResolution(fallback);

        resolve({
          ...fallbackResolution,
          permission:
            error.code === error.PERMISSION_DENIED ? "denied" : "unknown",
          failure,
        });
      },
      GEO_OPTIONS
    );
  });
}

/**
 * Safe to call on initial mount.
 * Retrieves a position ONLY if permission has already been granted.
 * Never triggers a browser permission prompt automatically.
 */
export async function resolveLocationWithoutPrompt(
  fallback?: CreatorFallbackCoordinate
): Promise<LocationResolution> {
  const permission = await inspectGeolocationPermission();

  if (permission === "granted") {
    return readDevicePosition(fallback);
  }

  return {
    ...createFallbackResolution(fallback),
    permission,
  };
}

/**
 * Call ONLY from an explicit visitor action such as tapping the sky-follow button.
 */
export async function requestLocationFromUser(
  fallback?: CreatorFallbackCoordinate
): Promise<LocationResolution> {
  return readDevicePosition(fallback);
}
