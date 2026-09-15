import { apiRequest } from '@/shared/api/http';
import { queryString } from '@/shared/api/query';
import type { OperatorMetrics } from '../model/operator-metrics';

type MetricsDto = {
  period: { date_from: string; date_to: string };
  points: Array<{ id: number | string; name?: string }>;
  orders: {
    orders_cnt: number | string;
    revenue: number | string;
    avg_check: number | string;
    delivery_cnt: number | string;
    pickup_cnt: number | string;
    preorder_cnt: number | string;
    with_promo_cnt: number | string;
  };
  errors: { rows_count: number | string; penalty_sum: number | string };
  overtime: {
    orders_cnt: number | string;
    cook_early: number | string;
    cook_on_time: number | string;
    cook_late: number | string;
    delivery_early: number | string;
    delivery_on_time: number | string;
    delivery_late: number | string;
    all_green: number | string;
    all_red: number | string;
    late_pct: number | string;
  };
  promos: {
    total: number | string;
    items: Array<{
      id: number | string;
      name?: string;
      date_create?: string;
      count: number | string;
      is_delete: boolean | number;
    }>;
  };
};

const number = (value: number | string): number => Number(value) || 0;

function mapMetrics(dto: MetricsDto): OperatorMetrics {
  return {
    period: { dateFrom: dto.period.date_from, dateTo: dto.period.date_to },
    points: dto.points.map((point) => ({ id: number(point.id), name: String(point.name ?? '') })),
    orders: {
      ordersCount: number(dto.orders.orders_cnt),
      revenue: number(dto.orders.revenue),
      averageCheck: number(dto.orders.avg_check),
      deliveryCount: number(dto.orders.delivery_cnt),
      pickupCount: number(dto.orders.pickup_cnt),
      preorderCount: number(dto.orders.preorder_cnt),
      withPromoCount: number(dto.orders.with_promo_cnt),
    },
    errors: {
      rowsCount: number(dto.errors.rows_count),
      penaltySum: number(dto.errors.penalty_sum),
    },
    overtime: {
      ordersCount: number(dto.overtime.orders_cnt),
      cookEarly: number(dto.overtime.cook_early),
      cookOnTime: number(dto.overtime.cook_on_time),
      cookLate: number(dto.overtime.cook_late),
      deliveryEarly: number(dto.overtime.delivery_early),
      deliveryOnTime: number(dto.overtime.delivery_on_time),
      deliveryLate: number(dto.overtime.delivery_late),
      allGreen: number(dto.overtime.all_green),
      allRed: number(dto.overtime.all_red),
      latePercent: number(dto.overtime.late_pct),
    },
    promos: {
      total: number(dto.promos.total),
      items: dto.promos.items.map((promo) => ({
        id: number(promo.id),
        name: String(promo.name ?? ''),
        createdAt: String(promo.date_create ?? ''),
        count: number(promo.count),
        deleted: Boolean(promo.is_delete),
      })),
    },
  };
}

export const operatorMetricsApi = {
  get(input: { dateFrom: string; dateTo: string }) {
    return apiRequest<{ st: true; data: MetricsDto }>(
      `/auth/me/metrics${queryString({ date_from: input.dateFrom, date_to: input.dateTo })}`,
    ).then((response) => mapMetrics(response.data));
  },
};
