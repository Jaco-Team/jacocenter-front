import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SelectBase } from './SelectBase';

const meta: Meta<typeof SelectBase> = {
  title: 'UI/SelectBase',
  component: SelectBase,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    isOpen: {
      control: 'boolean',
    },
    onToggle: {
      action: 'toggled',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectBase>;

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
    value: '',
    isOpen: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Тольятти',
    isOpen: false,
  },
};