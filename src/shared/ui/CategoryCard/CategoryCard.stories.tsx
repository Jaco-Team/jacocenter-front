import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CategoryCard } from "./CategoryCard";

const meta = {
  title: "Shared/CategoryCard",
  component: CategoryCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isSelected: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Категория",
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    children: "Категория",
    isSelected: true,
  },
};

export const Interactive: Story = {
  render: function Render() {
    const [selected, setSelected] = useState(false);
    return (
      <CategoryCard isSelected={selected} onClick={() => setSelected(!selected)}>
        Нажми меня
      </CategoryCard>
    );
  },
};

export const LongText: Story = {
  args: {
    children: "Очень длинное название категории",
    isSelected: false,
  },
};