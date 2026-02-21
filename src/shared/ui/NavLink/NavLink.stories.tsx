import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavLink } from './NavLink';
import WriteIcon from './write.svg?react';

const meta: Meta<typeof NavLink> = {
  title: 'UI/NavLink',
  component: NavLink,
  tags: ['autodocs'],

  parameters: { layout: 'centered' },
};

type Story = StoryObj<typeof NavLink>;

/**
 *  href: 'javascript:void(0)' - это хак чтобы в историях ссылка не срабатывала и не вела на
 *  http://localhost:6006/iframe.html?id=ui-navlink--default&viewMode=story&globals=
 *
 *  Пока не нашел способа отключить поведение Next.js Link
 */
export const Default: Story = {
  args: {
    children: 'Оформить заказ',
    href: 'javascript:void(0)',
    icon: <WriteIcon />,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    href: 'javascript:void(0)',
    icon: <WriteIcon />,
  },
};

export const Active: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: 'javascript:void(0)',
      },
    },
  },
  args: {
    children: 'Активная страница',
    href: 'javascript:void(0)',
    icon: <WriteIcon />,
  },
};

export default meta;
