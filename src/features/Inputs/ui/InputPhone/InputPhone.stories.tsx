import type { Meta, StoryObj } from '@storybook/nextjs';
import { InputPhone } from './InputPhone';
import { useState } from 'react';

const meta = {
  title: 'features/InputPhone',
  component: InputPhone,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const [value, setValue] = useState(context.args.value ?? '');
      return <Story args={{ ...context.args, value, onChange: setValue }} />;
    },
  ],
} satisfies Meta<typeof InputPhone>;

export default meta;

type Story = StoryObj<typeof InputPhone>;

export const Default: Story = {
  args: {
    placeholder: '999 999-99-99',
  },
};

export const WithValue: Story = {
  args: {
    value: '99999999',
  },
};

export const WithSearchIcon: Story = {
  args: {
    withSearchIcon: true,
    searchIconSrc: '/icons/search.svg',
  },
};