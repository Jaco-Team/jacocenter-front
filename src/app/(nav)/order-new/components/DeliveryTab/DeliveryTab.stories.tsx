import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import { DeliveryTab } from './DeliveryTab';
import { useOrderStore } from '@/entities/Order/store/new-order/orderStore';
import { QueryProvider } from '@/shared/api/QueryProvider';

const meta = {
  title: 'OrderNew/DeliveryTab',
  component: DeliveryTab,
  parameters: { layout: 'centered', a11y: { test: 'todo' } },
  tags: ['autodocs'],
  args: { activeTimeTab: null, setActiveTimeTab: fn() },
  decorators: [
    (Story) => (
      <QueryProvider>
        <div style={{ width: 680, padding: 24, background: '#e5e5e5' }}><Story /></div>
      </QueryProvider>
    ),
  ],
} satisfies Meta<typeof DeliveryTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      return {};
    },
  ],
};

export const AddressReadyForValidation: Story = {
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      useOrderStore.getState().setDelivery({ address: 'Чапаева 47' });
      return {};
    },
  ],
};

export const KeyboardNavigation: Story = {
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      return {};
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const address = canvas.getByLabelText('Улица, дом');
    await userEvent.click(address);
    await userEvent.type(address, 'Чапаева 47');
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Найти' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByRole('button', { name: 'Найти' })).toBeDisabled();
  },
};

export const ValidatedAddress: Story = {
  args: { activeTimeTab: 'nearest' },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      useOrderStore.getState().setDelivery({
        address: 'Чапаева 47',
        addressCheckStatus: 'success',
        streetId: 2934,
        pointId: 2,
        coordinates: [49.414321, 53.505389],
      });
      return {};
    },
  ],
};

export const AddressOutsideZone: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('*/api/v1/delivery/address/validate', () => HttpResponse.json({
          st: true,
          data: { valid: false, code: 'OUT_OF_ZONE' },
        })),
      ],
    },
  },
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      useOrderStore.getState().setDelivery({ address: 'Несуществующая 99' });
      return {};
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Найти' }));
    await expect(await canvas.findByText('Адрес вне зоны доставки. Введите другой адрес')).toBeVisible();
  },
};

export const AddressValidationError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('*/api/v1/delivery/address/validate', () => HttpResponse.error()),
      ],
    },
  },
  loaders: [
    async () => {
      useOrderStore.getState().resetOrder();
      useOrderStore.getState().setDelivery({ address: 'Чапаева 47' });
      return {};
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Найти' }));
    await expect(await canvas.findByText('Адрес вне зоны доставки. Введите другой адрес')).toBeVisible();
  },
};
