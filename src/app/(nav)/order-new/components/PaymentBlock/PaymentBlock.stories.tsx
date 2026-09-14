import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaymentBlock } from './PaymentBlock';
import { useOrderStore } from '@/entities/Order/store/new-order/orderStore';

const meta = {
  title: 'OrderNew/PaymentBlock',
  component: PaymentBlock,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 680, padding: 24, background: '#e5e5e5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PaymentBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CashNearest: Story = {
  args: { activeTimeTab: 'nearest', isTimeSaved: false },
  loaders: [
    async () => {
      useOrderStore.setState({
        payment: { method: 'cash', cashAmount: '4000', comment: '' },
      });
      return {};
    },
  ],
};

export const CardPayment: Story = {
  args: { activeTimeTab: 'nearest', isTimeSaved: false },
  loaders: [
    async () => {
      useOrderStore.setState({
        payment: { method: 'card', cashAmount: '', comment: 'Позвонить за час' },
      });
      return {};
    },
  ],
};

export const DisabledUntilTimeSelected: Story = {
  args: { activeTimeTab: null, isTimeSaved: false },
  loaders: [
    async () => {
      useOrderStore.setState({
        payment: { method: null, cashAmount: '', comment: '' },
      });
      return {};
    },
  ],
};
