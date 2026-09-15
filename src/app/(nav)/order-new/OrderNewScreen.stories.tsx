import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import CurrentOrderPage from './page';
import { ORDER_STEP } from '@/utils/constants';
import { useOrderStore } from '@/entities/Order/store/new-order/orderStore';

const meta = {
  title: 'OrderNew/Screen',
  component: CurrentOrderPage,
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'todo' },
    viewport: { defaultViewport: 'responsive' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CurrentOrderPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const reset = () => {
  const store = useOrderStore.getState();
  store.resetOrder();
  store.setCity('Тольятти');
  store.setCityId(1);
  store.setPointId(2);
};

const filledOrder = () => {
  const store = useOrderStore.getState();
  reset();
  store.addItem({ id: '354', name: 'Лосось и креветки', price: 899 });
  store.setPhone('9991234567');
  store.setCustomerId(406851);
  store.setStep(ORDER_STEP.DELIVERY);
  store.setDelivery({
    address: 'Чапаева 47',
    streetId: 2934,
    pointId: 2,
    addressCheckStatus: 'success',
    building: '',
    entrance: '1',
    floor: '2',
    apartment: '12',
    intercom: 'working',
  });
  store.setPayment({ method: 'cash', cashAmount: '2000' });
  store.setTimeMode('nearest');
};

const successfulOrderHandlers = [
  http.get('*/api/v1/cities', () => HttpResponse.json({
    st: true,
    data: [
      { id: 1, name: 'Тольятти', slug: 'togliatti' },
      { id: 2, name: 'Самара', slug: 'samara' },
    ],
  })),
  http.put('*/api/v1/cart', () => HttpResponse.json({
    st: true,
    data: {
      city_id: 1,
      point_id: 2,
      valid: true,
      items: [{ item_id: 354, name: 'Лосось и креветки', quantity: 1, unit_price: 899, total: 899 }],
      subtotal: 899,
      discount: 0,
      total: 899,
      delivery: null,
      promo: null,
      errors: [],
    },
  })),
  http.post('*/api/v1/cart/validate', () => HttpResponse.json({
    st: true,
    data: {
      city_id: 1,
      point_id: 2,
      valid: true,
      items: [{ item_id: 354, name: 'Лосось и креветки', quantity: 1, unit_price: 899, total: 899 }],
      subtotal: 899,
      discount: 0,
      total: 899,
      delivery: null,
      promo: null,
      errors: [],
    },
  })),
  http.get('*/api/v1/customers/406851/addresses', () => HttpResponse.json({
    st: true,
    data: { addresses: [] },
  })),
  http.post('*/api/v1/customers/406851/addresses', () => HttpResponse.json({
    st: true,
    data: { id: 77, city_id: 1, street_id: 2934, apartment: '12', entrance: '1', floor: '2' },
  }, { status: 201 })),
  http.post('*/api/v1/orders/draft', () => HttpResponse.json({
    st: true,
    data: {
      id: 44,
      status: 'draft',
      city_id: 1,
      point_id: 2,
      customer_id: 406851,
      type_order: 1,
      cart: {
        city_id: 1,
        point_id: 2,
        valid: true,
        items: [{ item_id: 354, name: 'Лосось и креветки', quantity: 1, unit_price: 899, total: 899 }],
        subtotal: 899,
        discount: 0,
        total: 899,
        errors: [],
      },
    },
  }, { status: 201 })),
  http.get('*/api/v1/orders/44/validation', () => HttpResponse.json({
    st: true,
    data: {
      valid: true,
      order: {
        id: 44,
        status: 'draft',
        city_id: 1,
        point_id: 2,
        customer_id: 406851,
        type_order: 1,
        cart: {
          city_id: 1,
          point_id: 2,
          valid: true,
          items: [{ item_id: 354, name: 'Лосось и креветки', quantity: 1, unit_price: 899, total: 899 }],
          subtotal: 899,
          discount: 0,
          total: 899,
          errors: [],
        },
      },
    },
  })),
  http.post('*/api/v1/orders/44/confirm', () => HttpResponse.json({
    st: true,
    data: {
      id: 44,
      chef_order_id: 914100,
      status: 'confirmed',
      city_id: 1,
      point_id: 2,
      customer_id: 406851,
      type_order: 1,
      cart: {
        city_id: 1,
        point_id: 2,
        valid: true,
        items: [{ item_id: 354, name: 'Лосось и креветки', quantity: 1, unit_price: 899, total: 899 }],
        subtotal: 899,
        discount: 0,
        total: 899,
        errors: [],
      },
    },
  })),
];

export const EmptyCart: Story = {
  loaders: [async () => { reset(); }],
};

export const DeliveryReady: Story = {
  loaders: [async () => { filledOrder(); }],
};

export const ConfirmSuccess: Story = {
  parameters: { msw: { handlers: successfulOrderHandlers } },
  loaders: [async () => { filledOrder(); }],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submit = await canvas.findByRole('button', { name: 'Оформить заказ' });
    await expect(submit).toBeEnabled();
    await userEvent.click(submit);
    const page = within(document.body);
    const dialog = await page.findByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveTextContent('Лосось и креветки');
    await userEvent.click(page.getByRole('button', { name: 'Подтвердить заказ' }));
    await expect(await page.findByText('Заказ успешно оформлен!')).toBeVisible();
  },
};
