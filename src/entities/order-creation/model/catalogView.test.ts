import { describe, expect, it } from 'vitest';
import { mapCatalogCategories, mapCatalogDishes } from './catalogView';

describe('order creation catalog view mapping', () => {
  it('keeps only available products and preserves server prices', () => {
    const catalog = {
      city: { id: 7, name: 'Самара' },
      categories: [{ id: 2, name: 'Сеты', parentId: 0, products: [
        { id: 12, name: 'Сет', description: 'Описание', price: 990, weight: null, type: 1, available: true },
        { id: 13, name: 'Стоп', description: '', price: 1, weight: null, type: 1, available: false },
      ] }],
      freeItems: [],
    };

    expect(mapCatalogCategories(catalog.categories[0])).toEqual({ id: '2', name: 'Сеты' });
    expect(mapCatalogDishes(catalog)).toEqual([{ id: '12', categoryId: '2', name: 'Сет', price: 990, description: 'Описание' }]);
  });
});
