import { describe, expect, it } from 'vitest';
import { mapPolygon, mapZone, mapZoneCoordinates } from './deliveryMapper';

describe('mapZoneCoordinates', () => {
  it('maps a GeoJSON polygon without changing coordinate order', () => {
    expect(mapZoneCoordinates({
      type: 'Polygon',
      coordinates: [[[49.1, 53.1], [49.2, 53.1], [49.2, 53.2], [49.1, 53.1]]],
    })).toEqual([[[49.1, 53.1], [49.2, 53.1], [49.2, 53.2], [49.1, 53.1]]]);
  });

  it('drops malformed and incomplete rings instead of rendering invented geometry', () => {
    expect(mapZoneCoordinates({ coordinates: [
      [[49.1, 53.1], ['bad', 53.1], [49.2, 53.2]],
      [[49.1, 53.1], [49.2, 53.1], [49.2, 53.2], [49.1, 53.1]],
    ] })).toEqual([[[49.1, 53.1], [49.2, 53.1], [49.2, 53.2], [49.1, 53.1]]]);
  });

  it('returns an empty polygon for absent or unsupported geometry', () => {
    expect(mapZoneCoordinates(undefined)).toEqual([]);
    expect(mapZoneCoordinates({ type: 'MultiPolygon', coordinates: [] })).toEqual([]);
    expect(mapZoneCoordinates('49.1,53.1')).toEqual([]);
  });
});

describe('mapZone', () => {
  it('keeps the API zone identity and maps geometry alongside street coverage', () => {
    expect(mapZone({
      id: 7,
      point_id: 2,
      point_name: 'Центр',
      geometry: { type: 'Polygon', coordinates: [[[49.1, 53.1], [49.2, 53.1], [49.2, 53.2], [49.1, 53.1]]] },
      streets: [],
    })).toMatchObject({ id: 7, pointId: 2, pointName: 'Центр', coordinates: [[[49.1, 53.1], [49.2, 53.1], [49.2, 53.2], [49.1, 53.1]]] });
  });
});

describe('mapPolygon', () => {
  it('maps the additive API polygon collection by zone identity', () => {
    expect(mapPolygon({
      zone_id: 7,
      point_id: 2,
      coordinates: [[[49.1, 53.1], [49.2, 53.1], [49.2, 53.2], [49.1, 53.1]]],
    })).toEqual({
      zoneId: 7,
      pointId: 2,
      coordinates: [[[49.1, 53.1], [49.2, 53.1], [49.2, 53.2], [49.1, 53.1]]],
    });
  });
});
