import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ModalCalendar } from "./ModalCalendar";

const meta: Meta<typeof ModalCalendar> = {
  title: "features/order/ModalCalendar",
  component: ModalCalendar,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ModalCalendar>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | undefined>();

    return (
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Выбрать дату
        </button>

        <div className="mt-2 text-gray-700">
          {selectedDate
            ? `Выбранная дата: ${selectedDate}`
            : "Дата не выбрана"}
        </div>

        <ModalCalendar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={(date) => {
            setSelectedDate(date);
          }}
        />
      </div>
    );
  },
};