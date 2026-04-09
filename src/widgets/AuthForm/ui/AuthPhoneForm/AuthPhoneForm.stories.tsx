import type { Meta, StoryObj } from '@storybook/nextjs';
import { AuthPhoneForm } from './AuthPhoneForm';

const meta = {
  title: 'Widgets/AuthForm/ui/AuthPhoneForm',
  component: AuthPhoneForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthPhoneForm>;

export default meta;

type Story = StoryObj<typeof AuthPhoneForm>;

export const InputPhone: Story = {
  args: {
    title: 'Авторизация',
    buttonText: 'Далее',
  },
};