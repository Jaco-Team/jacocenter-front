import { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['base', 'icon'],
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm', 'icon-md', 'icon-sm'],
    },
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'error'],
    }
  },
  args: {
    variant: 'base',
    theme: 'primary',
    size: 'md',
    children: 'Text',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = {
  args: { theme: 'secondary' },
}

export const Error: Story = {
  args: {
    theme: 'error',
    children: '🔥',
    size: 'icon-sm',
  }
}

export const Icon: Story = {
  args: {
    variant: 'icon',
    children: '🔥',
    size: 'icon-md',
  },
}

export const Small: Story = {
  args: { size: 'sm' },
}

export const Middle: Story = {
  args: { size: 'md' },
}

export const Large: Story = {
  args: { size: 'lg' },
}

export const IconMiddle: Story = {
  args: { size: 'icon-md' },
}

export const IconSmall: Story = {
  args: { size: 'icon-sm' },
}

