import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StopOrder } from './StopOrder';

const meta = {
  title: 'Features/StopOrder',
  component: StopOrder,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StopOrder>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { label: 'Зона 1 - Молодёжная 2', description: 'до 14.00' },
  { label: 'Зона 3 - Куйбышева 113', description: 'до 12.30' },
];

export const Active: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return <StopOrder {...args} isOpen={isOpen} onToggle={() => setIsOpen(p => !p)} />;
  },
  args: { options: sampleOptions, isActive: true },
};

export const Inactive: Story = {
  args: { options: sampleOptions, isActive: false },
};