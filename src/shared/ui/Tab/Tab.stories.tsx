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
    active: { control: "boolean" },
    title: { control: "text" },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

// Одиночный неактивный таб
export const Inactive: Story = {
  args: {
    title: "Таб",
    active: false,
    variant: "default",
    onClick: () => {},
  },
};

// Одиночный активный таб
export const Active: Story = {
  args: {
    title: "Таб",
    active: true,
    variant: "default",
    onClick: () => {},
  },
};

// Вариант underline
export const UnderlineInactive: Story = {
  args: {
    title: "Таб",
    active: false,
    variant: "underline",
    onClick: () => {},
  },
};

export const UnderlineActive: Story = {
  args: {
    title: "Таб",
    active: true,
    variant: "underline",
    onClick: () => {},
  },
};

// Группа табов (пример использования)
export const Group: Story = {
  args: {
    title: "",
    active: false,
    onClick: () => {},
  },
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = ["Доставка", "Самовывоз"];

    return (
      <div style={{ display: "flex", gap: "12px", width: "400px" }}>
        {items.map((title, index) => (
          <Tab
            key={index}
            title={title}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            variant="default"
            className="flex-1" // для равномерного растягивания
          />
        ))}
      </div>
    );
  },
};

// Группа underline
export const UnderlineGroup: Story = {
  args: {
    title: "",
    active: false,
    onClick: () => {},
  },
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = ["Вкладка 1", "Вкладка 2"];

    return (
      <div style={{ display: "flex", width: "500px" }}>
        {items.map((title, index) => (
          <Tab
            key={index}
            title={title}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            variant="underline"
            className="flex-1"
          />
        ))}
      </div>
    );
  },
};