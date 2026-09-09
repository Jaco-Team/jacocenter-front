import { apiRequest } from '@/shared/api/http';
import type { City } from '@/entities/city/model/types';

export type CityDto = {
  id: number;
  name: string;
  slug: string;
};

type CitiesResponse = { st: true; data: CityDto[] };

export function mapCity(dto: CityDto): City {
  return {
    id: Number(dto.id),
    name: String(dto.name ?? ''),
    slug: String(dto.slug ?? ''),
  };
}

export const citiesApi = {
  async list(): Promise<City[]> {
    const response = await apiRequest<CitiesResponse>('/cities', { method: 'GET' });
    return response.data.map(mapCity);
  },
};

