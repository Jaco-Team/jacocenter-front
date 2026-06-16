import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Shared/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    data: Array(20).fill(
      {
        name: 'Клиент',
        phone: '+7 999 999 99-99',
        address: 'город Москва, улица Тимирязевская, дом 11, подъезд 22, квартира 33, этаж 44',
      },
    ),
    columns: [
      { key: 'name', title: 'Имя *клик!*', width: 200, onHeaderClick: () => alert('Click!') },
      { key: 'phone', title: 'Телефон', width: 150 },
      { key: 'address', title: 'Адрес', width: 400 },
    ],
    width: 600,
    height: 400,
    variant: 'default',
    headerHeight: 60,
    rowHeight: 48,
    fontVariant: 'label-s-regular-12',
    rowGap: 4,
  },
};

export const Secondary: Story = {
  args: {
    data: Array(4).fill(
      {
        date: '01.01.2026',
        orderNumber: '#12345',
        status: 'Доставлен',
        sum: '3 500',
      },
    ),
    columns: [
      {key: 'date', title: 'Дата', width: 128},
      {key: 'orderNumber', title: 'Номер заказа', width: 128},
      {key: 'status', title: 'Статус', width: 168},
      {key: 'sum', title: 'Сумма', width: 128},
      {key: 'orderDetails', title: 'Состав заказа', width: 128, render: () => '❀︎', onCellClick: () => alert('click!')},
      {key: 'repeat', title: 'Повторить', width: 128, render: () => '✏️', onCellClick: () => alert('click!')},
    ],
    width: 808,
    height: 304,
    variant: 'secondary',
  },
};

