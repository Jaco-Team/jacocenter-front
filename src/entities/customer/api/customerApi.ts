import { apiRequest } from '@/shared/api/http';
import { queryString } from '@/shared/api/query';
import { mapAddress, mapLookup, mapOrder } from './customerMapper';
import type { CustomerAddress, CustomerAddressInput, CustomerLookup, CustomerOrder } from '@/entities/customer/model/types';

const writeAddress = (input: CustomerAddressInput) => ({
  ...(input.cityId !== undefined ? { city_id: input.cityId } : {}), ...(input.streetId !== undefined ? { street_id: input.streetId } : {}),
  ...(input.apartment !== undefined ? { apartment: input.apartment } : {}), ...(input.entrance !== undefined ? { entrance: input.entrance } : {}),
  ...(input.floor !== undefined ? { floor: input.floor } : {}), ...(input.domTrue !== undefined ? { dom_true: input.domTrue } : {}),
  ...(input.comment !== undefined ? { comment: input.comment } : {}), ...(input.isMain !== undefined ? { is_main: input.isMain } : {}),
});

export const customerApi = {
  async lookup(phone: string, cityId?: number): Promise<CustomerLookup> {
    const response = await apiRequest<{ data: any }>(`/customers/lookup${queryString({ phone, city_id: cityId })}`);
    return mapLookup(response.data);
  },
  async profile(customerId: number): Promise<CustomerLookup> {
    const response = await apiRequest<{ data: any }>(`/customers/${customerId}`);
    return mapLookup(response.data);
  },
  async orders(customerId: number): Promise<CustomerOrder[]> {
    const response = await apiRequest<{ data: { items?: any[] } }>(`/customers/${customerId}/orders`);
    return (response.data.items ?? []).map(mapOrder);
  },
  async addresses(customerId: number, cityId?: number): Promise<CustomerAddress[]> {
    const response = await apiRequest<{ data: { items?: any[] } }>(`/customers/${customerId}/addresses${queryString({ city_id: cityId })}`);
    return (response.data.items ?? []).map(mapAddress);
  },
  async address(customerId: number, addressId: number): Promise<CustomerAddress> {
    const response = await apiRequest<{ data: any }>(`/customers/${customerId}/addresses/${addressId}`);
    return mapAddress(response.data);
  },
  async createAddress(customerId: number, input: Required<Pick<CustomerAddressInput, 'cityId' | 'streetId'>> & CustomerAddressInput): Promise<CustomerAddress> {
    const response = await apiRequest<{ data: any }>(`/customers/${customerId}/addresses`, { method: 'POST', body: writeAddress(input) });
    return mapAddress(response.data);
  },
  async updateAddress(customerId: number, addressId: number, input: CustomerAddressInput): Promise<CustomerAddress> {
    const response = await apiRequest<{ data: any }>(`/customers/${customerId}/addresses/${addressId}`, { method: 'PATCH', body: writeAddress(input) });
    return mapAddress(response.data);
  },
  async deleteAddress(customerId: number, addressId: number): Promise<void> {
    await apiRequest(`/customers/${customerId}/addresses/${addressId}`, { method: 'DELETE' });
  },
};
