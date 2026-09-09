import { apiRequest } from '@/shared/api/http';
import { queryString } from '@/shared/api/query';
import type { AddressValidation, CartItemInput } from '@/entities/delivery/model/types';
import { mapCity, mapPoint, mapPolygon, mapSlots, mapStreet, mapValidation, mapZone } from './deliveryMapper';
import type { CityDto, PointDto, PolygonDto, SlotsDto, StreetDto, ValidationDto, ZoneDto } from './deliveryMapper';

const cart = (items: CartItemInput[]) => items.map((item) => ({ item_id: item.itemId, quantity: item.quantity, ...(item.unitPrice === undefined ? {} : { unit_price: item.unitPrice }), ...(item.modifiers ? { modifiers: item.modifiers.map((modifier) => ({ item_id: modifier.itemId, quantity: modifier.quantity })) } : {}) }));

export const deliveryApi = {
  async cities() { const response = await apiRequest<{ data: CityDto[] }>('/cities'); return (response.data ?? []).map(mapCity); },
  async points(cityId?: number) { const response = await apiRequest<{ data: PointDto[] }>(`/points${queryString({ city_id: cityId })}`); return (response.data ?? []).map(mapPoint); },
  async zones(cityId: number, options: { includeStreets?: boolean } = {}) {
    const response = await apiRequest<{ data: { zones?: ZoneDto[]; polygons?: PolygonDto[] } }>(`/delivery/zones${queryString({ city_id: cityId, map: options.includeStreets === false ? 1 : undefined })}`);
    const polygons = (response.data.polygons ?? []).map(mapPolygon);
    const zones = (response.data.zones ?? []).map(mapZone);
    const zonesById = new Map(zones.flatMap((zone) => zone.id == null ? [] : [[zone.id, zone] as const]));

    for (const polygon of polygons) {
      const zone = zonesById.get(polygon.zoneId);
      if (zone) {
        zone.coordinates = polygon.coordinates;
        continue;
      }

      zones.push({
        id: polygon.zoneId,
        pointId: polygon.pointId,
        pointName: '',
        streets: [],
        coordinates: polygon.coordinates,
      });
    }

    return zones;
  },
  async streets(cityId: number, search: string) { const response = await apiRequest<{ data: { streets?: StreetDto[] } }>(`/delivery/streets${queryString({ city_id: cityId, q: search })}`); return (response.data.streets ?? []).map(mapStreet); },
  async validateAddress(input: { cityId: number; street: string; home: string; entrance?: string }): Promise<AddressValidation> {
    const response = await apiRequest<{ data: ValidationDto }>('/delivery/address/validate', { method: 'POST', body: { city_id: input.cityId, street: input.street, home: input.home, ...(input.entrance ? { entrance: input.entrance } : {}) } });
    return mapValidation(response.data);
  },
  async preorderSlots(input: { date: string; pointId: number; typeOrder: number; items: CartItemInput[] }) {
    const response = await apiRequest<{ data: SlotsDto }>('/delivery/preorder-slots', { method: 'POST', body: { date: input.date, point_id: input.pointId, type_order: input.typeOrder, items: cart(input.items) } });
    return mapSlots(response.data);
  },
};
