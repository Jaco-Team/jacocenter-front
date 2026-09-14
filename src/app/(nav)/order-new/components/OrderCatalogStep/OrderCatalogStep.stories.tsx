import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrderCatalogStep } from './OrderCatalogStep';
import { QueryProvider } from '@/shared/api/QueryProvider';
import { useOrderStore } from '@/entities/Order/store/new-order/orderStore';

const meta = {
  title: 'OrderNew/OrderCatalogStep',
  component: OrderCatalogStep,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryProvider>
        <div style={{ width: 700, padding: 24, background: '#e5e5e5' }}>
          <Story />
        </div>
      </QueryProvider>
    ),
  ],
} satisfies Meta<typeof OrderCatalogStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Catalog: Story = {
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      useOrderStore.getState().setCity('Тольятти');
      useOrderStore.getState().setPointId(2);
      return {};
    },
  ],
};
