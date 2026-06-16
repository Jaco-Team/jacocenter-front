import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "./Calendar";

const meta = {
  title: "Shared/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовый календарь
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return <Calendar value={date} onChange={setDate} />;
  },
};

// С выбранной датой
export const WithSelectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 1, 23));
    return <Calendar value={date} onChange={setDate} />;
  },
};

// С отключенными прошедшими днями
export const DisabledPast: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <Calendar
        value={date}
        onChange={setDate}
        disabled={{ before: new Date() }}
      />
    );
  },
};

// Календарь с ограниченным диапазоном (следующие 7 дней)
export const Next7Days: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return (
      <Calendar
        value={date}
        onChange={setDate}
        disabled={{ before: today, after: nextWeek }}
      />
    );
  },
};