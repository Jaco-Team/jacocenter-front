import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SelectDate} from './SelectDate';

const meta = {
  title: 'UI/SelectDate',
  component: SelectDate,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SelectDate>;

export default meta;

type Story = StoryObj<typeof SelectDate>;

export const Default: Story = {
  args: {
    placeholder: 'Выберите дату',
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
  },
};