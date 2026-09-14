import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import { HeaderNewOrder } from './HeaderNewOrder';

const meta = {
  title: 'Widgets/HeaderNewOrder',
  component: HeaderNewOrder,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeaderNewOrder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomerFound: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/v1/customers/lookup', () => HttpResponse.json({
          st: true,
          data: {
            phone: '+79991234567',
            registered: true,
            customer: { id: 406851, name: 'Иван Иванов', phone: '+79991234567' },
            last_order: null,
            last_order_state: '',
            addresses: [],
          },
        })),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText('999 999-99-99'), '9991234567');
    await userEvent.click(canvas.getByRole('button', { name: 'Найти' }));
    await expect(await canvas.findByRole('status')).toHaveTextContent('Клиент найден: Иван Иванов');
  },
};

export const CustomerWithSavedAddress: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/v1/customers/lookup', () => HttpResponse.json({
          st: true,
          data: {
            phone: '+79991234567',
            registered: true,
            customer: { id: 406851, name: 'Иван Иванов', phone: '+79991234567' },
            last_order: null,
            last_order_state: '',
            addresses: [{
              id: 77,
              cityId: 1,
              cityName: 'Тольятти',
              street: 'Чапаева',
              home: '47',
              apartment: '12',
              isMain: true,
            }],
          },
        })),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    useOrderStore.getState().resetOrder();
    await userEvent.type(canvas.getByPlaceholderText('999 999-99-99'), '9991234567');
    await userEvent.click(canvas.getByRole('button', { name: 'Найти' }));
    await expect(await canvas.findByRole('status')).toHaveTextContent('Клиент найден: Иван Иванов');
    await expect.poll(() => useOrderStore.getState().addressId).toBe(77);
  },
};

export const CustomerNotFound: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText('999 999-99-99'), '9991234567');
    await userEvent.click(canvas.getByRole('button', { name: 'Найти' }));
    await expect(await canvas.findByRole('status')).toHaveTextContent('Клиент не найден');
    await expect(await canvas.findByRole('dialog')).toBeVisible();
  },
};

export const LookupError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/v1/customers/lookup', () => HttpResponse.json({ message: 'Сервис временно недоступен' }, { status: 503 })),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText('999 999-99-99'), '9991234567');
    await userEvent.click(canvas.getByRole('button', { name: 'Найти' }));
    await expect(await canvas.findByRole('status')).toHaveTextContent('Не удалось проверить клиента');
  },
};
