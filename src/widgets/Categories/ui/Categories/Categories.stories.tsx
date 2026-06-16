import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Categories } from "./Categories";

const meta = {
  title: "Widgets/Categories",
  component: Categories,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Categories>;

export default meta;
type Story = StoryObj<typeof meta>;

// Массив категорий с названиями (все с заглавной буквы)
const sampleItems = [
  { id: 1, name: "Сеты" },
  { id: 2, name: "Комбо" },
  { id: 3, name: "Закуски" },
  { id: 4, name: "Пицца" },
  { id: 5, name: "Паста" },
  { id: 6, name: "Напитки" },
  { id: 7, name: "Соусы" },
  { id: 8, name: "Классические роллы" },
  { id: 9, name: "Фирменные роллы" },
  { id: 10, name: "Жаренные роллы" },
  { id: 11, name: "Запеченные роллы" },
];

// Базовая история с шириной контейнера 600px
export const Default: Story = {
  args: {
    items: sampleItems,
    selectedId: null,
  },
  render: function Render(args) {
    const [selected, setSelected] = useState<number | null>(null);
    const handleSelect = (id: string | number) => {
      setSelected(Number(id)); // преобразуем в число, т.к. id числовые
    };
    return (
      <div style={{ width: "704px", padding: "8px" }}>
        <Categories {...args} selectedId={selected} onSelect={handleSelect} />
      </div>
    );
  },
};

// История с выбранной категорией (например, "Закуски" с id=3)
export const WithSelected: Story = {
  args: {
    items: sampleItems,
    selectedId: 3,
  },
  render: function Render(args) {
    const [selected, setSelected] = useState<number>(args.selectedId as number);
    const handleSelect = (id: string | number) => {
      setSelected(Number(id));
    };
    return (
      <div style={{ width: "704px", padding: "8px" }}>
        <Categories {...args} selectedId={selected} onSelect={handleSelect} />
      </div>
    );
  },
};

// Узкий контейнер (300px) — явно показывает перенос строк
export const NarrowContainer: Story = {
  args: {
    items: sampleItems,
    selectedId: null,
  },
  render: function Render(args) {
    const [selected, setSelected] = useState<number | null>(null);
    const handleSelect = (id: string | number) => {
      setSelected(Number(id));
    };
    return (
      <div style={{ width: "300px", padding: "8px" }}>
        <Categories {...args} selectedId={selected} onSelect={handleSelect} />
      </div>
    );
  },
};