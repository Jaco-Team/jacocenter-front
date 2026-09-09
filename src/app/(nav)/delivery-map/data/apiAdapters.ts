import type { Point } from '@/entities/delivery/model/types';
import type { Point as ApiPoint } from '@/entities/point/model/types';
import type { City } from '@/entities/city/model/types';
import type { DeliveryZone as ApiZone } from '@/entities/delivery/model/types';
import type { CafePoint, DeliveryZone } from './constants';

type Coordinates = [number, number];

const coordinatesOf = (point: Point | ApiPoint): Coordinates | null => {
  if ('latitude' in point && 'longitude' in point && point.latitude != null && point.longitude != null) {
    return [Number(point.longitude), Number(point.latitude)];
  }
  return null;
};

export function mapPointToCafe(point: Point | ApiPoint): CafePoint {
  return {
    id: String(point.id),
    address: point.address || point.name,
    district: point.name,
    deliveryPrice: 0,
    coordinates: coordinatesOf(point),
  };
}

export function mapCitiesToOptions(cities: City[]): string[] {
  return cities.map((city) => city.name).filter(Boolean);
}

export function mapZonesToMapZones(zones: ApiZone[]): DeliveryZone[] {
  return zones.map((zone) => ({
    id: zone.id == null ? `point-${zone.pointId}` : `zone-${zone.id}`,
    cafeId: String(zone.pointId),
    coordinates: zone.coordinates,
  }));
}
