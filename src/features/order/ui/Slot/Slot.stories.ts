import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Slot } from './Slot';

const meta = {
  title: 'features/order/Slot',
  component: Slot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { variant: "daySlot", isActive: false, onClick: () => {}, children: "" },
} satisfies Meta<typeof Slot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DaySlot: Story = {
  args: { variant: "daySlot", isActive: false, onClick: () => {}, children: "День 12:00 - 18:00" },
};
export const TimeSlot: Story = {
  args: { variant: "timeSlot", isActive: false, onClick: () => {}, children: "10:00" },
};

