import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { PaymentBlock } from './PaymentBlock';
import { useOrderStore } from '@/entities/Order/store/new-order/orderStore';

const meta = {
  title: 'OrderNew/PaymentBlock',
  component: PaymentBlock,
  parameters: { layout: 'centered', a11y: { test: 'todo' } },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const changeInput = canvas.getByLabelText('Сдача с');
    await userEvent.clear(changeInput);
    await userEvent.type(changeInput, '5000');
    await expect(changeInput).toHaveValue('5000');
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Безналичный расчёт' })).toBeInTheDocument();
    await expect(canvas.getByLabelText('Комментарий курьеру')).toHaveValue('Позвонить за час');
  },
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

export const KeyboardNavigation: Story = {
  args: { activeTimeTab: 'nearest', isTimeSaved: false },
  loaders: [
    async () => {
      useOrderStore.setState({ payment: { method: 'cash', cashAmount: '', comment: '' } });
      return {};
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const changeInput = canvas.getByLabelText('Сдача с');
    await changeInput.focus();
    await expect(changeInput).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Безналичный расчёт' })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByLabelText('Комментарий курьеру')).toHaveFocus();
  },
};
