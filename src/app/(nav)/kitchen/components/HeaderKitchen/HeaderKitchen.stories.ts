import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeaderKitchen } from './HeaderKitchen';
import { mockKitchenOrders } from '../../data/kitchenOrders.mock';

const meta = {
  title: 'Widgets/HeaderKitchen',
  component: HeaderKitchen,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    cities: [
      { id: 1, name: 'Тольятти' },
      { id: 2, name: 'Самара' },
    ],
    orders: mockKitchenOrders,
  },
} satisfies Meta<typeof HeaderKitchen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
