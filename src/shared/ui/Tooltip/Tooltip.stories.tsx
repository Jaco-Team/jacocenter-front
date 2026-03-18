import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tooltip } from './Tooltip';
import Image from 'next/image';

const meta = {
  title: 'shared/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Промокод действует до 05.11.2025 при заказе от 949 р.',
    className: 'mb-3',
    children: <Image src={'/icons/info.svg'} alt="" width={24} height={24}/>,
  },
};

export const ClickTrigger: Story = {
  args: {
    trigger: 'click',
    content: 'Промокод действует до 05.11.2025 при заказе от 949 р.',
    children: <Image src={'/icons/info.svg'} alt="" width={24} height={24}/>,
  },
};

export const PlacementTop: Story = {
  args: {
    placement: 'top',
    className: 'mb-3',
    content: 'Цезарь с курицей запеченный унаги, Филадельфия Лайт, Акваланг запеченный унаги, Калифорния с лососем Люкс 32 шт/1129 г.',
    children: <Image src={'/icons/info.svg'} alt="" width={24} height={24}/>,
  },
};

export const PlacementBottom: Story = {
  args: {
    placement: 'bottom',
    content: 'Промокод действует до 05.11.2025 при заказе от 949 р.',
    className: 'mt-3',
    children: <Image src={'/icons/info.svg'} alt="" width={24} height={24}/>,
  },
};

export const PlacementLeft: Story = {
  args: {
    placement: 'left',
    content: 'Промокод действует до 05.11.2025 при заказе от 949 р.',
    className: 'mr-4',
    children: <Image src={'/icons/info.svg'} alt="" width={24} height={24}/>,
  },
};

export const PlacementRight: Story = {
  args: {
    placement: 'right',
    content: 'Промокод действует до 05.11.2025 при заказе от 949 р.',
    className: 'ml-4',
    children: <Image src={'/icons/info.svg'} alt="" width={24} height={24}/>,
  },
};