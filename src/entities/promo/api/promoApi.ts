import { apiRequest } from '@/shared/api/http';
import { queryString } from '@/shared/api/query';
import type { CartItemInput } from '@/entities/delivery/model/types';
import type { PromoEvaluateInput } from '@/entities/promo/model/types';
import { mapCheck, mapEvaluation, mapPromo } from './promoMapper';

const cart = (items: CartItemInput[]) => items.map((item) => ({ item_id: item.itemId, quantity: item.quantity, ...(item.unitPrice === undefined ? {} : { unit_price: item.unitPrice }), ...(item.modifiers ? { modifiers: item.modifiers.map((modifier) => ({ item_id: modifier.itemId, quantity: modifier.quantity })) } : {}) }));
export const promoApi = {
  async list(cityId: number) { const response = await apiRequest<{ data: { items?: any[] } }>(`/promos${queryString({ city_id: cityId })}`); return (response.data.items ?? []).map(mapPromo); },
  async check(code: string, cityId: number) { const response = await apiRequest<{ data: any }>('/promos/check', { method: 'POST', body: { code, city_id: cityId } }); return mapCheck(response.data); },
  async evaluate(input: PromoEvaluateInput) {
    const response = await apiRequest<{ data: any }>('/promos/evaluate', { method: 'POST', body: { code: input.code, city_id: input.cityId, type_order: input.typeOrder, items: cart(input.items), ...(input.pointId === undefined ? {} : { point_id: input.pointId }), ...(input.customerId === undefined ? {} : { customer_id: input.customerId }), ...(input.phone ? { phone: input.phone } : {}), ...(input.weekday === undefined ? {} : { weekday: input.weekday }), ...(input.time ? { time: input.time } : {}) } });
    return mapEvaluation(response.data);
  },
};
