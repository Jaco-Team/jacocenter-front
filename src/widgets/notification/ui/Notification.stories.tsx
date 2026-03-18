import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CafeStoppedNotification, CafeAvailableNotification } from './Notification';

const meta: Meta<typeof CafeStoppedNotification> = {
  title: 'Widgets/Notification',
  component: CafeStoppedNotification,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CafeStoppedNotification>;

export const Stopped: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="mb-4 px-4 py-2 bg-gray-200 border border-gray-700 rounded hover:bg-gray-300 ml-auto block cursor-pointer"
        >
          Показать красное уведомление
        </button>

        <CafeStoppedNotification
          zoneName="Зона №2"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </>
    );
  },
};

export const Available: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="mb-4 px-4 py-2 bg-gray-200 border border-gray-700 rounded hover:bg-gray-300 ml-auto block cursor-pointer"
        >
          Показать зеленое уведомление 
        </button>

        <CafeAvailableNotification
          zoneName="Зона №2"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </>
    );
  },
};