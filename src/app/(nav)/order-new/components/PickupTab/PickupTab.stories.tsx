import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { PickupTab } from './PickupTab';
import { useOrderStore } from '@/entities/Order/store/new-order/orderStore';

const meta = {
  title: 'OrderNew/PickupTab',
  component: PickupTab,
  parameters: { layout: 'centered', a11y: { test: 'todo' } },
  tags: ['autodocs'],
  args: { activeTimeTab: null, setActiveTimeTab: fn() },
  decorators: [
    (Story) => (
      <div style={{ width: 680, padding: 24, background: '#e5e5e5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PickupTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      useOrderStore.getState().setDeliveryType('pickup');
      return {};
    },
  ],
};

export const SelectedCafe: Story = {
  args: { activeTimeTab: 'nearest' },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      useOrderStore.getState().setDeliveryType('pickup');
      useOrderStore.getState().setPickup({ cafe: 'Ворошилова 12а', cafeCheckStatus: 'success' });
      useOrderStore.getState().setPointId(2);
      return {};
    },
  ],
};
