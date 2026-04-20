import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SelectTown } from './SelectTown';

const meta = {
  title: 'UI/SelectTown',
  component: SelectTown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SelectTown>;

export default meta;

type Story = StoryObj<typeof SelectTown>;

export const Default: Story = {
  args: {
    placeholder: 'Город',
    value: '',
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    placeholder: 'Город',
    isOpen: true,
    options:['Тольятти', 'Москва', 'Санкт-Петербург', 'Казань', 'Самара', 'Сочи', 'Тула'],
  },
};

export const WithValue: Story = {
  args: {
    value: 'Тольятти',
    options:['Тольятти', 'Москва', 'Санкт-Петербург'],
  },
};