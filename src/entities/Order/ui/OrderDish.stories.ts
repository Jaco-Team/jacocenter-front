import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OrderDish } from './OrderDish';

const meta: Meta<typeof OrderDish> = {
  title: 'entities/Order/OrderDish',
  component: OrderDish,
  tags: ['autodocs'],
  argTypes: {
    onIncrease: { action: 'increased' },
    onDecrease: { action: 'decreased' },
    onDelete: { action: 'deleted' },
  },
};

export default meta;
type Story = StoryObj<typeof OrderDish>;

export const Default: Story = {
  args: {
    name: 'Сет Атлантида',
    count: 1,
    price: 2550,
    oldPrice: 3550,
    discountText: 'Скидка',
  },
};

// Вариант без скидки
export const WithoutDiscount: Story = {
  args: {
    name: 'Ролл Филадельфия',
    count: 2,
    price: 1200,
  },
};

// Вариант с очень длинным названием (проверка верстки)
export const LongName: Story = {
  args: {
    name: 'Мега Сет Дракон с двойным угрем и сливочным сыром специальный выпуск',
    count: 1,
    price: 5000,
  },
};

// Состояние, когда товара много
export const ManyItems: Story = {
  args: {
    name: 'Нигири с лососем',
    count: 99,
    price: 450,
  },
};

// Состояние, когда товар 1 и кнопка минус - disabled
export const OneItem: Story = {
  args: {
    name: 'Нигири с лососем',
    count: 1,
    price: 450,
  },
};
