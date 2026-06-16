import type { Meta, StoryObj } from '@storybook/nextjs';
import { ConfirmPhoneForm } from './ConfirmPhoneForm';

const meta = {
  title: 'Widgets/AuthForm/ui/ConfirmPhoneForm',
  component: ConfirmPhoneForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmPhoneForm>;

export default meta;

type Story = StoryObj<typeof ConfirmPhoneForm>;

export const ConfirmPhone: Story = {
  args: {
    title: 'Авторизация',
    buttonText: 'Далее',
  },
};