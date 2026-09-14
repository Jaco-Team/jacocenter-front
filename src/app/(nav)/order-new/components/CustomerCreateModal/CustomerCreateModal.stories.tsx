import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { CustomerCreateModal } from './CustomerCreateModal';

const meta = {
  title: 'OrderNew/CustomerCreateModal',
  component: CustomerCreateModal,
  parameters: { layout: 'centered' },
  args: {
    phone: '+7 (927) 123-45-67',
    cityId: 1,
    isOpen: true,
    onClose: () => undefined,
    onCreated: () => undefined,
  },
} satisfies Meta<typeof CustomerCreateModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  play: async ({ canvas }) => {
    const name = canvas.getByLabelText('Имя');
    await name.focus();
  },
};

export const KeyboardNavigation: Story = {
  play: async ({ canvas }) => {
    const name = canvas.getByLabelText('Имя');
    await name.focus();
    await expect(name).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByLabelText('Фамилия')).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByLabelText('Пол')).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByLabelText('Дата рождения')).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Отмена' })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Сохранить' })).toHaveFocus();
  },
};
