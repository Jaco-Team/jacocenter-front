import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SelectBase } from './SelectBase';
import { useState } from 'react';

const meta = {
  title: 'UI/SelectBase',
  component: SelectBase,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SelectBase>;

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
    children:['Тольятти', 'Москва', 'Санкт-Петербург', 'Казань', 'Самара', 'Сочи', 'Тула'],
  },
};

export const WithValue: Story = {
  args: {
    value: 'Тольятти',
    isOpen: false,
  },
};