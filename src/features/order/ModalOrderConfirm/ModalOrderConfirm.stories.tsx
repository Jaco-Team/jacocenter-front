import type { Meta, StoryObj } from '@storybook/react';
import { ModalOrderConfirm } from './ModalOrderConfirm';
import { useState } from 'react';

const meta = {
  title: 'Features/ModalOrderConfirm',
  component: ModalOrderConfirm,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ModalOrderConfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { name: 'Филадельфия Лайт', quantity: 1, price: 339 },
  { name: 'Акваланг запечённый унаги', quantity: 1, price: 319 },
  { name: 'Коралл запечённый унаги', quantity: 1, price: 229 },
  { name: 'Ролл Жако', quantity: 1, price: 0 },
  { name: 'Васаби', quantity: 2, price: 18 },
  { name: 'Вилка', quantity: 5, price: 0 },
  { name: 'Палочки', quantity: 2, price: 0 },
];

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <ModalOrderConfirm
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    );
  },
  args: {
    title: 'Заказ № 800602 от 23 октября 2025',
    deliveryTime: 'Время ожидания 0:45-1:15',
    clientPhone: '+7 (999) 999-99-99',
    address: 'г. Тольятти, ул. Ленинградская, 27, п.1, эт.3, кв.15',
    intercom: 'работает',
    payment: 'Наличный расчёт\nСдача с 5 000 рублей',
    promocode: 'ПТЮИУЦУ6',
    promocodeDescription: 'Бесплатный ролл Жако. С Днем Рождения!)',
    comment: 'Позвонить за 30 минут для заказа пропуска',
    items: sampleItems,
    totalPrice: 975,
    onCancel: () => alert('Отменить'),
    onEdit: () => alert('Редактировать'),
    onConfirm: () => alert('Подтвердить'),
  },
};

export const WithManyItems: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <ModalOrderConfirm
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    );
  },
  args: {
    ...Default.args,
    items: Array(15).fill(null).map((_, i) => ({
      name: `Позиция ${i + 1}`,
      quantity: 1,
      price: 100,
    })),
    totalPrice: 1500,
  },
};