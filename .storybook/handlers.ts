import { http, HttpResponse } from 'msw';

const envelope = (data: unknown) => HttpResponse.json({ st: true, data });

export const handlers = [
  http.get('*/api/v1/cities', () => envelope([
    { id: 1, name: 'Тольятти', slug: 'togliatti' },
    { id: 2, name: 'Самара', slug: 'samara' },
  ])),
  http.get('*/api/v1/points', () => envelope([
    { id: 2, city_id: 1, name: 'Центральное кафе', address: 'Ворошилова 12а', base: 'point_2', latitude: 53.531521, longitude: 49.312353 },
    { id: 3, city_id: 1, name: 'Кафе на Цветном', address: 'Цветной 1', base: 'point_3', latitude: 53.481084, longitude: 49.474651 },
  ])),
  http.get('*/api/v1/catalog', () => envelope({
    city: { id: 1, name: 'Тольятти' },
    categories: [{
      id: 1,
      name: 'Сеты',
      parent_id: 0,
      products: [
        { id: 354, name: 'Лосось и креветки', description: 'Лосось, креветка, сыр', price: 899, type: 1, available: true },
        { id: 355, name: 'Вулкан сет', description: 'Запечённые роллы', price: 1429, type: 1, available: true },
      ],
    }],
    free_items: [],
  })),
  http.get('*/api/v1/delivery/zones', () => envelope([])),
  http.get('*/api/v1/customers/lookup', () => envelope({
    phone: '+79991234567',
    registered: false,
    customer: null,
    last_order: null,
    last_order_state: '',
    addresses: [],
  })),
  http.post('*/api/v1/cart/validate', async () => envelope({
    city_id: 1,
    point_id: 2,
    valid: true,
    items: [{ item_id: 354, name: 'Лосось и креветки', quantity: 1, unit_price: 899, total: 899 }],
    subtotal: 899,
    discount: 0,
    total: 899,
    delivery: null,
    promo: null,
    errors: [],
  })),
];
