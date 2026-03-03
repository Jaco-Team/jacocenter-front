import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Shared/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="bg-white p-[15px]">
        <Checkbox checked={checked} onChange={setChecked} />
      </div>
    );
  },
};

export const WithText: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="bg-white p-[15px]">
        <Checkbox checked={checked} onChange={setChecked} text="В пути" />
      </div>
    );
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <div className="bg-white p-[15px]">
        <Checkbox checked={checked} onChange={setChecked} text="Уже выбрано" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [checked] = useState(false);
    return (
      <div className="bg-white p-[15px]">
        <Checkbox checked={checked} text="Неактивно" disabled />
      </div>
    );
  },
};