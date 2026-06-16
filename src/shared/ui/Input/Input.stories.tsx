
import { useState } from "react";
import { Input } from "./Input";
import { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Input> = {
  title: "Shared/Input",
  component: Input,
  args: {
    value: "",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Текст",
    placeholder: "Введите текст",
    error: "",
    helperText: "",
    disabled: false,
    type: "text",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? "");

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const WithValue: Story = {
  args: {
    label: "Текст",
    value: "Молодёжная",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? "");

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Error: Story = {
  args: {
    label: "Текст",
    value: "Молодёжная",
    error: "Ошибка",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? "");

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "Текст",
    value: "Недоступно",
    disabled: true,
  },
  render: (args) => {
    const [value] = useState(args.value ?? "");

    return (
      <Input
        {...args}
        value={value}
        onChange={() => {}}
      />
    );
  },
};
