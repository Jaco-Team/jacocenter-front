import type { Meta, StoryObj } from '@storybook/react-vite';
import { ByTimeTab } from './ByTimeTab';
import { useOrderStore } from '@/entities/Order/store/new-order/orderStore';

const meta = {
  title: 'OrderNew/ByTimeTab',
  component: ByTimeTab,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 680, padding: 24, background: '#e5e5e5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ByTimeTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  loaders: [
    async () => {
      useOrderStore.setState({
        items: [],
        time: { date: '', time: '', isTimeSaved: false },
      });
      return {};
    },
  ],
};

export const SelectedTime: Story = {
  loaders: [
    async () => {
      useOrderStore.setState({
        items: [{ id: 'demo', name: 'Вулкан сет', price: 1429, count: 1 }],
        pointId: 2,
        deliveryType: 'pickup',
        time: { date: '11.09.2026', time: '12:00 - 12:30', isTimeSaved: true },
      });
      return {};
    },
  ],
};
