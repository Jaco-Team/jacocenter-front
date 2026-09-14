import { useState } from "react";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ModalTimeSelect } from "./ModalTimeSelect";
import type { PreorderSlot } from "@/entities/delivery/model/types";

const slots: PreorderSlot[] = [
  { value: '10:00 - 10:30', start: '10:00', end: '10:30', disabled: false },
  { value: '10:30 - 11:00', start: '10:30', end: '11:00', disabled: false },
  { value: '18:00 - 18:30', start: '18:00', end: '18:30', disabled: true },
];

const meta: Meta<typeof ModalTimeSelect> = {
  title: "features/ModalTimeSelect",
  component: ModalTimeSelect,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ModalTimeSelect>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string>("");

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Выбрать время
        </button>

        <div className="mt-2 text-gray-700">
          {selectedTime
            ? `Выбранное время: ${selectedTime}`
            : "Время не выбрано"}
        </div>

        <ModalTimeSelect
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onTimeSelect={(val) => {
            setSelectedTime(val);
            setIsOpen(false);
          }}
          slots={slots}
        />
      </div>
    );
  },
};
