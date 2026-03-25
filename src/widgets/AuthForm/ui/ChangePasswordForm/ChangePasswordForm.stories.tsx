import type { Meta, StoryObj } from '@storybook/nextjs';
import { ChangePasswordForm } from './ChangePasswordForm';

const meta = {
  title: 'Widgets/AuthForm/ui/ChangePasswordForm',
  component: ChangePasswordForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChangePasswordForm>;

export default meta;

type Story = StoryObj<typeof ChangePasswordForm>;

export const ConfirmPhone: Story = {
  args: {
    title: 'Авторизация',
    buttonText: 'Создать пароль',
  },
};