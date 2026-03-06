'use client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cart } from './Cart';

const mockItems = [
  {
    id: '1',
    name: 'Вулкан сет',
    price: 1400,
    oldPrice: 1500,
    count: 1,
    discountText: 'Скидка',
  },
  {
    id: '2',
    name: 'Пицца Пепперони',
    price: 650,
    count: 2,
  },
  {
    id: '3',
    name: 'Картофель фри',
    price: 140,
    oldPrice: 150,
    count: 1,
    discountText: 'Скидка',
  },
  {
    id: '4',
    name: 'Жако салат',
    price: 325,
    oldPrice: 350,
    count: 1,
    discountText: 'Скидка',
  },
  {
    id: '5',
    name: 'Чизкейк Нью-йорк',
    price: 200,
    oldPrice: 250,
    count: 1,
    discountText: 'Скидка',
  },
  {
    id: '6',
    name: 'Соус сырный',
    price: 35,
    count: 3,
  },
  {
    id: '7',
    name: 'Филадельфия',
    price: 500,
    count: 1,
  },
];

const mockItemsWithoutDiscount = [
  {
    id: '1',
    name: 'Вулкан сет',
    price: 1400,
    count: 1,
  },
  {
    id: '2',
    name: 'Пицца Пепперони',
    price: 650,
    count: 2,
  },
  {
    id: '3',
    name: 'Картофель фри',
    price: 140,
    count: 1,
  },
];

const meta: Meta= {
  title: 'widgets/Order/Cart',
  component: Cart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    deliveryPrice: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'select' }, options: [1, 2],
    },
    onIncrease: { action: 'increase' },
    onDecrease: { action: 'decrease' },
    onDelete: { action: 'delete' },
    onNext: { action: 'next' },
    onOpenOrderInfo: { action: 'openOrderInfo' },
    onCancel: { action: 'cancel' },
  },
} satisfies Meta<typeof Cart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: mockItems,
    deliveryPrice: 0,
    step: 1,
  },
};

export const WithoutDiscount: Story = {
  args: {
    items: mockItemsWithoutDiscount,
    deliveryPrice: 0,
    step: 2,
  },
};

export const WithDelivery: Story = {
  args: {
    items: [  {
      id: '1',
      name: 'Вулкан сет',
      price: 1400,
      oldPrice: 1500,
      count: 1,
      discountText: 'Скидка',
    },
    {
      id: '2',
      name: 'Пицца Пепперони',
      price: 650,
      count: 2,
    },],
    deliveryPrice: 250,
    step: 2,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    deliveryPrice: 0,
    step: 1,
  },
};


