import { afterEach, describe, expect, it, vi } from 'vitest';
import { citiesApi } from '@/entities/city/api/citiesApi';
import { pointsApi } from '@/entities/point/api/pointsApi';
import { catalogApi } from '@/entities/catalog/api/catalogApi';
import { ApiError } from '@/shared/api/http';
import { API_BASE_URL } from '@/shared/config/api';

const fetchJson = (payload: unknown, status = 200) => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(payload), { status }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

describe('reference-data API clients', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('loads cities and maps the API resource collection', async () => {
    const fetchMock = fetchJson({ st: true, data: [{ id: '7', name: 'Самара', slug: 'samara' }] });

    await expect(citiesApi.list()).resolves.toEqual([{ id: 7, name: 'Самара', slug: 'samara' }]);
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/cities`, expect.anything());
  });

  it('adds city_id only when listing points for a city', async () => {
    const fetchMock = fetchJson({ st: true, data: [{ id: 4, city_id: 7, name: 'Центр', address: 'ул. Ленина, 1', base: 'base' }] });

    await expect(pointsApi.list(7)).resolves.toEqual([
      { id: 4, cityId: 7, city: null, name: 'Центр', address: 'ул. Ленина, 1', base: 'base' },
    ]);
    expect(fetchMock.mock.calls[0][0]).toBe(`${API_BASE_URL}/points?city_id=7`);
  });

  it('maps catalog categories, availability, relations and allergens', async () => {
    fetchJson({
      st: true,
      data: {
        city: { id: 7, name: 'Самара' },
        categories: [{
          id: 2,
          name: 'Пицца',
          parent_id: 0,
          products: [{
            id: 12,
            name: 'Маргарита',
            description: 'Томат',
            price: 650,
            weight: '30 см / 500 г',
            type: 1,
            available: false,
            allergens: [{ id: 3, name: 'Молоко', additional_name: null }],
            possible_allergens: [],
            relation: { type: 1, count: 1, max_count: 2, is_add: true },
          }],
        }],
        free_items: [],
      },
    });

    await expect(catalogApi.get(7, 4)).resolves.toMatchObject({
      city: { id: 7, name: 'Самара' },
      categories: [{
        products: [{
          id: 12,
          available: false,
          allergens: [{ id: 3, name: 'Молоко', additionalName: null }],
          relation: { type: 1, count: 1, maxCount: 2, isAdd: true },
        }],
      }],
    });
  });

  it('maps item detail and preserves API errors', async () => {
    fetchJson({ st: false, text: 'Товар недоступен', code: 'NOT_FOUND' }, 404);

    const request = catalogApi.getItem(7, 12);
    await expect(request).rejects.toBeInstanceOf(ApiError);
    await expect(request).rejects.toMatchObject({ status: 404, code: 'NOT_FOUND' });
  });
});
