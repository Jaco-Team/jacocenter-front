import { apiRequest } from '@/shared/api/http';
import type { Point, PointCity } from '@/entities/point/model/types';

export type PointDto = {
  id: number;
  city_id: number;
  city?: { id: number; name: string } | null;
  name: string;
  address: string;
  base: string;
};

type PointsResponse = { st: true; data: PointDto[] };
type PointResponse = { st: true; data: PointDto };

export function mapPoint(dto: PointDto): Point {
  const city: PointCity | null = dto.city
    ? { id: Number(dto.city.id), name: String(dto.city.name ?? '') }
    : null;

  return {
    id: Number(dto.id),
    cityId: Number(dto.city_id),
    city,
    name: String(dto.name ?? ''),
    address: String(dto.address ?? ''),
    base: String(dto.base ?? ''),
  };
}

const withCity = (cityId?: number) => {
  if (cityId === undefined) return '/points';
  const query = new URLSearchParams({ city_id: String(cityId) });
  return `/points?${query.toString()}`;
};

export const pointsApi = {
  async list(cityId?: number): Promise<Point[]> {
    const response = await apiRequest<PointsResponse>(withCity(cityId), { method: 'GET' });
    return response.data.map(mapPoint);
  },

  async get(pointId: number): Promise<Point> {
    const response = await apiRequest<PointResponse>(`/points/${pointId}`, { method: 'GET' });
    return mapPoint(response.data);
  },
};

