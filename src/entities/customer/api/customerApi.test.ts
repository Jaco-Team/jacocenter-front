import { afterEach, describe, expect, it, vi } from 'vitest';
import { customerApi } from './customerApi';

afterEach(() => vi.unstubAllGlobals());

describe('customerApi', () => {
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
});
