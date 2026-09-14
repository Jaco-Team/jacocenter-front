import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ByTimeTab } from './ByTimeTab';
import { useOrderStore } from '@/entities/Order/store/new-order/orderStore';

const meta = {
  title: 'OrderNew/ByTimeTab',
  component: ByTimeTab,
  parameters: { layout: 'centered', a11y: { test: 'todo' } },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Дата')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Время')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Сохранить время' }));
    await expect(canvas.getByRole('button', { name: 'Сохранить время' })).toBeInTheDocument();
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByDisplayValue('11.09.2026')).toBeInTheDocument();
    await expect(canvas.getByDisplayValue('12:00 - 12:30')).toBeInTheDocument();
    await expect(canvas.getByText('Время доставки сохранено')).toBeInTheDocument();
  },
};
