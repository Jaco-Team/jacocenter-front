import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TableOrders } from './TableOrders';

const meta = {
  title: 'Widgets/TableOrders',
  component: TableOrders,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TableOrders>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};