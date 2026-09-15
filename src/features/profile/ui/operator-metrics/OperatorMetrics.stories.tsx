import type { Meta, StoryObj } from '@storybook/nextjs';
import { MetricsContent } from './OperatorMetrics';

const meta = {
  title: 'Features/Profile/OperatorMetrics',
  component: MetricsContent,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <section className="operator-metrics"><Story /></section>],
} satisfies Meta<typeof MetricsContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    metrics: {
      period: { dateFrom: '2026-09-01', dateTo: '2026-09-14' },
      points: [{ id: 1, name: 'Точка на Молодёжной' }, { id: 2, name: 'Точка в центре' }],
      orders: {
        ordersCount: 128,
        revenue: 186400,
        averageCheck: 1456,
        deliveryCount: 79,
        pickupCount: 49,
        preorderCount: 18,
        withPromoCount: 34,
      },
      errors: { rowsCount: 2, penaltySum: 350 },
      overtime: {
        ordersCount: 128,
        cookEarly: 21,
        cookOnTime: 94,
        cookLate: 13,
        deliveryEarly: 12,
        deliveryOnTime: 101,
        deliveryLate: 15,
        allGreen: 110,
        allRed: 18,
        latePercent: 14.06,
      },
      promos: {
        total: 2,
        items: [
          { id: 1, name: 'СЕНТЯБРЬ', createdAt: '2026-09-03 10:00:00', count: 10, deleted: false },
          { id: 2, name: 'ПОДАРОК', createdAt: '2026-09-07 10:00:00', count: 5, deleted: true },
        ],
      },
    },
  },
};

export const Empty: Story = {
  args: {
    metrics: {
      period: { dateFrom: '2026-09-01', dateTo: '2026-09-14' },
      points: [],
      orders: {
        ordersCount: 0,
        revenue: 0,
        averageCheck: 0,
        deliveryCount: 0,
        pickupCount: 0,
        preorderCount: 0,
        withPromoCount: 0,
      },
      errors: { rowsCount: 0, penaltySum: 0 },
      overtime: {
        ordersCount: 0,
        cookEarly: 0,
        cookOnTime: 0,
        cookLate: 0,
        deliveryEarly: 0,
        deliveryOnTime: 0,
        deliveryLate: 0,
        allGreen: 0,
        allRed: 0,
        latePercent: 0,
      },
      promos: { total: 0, items: [] },
    },
  },
};
