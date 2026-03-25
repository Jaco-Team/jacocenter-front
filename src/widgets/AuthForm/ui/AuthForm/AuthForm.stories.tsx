import type { Meta, StoryObj } from '@storybook/nextjs';
import { AuthForm } from './AuthForm';

const meta = {
  title: 'Widgets/AuthForm/ui/AuthForm',
  component: AuthForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthForm>;

export default meta;

type Story = StoryObj<typeof AuthForm>;

export const Login: Story = {
  args: {
    title: 'Авторизация',
    buttonText: 'Войти',
  },
};