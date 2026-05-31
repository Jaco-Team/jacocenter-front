import type { LngLat, LngLatBounds } from "ymaps3";

export const isPointInBounds = (
  point: LngLat,
  bounds: LngLatBounds,
): boolean => {
  const [[minLon, minLat], [maxLon, maxLat]] = bounds;
  const [lon, lat] = point;
  return lon >= minLon && lon <= maxLon && lat >= minLat && lat <= maxLat;
};
