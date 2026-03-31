import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OrdersHistory } from './OrdersHistory';

const meta = {
  title: 'Widgets/OrdersHistory',
  component: OrdersHistory,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof OrdersHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOrders = [
  { date: '01.10.25', orderNumber: '#011014', status: 'Доставлен', total: 3500, canRepeat: true, onShowComposition: () => alert('Состав #011014'), onRepeat: () => alert('Повторить #011014') },
  { date: '15.09.25', orderNumber: '#150906', status: 'Доставлен', total: 7450, canRepeat: true, onShowComposition: () => alert('Состав #150906'), onRepeat: () => alert('Повторить #150906') },
  { date: '01.09.25', orderNumber: '#010918', status: 'Доставлен', total: 5590, canRepeat: true, onShowComposition: () => alert('Состав #010918'), onRepeat: () => alert('Повторить #010918') },
  { date: '01.10.25', orderNumber: '#12345', status: 'Доставлен', total: 3500, canRepeat: false, onShowComposition: () => alert('Состав #12345') },
];

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return <OrdersHistory {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />;
  },
  args: { orders: sampleOrders },
};

export const ManyOrders: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return <OrdersHistory {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />;
  },
  args: {
    orders: Array(15).fill(null).map((_, i) => ({
      date: '01.10.25',
      orderNumber: `#0${i + 1}`,
      status: 'Доставлен',
      total: 1000 + i * 100,
      canRepeat: i < 3,
      onShowComposition: () => alert(`Состав #${i + 1}`),
      onRepeat: () => alert(`Повторить #${i + 1}`),
    })),
  },
};