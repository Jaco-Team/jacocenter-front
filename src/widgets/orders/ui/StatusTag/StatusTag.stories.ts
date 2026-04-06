import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusTag } from './StatusTag';

const meta = {
  title: 'widgets/order/StatusTag',
  component: StatusTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatusTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeCancel: Story = {
  args: {
    variant: 'orderType',
    status: 'cancel',
  },
};

export const TypeDelivery: Story = {
  args: {
    variant: 'orderType',
    status: 'delivery',
  },
};

export const TypeRoom: Story = {
  args: {
    variant: 'orderType',
    status: 'room',
  },
};

export const TypeTakeaway: Story = {
  args: {
    variant: 'orderType',
    status: 'takeaway',
  },
};

export const StatusCancel: Story = {
  args: {
    status: 'cancel',
  },
};

export const StatusInQueue: Story = {
  args: {
    status: 'inQueue',
  },
};

export const StatusCooking: Story = {
  args: {
    status: 'cooking',
  },
};

export const StatusReady: Story = {
  args: {
    status: 'ready',
  },
};

export const StatusInDelivery: Story = {
  args: {
    status: 'inDelivery',
  },
};


