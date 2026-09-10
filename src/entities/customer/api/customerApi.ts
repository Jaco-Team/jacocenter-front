import { apiRequest } from '@/shared/api/http';
import { queryString } from '@/shared/api/query';
import { mapAddress, mapCustomer, mapLookup, mapOrder } from './customerMapper';
import type { AddressDto, CustomerDto, LookupDto, OrderDto } from './customerMapper';
import type { CustomerAddress, CustomerAddressInput, CustomerCreateInput, CustomerCreateResult, CustomerLookup, CustomerOrder } from '@/entities/customer/model/types';

const writeAddress = (input: CustomerAddressInput) => ({
  ...(input.cityId !== undefined ? { city_id: input.cityId } : {}), ...(input.streetId !== undefined ? { street_id: input.streetId } : {}),
  ...(input.apartment !== undefined ? { apartment: input.apartment } : {}), ...(input.entrance !== undefined ? { entrance: input.entrance } : {}),
  ...(input.floor !== undefined ? { floor: input.floor } : {}), ...(input.domTrue !== undefined ? { dom_true: input.domTrue } : {}),
  ...(input.comment !== undefined ? { comment: input.comment } : {}), ...(input.isMain !== undefined ? { is_main: input.isMain } : {}),
});

export const customerApi = {
  async create(input: CustomerCreateInput): Promise<CustomerCreateResult> {
    const response = await apiRequest<{ data: { customer: CustomerDto; created: boolean } }>('/customers', {
      method: 'POST',
      body: {
        phone: input.phone,
        name: input.name,
        ...(input.surname ? { surname: input.surname } : {}),
        ...(input.gender ? { gender: input.gender } : {}),
        ...(input.birthDate ? { birth_date: input.birthDate } : {}),
      },
    });
    return { customer: mapCustomer(response.data.customer), created: response.data.created };
  },
  async lookup(phone: string, cityId?: number): Promise<CustomerLookup> {
    const response = await apiRequest<{ data: LookupDto }>(`/customers/lookup${queryString({ phone, city_id: cityId })}`);
    return mapLookup(response.data);
  },
  async profile(customerId: number): Promise<CustomerLookup> {
    const response = await apiRequest<{ data: LookupDto | CustomerDto }>(`/customers/${customerId}`);
    return mapLookup(response.data);
  },
  async orders(customerId: number): Promise<CustomerOrder[]> {
    const response = await apiRequest<{ data: { items?: OrderDto[] } }>(`/customers/${customerId}/orders`);
    return (response.data.items ?? []).map(mapOrder);
  },
  async addresses(customerId: number, cityId?: number): Promise<CustomerAddress[]> {
    const response = await apiRequest<{ data: { items?: AddressDto[] } }>(`/customers/${customerId}/addresses${queryString({ city_id: cityId })}`);
    return (response.data.items ?? []).map(mapAddress);
  },
  async address(customerId: number, addressId: number): Promise<CustomerAddress> {
    const response = await apiRequest<{ data: AddressDto }>(`/customers/${customerId}/addresses/${addressId}`);
    return mapAddress(response.data);
  },
  async createAddress(customerId: number, input: Required<Pick<CustomerAddressInput, 'cityId' | 'streetId'>> & CustomerAddressInput): Promise<CustomerAddress> {
    const response = await apiRequest<{ data: AddressDto }>(`/customers/${customerId}/addresses`, { method: 'POST', body: writeAddress(input) });
    return mapAddress(response.data);
  },
  async updateAddress(customerId: number, addressId: number, input: CustomerAddressInput): Promise<CustomerAddress> {
    const response = await apiRequest<{ data: AddressDto }>(`/customers/${customerId}/addresses/${addressId}`, { method: 'PATCH', body: writeAddress(input) });
    return mapAddress(response.data);
  },
  async deleteAddress(customerId: number, addressId: number): Promise<void> {
    await apiRequest(`/customers/${customerId}/addresses/${addressId}`, { method: 'DELETE' });
  },
};
