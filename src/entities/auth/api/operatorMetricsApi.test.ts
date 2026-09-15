import { afterEach, describe, expect, it, vi } from 'vitest';
import { operatorMetricsApi } from './operatorMetricsApi';

describe('operatorMetricsApi', () => {
  afterEach(() => vi.restoreAllMocks());

  it('maps aggregate metrics and serializes the selected period', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      st: true,
      data: {
        period: { date_from: '2026-09-01', date_to: '2026-09-14' },
        points: [{ id: '1', name: 'Точка 1' }],
        orders: {
          orders_cnt: '3',
          revenue: '1000.00',
          avg_check: 333,
          delivery_cnt: 1,
          pickup_cnt: 2,
          preorder_cnt: 1,
          with_promo_cnt: 3,
        },
        errors: { rows_count: 2, penalty_sum: '15.50' },
        overtime: {
          orders_cnt: 3,
          cook_early: 1,
          cook_on_time: 1,
          cook_late: 1,
          delivery_early: 0,
          delivery_on_time: 2,
          delivery_late: 1,
          all_green: 2,
          all_red: 1,
          late_pct: '33.33',
        },
        promos: {
          total: 1,
          items: [{ id: 7, name: 'Сентябрь', date_create: '2026-09-03 10:00:00', count: 5, is_delete: 0 }],
        },
      },
    }), { headers: { 'Content-Type': 'application/json' } }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(operatorMetricsApi.get({ dateFrom: '2026-09-01', dateTo: '2026-09-14' })).resolves.toMatchObject({
      orders: { ordersCount: 3, revenue: 1000, averageCheck: 333 },
      errors: { rowsCount: 2, penaltySum: 15.5 },
      overtime: { latePercent: 33.33 },
      promos: { total: 1, items: [{ id: 7, deleted: false }] },
    });
    expect(fetchMock.mock.calls[0][0]).toContain(
      '/auth/me/metrics?date_from=2026-09-01&date_to=2026-09-14',
    );
  });
});
