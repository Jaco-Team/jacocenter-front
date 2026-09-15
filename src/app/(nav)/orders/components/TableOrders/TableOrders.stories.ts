import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TableOrders } from './TableOrders';
import { mockAllOrders } from '../../data/allOrders.mock';

const meta = {
  title: 'Widgets/TableOrders',
  component: TableOrders,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TableOrders>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orders: mockAllOrders,
  },
};
