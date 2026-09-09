import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FiltersBlock } from './FiltersBlock';
import { mockAllOrders } from '@/app/(nav)/orders/data/allOrders.mock';

const points = [
  { id: 1, address: "Ленинградская 47" },
  { id: 2, address: "Ворошилова 12А" },
  { id: 3, address: "Матросова 32" },
  { id: 4, address: "Цветной 1" },
];

const meta = {
  title: 'features/orders/FiltersBlock',
  component: FiltersBlock,
  args: {
    points,
    orders: mockAllOrders,
  },
} satisfies Meta<typeof FiltersBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

