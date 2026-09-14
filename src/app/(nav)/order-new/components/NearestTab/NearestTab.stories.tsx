import type { Meta, StoryObj } from '@storybook/react-vite';
import { NearestTab } from './NearestTab';

const meta = {
  title: 'OrderNew/NearestTab',
  component: NearestTab,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    activeTimeTab: { control: 'inline-radio', options: ['nearest', 'by-time', null] },
    activeDeliveryTab: { control: 'inline-radio', options: ['delivery', 'pickup'] },
  },
} satisfies Meta<typeof NearestTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeliveryNearest: Story = {
  args: { activeTimeTab: 'nearest', activeDeliveryTab: 'delivery' },
};

export const PickupNearest: Story = {
  args: { activeTimeTab: 'nearest', activeDeliveryTab: 'pickup' },
};

export const Disabled: Story = {
  args: { activeTimeTab: 'by-time', activeDeliveryTab: 'delivery' },
};
