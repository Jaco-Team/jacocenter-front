import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DeliveryTab } from './DeliveryTab';
import { useOrderStore } from '@/entities/Order/store/new-order/orderStore';

const meta = {
  title: 'OrderNew/DeliveryTab',
  component: DeliveryTab,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { activeTimeTab: null, setActiveTimeTab: fn() },
  decorators: [
    (Story) => (
      <div style={{ width: 680, padding: 24, background: '#e5e5e5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DeliveryTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      return {};
    },
  ],
};

export const AddressReadyForValidation: Story = {
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      useOrderStore.getState().setDelivery({ address: 'Чапаева 47' });
      return {};
    },
  ],
};

export const ValidatedAddress: Story = {
  args: { activeTimeTab: 'nearest' },
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      useOrderStore.getState().setDelivery({
        address: 'Чапаева 47',
        addressCheckStatus: 'success',
        streetId: 2934,
        pointId: 2,
        coordinates: [49.414321, 53.505389],
      });
      return {};
    },
  ],
};
