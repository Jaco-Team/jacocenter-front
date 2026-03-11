import { Meta, StoryObj } from '@storybook/nextjs';
import { PasswordInput } from './PasswordInput';
import { useState } from 'react';

const meta: Meta<typeof PasswordInput> = {
  title: 'UI/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Пароль",
    error: "",
    helperText: "",
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? "");

    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Пароль",
    value:'Asdfgh00',
    error: "",
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? "");

    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Error: Story = {
  args: {
    value:'Asdfgh00',
    error: "Пароль введён неверно",
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? "");

    return (
      <PasswordInput
        {...args}
        value={value}
        className='error'
        onChange={(e) => setValue(e.target.value)}
      />
    )
  }
}