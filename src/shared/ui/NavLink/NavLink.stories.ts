import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DummyIcon, NavLink } from './NavLink';

const meta: Meta<typeof NavLink> = {
  title: 'UI/NavLink',
  component: NavLink,
  parameters: { layout: 'centered' },
};

type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
  args: {
    children: 'Оформить заказ',
    href: '#',
    icon: DummyIcon,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    href: '#',
    icon: DummyIcon,
  },
};

export const Active: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/orders',
      },
    },
  },
  args: {
    children: 'Активная страница',
    href: '/orders',
    icon: DummyIcon,
  },
};

export default meta;
