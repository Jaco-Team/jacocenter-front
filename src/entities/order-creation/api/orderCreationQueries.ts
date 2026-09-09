import { useQuery } from '@tanstack/react-query';
import { catalogApi } from '@/entities/catalog/api/catalogApi';
import { citiesApi } from '@/entities/city/api/citiesApi';

export const orderCreationQueryKeys = {
  cities: ['order-creation', 'cities'] as const,
  catalog: (cityId: number) => ['order-creation', 'catalog', cityId] as const,
};

export function useOrderCreationCitiesQuery() {
  return useQuery({ queryKey: orderCreationQueryKeys.cities, queryFn: () => citiesApi.list() });
}

export function useOrderCreationCatalogQuery(cityId: number | null) {
  return useQuery({
    queryKey: orderCreationQueryKeys.catalog(cityId ?? 0),
    queryFn: () => catalogApi.get(cityId as number),
    enabled: cityId !== null,
  });
}
