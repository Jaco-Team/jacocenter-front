import { afterEach, describe, expect, it, vi } from 'vitest';
import { promoApi } from './promoApi';

afterEach(() => vi.unstubAllGlobals());

describe('promoApi', () => {
  it('maps active promos and evaluates server-calculated totals', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ st: true, data: { items: [{ id: 1, name: 'TEST', city_id: 2 }] } }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ st: true, data: { valid: true, code: 'PROMO_VALID', promo: { id: 1, name: 'TEST' }, subtotal: 1000, discount: 200, total: 800, free_drive: false, items: [], writes: false } }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    expect((await promoApi.list(2))[0].cityId).toBe(2);
    const result = await promoApi.evaluate({ code: 'TEST', cityId: 2, typeOrder: 1, items: [{ itemId: 8, quantity: 1 }] });
    expect(result.total).toBe(800);
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toMatchObject({ code: 'TEST', city_id: 2, type_order: 1, items: [{ item_id: 8, quantity: 1 }] });
  });
});
