import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tab } from "./Tab";

const meta = {
  title: "Shared/Tab",
  component: Tab,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "underline"],
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовый пример с двумя табами (контролируемый)
export const Default: Story = {
  args: {
    items: ["Таб 1", "Таб 2"],
    variant: "default",
  },
  render: function Render(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    return <Tab {...args} activeIndex={activeIndex} onChange={setActiveIndex} />;
  },
};

export const Underline: Story = {
  args: {
    items: ["Таб A", "Таб B"],
    variant: "underline",
  },
  render: function Render(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    return <Tab {...args} activeIndex={activeIndex} onChange={setActiveIndex} />;
  },
};

// Пример с тремя табами (проверка гибкости)
export const ThreeItems: Story = {
  args: {
    items: ["Первый", "Второй", "Третий"],
    variant: "default",
  },
  render: function Render(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    return <Tab {...args} activeIndex={activeIndex} onChange={setActiveIndex} />;
  },
};

// Пример с контейнером (вариант default)
export const WithContainer: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = ["Шаг 1", "Шаг 2"];

    return (
      <div style={{ width: "400px" }}>
        <Tab
          items={items}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          variant="default"
        />
        <div
          style={{
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "0 0 8px 8px", // скругление только снизу, сверху встык с табами
            padding: "20px",
            minHeight: "150px",
          }}
        >
          <p>Содержимое шага {activeIndex + 1}</p>
          <p>Здесь может быть форма или информация.</p>
        </div>
      </div>
    );
  },
};

// Пример с underline и растягиванием на всю ширину
export const UnderlineWithContainer: Story = {
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = ["Вкладка 1", "Вкладка 2"];

    return (
      <div style={{ width: "500px" }}>
        <Tab
          items={items}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          variant="underline"
        />
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e5e5",
            borderTop: "none", // убираем верхнюю границу, чтобы табы "приклеились"
            padding: "20px",
            minHeight: "120px",
          }}
        >
          <p>Контент для {items[activeIndex]}</p>
        </div>
      </div>
    );
  },
};