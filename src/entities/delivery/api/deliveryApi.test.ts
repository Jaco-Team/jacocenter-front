import { afterEach, describe, expect, it, vi } from 'vitest';
import { deliveryApi } from './deliveryApi';

afterEach(() => vi.unstubAllGlobals());

describe('deliveryApi', () => {
  it('maps zones and preserves nested delivery quotes', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ st: true, data: { city_id: 1, zones: [{ point_id: 2, point_name: 'Центр', streets: [{ id: 3, name: 'Ленина', delivery: { sum_div: 100, free_drive: true } }] }] } }), { status: 200 })));
    const result = await deliveryApi.zones(1);
    expect(result[0].streets[0].delivery).toEqual({ sumDiv: 100, freeDrive: true });
  });

  it('attaches standalone map polygons to zones without street payloads', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      st: true,
      data: {
        city_id: 2,
        zones: [{ point_id: 7, point_name: 'Самара', streets: [] }],
        polygons: [{ zone_id: 11, point_id: 7, coordinates: [[[50, 53], [51, 53], [51, 54], [50, 53]]] }],
      },
    }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const result = await deliveryApi.zones(2, { includeStreets: false });

    expect(fetchMock.mock.calls[0][0]).toContain('/delivery/zones?city_id=2&map=1');
    expect(result).toHaveLength(2);
    expect(result.find((zone) => zone.id === 11)?.coordinates).toEqual([[[50, 53], [51, 53], [51, 54], [50, 53]]]);
  });

  it('serializes preorder slots with the cart contract', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ st: true, data: { valid: true, date: '2026-09-09', point_id: 2, type_order: 1, slots: [] } }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await deliveryApi.preorderSlots({ date: '2026-09-09', pointId: 2, typeOrder: 1, items: [{ itemId: 8, quantity: 2 }] });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ date: '2026-09-09', point_id: 2, type_order: 1, items: [{ item_id: 8, quantity: 2 }] });
  });
});
