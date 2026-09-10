import { afterEach, describe, expect, it, vi } from 'vitest';
import { customerApi } from './customerApi';
import { API_BASE_URL } from '@/shared/config/api';

afterEach(() => vi.unstubAllGlobals());

describe('customerApi', () => {
  it('creates a customer using the operator customer contract', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ st: true, data: {
      created: true,
      customer: { id: 17, name: 'Иван', phone: '79271234567', active: true, spam: false },
    } }), { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(customerApi.create({ phone: '+7 (927) 123-45-67', cityId: 1, name: 'Иван', surname: 'Иванов', birthDate: '1990-01-01' })).resolves.toMatchObject({
      created: true,
      customer: { id: 17, name: 'Иван', phone: '79271234567' },
    });
    expect(fetchMock.mock.calls[0][0]).toBe(`${API_BASE_URL}/customers`);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ phone: '+7 (927) 123-45-67', city_id: 1, name: 'Иван', surname: 'Иванов', birth_date: '1990-01-01' });
  });

  it('maps lookup data and encodes the phone query', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ st: true, data: { phone: '7999', registered: true, customer: { id: 4, name: 'Иван', phone: '7999' }, addresses: [] } }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const result = await customerApi.lookup('+7 (999) 000-00-00', 12);
    expect(result.customer?.id).toBe(4);
    expect(fetchMock.mock.calls[0][0]).toContain('/customers/lookup?phone=%2B7+%28999%29+000-00-00&city_id=12');
  });

  it('uses the documented snake_case address write contract', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ st: true, data: { id: 9, customer_id: 4, city_id: 12, street_id: 2 } }), { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);
    await customerApi.createAddress(4, { cityId: 12, streetId: 2, domTrue: true, isMain: true });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ city_id: 12, street_id: 2, dom_true: true, is_main: true });
  });

  it('supports address listing, partial updates, and deletion', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ st: true, data: { items: [{ id: 9, customer_id: 4, city_id: 12, street_id: 2, street: 'Ленина', home: '1' }] } }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ st: true, data: { id: 9, customer_id: 4, city_id: 12, street_id: 2, apartment: '10' } }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ st: true, data: {} }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(customerApi.addresses(4, 12)).resolves.toMatchObject([{ id: 9, cityId: 12, streetId: 2 }]);
    await expect(customerApi.updateAddress(4, 9, { apartment: '10' })).resolves.toMatchObject({ id: 9, apartment: '10' });
    await expect(customerApi.deleteAddress(4, 9)).resolves.toBeUndefined();

    expect(fetchMock.mock.calls.map(([url, init]) => [url, init.method])).toEqual([
      ['/customers/4/addresses?city_id=12', undefined],
      ['/customers/4/addresses/9', 'PATCH'],
      ['/customers/4/addresses/9', 'DELETE'],
    ].map(([url, method]) => [`${API_BASE_URL}${url}`, method]));
  });
});
